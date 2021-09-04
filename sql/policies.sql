-- Drop all existing triggers
do $$
declare rec record;
begin
   for rec in (SELECT trigger_name, event_object_table FROM information_schema.triggers) loop
     execute 'drop trigger "'||rec.trigger_name||'" on '||rec.event_object_table;
   end loop;
end;
$$;

-- Drop all existing policies
do $$ 
declare rec record;
begin
   for rec in (SELECT tablename, policyname FROM pg_policies) loop
     execute 'drop policy "'||rec.policyname||'" on '||rec.tablename;
   end loop;
end;
$$;

--
-- POLICIES
--

-- Only service accounts can change the admin flags, for now
alter table public.accounts enable row level security;

-- Patterns are the core content of the site, they can be read by everyone but only edited by admins
alter table public.patterns enable row level security;
create policy "Allow logged-in read access" on public.patterns for select using ( auth.role() = 'authenticated' );
create policy "Allow admin insert access" on public.patterns for insert with check ( admin_check(auth.uid()) );
create policy "Allow admin update access" on public.patterns for update using ( admin_check(auth.uid()) );
create policy "Allow admin delete access" on public.patterns for delete using ( admin_check(auth.uid()) );

-- Check if a user id has admin access
create or replace function public.admin_check(user_id uuid) returns boolean as $$
begin
  return (select a.is_admin from public.accounts a where a.id = admin_check.user_id);
end;
$$ language plpgsql security definer;

--
-- TRIGGERS
--

-- Create a public.accounts entry on auth.users creation
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
create or replace function public.handle_new_user() returns trigger as $$
begin
  insert into public.accounts (id) values (new.id);
  -- Bypass email confirmation for now
  update auth.users u set email_confirmed_at = now() where u.id = new.id;
  return new;
end;
$$ language plpgsql security definer;

