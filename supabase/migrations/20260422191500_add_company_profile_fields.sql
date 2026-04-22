alter table public.companies
add column if not exists location text,
add column if not exists employee_count_range text,
add column if not exists founded_year integer,
add column if not exists website text,
add column if not exists description text,
add column if not exists logo_url text,
add column if not exists verified boolean not null default false,
add column if not exists profile_views integer not null default 0;
