alter table public.companies
add column if not exists location text,
add column if not exists employee_count_range text,
add column if not exists founded_year integer,
add column if not exists website text,
add column if not exists description text,
add column if not exists logo_url text,
add column if not exists verified boolean not null default false,
add column if not exists profile_views integer not null default 0;

create table if not exists public.company_profile_versions (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  version_number integer not null,
  snapshot jsonb not null,
  changed_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default timezone('utc', now()),
  unique (company_id, version_number)
);

create index if not exists idx_company_profile_versions_company_id
on public.company_profile_versions(company_id);

drop policy if exists "company profile versions are viewable by authenticated users" on public.company_profile_versions;
create policy "company profile versions are viewable by authenticated users"
on public.company_profile_versions
for select
to authenticated
using (true);

drop policy if exists "company creators can insert profile versions" on public.company_profile_versions;
create policy "company creators can insert profile versions"
on public.company_profile_versions
for insert
to authenticated
with check (
  exists (
    select 1
    from public.companies c
    where c.id = company_profile_versions.company_id
      and c.created_by = auth.uid()
  )
);

alter table public.company_profile_versions enable row level security;
