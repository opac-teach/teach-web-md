# Microservices

https://docs.nestjs.com/microservices/basics

NestJS propose un module intégré pour les microservices, il est disponible dans le paquet `@nestjs/microservices`.

Le principal changement par rapport à une API REST est que, au lieu d'écouter des requêtes HTTP, on écoutera des messages émis, generalement via un message broker. Une application microservice ne peut pas être à la fois un microservice et une API REST. En revanche, l'API REST pourra communiquer avec les microservices.

Il existe differents types de communication compatibles avec NestJS:

- TCP
- Redis
- RabbitMQ
- Kafka ...

## Implémentation

### Microservice

Le microservice "écoute" les messages émis et y répond (`MessagePattern`), ou ne répond pas (`EventPattern`).

```ts
// main.ts
// Configuration d'un microservice
async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.REDIS,
      options: redisConfig,
    }
  );
  await app.listen();
}
bootstrap();
```

```ts
// *.controller.ts
@Controller()
export class ColorsController {
  // Ecoute de l'évenement "generate_color" avec réponse
  @MessagePattern("generate_color")
  generateColor(breedSeed: string): string {
    return this.colorsService.getColors(breedSeed);
  }

  // Ecoute de l'évenement "cat_created" sans réponse
  @EventPattern("cat_created")
  async handleCatCreated(data: Record<string, unknown>) {
    //...
  }
}
```

### Client

Le client (producer) émettra des messages et attendra une réponse ou non.

```ts
// *.module.ts
@Module({
  ...,
  imports: [
    ClientsModule.register([
      {
        name: 'COLORS_SERVICE',
        transport: Transport.REDIS,
        options: redisConfig,
      },
    ]),
    ...,
  ],
  ...,
})
```

```ts
// *.service.ts
export class CatService {
  constructor(
    @Inject('COLORS_SERVICE') private client: ClientProxy,
  ) {}

  async create(cat: CreateCatDto): Promise<CatEntity> {
    const { seed } = breed;
    // Appel du microservice avec attente de réponse (Observable)
    const colorObservable = this.client.send<string, string>('generate_color', breed.seed);
    const color = await firstValueFrom(colorObservable);
    ...

    // Emission d'un évenement sans attente de réponse
    this.client.emit('cat_created', cat);
  }
}

```

### Observables

https://rxjs.dev/guide/observable

Les réponses des microservices sont des Observables.

Un Observable est un objet qui peut émettre des valeurs, des erreurs ou se terminer de manière asynchrone.

```ts
const observable = new Observable((observer) => {
  observer.next("Hello");
  observer.error("Error");
  observer.complete();
});

observable.subscribe((value) => {
  console.log(value);
});

const first = await firstValueFrom(observable);
```
