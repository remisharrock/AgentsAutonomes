# --- Created by Ebean DDL
# To stop Ebean DDL generation, remove this comment and start using Evolutions

# --- !Ups

create table action (
  id                        bigint not null,
  name                      varchar(255),
  description               varchar(255),
  channel_id                bigint,
  constraint pk_action primary key (id))
;

create table channel (
  id                        bigint not null,
  name                      varchar(255),
  description               varchar(255),
  constraint pk_channel primary key (id))
;

create table field (
  id                        bigint not null,
  name                      varchar(255),
  description               varchar(255),
  trigger_id                bigint,
  action_id                 bigint,
  constraint pk_field primary key (id))
;

create table recipe (
  id                        bigint not null,
  title                     varchar(255),
  active                    boolean,
  user_id                   bigint,
  constraint pk_recipe primary key (id))
;

create table trigger (
  id                        bigint not null,
  name                      varchar(255),
  description               varchar(255),
  channel_id                bigint,
  constraint pk_trigger primary key (id))
;

create table user (
  id                        bigint not null,
  username                  varchar(255),
  password                  varchar(255),
  role                      varchar(255),
  category                  varchar(255),
  constraint pk_user primary key (id))
;

create sequence action_seq;

create sequence channel_seq;

create sequence field_seq;

create sequence recipe_seq;

create sequence trigger_seq;

create sequence user_seq;

alter table action add constraint fk_action_channel_1 foreign key (channel_id) references channel (id) on delete restrict on update restrict;
create index ix_action_channel_1 on action (channel_id);
alter table field add constraint fk_field_trigger_2 foreign key (trigger_id) references trigger (id) on delete restrict on update restrict;
create index ix_field_trigger_2 on field (trigger_id);
alter table field add constraint fk_field_action_3 foreign key (action_id) references action (id) on delete restrict on update restrict;
create index ix_field_action_3 on field (action_id);
alter table recipe add constraint fk_recipe_user_4 foreign key (user_id) references user (id) on delete restrict on update restrict;
create index ix_recipe_user_4 on recipe (user_id);
alter table trigger add constraint fk_trigger_channel_5 foreign key (channel_id) references channel (id) on delete restrict on update restrict;
create index ix_trigger_channel_5 on trigger (channel_id);



# --- !Downs

SET REFERENTIAL_INTEGRITY FALSE;

drop table if exists action;

drop table if exists channel;

drop table if exists field;

drop table if exists recipe;

drop table if exists trigger;

drop table if exists user;

SET REFERENTIAL_INTEGRITY TRUE;

drop sequence if exists action_seq;

drop sequence if exists channel_seq;

drop sequence if exists field_seq;

drop sequence if exists recipe_seq;

drop sequence if exists trigger_seq;

drop sequence if exists user_seq;

