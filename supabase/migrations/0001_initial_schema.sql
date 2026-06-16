create extension if not exists "pgcrypto";

create type public.member_role as enum ('owner', 'admin', 'agent', 'viewer');
create type public.deal_stage as enum ('lead', 'proposal', 'won', 'lost');
create type public.invoice_status as enum ('draft', 'sent', 'paid', 'overdue', 'void');

create table public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.memberships (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  role public.member_role not null default 'agent',
  created_at timestamptz not null default now(),
  unique (organization_id, user_id)
);

create table public.clients (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  owner_id uuid references public.profiles(id),
  name text not null,
  email text,
  phone text,
  business_type text,
  status text not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.deals (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  client_id uuid not null references public.clients(id) on delete cascade,
  name text not null,
  stage public.deal_stage not null default 'lead',
  value_cents integer not null default 0 check (value_cents >= 0),
  probability integer not null default 0 check (probability between 0 and 100),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.tasks (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  client_id uuid references public.clients(id) on delete cascade,
  assignee_id uuid references public.profiles(id),
  title text not null,
  due_at timestamptz,
  completed_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.activity_events (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  client_id uuid references public.clients(id) on delete cascade,
  actor_id uuid references public.profiles(id),
  event_type text not null,
  body text,
  created_at timestamptz not null default now()
);

create table public.invoices (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  client_id uuid not null references public.clients(id) on delete cascade,
  status public.invoice_status not null default 'draft',
  amount_cents integer not null check (amount_cents >= 0),
  currency text not null default 'usd',
  due_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.ai_artifacts (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  client_id uuid references public.clients(id) on delete cascade,
  artifact_type text not null,
  prompt_version text not null,
  content jsonb not null,
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now()
);

create table public.proof_records (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  record_type text not null,
  record_id text not null,
  proof_hash text not null,
  chain_id integer,
  transaction_hash text,
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now()
);

alter table public.organizations enable row level security;
alter table public.profiles enable row level security;
alter table public.memberships enable row level security;
alter table public.clients enable row level security;
alter table public.deals enable row level security;
alter table public.tasks enable row level security;
alter table public.activity_events enable row level security;
alter table public.invoices enable row level security;
alter table public.ai_artifacts enable row level security;
alter table public.proof_records enable row level security;

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

create policy "members can read organization"
on public.organizations
for select
using (public.is_member(id));

create policy "users can read own profile"
on public.profiles
for select
using (id = auth.uid());

create policy "members can read memberships"
on public.memberships
for select
using (public.is_member(organization_id));

create policy "members can read clients"
on public.clients
for select
using (public.is_member(organization_id));

create policy "members can read deals"
on public.deals
for select
using (public.is_member(organization_id));

create policy "members can read tasks"
on public.tasks
for select
using (public.is_member(organization_id));

create policy "members can read activity"
on public.activity_events
for select
using (public.is_member(organization_id));

create policy "members can read invoices"
on public.invoices
for select
using (public.is_member(organization_id));

create policy "members can read ai artifacts"
on public.ai_artifacts
for select
using (public.is_member(organization_id));

create policy "members can read proof records"
on public.proof_records
for select
using (public.is_member(organization_id));
