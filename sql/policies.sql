-- Drop all existing policies
do $$
declare
   rec record;
begin
   for rec in (SELECT tablename, policyname FROM pg_policies)
   loop
     execute 'drop policy "'||rec.policyname||'" on '||rec.tablename;
   end loop;
end;
$$;

-- Only service accounts can change the admin flags, for now
alter table public.accounts enable row level security;

-- Patterns are the core content of the site, they can be read by everyone but only edited by admins
alter table public.patterns enable row level security;
create policy "Allow logged-in read access" on public.patterns for select using ( auth.role() = 'authenticated' );
create policy "Allow admin insert access" on public.patterns for insert with check ( admin_check(auth.uid()) );
create policy "Allow admin update access" on public.patterns for update using ( admin_check(auth.uid()) );
create policy "Allow admin delete access" on public.patterns for delete using ( admin_check(auth.uid()) );