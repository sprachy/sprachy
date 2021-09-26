-- User account data, separate from supabase's auth.users
create table public.accounts (
  id          uuid not null primary key references auth.users(id), -- UUID from auth.users
  is_admin    boolean not null default false
);
comment on table public.accounts is 'Account data for each user.';
comment on column public.accounts.id is 'References the internal Supabase Auth user.';

-- patterns
create table public.patterns (
  id serial primary key,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null,
  slug text not null check (length(slug) > 0),
  title text not null,
  published boolean default false not null,
  explanation text not null
);

-- published patterns must have a unique slug
create unique index published_slugs_uniq on public.patterns (slug) where (published = true);

create table public.pattern_versions (
  revised_at timestamp with time zone default now() not null,
  revisor_id uuid not null references accounts(id)
);

create table public.progress (
  user_id uuid not null references auth.users(id),
  pattern_id integer not null references public.patterns(id),
  srs_level integer not null,
  initially_learned_at timestamp with time zone default now() not null,
  last_reviewed_at timestamp with time zone default now() not null
);

create unique index progress_user_pattern_uniq on public.progress (user_id, pattern_id);