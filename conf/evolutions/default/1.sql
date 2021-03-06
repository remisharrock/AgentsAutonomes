# --- Created by Ebean DDL
# To stop Ebean DDL generation, remove this comment and start using Evolutions

# --- !Ups

create table action (
  id                        bigint not null,
  name                      varchar(255),
  description               varchar(255),
  field_name                varchar(255),
  channel_id                bigint,
  constraint pk_action primary key (id))
;

create table admin_log (
  id                        bigint not null,
  recipe_name               varchar(255),
  trigger_channel_name      varchar(255),
  trigger_message           varchar(255),
  state_of_trigger_actor    varchar(255),
  action_channel_name       varchar(255),
  action_message            varchar(255),
  state_of_action_actor     varchar(255),
  user_id                   bigint,
  user_group                varchar(255),
  date                      timestamp,
  constraint pk_admin_log primary key (id))
;

create table channel (
  id                        bigint not null,
  name                      varchar(255),
  description               varchar(255),
  logo                      varchar(255),
  constraint pk_channel primary key (id))
;

create table field (
  id                        bigint not null,
  name                      varchar(255),
  value                     varchar(255),
  constraint pk_field primary key (id))
;

create table log (
  id                        bigint not null,
  log_info                  varchar(255),
  done_at                   timestamp,
  recipe_id                 bigint,
  constraint pk_log primary key (id))
;

create table recipe (
  id                        bigint not null,
  title                     varchar(255),
  active                    boolean,
  trigger_channel_id        bigint,
  trigger_id                bigint,
  trigger_field_id          bigint,
  action_channel_id         bigint,
  action_id                 bigint,
  action_field_id           bigint,
  user_id                   bigint,
  constraint pk_recipe primary key (id))
;

create table trigger (
  id                        bigint not null,
  name                      varchar(255),
  description               varchar(255),
  channel_id                bigint,
  field_name                varchar(255),
  constraint pk_trigger primary key (id))
;

create table user (
  id                        bigint not null,
  username                  varchar(255),
  password                  varchar(255),
  role                      varchar(255),
  user_group                varchar(255),
  constraint pk_user primary key (id))
;

create sequence action_seq;

create sequence admin_log_seq;

create sequence channel_seq;

create sequence field_seq;

create sequence log_seq;

create sequence recipe_seq;

create sequence trigger_seq;

create sequence user_seq;

alter table action add constraint fk_action_channel_1 foreign key (channel_id) references channel (id) on delete restrict on update restrict;
create index ix_action_channel_1 on action (channel_id);
alter table admin_log add constraint fk_admin_log_user_2 foreign key (user_id) references user (id) on delete restrict on update restrict;
create index ix_admin_log_user_2 on admin_log (user_id);
alter table log add constraint fk_log_recipe_3 foreign key (recipe_id) references recipe (id) on delete restrict on update restrict;
create index ix_log_recipe_3 on log (recipe_id);
alter table recipe add constraint fk_recipe_triggerChannel_4 foreign key (trigger_channel_id) references channel (id) on delete restrict on update restrict;
create index ix_recipe_triggerChannel_4 on recipe (trigger_channel_id);
alter table recipe add constraint fk_recipe_trigger_5 foreign key (trigger_id) references trigger (id) on delete restrict on update restrict;
create index ix_recipe_trigger_5 on recipe (trigger_id);
alter table recipe add constraint fk_recipe_triggerField_6 foreign key (trigger_field_id) references field (id) on delete restrict on update restrict;
create index ix_recipe_triggerField_6 on recipe (trigger_field_id);
alter table recipe add constraint fk_recipe_actionChannel_7 foreign key (action_channel_id) references channel (id) on delete restrict on update restrict;
create index ix_recipe_actionChannel_7 on recipe (action_channel_id);
alter table recipe add constraint fk_recipe_action_8 foreign key (action_id) references action (id) on delete restrict on update restrict;
create index ix_recipe_action_8 on recipe (action_id);
alter table recipe add constraint fk_recipe_actionField_9 foreign key (action_field_id) references field (id) on delete restrict on update restrict;
create index ix_recipe_actionField_9 on recipe (action_field_id);
alter table recipe add constraint fk_recipe_user_10 foreign key (user_id) references user (id) on delete restrict on update restrict;
create index ix_recipe_user_10 on recipe (user_id);
alter table trigger add constraint fk_trigger_channel_11 foreign key (channel_id) references channel (id) on delete restrict on update restrict;
create index ix_trigger_channel_11 on trigger (channel_id);



# --- !Downs

SET REFERENTIAL_INTEGRITY FALSE;

drop table if exists action;

drop table if exists admin_log;

drop table if exists channel;

drop table if exists field;

drop table if exists log;

drop table if exists recipe;

drop table if exists trigger;

drop table if exists user;

SET REFERENTIAL_INTEGRITY TRUE;

drop sequence if exists action_seq;

drop sequence if exists admin_log_seq;

drop sequence if exists channel_seq;

drop sequence if exists field_seq;

drop sequence if exists log_seq;

drop sequence if exists recipe_seq;

drop sequence if exists trigger_seq;

drop sequence if exists user_seq;

