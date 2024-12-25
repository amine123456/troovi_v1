create table if not exists public.qr_codes (
    id bigint primary key generated always as identity,
    item_id bigint references public.items(id) on delete cascade,
    qr_code_data text not null,
    created_at timestamp with time zone default now()
);