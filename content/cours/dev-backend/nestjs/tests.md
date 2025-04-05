# Tests

https://docs.nestjs.com/testing

Il est très important de tester de manière la plus exhaustive possible les applications backend, car ce sont elles qui ont la résponsabilité de gerer et sécuriser les données, contrairement aux applications frontend.

Autant il est assez complexe et fastidieux de tester programmatiquement des applications frontend, et on aura tendance à les tester manuellement, autant il sera plus compliqué de tester manuellement des applications backend, et cela peut rapidement devenir fastidieux.

Pour s'assurer que notre backend fonctionne correctement, il sera impératif de le tester programmatiquement, ce qui sera plus aisé que pour les applications frontend, nottament avec l'IA qui pourra nous aider à écrire des tests plus rapidement.

NestJS propose un système de tests très simple et puissant qui nous facilitera la tache.

## Tests unitaires

Les tests unitaires sont des tests qui testent une partie isolée du code.

Ils testeront le bon fonctionnement de petites parties de l'applications, en prenant en compte les différents cas de figure qui peuvent se presenter, notamment par rapport aux differentes combinaisons d'arguments que les fonctions peuvent recevoir ou bien des differents contextes d'execution.

```ts
// cat.service.spec.ts
describe("CatService", () => {
  let service: CatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CatService],
    }).compile();

    service = module.get<CatService>(CatService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should create and find all cats", async () => {
    await service.create({ name: "John", age: 10 });
    const result = await service.findAll();

    expect(result).toEqual([{ name: "John", age: 10 }]);
  });
});
```

### Mocks

Lorsque nous testerons des parties du code qui dépendent d'autres parties, nous devrons les mocker, c'est à dire isoler le code que nous testons du code que nous ne testons pas. Pour cela, nous modifieront le comportement des dépendances pour qu'elles se comportent comme nous le souhaitons dans le contexte de nos tests.

```ts
// cat.controller.ts
@Controller("cat") // route '/cat'
export class CatController {
  constructor(private catService: CatService) {}

  @Get("/find-all") // route '/cat/find-all'
  findAll(): Promise<CatResponseDto[]> {
    return this.catService.findAll({ breed: true });
  }
}

// cat.controller.spec.ts
it("calls catService", async () => {
  jest.spyOn(catService, "findAll").mockResolvedValue([]);

  const result = await controller.findAll();

  expect(result).toEqual([]);
  expect(catService.findAll).toHaveBeenCalledWith({ breed: true });
});
```

## Tests d'integration (End to End)

Les tests d'integration sont des tests qui testent l'ensemble du code, en lançant l'application (presque) telle qu'elle serait lancée en production, et en simulant les requetes HTTP et en testant les réponses. L'application est donc testée de bout en bout, en prenant en compte tous les composants, leurs interactions et leurs dépencances tels que les bases de données.

Ils sont très utiles pour tester l'ensemble du code, mais sont plus lents à executer et plus difficiles à écrire.

On sera moins exhaustif dans les combinaisons de possibilités, mais on testera au moins les scenarios d'usage principaux et exigences de securités.

```ts
describe("AppController (e2e)", () => {
  let server: Server;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    const app = moduleFixture.createNestApplication();
    await app.init();
    server = app.getHttpServer();
  });

  it("Health check", () => {
    request(server).get("/").expect(200).expect("OK");
  });

  describe("Breed", () => {
    it("should create and get all breeds", async () => {
      const inputBreed = {
        name: "Persian",
        description: "A fluffy breed",
      };
      const res = await request(server)
        .post("/breed")
        .send(inputBreed)
        .expect(201);

      const createdBreed = res.body;
      expect(createdBreed.name).toBe(inputBreed.name);
      expect(createdBreed.description).toBe(inputBreed.description);
      expect(createdBreed.id).toBeDefined();
      expect(createdBreed.seed).not.toBeDefined();

      const res = await request(server).get("/breed").expect(200);

      expect(res.body).toContainEqual(createdBreed);
    });
  });
});
```
