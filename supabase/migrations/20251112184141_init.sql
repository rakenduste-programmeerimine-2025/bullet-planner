
  create table "public"."categories" (
    "id" bigint generated always as identity not null,
    "title" text not null,
    "created_at" timestamp with time zone default now(),
    "planner_id" bigint not null
      );



  create table "public"."events" (
    "id" bigint generated always as identity not null,
    "title" text not null,
    "datetime" timestamp with time zone not null,
    "created_at" timestamp with time zone default now(),
    "category_id" bigint not null
      );



  create table "public"."notes" (
    "id" bigint generated always as identity not null,
    "title" text not null,
    "note" text not null,
    "created_at" timestamp with time zone default now(),
    "category_id" bigint not null
      );



  create table "public"."planners" (
    "id" bigint generated always as identity not null,
    "title" text not null,
    "b_color" text not null,
    "a_color" text not null,
    "font" text not null,
    "created_at" timestamp with time zone default now(),
    "user_id" bigint not null
      );



  create table "public"."tasks" (
    "id" bigint generated always as identity not null,
    "title" text not null,
    "task" text not null,
    "date" date not null,
    "created_at" timestamp with time zone default now(),
    "category_id" bigint not null
      );



  create table "public"."users" (
    "id" bigint generated always as identity not null,
    "email" text not null,
    "password" text not null,
    "created_at" timestamp with time zone default now()
      );


CREATE UNIQUE INDEX categories_pkey ON public.categories USING btree (id);

CREATE UNIQUE INDEX events_pkey ON public.events USING btree (id);

CREATE UNIQUE INDEX notes_pkey ON public.notes USING btree (id);

CREATE UNIQUE INDEX planners_pkey ON public.planners USING btree (id);

CREATE UNIQUE INDEX tasks_pkey ON public.tasks USING btree (id);

CREATE UNIQUE INDEX users_pkey ON public.users USING btree (id);

alter table "public"."categories" add constraint "categories_pkey" PRIMARY KEY using index "categories_pkey";

alter table "public"."events" add constraint "events_pkey" PRIMARY KEY using index "events_pkey";

alter table "public"."notes" add constraint "notes_pkey" PRIMARY KEY using index "notes_pkey";

alter table "public"."planners" add constraint "planners_pkey" PRIMARY KEY using index "planners_pkey";

alter table "public"."tasks" add constraint "tasks_pkey" PRIMARY KEY using index "tasks_pkey";

alter table "public"."users" add constraint "users_pkey" PRIMARY KEY using index "users_pkey";

alter table "public"."categories" add constraint "categories_planner_id_fkey" FOREIGN KEY (planner_id) REFERENCES public.planners(id) not valid;

alter table "public"."categories" validate constraint "categories_planner_id_fkey";

alter table "public"."events" add constraint "events_category_id_fkey" FOREIGN KEY (category_id) REFERENCES public.categories(id) not valid;

alter table "public"."events" validate constraint "events_category_id_fkey";

alter table "public"."notes" add constraint "notes_category_id_fkey" FOREIGN KEY (category_id) REFERENCES public.categories(id) not valid;

alter table "public"."notes" validate constraint "notes_category_id_fkey";

alter table "public"."planners" add constraint "planners_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public.users(id) not valid;

alter table "public"."planners" validate constraint "planners_user_id_fkey";

alter table "public"."tasks" add constraint "tasks_category_id_fkey" FOREIGN KEY (category_id) REFERENCES public.categories(id) not valid;

alter table "public"."tasks" validate constraint "tasks_category_id_fkey";

grant delete on table "public"."categories" to "anon";

grant insert on table "public"."categories" to "anon";

grant references on table "public"."categories" to "anon";

grant select on table "public"."categories" to "anon";

grant trigger on table "public"."categories" to "anon";

grant truncate on table "public"."categories" to "anon";

grant update on table "public"."categories" to "anon";

grant delete on table "public"."categories" to "authenticated";

grant insert on table "public"."categories" to "authenticated";

grant references on table "public"."categories" to "authenticated";

grant select on table "public"."categories" to "authenticated";

grant trigger on table "public"."categories" to "authenticated";

grant truncate on table "public"."categories" to "authenticated";

grant update on table "public"."categories" to "authenticated";

grant delete on table "public"."categories" to "postgres";

grant insert on table "public"."categories" to "postgres";

grant references on table "public"."categories" to "postgres";

grant select on table "public"."categories" to "postgres";

grant trigger on table "public"."categories" to "postgres";

grant truncate on table "public"."categories" to "postgres";

grant update on table "public"."categories" to "postgres";

grant delete on table "public"."categories" to "service_role";

grant insert on table "public"."categories" to "service_role";

grant references on table "public"."categories" to "service_role";

grant select on table "public"."categories" to "service_role";

grant trigger on table "public"."categories" to "service_role";

grant truncate on table "public"."categories" to "service_role";

grant update on table "public"."categories" to "service_role";

grant delete on table "public"."events" to "anon";

grant insert on table "public"."events" to "anon";

grant references on table "public"."events" to "anon";

grant select on table "public"."events" to "anon";

grant trigger on table "public"."events" to "anon";

grant truncate on table "public"."events" to "anon";

grant update on table "public"."events" to "anon";

grant delete on table "public"."events" to "authenticated";

grant insert on table "public"."events" to "authenticated";

grant references on table "public"."events" to "authenticated";

grant select on table "public"."events" to "authenticated";

grant trigger on table "public"."events" to "authenticated";

grant truncate on table "public"."events" to "authenticated";

grant update on table "public"."events" to "authenticated";

grant delete on table "public"."events" to "postgres";

grant insert on table "public"."events" to "postgres";

grant references on table "public"."events" to "postgres";

grant select on table "public"."events" to "postgres";

grant trigger on table "public"."events" to "postgres";

grant truncate on table "public"."events" to "postgres";

grant update on table "public"."events" to "postgres";

grant delete on table "public"."events" to "service_role";

grant insert on table "public"."events" to "service_role";

grant references on table "public"."events" to "service_role";

grant select on table "public"."events" to "service_role";

grant trigger on table "public"."events" to "service_role";

grant truncate on table "public"."events" to "service_role";

grant update on table "public"."events" to "service_role";

grant delete on table "public"."notes" to "anon";

grant insert on table "public"."notes" to "anon";

grant references on table "public"."notes" to "anon";

grant select on table "public"."notes" to "anon";

grant trigger on table "public"."notes" to "anon";

grant truncate on table "public"."notes" to "anon";

grant update on table "public"."notes" to "anon";

grant delete on table "public"."notes" to "authenticated";

grant insert on table "public"."notes" to "authenticated";

grant references on table "public"."notes" to "authenticated";

grant select on table "public"."notes" to "authenticated";

grant trigger on table "public"."notes" to "authenticated";

grant truncate on table "public"."notes" to "authenticated";

grant update on table "public"."notes" to "authenticated";

grant delete on table "public"."notes" to "postgres";

grant insert on table "public"."notes" to "postgres";

grant references on table "public"."notes" to "postgres";

grant select on table "public"."notes" to "postgres";

grant trigger on table "public"."notes" to "postgres";

grant truncate on table "public"."notes" to "postgres";

grant update on table "public"."notes" to "postgres";

grant delete on table "public"."notes" to "service_role";

grant insert on table "public"."notes" to "service_role";

grant references on table "public"."notes" to "service_role";

grant select on table "public"."notes" to "service_role";

grant trigger on table "public"."notes" to "service_role";

grant truncate on table "public"."notes" to "service_role";

grant update on table "public"."notes" to "service_role";

grant delete on table "public"."planners" to "anon";

grant insert on table "public"."planners" to "anon";

grant references on table "public"."planners" to "anon";

grant select on table "public"."planners" to "anon";

grant trigger on table "public"."planners" to "anon";

grant truncate on table "public"."planners" to "anon";

grant update on table "public"."planners" to "anon";

grant delete on table "public"."planners" to "authenticated";

grant insert on table "public"."planners" to "authenticated";

grant references on table "public"."planners" to "authenticated";

grant select on table "public"."planners" to "authenticated";

grant trigger on table "public"."planners" to "authenticated";

grant truncate on table "public"."planners" to "authenticated";

grant update on table "public"."planners" to "authenticated";

grant delete on table "public"."planners" to "postgres";

grant insert on table "public"."planners" to "postgres";

grant references on table "public"."planners" to "postgres";

grant select on table "public"."planners" to "postgres";

grant trigger on table "public"."planners" to "postgres";

grant truncate on table "public"."planners" to "postgres";

grant update on table "public"."planners" to "postgres";

grant delete on table "public"."planners" to "service_role";

grant insert on table "public"."planners" to "service_role";

grant references on table "public"."planners" to "service_role";

grant select on table "public"."planners" to "service_role";

grant trigger on table "public"."planners" to "service_role";

grant truncate on table "public"."planners" to "service_role";

grant update on table "public"."planners" to "service_role";

grant delete on table "public"."tasks" to "anon";

grant insert on table "public"."tasks" to "anon";

grant references on table "public"."tasks" to "anon";

grant select on table "public"."tasks" to "anon";

grant trigger on table "public"."tasks" to "anon";

grant truncate on table "public"."tasks" to "anon";

grant update on table "public"."tasks" to "anon";

grant delete on table "public"."tasks" to "authenticated";

grant insert on table "public"."tasks" to "authenticated";

grant references on table "public"."tasks" to "authenticated";

grant select on table "public"."tasks" to "authenticated";

grant trigger on table "public"."tasks" to "authenticated";

grant truncate on table "public"."tasks" to "authenticated";

grant update on table "public"."tasks" to "authenticated";

grant delete on table "public"."tasks" to "postgres";

grant insert on table "public"."tasks" to "postgres";

grant references on table "public"."tasks" to "postgres";

grant select on table "public"."tasks" to "postgres";

grant trigger on table "public"."tasks" to "postgres";

grant truncate on table "public"."tasks" to "postgres";

grant update on table "public"."tasks" to "postgres";

grant delete on table "public"."tasks" to "service_role";

grant insert on table "public"."tasks" to "service_role";

grant references on table "public"."tasks" to "service_role";

grant select on table "public"."tasks" to "service_role";

grant trigger on table "public"."tasks" to "service_role";

grant truncate on table "public"."tasks" to "service_role";

grant update on table "public"."tasks" to "service_role";

grant delete on table "public"."users" to "anon";

grant insert on table "public"."users" to "anon";

grant references on table "public"."users" to "anon";

grant select on table "public"."users" to "anon";

grant trigger on table "public"."users" to "anon";

grant truncate on table "public"."users" to "anon";

grant update on table "public"."users" to "anon";

grant delete on table "public"."users" to "authenticated";

grant insert on table "public"."users" to "authenticated";

grant references on table "public"."users" to "authenticated";

grant select on table "public"."users" to "authenticated";

grant trigger on table "public"."users" to "authenticated";

grant truncate on table "public"."users" to "authenticated";

grant update on table "public"."users" to "authenticated";

grant delete on table "public"."users" to "postgres";

grant insert on table "public"."users" to "postgres";

grant references on table "public"."users" to "postgres";

grant select on table "public"."users" to "postgres";

grant trigger on table "public"."users" to "postgres";

grant truncate on table "public"."users" to "postgres";

grant update on table "public"."users" to "postgres";

grant delete on table "public"."users" to "service_role";

grant insert on table "public"."users" to "service_role";

grant references on table "public"."users" to "service_role";

grant select on table "public"."users" to "service_role";

grant trigger on table "public"."users" to "service_role";

grant truncate on table "public"."users" to "service_role";

grant update on table "public"."users" to "service_role";


