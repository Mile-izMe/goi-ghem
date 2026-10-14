-- Run once in Supabase SQL Editor as postgres.
-- Existing table: profiles(id uuid PRIMARY KEY, username text, created_at timestamptz).
-- This initializes profiles; it never overwrites an existing profile.
begin;

create or replace function public.create_profile_for_auth_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, username, created_at)
  values (
    new.id,
    coalesce(
      nullif(btrim(new.raw_user_meta_data ->> 'username'), ''),
      nullif(btrim(new.raw_user_meta_data ->> 'full_name'), ''),
      'user_' || replace(new.id::text, '-', '')
    ),
    coalesce(new.created_at, now())
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

-- The function is only called by the trigger, not through the public API.
revoke all on function public.create_profile_for_auth_user() from public, anon, authenticated;

drop trigger if exists goi_ghem_auth_user_profile on auth.users;
create trigger goi_ghem_auth_user_profile
after insert on auth.users
for each row execute function public.create_profile_for_auth_user();

-- Repair accounts registered before this trigger was installed.
-- Keep existing usernames and timestamps unchanged.
insert into public.profiles (id, username, created_at)
select
  users.id,
  coalesce(
    nullif(btrim(users.raw_user_meta_data ->> 'username'), ''),
    nullif(btrim(users.raw_user_meta_data ->> 'full_name'), ''),
    'user_' || replace(users.id::text, '-', '')
  ),
  coalesce(users.created_at, now())
from auth.users as users
where not exists (
  select 1 from public.profiles as profiles where profiles.id = users.id
)
on conflict (id) do nothing;

commit;
