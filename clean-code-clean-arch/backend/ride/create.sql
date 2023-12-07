drop schema clean_code_clean_arch;
create schema clean_code_clean_arch;

create table clean_code_clean_arch.passenger {
    passenger_id uuid primary key,
    name text,
    email text,
    document text
}