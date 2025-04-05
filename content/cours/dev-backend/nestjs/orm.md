# TypeORM

Pour gérer les interactions avec les bases de données, NestJS propose le module `@nestjs/typeorm`, qui fournit une intégration élégante avec TypeORM. Cette combinaison permet de manipuler efficacement les entités et les repositories, formant ainsi une abstraction puissante au-dessus de la base de données.

Ce module simplifie considérablement la connexion, la lecture et l'écriture dans différents systèmes de gestion de bases de données relationnelles depuis les services de l'application.

- Documentation NestJS : https://docs.nestjs.com/techniques/database
- Documentation TypeORM : https://typeorm.io/

## Entités

Les entités sont des classes qui représentent les tables de la base de données. Décorées avec `@Entity()`, elles définissent la structure des données persistantes. Chaque propriété d'une entité correspond à une colonne dans la table associée, et les décorateurs permettent de configurer ces colonnes ainsi que les relations entre les différentes entités.

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
// Configuration globale dans app.module.ts
@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    // ...
  ],
})
// Import des entités dans le module spécifique
// cat.module.ts
@Module({
  imports: [TypeOrmModule.forFeature([Cat])],
})
// Injection et utilisation du repository dans un service
// cat.service.ts
@Injectable()
export class CatService {
  constructor(
    @InjectRepository(Cat)
    private catRepository: Repository<Cat>
  ) {}

  async findAllJohns(): Promise<Cat[]> {
    return this.catRepository.find({
      where: {
        name: "John",
      },
      relations: ["breed"], // Charge également les données de race associées
    });
  }
}
```

## Migrations

Les migrations sont un moyen de gérer les modifications de la structure de la base de données au fur et a mesure que le projet évolue.

En mode developpement, on utilise parfois la methode dite de "synchronisation", qui comparera la base de donnée courante avec le code TypeORM et appliquera les modifications nécessaires automatiquement. **Attention: Il ne faut surtout pas utiliser cette methode en production !** En effet, cela peut avoir pour effet de supprimer des données existantes ou generer des incohérences.

Pour générer des migrations, il faut dabord desactiver la synchronisation, puis on peut utiliser la commande suivante:

```bash
npx typeorm migration:generate src/migrations/[migration-name]
```

Cela comparera la base de données avec le code TypeORM et générera une migration.

Pour appliquer les migrations, on peut utiliser la commande suivante:

```bash
npx typeorm migration:run
```

- Documentation TypeORM : https://typeorm.io/migrations
