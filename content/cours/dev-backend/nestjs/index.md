# NestJS

NestJS est un framework de développement backend pour NodeJS permettant de créer des applications complètes, évolutives et performantes.

Il repose sur une architecture stricte, standardisée et opiniâtre, facilitant la conception de code de qualité et maintenable qui répond efficacement à tous les besoins d'une application backend moderne.

> [!NOTE]
> La documentation officielle reste la référence principale. Cette page a pour objectif de présenter uniquement les concepts fondamentaux du framework.
>
> [https://docs.nestjs.com/](https://docs.nestjs.com/)

# Spécificités

Nest est fondé sur le principe de l'inversion de contrôle (IoC), un concept fondamental en programmation orientée objet.

Ce principe stipule que le flux d'exécution d'un logiciel n'est plus directement contrôlé par l'application elle-même, mais par le framework ou la couche logicielle sous-jacente.

Contrairement à la programmation procédurale traditionnelle où le développeur écrit du code qui utilise des bibliothèques tierces, dans l'IoC, c'est le framework qui utilise le code produit par le développeur.

https://en.wikipedia.org/wiki/Inversion_of_control

## Découpage

NestJS impose une structure claire à l'application. Chaque composant a un rôle spécifique et se trouve dans un répertoire dédié avec une nomenclature précise.

Pour chacun des composants que nous aborderons par la suite, NestJS applique automatiquement un comportement spécifique, qui peut être personnalisé à l'aide de décorateurs.

## Décorateurs

Les décorateurs, bien que relativement peu utilisés en JavaScript standard, constituent un élément central dans NestJS. Ils représentent le principal moyen d'exploiter les fonctionnalités avancées du framework.

### Exemples de décorateurs

```tsx
// Déclaration d'un module
@Module({
  controllers: [CatsController],
  providers: [CatsService],
})

// Injection de dépendances
constructor(
  @InjectRepository(CatEntity)
  private readonly catRepository: Repository<CatEntity>
) {}

// Description d'une route
@ApiResponse({ status: 200, description: 'Returns a cat' })
@Get("/:id")
findOne(@Param('id') id: string): Promise<CatResponseDto> {
  return this.catService.findOne(id, true);
}

// Validation d'un objet
export class CatDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsUUID()
  breedId: string;
}
```

# CLI

https://docs.nestjs.com/cli/overview

NestJS est fourni avec un outil en ligne de commande puissant qui facilite le développement d'applications, notamment grâce à la génération automatique de composants.

```bash
# Installer la CLI
npm i -g @nestjs/cli

# Créer un nouveau projet
nest new my-project

# Générer une nouvelle ressource complète
# (génère module, controller, service, routes, DTOs)
nest g resource cats

# Générer des composants individuels
nest g module cats
nest g controller cats
nest g service cats

# Afficher les commandes disponibles
nest g -h
```

# Ressources

- [Documentation officielle](https://docs.nestjs.com/)
- [Projet d'exemple](https://github.com/opac-teach/nest-demo)
- [Awesome Nest / Exemples de boilerplates](https://github.com/nestjs/awesome-nestjs?tab=readme-ov-file#boilerplate)
