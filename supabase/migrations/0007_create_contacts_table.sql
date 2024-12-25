create table if not exists public.contacts (
    id bigint primary key generated always as identity,
    user_id bigint references public.users(id) on delete cascade,
    phone_number text,
    address text,
    created_at timestamp with time zone default now()
);