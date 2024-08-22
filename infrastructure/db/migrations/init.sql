CREATE SCHEMA IF NOT EXISTS giphy COLLATE utf8mb4_unicode_ci;

create table if not exists giphy.users
(
    id         int unsigned auto_increment
        primary key,
    email      varchar(255)                        not null,
    password   varchar(64)                         not null,
    created_at timestamp default CURRENT_TIMESTAMP null,
    updated_at timestamp default CURRENT_TIMESTAMP null on update CURRENT_TIMESTAMP,
    constraint uq_user_email
        unique (email)
);

create table if not exists giphy.gifs
(
    id          int unsigned auto_increment
        primary key,
    provider    enum ('giphy') not null,
    external_id varchar(255)   not null,
    url         varchar(255)   not null,
    price       decimal(10, 2) not null,
    constraint uq_provider_external_id
        unique (provider, external_id)
);

create table if not exists giphy.transactions
(
    id          int unsigned auto_increment
        primary key,
    provider    enum ('mock')                      not null,
    external_id varchar(255)                       not null,
    user_id     int unsigned                       not null,
    amount      decimal(10, 2)                     not null,
    status      enum ('pending', 'completed')      not null,
    type        enum ('gif')                       not null,
    created_at  datetime default CURRENT_TIMESTAMP null,
    updated_at  datetime default CURRENT_TIMESTAMP null on update CURRENT_TIMESTAMP,
    data        json                               null,
    constraint uq_provider_external_id
        unique (provider, external_id),
    constraint fk_user_id
        foreign key (user_id) references users (id)
);

create table if not exists giphy.user_gifs
(
    id             int unsigned auto_increment
        primary key,
    user_id        int unsigned not null,
    gif_id         int unsigned not null,
    transaction_id int unsigned not null,
    constraint fk_gif
        foreign key (gif_id) references gifs (id),
    constraint fk_transaction
        foreign key (transaction_id) references transactions (id),
    constraint fk_user
        foreign key (user_id) references users (id)
);