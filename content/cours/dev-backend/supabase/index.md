# Supabase

https://supabase.com/

## Introduction

Supabase aide à la création de backend et fourni un ensemble de fonctionnalités qui permettent de développer des applications très rapidement, avec très peu de code.

Ses fonctionnalités principales sont:

- Base de données exploitant PostgreSQL a son plein potentiel
  - Row Level Security (permissions CRUD)
  - Fonctions et Triggers
  - Gestion des migrations
- Authentification
- Stockage de fichiers
- Temps réel
- Edge Functions

## Getting started

### Frontend

- Creer un nouveau projet frontend en NextJS avec la commande:

`npx create-next-app -e with-supabase`
- Modifier le fichier `.env` pour inserer les informations de connexions à la base de données (voir le retour de la commande `supabase start`, API URL & ANON KEY)

### Backend

- Suivre la [procédure d'installation](https://supabase.com/docs/guides/local-development/cli/getting-started?queryGroups=access-method&access-method=studio) de la CLI
- Initialiser le projet supabase avec la commande `supabase init` et le démarrer avec `supabase start`
- Acceder au studio à l'addresse http://127.0.0.1:54323/

##

# Exercices

## Tables

::: warning
Toujours utiliser des uuid pour les id des tables
:::

- Créer une table `genres` avec les champs `id`, `name`
- Créér une table `songs` avec les champs `id`, `name`, `genre_id` (foreign key)

## Policies

https://supabase.com/docs/guides/database/postgres/row-level-security

Créer des policies pour les tables `genres` et `songs` afin que:
- Tout le monde puisse lire les genres et les chansons
- Un utilisateur connecté puisse créer une chanson
- Un utilisateur connecté puisse créer un genre

## Migrations

Créer une migration pour prendre en compte les nouvelles tables et policies.

`supabase db diff -f "nom-de-la-migration"`

> Cet outil compare la base de données actuelle avec une "shadow database", qui est créée a partir des migrations présentes dans le projet.

Il est recommandé de creer une migration pour chaque feature. 

Si des modifications sont faites sur d'autres schema que `public` (`auth` ou `storage`), il faut rajouter l'option `--schema nom-du-schema`

## NextJS

Pour les exercices suivants, vous pourrez commencer par utiliser la meme methode sur toutes les pages (par ex. tout en server component avec un client supabase), puis tester les differentes méthodes de data fetching dans un second temps. 

Vous pourrez réutiliser une partie du code déjà écrit pour les exercices GraphQL. 

Doc Supabase:
- https://supabase.com/docs/reference/javascript/select
- https://supabase.com/docs/reference/javascript/update
- https://supabase.com/docs/guides/graphql

Doc URQL:
- https://nearform.com/open-source/urql/docs/basics/react-preact/
- https://nearform.com/open-source/urql/docs/advanced/server-side-rendering/#nextjs

### Genres

Creer la page `/genres` qui affichera tous les genres et permettra de créer un nouveau genre.

Cette page doit être un "client component" et doit utiliser la librairie `supabase` pour récuperer et creer les genres. 

### Genre

Creer la page `/genres/[id]` qui affichera un genre.

Cette page doit être un "server component" et doit utiliser la librairie `supabase` pour récuperer le genre coté serveur. 

Afficher toutes les chansons appartenant à ce genre sur cette page. 

### Songs

Creer la page `/songs` qui affichera toutes les chansons et permettra de créer une nouvelle chanson via GraphQL.

Cette page doit être un "client component" et doit utiliser la librairie `urql` pour récuperer et créer les chansons.

### Song

Creer la page `/songs/[id]` qui affichera une chanson.

Cette page doit être un "server component" et doit utiliser la librairie `urql` pour récuperer la chanson coté serveur. 


## Profiles


### Triggers

Supabase gère l'authentification, et les utilisateur sont stockés dans la table `auth.users`, en revanche il n'est pas possible d'y ajouter des informations de profil personnalisés. Pour cela, il faudra créer notre propre table qui contiendra les informations dont on aura besoin, et la lier à la table `auth.users` avec une foreign key pour identifier l'utilisateur.

Si besoin, vous pouvez consulter le guide suivant: https://supabase.com/docs/guides/auth/managing-user-data

- Créer une table `profiles` avec les champs `id`, `name`
- Le champ `id` doit être de type uuid, supprimer la valeur par défault
- Ajouter une foreign key de `id` sur la table `auth.users` (cascade delete)
- Dans l'éditeur SQL, executer cette requete:

```sql
-- inserts a row into public.profiles
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, name)
  values (new.id, new.raw_user_meta_data ->> 'name');
  return new;
end;
$$;

-- trigger the function every time a user is created
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
```

Cette requete permet de créer une fonction qui sera exécutée à chaque fois qu'un utilisateur est créé, et qui insèrera les informations de profil dans la table `profiles`. Les informations de profil (ici `name`) devront être envoyé sous forme de metadata lors du signup.


- Modifier le formulaire de signup pour ajouter le champ `name` et l'envoyer en metadata dans la server action `signUpAction`

### Row Level Security

- Ajouter un champ `owner_id` de type uuid à la table `songs` qui référence la table `profiles`. Comme valeur par défault, assigner `auth.uid()`
- Créer une nouvelle policy pour permettre aux utilisateurs de modifier uniquement leurs propres chansons
- Modifier la policy d'insert de chansons, verifier que les user_id correspondent
- Sur la page `/songs/[id]`, ajouter un formulaire pour modifier une chanson. 

## Images

Ajouter la possibilité de joindre une image à une chanson. 

Utiliser le storage de supabase pour stocker les images.

https://supabase.com/docs/guides/storage/quickstart

- Ajouter un champ `image_id` de type uuid à la table `songs`
- Creer un bucket public pour les images
- Creer des policies sur le storage pour autoriser les utilsiateurs connectés à inserer des objets et à supprimer ceux dont ils sont propriétaires
- Ajouter un champ de type `file` au formulaire. Lors de la création, d'abord uploader l'image en lui attribuant un `id`, puis inserer la nouvelle chanson avec cet `image_id`
- Afficher l'image sur la page `/songs/[id]` 
```ts
supabase.storage.from(bucket_name).getPublicUrl(image_id).data.publicUrl
```

## Realtime

Activer le realtime et créer une nouvelle page qui afficher toutes les chansons et mis a jour en temps réél dès qu'il ya des changements en base de données.

https://supabase.com/docs/guides/realtime/postgres-changes

- Activer la réplication sur la table `songs` depuis le dashboard Database > Publications
- Creer la page react et utiliser le subscribe de supabase: 

```ts
supabase
      .channel("schema-db-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "tableName",
        },
        (payload) => {
          if (payload.eventType === "UPDATE") {
            ...
          }
        }
      )
      .subscribe();
```

## Edge Functions

Créer une edge function qui permettra de supprimer tout le contenu créé par un utilisateur (songs et images)

https://supabase.com/docs/guides/functions/quickstart

- Stopper le serveur supabase avec `supabase stop`
- Creer une function avec `supabase functions new cleanup-user`
- Redémarrer le serveur supabase avec `supabase start`
- Lancer le watcher sur les fonctions avec `supabase functions serve`
- Creer des policies pour que les utilisateurs puissent supprimer leurs propres images et chansons
- Creer la fonction qui supprimera les données (songs & images) ([voir ici](https://supabase.com/docs/guides/functions/auth) pour l'authentification)
- Ajouter un bouton sur le frontend qui appelera la fonction ([voir ici](https://supabase.com/docs/reference/javascript/functions-invoke))
- Automatiquement trigger la fonction lors de la suppression d'un utilisateur via un [webhook](https://supabase.com/docs/guides/database/webhooks) 