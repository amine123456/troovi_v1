create table if not exists public.locations (
    id bigint primary key generated always as identity,
    item_id bigint references public.items(id) on delete cascade,
    latitude double precision not null,
    longitude double precision not null,
    address text,
    created_at timestamp with time zone default now()
);