

create table users (
 id serial not null primary key,
 name varchar(50) not null unique,
 counter int not null
);

insert into users (name, counter) values ('luvuyo', 10);
insert into users (name, counter) values ('cobus', 60);
insert into users (name, counter) values ('johannes', 20);
