# NestJS

NestJS est un framework pour NodeJS permettant de créer des backend complets, évolutifs et scalables.

Il est conçu sur unearchitecture stricte, standardisée et opiniatrée, qui permet de concevoir du code de qualité, maintenable et couvrant tous les besoin que peut avoir une application backend.

> [!NOTE]
> La documentation officielle est bien évidemment la référence, cette page n’a pour but que de présenter les concepts principaux du framework.
>
> [https://docs.nestjs.com/](https://docs.nestjs.com/)

# Specificités

Nest a été conçu sur le principe de l'inversion de contrôle (IoC), qui est un concept de programmation orientée objet.

Il fonctionne selon le principe que le flot d'exécution d'un logiciel n'est plus sous le contrôle direct de l'application elle-même mais du framework ou de la couche logicielle sous-jacente.

Contrairement à la programmation procedurale, ou le developpeur produit du code qui utilisera des librairies tierces, en IoC ce sera le framework qui utilisera le code produit par le developpeur.

https://en.wikipedia.org/wiki/Inversion_of_control

## Découpage

NestJS a une découpe stricte de l'application. Chaque partie à son propre rôle, et se trouve dans un dossier spécifique avec un nom specifique.

Pour chacune de ces parties que nous verrons par la suite, un comportement specifique sera automatiquement appliqué à ceux-ci, et ce comportement pourra être personnalisé via des décorateurs.

## Decorateurs

Les décorateurs, assez peu utilisés generalement en Javascript, sont un concept très puissant de NestJS, et sont le principal moyen d'exploiter les fonctionnalités du framework.

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

Nest est fourni avec un outil en ligne de commande très pratique pour developper une application, notamment pour générer des composants.

```bash
# installer la cli
npm i -g @nestjs/cli

# Creer un nouveau projet
nest new my-project

# Generer une nouvelle resource
# (genere module, controller, service, routes, dtos)
nest g resource cats

# Generer des composants
nest g module cats
nest g controller cats
nest g service cats

# Afficher les commandes disponibles
nest g -h
```

# Resources

- [Doc officielle](https://docs.nestjs.com/)
- [Projet d'exemple](https://github.com/opac-teach/nest-demo)
- [Awesome Nest / Boilerplates d'exemples](https://github.com/nestjs/awesome-nestjs?tab=readme-ov-file#boilerplate)
