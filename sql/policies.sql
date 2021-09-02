
ALTER TABLE public.patterns ENABLE ROW LEVEL SECURITY;
drop policy if exists "Allow logged-in read access" on public.patterns;
create policy "Allow logged-in read access" on public.patterns for select using ( auth.role() = 'authenticated' );
