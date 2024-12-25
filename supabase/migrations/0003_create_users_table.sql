create table if not exists public.users (
    id bigint primary key generated always as identity,
    username text unique not null,
    email text unique not null,
    password_hash text not null,
    created_at timestamp with time zone default now()
);