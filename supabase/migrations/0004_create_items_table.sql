create table if not exists public.items (
    id bigint primary key generated always as identity,
    user_id bigint references public.users(id) on delete cascade,
    name text not null,
    description text,
    created_at timestamp with time zone default now()
);