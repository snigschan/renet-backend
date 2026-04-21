create extension if not exists "pgcrypto";

create type public.company_type as enum ('agency', 'developer');
create type public.profile_role as enum (
  'agent',
  'broker',
  'consultant',
  'manager',
  'director',
  'appraiser',
  'analyst',
  'developer',
  'investor',
  'attorney'
);
create type public.account_type as enum (
  'individual',
  'agency',
  'developer_company'
);
create type public.membership_role as enum ('broker', 'employee', 'admin');
create type public.membership_status as enum ('pending', 'approved', 'rejected');

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

create table if not exists public.companies (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique,
  type public.company_type not null,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique,
  full_name text not null,
  first_name text,
  last_name text,
  phone text,
  role public.profile_role not null,
  account_type public.account_type not null default 'individual',
  company_id uuid references public.companies(id) on delete set null,
  avatar_url text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.company_memberships (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  company_id uuid not null references public.companies(id) on delete cascade,
  role public.membership_role not null default 'broker',
  status public.membership_status not null default 'pending',
  requested_by uuid references auth.users(id) on delete set null,
  reviewed_by uuid references auth.users(id) on delete set null,
  note text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  unique (user_id, company_id)
);

create index if not exists idx_profiles_company_id on public.profiles(company_id);
create index if not exists idx_profiles_role on public.profiles(role);
create index if not exists idx_companies_type on public.companies(type);
create index if not exists idx_company_memberships_user_id on public.company_memberships(user_id);
create index if not exists idx_company_memberships_company_id on public.company_memberships(company_id);
create index if not exists idx_company_memberships_status on public.company_memberships(status);

drop trigger if exists set_companies_updated_at on public.companies;
create trigger set_companies_updated_at
before update on public.companies
for each row
execute function public.set_updated_at();

drop trigger if exists set_profiles_updated_at on public.profiles;
create trigger set_profiles_updated_at
before update on public.profiles
for each row
execute function public.set_updated_at();

drop trigger if exists set_company_memberships_updated_at on public.company_memberships;
create trigger set_company_memberships_updated_at
before update on public.company_memberships
for each row
execute function public.set_updated_at();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  metadata jsonb;
begin
  metadata := coalesce(new.raw_user_meta_data, '{}'::jsonb);

  insert into public.profiles (
    id,
    email,
    full_name,
    first_name,
    last_name,
    phone,
    role,
    account_type
  )
  values (
    new.id,
    new.email,
    coalesce(
      nullif(trim(concat(metadata ->> 'first_name', ' ', metadata ->> 'last_name')), ''),
      metadata ->> 'full_name',
      split_part(coalesce(new.email, ''), '@', 1)
    ),
    nullif(metadata ->> 'first_name', ''),
    nullif(metadata ->> 'last_name', ''),
    nullif(metadata ->> 'phone', ''),
    coalesce((metadata ->> 'role')::public.profile_role, 'agent'::public.profile_role),
    coalesce((metadata ->> 'account_type')::public.account_type, 'individual'::public.account_type)
  )
  on conflict (id) do update
  set
    email = excluded.email,
    full_name = excluded.full_name,
    first_name = excluded.first_name,
    last_name = excluded.last_name,
    phone = excluded.phone,
    role = excluded.role,
    account_type = excluded.account_type;

  return new;
exception
  when invalid_text_representation then
    raise exception 'Invalid role or account_type supplied in raw_user_meta_data';
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row
execute function public.handle_new_user();

alter table public.companies enable row level security;
alter table public.profiles enable row level security;
alter table public.company_memberships enable row level security;

drop policy if exists "profiles are viewable by authenticated users" on public.profiles;
create policy "profiles are viewable by authenticated users"
on public.profiles
for select
to authenticated
using (true);

drop policy if exists "users can insert their own profile" on public.profiles;
create policy "users can insert their own profile"
on public.profiles
for insert
to authenticated
with check (auth.uid() = id);

drop policy if exists "users can update their own profile" on public.profiles;
create policy "users can update their own profile"
on public.profiles
for update
to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);

drop policy if exists "companies are viewable by authenticated users" on public.companies;
create policy "companies are viewable by authenticated users"
on public.companies
for select
to authenticated
using (true);

drop policy if exists "authenticated users can create companies" on public.companies;
create policy "authenticated users can create companies"
on public.companies
for insert
to authenticated
with check (auth.uid() = created_by);

drop policy if exists "company creators can update companies" on public.companies;
create policy "company creators can update companies"
on public.companies
for update
to authenticated
using (auth.uid() = created_by)
with check (auth.uid() = created_by);

drop policy if exists "memberships are viewable by authenticated users" on public.company_memberships;
create policy "memberships are viewable by authenticated users"
on public.company_memberships
for select
to authenticated
using (true);

drop policy if exists "users can request their own memberships" on public.company_memberships;
create policy "users can request their own memberships"
on public.company_memberships
for insert
to authenticated
with check (
  auth.uid() = user_id
  and auth.uid() = requested_by
);

drop policy if exists "company creators can update memberships" on public.company_memberships;
create policy "company creators can update memberships"
on public.company_memberships
for update
to authenticated
using (
  exists (
    select 1
    from public.companies c
    where c.id = company_memberships.company_id
      and c.created_by = auth.uid()
  )
)
with check (
  exists (
    select 1
    from public.companies c
    where c.id = company_memberships.company_id
      and c.created_by = auth.uid()
  )
);
