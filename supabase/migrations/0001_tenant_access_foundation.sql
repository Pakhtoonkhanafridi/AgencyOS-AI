create extension if not exists "pgcrypto";

create type public.member_role as enum ('owner', 'admin', 'manager', 'agent', 'viewer');

create table public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  created_at timestamptz not null default now()
);

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  created_at timestamptz not null default now()
);

create table public.memberships (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  role public.member_role not null default 'agent',
  created_at timestamptz not null default now(),
  unique (organization_id, user_id)
);

alter table public.organizations enable row level security;
alter table public.profiles enable row level security;
alter table public.memberships enable row level security;

create or replace function public.is_member(target_organization_id uuid)
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.memberships
    where memberships.organization_id = target_organization_id
      and memberships.user_id = auth.uid()
  );
$$;

create policy "members can read their organizations"
on public.organizations
for select
using (public.is_member(id));

create policy "users can read own profile"
on public.profiles
for select
using (id = auth.uid());

create policy "members can read organization memberships"
on public.memberships
for select
using (public.is_member(organization_id));
