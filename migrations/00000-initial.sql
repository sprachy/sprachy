-- User account data, separate from supabase's auth.users
create table if not exists public.accounts (
  id          uuid not null primary key references auth.users(id), -- UUID from auth.users
  is_admin    boolean not null default false
);
comment on table public.accounts is 'Account data for each user.';
comment on column public.accounts.id is 'References the internal Supabase Auth user.';

-- patterns
create table if not exists public.patterns (
  id serial primary key,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null,
  slug text not null check (length(slug) > 0),
  title text not null,
  published boolean default false not null,
  explanation text not null
);

create unique index published_slugs_uniq on public.patterns (published) where (published = true);

create table if not exists public.pattern_versions (
  revised_at timestamp with time zone default now() not null,
  revisor_id uuid not null references accounts(id)
)