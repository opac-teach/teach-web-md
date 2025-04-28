# GraphQL dans NestJS

NestJS propose nativement la création d'API GraphQL tout en beneficiant de la puissance du framework pour construire des resolvers avancés.

https://docs.nestjs.com/graphql/quick-start

## Code/Schema first

Lors de l'utilisation de GraphQL au sein de NestJS, vous devrez choisir parmi deux approches:

### Schema first

Dans cette approche, vous créez d'abord votre schéma GraphQL, et NestJS génerera les types Typescript que vous devrez suivre dans vos resolvers.

### Code first

Dans cette approche, vous créez votre schema en tapant uniquement du code Typescript. Les types seront définis par des classes annotées et les resolvers serviront pour la définition des requêtes.

NestJS génèrera alors automatiquement le schema GraphQL.

> Nous étudierons l'approche code-first dans la suite du cours

## Définition du schema

Les types sont définis en tant que classes, et les décorateurs servent pour indiquer les modificateurs. On pourra créer des classes à part uniquement pour GraphQL (èntity.model.ts`) ou bien réutiliser les DTO existants pour le REST.

### Modèles

Les types de données renvoyées par l'API sont définis avec `@ObjectType()`.

Chaque champ doit etre annoté avec `@Field()`.

Le type `String` est par défaut, il n'est donc pas necessaire de le preciser dans `Field`.

```typescript
import { Field, ID, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
class User {
  @Field(() => ID)
  id: string;

  @Field(() => Int)
  age: number;

  @Field({ nullable: true })
  name?: string;
}
```

### Inputs

Les types envoyés à l'API `input` doivent être annotés avec `@InputType()`.

```typescript
@InputType()
class UserInput {
  @Field()
  name: string;
}
```

## Resolvers

Les resolvers sont l'équivalent des controllers pour GraphQL. Ils sont définis avec `@Resolver()`.

- Les queries sont définies avec `@Query()`.

- Les mutations sont définies avec `@Mutation()`.

- Les resolvers chainés sont définies avec `@ResolveField()`.

On peut récupérér les arguments, le parent et le contexte de la requete avec `@Args()`, `@Parent()` et `@Context()`.

```typescript
@Resolver(() => Cat)
export class CatResolver {
  constructor(
    private catService: CatService,
    private breedService: BreedService
  ) {}

  @Query(() => [Cat])
  async cats(): Promise<Cat[]> {
    return this.catService.findAll({ includeBreed: true });
  }

  @Query(() => Cat)
  async cat(@Args("id") id: string): Promise<Cat> {
    const cat = await this.catService.findOne(id, true);
    return new CatResponseDto(cat);
  }

  @ResolveField(() => Breed)
  breed(@Parent() cat: Cat): Promise<Breed> {
    return this.breedService.findOne(cat.breedId);
  }

  @Mutation(() => Cat)
  async createCat(@Args("cat") cat: CreateCatInput): Promise<Cat> {
    return this.catService.create(cat);
  }
}
```

## En pratique

Vous pouvez retrouver un exemple de projet NestJS avec GraphQL sur [le projet demo](https://github.com/opac-teach/nest-demo/tree/graphql).
