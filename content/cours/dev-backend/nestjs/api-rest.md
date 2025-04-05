# API REST

L'une des fonctionnalités principales de NestJS est la création d'API REST robustes, complètes et évolutives.

## Contrôleurs

https://docs.nestjs.com/controllers

Les **Contrôleurs** sont les composants qui définissent les routes et traitent les requêtes entrantes.

```ts
@Controller("cat") // définit la route de base '/cat'
export class CatController {
  constructor(private catService: CatService) {}

  @Get("/") // GET '/cat'
  findAll(): Promise<CatResponseDto[]> {
    return this.catService.findAll({ includeBreed: true });
  }

  @Get(":id") // GET '/cat/:id'
  findOne(@Param("id") id: string): Promise<CatResponseDto> {
    return this.catService.findOne(id, true);
  }

  @Post() // POST '/cat'
  create(@Body() cat: CreateCatDto): Promise<CatResponseDto> {
    return this.catService.create(cat);
  }

  @Put(":id") // PUT '/cat/:id'
  async update(
    @Param("id") id: string,
    @Body() cat: UpdateCatDto
  ): Promise<CatResponseDto> {
    return this.catService.update(id, cat);
  }
}
```

## DTOs (Data Transfer Objects)

Les DTOs définissent la structure des données échangées par l'API, tant pour les requêtes entrantes que pour les réponses.

Ils sont distincts des modèles de base de données et se concentrent uniquement sur les données nécessaires aux échanges avec le client.

[class-transformer](https://github.com/typestack/class-transformer): Utilisé pour la sérialisation et désérialisation des données, c'est-à-dire la transformation entre objets JSON et instances de classes.

[class-validator](https://github.com/typestack/class-validator): Permet de définir et valider les types et contraintes des propriétés d'une classe.

```ts
// cat.dto.ts
import { Expose, Exclude } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

class CreateCatDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsOptional()
  age?: number;
}

@Exclude()
class CatResponseDto {
  @Expose()
  id: string;

  @Expose()
  name: string;
}
```

### Validation des données entrantes

https://docs.nestjs.com/techniques/validation

Une fois les DTOs définis et utilisés dans les contrôleurs, nous pouvons valider automatiquement les données entrantes grâce à un pipe de validation.

```ts
app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true, // supprime les propriétés non définies dans le DTO
    transform: true, // convertit les valeurs entrantes aux types appropriés
  })
);
```

### Sérialisation des données sortantes

https://docs.nestjs.com/techniques/serialization

Pour contrôler le format des données renvoyées par l'API, nous pouvons utiliser un intercepteur de sérialisation.

```ts
app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
```

## Exceptions

https://docs.nestjs.com/exception-filters

À tout moment dans l'application, il est possible d'interrompre le traitement d'une requête et de renvoyer une erreur en lançant une exception.

```tsx
throw new HttpException("Forbidden", HttpStatus.FORBIDDEN);
throw new ForbiddenException();
```

## OpenAPI / Swagger

https://docs.nestjs.com/openapi/introduction

Toute API professionnelle doit fournir une documentation complète, et la norme actuelle est OpenAPI.

NestJS intègre nativement la génération de documentation OpenAPI via la bibliothèque Swagger. Il suffit d'annoter les contrôleurs et les DTOs avec des décorateurs spécifiques pour décrire les routes et les structures de données.

```ts
// cat.controller.ts
class CatController {
  @ApiOperation({ summary: "Find all cats" })
  @ApiResponse({ status: 200, description: "Returns a list of cats" })
  @Get()
  findAll(@Query() query: FindAllQueryDto): Promise<CatResponseDto[]> {
    return this.catService.findAll(query);
  }
}
```

```ts
// cat.dto.ts
class CatResponseDto {
  @ApiProperty({ description: "The name of the cat" })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: "The age of the cat" })
  @IsNumber()
  @IsOptional()
  age: number;
}
```

```ts
// main.ts
const config = new DocumentBuilder()
  .setTitle("Cats example")
  .setDescription("The cats API description")
  .setVersion("1.0")
  .build();
const documentFactory = () => SwaggerModule.createDocument(app, config);
SwaggerModule.setup("swagger", app, documentFactory);
```
