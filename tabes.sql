

create table users (
 id serial not null primary key,
 name varchar(50) not null unique,
 counter int not null
);

insert into users (name, counter) values ('Luvuyo', 10);
insert into users (name, counter) values ('Cobus', 60);
insert into users (name, counter) values ('Johannes', 20);
