create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(),
  job_id text,
  job_title text,
  company text,
  first_name text not null,
  last_name text not null,
  email text not null,
  phone text not null,
  current_location text not null,
  current_title text not null,
  years_of_experience integer not null check (years_of_experience >= 0),
  expected_salary text,
  notice_period text,
  work_authorization text,
  linkedin_url text,
  portfolio_url text,
  key_skills text not null,
  cover_letter text not null,
  resume_text text not null,
  can_relocate boolean not null default false,
  created_at timestamptz not null default timezone('utc', now())
);

create index if not exists idx_applications_job_id on public.applications(job_id);
create index if not exists idx_applications_created_at on public.applications(created_at desc);
create index if not exists idx_applications_email on public.applications(email);

alter table public.applications enable row level security;

drop policy if exists "applications insert allowed" on public.applications;
create policy "applications insert allowed"
on public.applications
for insert
to anon, authenticated
with check (true);

drop policy if exists "applications select authenticated" on public.applications;
create policy "applications select authenticated"
on public.applications
for select
to authenticated
using (true);
