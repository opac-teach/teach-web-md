# API REST

La fonctionnalité principale de NestJS est de permettre la création d’API REST complètes et scalables.

## Controlleurs

https://docs.nestjs.com/controllers

Les composants qui définiront les routes et recevront les requetes seront les **Controlleurs**

```ts
@Controller("cat") // route '/cat'
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

## DTOs

Les DTOs serviront de definition de types pour toutes les données que recevra et retournera l’API.

Ils se distinguent des modèles de base de données pour définir uniquement les types de données échangés par le service.

[class-transformer](https://github.com/typestack/class-transformer): Utilisé pour définir des structures afin de les serialiser/deserialier, c’est à dire les transformer entre un objet et une classe.

[class-validator](https://github.com/typestack/class-validator): Permet de définir le type des proprietés d’une classe, définir les valeurs qu’elles peuvent prendre et les valider.

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

Une fois ques les DTOs sont définis et que les controlleurs définissent les données entrantes, on peut s'assurer qu'elles sont valides en utilisant un pipe de validation.

```ts
app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true, // will remove any properties that are not defined in the DTO
    transform: true, // will convert incoming values to the correct types
  })
);
```

### Serialisation des données sortantes

https://docs.nestjs.com/techniques/serialization

Afin de serialiser les données sortantes, on peut utiliser un intercepteur.

```ts
app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
```

## Exceptions

https://docs.nestjs.com/exception-filters

A tout moment dans l’application, on peut stopper une requete et retourner une erreur en lancant une exception.

```tsx
throw new HttpException("Forbidden", HttpStatus.FORBIDDEN);
throw new ForbiddenException();
```

## OpenAPI

https://docs.nestjs.com/openapi/introduction

Tout bon backend qui se respecte doit fournir une documentation de son API, et la norme est aujourd'hui OpenAPI.

NestJS possède un outil très pratique pour générer une documentation OpenAPI à partir de l'application via la librairie Swagger. Il suffit d'annoter les controlleurs et les DTOs avec des decorateurs pour décrire les routes et les types de données.

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
