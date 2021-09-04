-- User account data, separate from supabase's auth.users
create table public.accounts (
  id          uuid not null primary key, -- UUID from auth.users
  is_admin    boolean not null default false
);
comment on table public.accounts is 'Account data for each user.';
comment on column public.accounts.id is 'References the internal Supabase Auth user.';

-- patterns
create table public.patterns (
    id serial primary key,
    created_at timestamp with time zone default now() not null,
    updated_at timestamp with time zone default now() not null,
    slug text not null,
    title text not null,
    published boolean default false not null,
    explanation text not null
);