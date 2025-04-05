# TypeORM

Afin de d'utiliser des bases de données, NestJS propose un module appelé `@nestjs/typeorm` qui permet de gérer les entités et les repositories, qui sont une abstraction de la base de données.

Ce module nous pemettra de facilement se connecter, lire et écrire dans la bdd quelle qu'elle soit depuis les services.

- https://docs.nestjs.com/techniques/database
- https://typeorm.io/

## Entités

Les entités sont les classes qui représentent les tables de la base de données. Elles sont décorées avec `@Entity()` et possèdent des propriétés qui correspondent aux colonnes de la table. Les décorateurs permettent de définir les paramètres des colonnes tels que les relations entre les entités.

```ts
@Entity()
export class Cat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  age: number;

  @ManyToOne(() => Breed, (breed) => breed.cats)
  breed: Breed;
}

@Entity()
export class Breed {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Cat, (cat) => cat.breed)
  cats: Cat[];
}
```

## Utilisation

```ts
// app.module.ts
@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    ...
  ],
})

// cat.module.ts
@Module({
  imports: [TypeOrmModule.forFeature([Cat])],
})

// cat.service.ts
@Injectable()
export class CatService {
  constructor(
    @InjectRepository(Cat)
    private catRepository: Repository<Cat>,
  ) {}

  async findAllJonhs(): Promise<Cat[]> {
    return this.catRepository.find({
        where: {
            name: "John",
        },
        relations: ["breed"],
    });
  }
}
```
