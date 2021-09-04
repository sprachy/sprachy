-- User account data, separate from supabase's auth.users
create table public.accounts (
  id          uuid not null primary key, -- UUID from auth.users
  is_admin    boolean not null default false
);
comment on table public.accounts is 'Account data for each user.';
comment on column public.accounts.id is 'References the internal Supabase Auth user.';
alter table public.accounts enable row level security;

-- inserts a row into public.accounts and assigns roles
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.accounts (id)
  values (new.id);

  -- Bypass email confirmation for now
  update auth.users u set email_confirmed_at = now()
  where u.id = new.id;
  
  return new;
end;
$$ language plpgsql security definer;

-- trigger the function every time a user is created
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- check if uid is an admin
create function public.admin_check(
  user_id uuid
)
returns boolean as $$
declare
  result boolean;
begin
  select a.is_admin from public.accounts a where a.id = admin_check.user_id into result;
  return result;
end;
$$ language plpgsql security definer;

-- patterns
create table public.patterns (
    id serial primary key,
    created_at timestamp with time zone default now() not null,
    updated_at timestamp with time zone default now() not null,
    slug text not null,
    title text not null,
    published boolean default false not null
);
alter table public.patterns enable row level security;
create policy "Allow admin insert access" on public.patterns for insert with check ( admin_check(auth.uid()) );
create policy "Allow admin update access" on public.patterns for update using ( admin_check(auth.uid()) );
create policy "Allow admin delete access" on public.patterns for delete using ( admin_check(auth.uid()) );
