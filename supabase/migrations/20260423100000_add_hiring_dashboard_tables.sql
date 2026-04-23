create type public.job_posting_status as enum ('active', 'draft', 'closed');
create type public.application_status as enum ('new', 'under_review', 'interview_scheduled', 'hired', 'rejected');

create table if not exists public.jobs (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  created_by uuid not null references auth.users(id) on delete cascade,
  title text not null,
  department text,
  location text,
  job_type text,
  experience_level text,
  salary_min integer,
  salary_max integer,
  description text,
  requirements text,
  benefits text,
  status public.job_posting_status not null default 'active',
  views_count integer not null default 0,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.job_applications (
  id uuid primary key default gen_random_uuid(),
  job_id uuid not null references public.jobs(id) on delete cascade,
  candidate_id uuid not null references public.profiles(id) on delete cascade,
  status public.application_status not null default 'new',
  match_score integer check (match_score between 0 and 100),
  note text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  unique (job_id, candidate_id)
);

create index if not exists idx_jobs_company_id on public.jobs(company_id);
create index if not exists idx_jobs_created_by on public.jobs(created_by);
create index if not exists idx_jobs_status on public.jobs(status);
create index if not exists idx_job_applications_job_id on public.job_applications(job_id);
create index if not exists idx_job_applications_candidate_id on public.job_applications(candidate_id);
create index if not exists idx_job_applications_status on public.job_applications(status);

drop trigger if exists set_jobs_updated_at on public.jobs;
create trigger set_jobs_updated_at
before update on public.jobs
for each row
execute function public.set_updated_at();

drop trigger if exists set_job_applications_updated_at on public.job_applications;
create trigger set_job_applications_updated_at
before update on public.job_applications
for each row
execute function public.set_updated_at();

alter table public.jobs enable row level security;
alter table public.job_applications enable row level security;

drop policy if exists "jobs are viewable by authenticated users" on public.jobs;
create policy "jobs are viewable by authenticated users"
on public.jobs
for select
to authenticated
using (true);

drop policy if exists "company creators can create jobs" on public.jobs;
create policy "company creators can create jobs"
on public.jobs
for insert
to authenticated
with check (
  auth.uid() = created_by
  and exists (
    select 1
    from public.companies c
    where c.id = jobs.company_id
      and c.created_by = auth.uid()
  )
);

drop policy if exists "company creators can update jobs" on public.jobs;
create policy "company creators can update jobs"
on public.jobs
for update
to authenticated
using (
  exists (
    select 1
    from public.companies c
    where c.id = jobs.company_id
      and c.created_by = auth.uid()
  )
)
with check (
  exists (
    select 1
    from public.companies c
    where c.id = jobs.company_id
      and c.created_by = auth.uid()
  )
);

drop policy if exists "job applications are viewable by authenticated users" on public.job_applications;
create policy "job applications are viewable by authenticated users"
on public.job_applications
for select
to authenticated
using (true);

drop policy if exists "candidates can create their applications" on public.job_applications;
create policy "candidates can create their applications"
on public.job_applications
for insert
to authenticated
with check (auth.uid() = candidate_id);

drop policy if exists "company creators can update job applications" on public.job_applications;
create policy "company creators can update job applications"
on public.job_applications
for update
to authenticated
using (
  exists (
    select 1
    from public.jobs j
    join public.companies c on c.id = j.company_id
    where j.id = job_applications.job_id
      and c.created_by = auth.uid()
  )
)
with check (
  exists (
    select 1
    from public.jobs j
    join public.companies c on c.id = j.company_id
    where j.id = job_applications.job_id
      and c.created_by = auth.uid()
  )
);
