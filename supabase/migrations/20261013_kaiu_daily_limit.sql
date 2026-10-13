-- Kaiu AI: cuota diaria atómica por usuario autenticado; NO almacena preguntas.
create table if not exists public.kaiu_ai_usage (
 user_id uuid not null references auth.users(id) on delete cascade,
 usage_day date not null default (now() at time zone 'UTC')::date,
 request_count integer not null default 0 check (request_count between 0 and 20),
 primary key(user_id,usage_day)
);
alter table public.kaiu_ai_usage enable row level security;
revoke all on table public.kaiu_ai_usage from public,anon,authenticated;
create or replace function public.kaiu_ai_consume(max_per_day integer default 20)
returns boolean language plpgsql security definer set search_path = public,pg_temp
as $$
declare u uuid := auth.uid(); n integer;
begin
 if u is null then return false; end if;
 -- Never let callers increase quota; keep DB and provider costs bounded.
 insert into public.kaiu_ai_usage(user_id,usage_day,request_count)
 values(u,(now() at time zone 'UTC')::date,1)
 on conflict(user_id,usage_day) do update set request_count=public.kaiu_ai_usage.request_count+1
 where public.kaiu_ai_usage.request_count < least(20,greatest(1,max_per_day))
 returning request_count into n;
 return n is not null;
end; $$;
revoke all on function public.kaiu_ai_consume(integer) from public,anon;
grant execute on function public.kaiu_ai_consume(integer) to authenticated;
