# Synthèse et choix technologiques

## Tableau comparatif des familles NoSQL

### Vue d'ensemble

| Critère | Clé-valeur (Redis) | Document (MongoDB) | Colonne (Cassandra) | Graphe (Neo4j) |
|---------|-------------------|-------------------|---------------------|----------------|
| **Modèle de données** | Paires clé → valeur | Documents JSON/BSON | Familles de colonnes | Nœuds + relations |
| **Schéma** | Aucun | Flexible (optionnel) | Partiel (colonnes fixes) | Flexible |
| **Requêtes** | Par clé uniquement | Riches (champs, imbrication) | Par clé de partition | Traversée de graphes |
| **Jointures** | Non | Via `$lookup` (limitées) | Non | Natives et performantes |
| **Cohérence** | Configurable | CP (configurable) | AP (éventuelle) | ACID |
| **Scalabilité** | Horizontale (cluster) | Horizontale (sharding) | Horizontale (native) | Verticale principalement |
| **Performance lecture** | Excellente (mémoire) | Bonne | Bonne (par clé) | Excellente (traversées) |
| **Performance écriture** | Excellente | Bonne | Excellente | Bonne |
| **Cas d'usage idéaux** | Cache, sessions, pub/sub | CMS, e-commerce, IoT | Séries temporelles, logs | Réseaux, recommandation |
| **Exemples** | Redis, DynamoDB | MongoDB, CouchDB | Cassandra, HBase | Neo4j, Amazon Neptune |

---

### Cohérence et disponibilité

| Base | Positionnement CAP | Cohérence par défaut |
|------|-------------------|----------------------|
| Redis | CP (mode cluster) | Forte |
| MongoDB | CP | Forte (lecture depuis le primaire) |
| Cassandra | AP | Éventuelle (configurable par requête) |
| Neo4j | CA (non distribué nativement) | ACID |

---

### Scalabilité horizontale

```
Facilité de scaling horizontal
──────────────────────────────────────────────────────────────►
    Neo4j          MongoDB         Redis          Cassandra
(complexe)        (sharding)     (cluster)     (native, linéaire)
```

Cassandra est conçue dès le départ pour la distribution. L'ajout d'un nœud augmente linéairement les capacités de lecture et d'écriture, sans point unique de défaillance (SPOF).

## NoSQL vs SQL : quand choisir l'un ou l'autre

### Choisir un SGBDR (SQL) quand...

**La cohérence des données est critique**

- Systèmes bancaires, comptabilité, paye : les transactions ACID garantissent qu'un virement est soit entièrement effectué, soit annulé — jamais dans un état intermédiaire.
- Données médicales : une erreur de cohérence peut avoir des conséquences graves.

**Le modèle de données est stable et bien défini**

- Les entités et leurs relations sont connues à l'avance.
- Le schéma n'évolue pas fréquemment.

**Les requêtes sont complexes et ad hoc**

- Rapports métier avec agrégations sur plusieurs tables
- Analyses exploratoires où les requêtes ne sont pas prédéfinies
- SQL est un langage standardisé, lisible et puissant

**Les volumes restent raisonnables**

- Jusqu'à quelques centaines de millions de lignes, un SGBDR bien configuré (PostgreSQL, MySQL) est souvent suffisant.

---

### Choisir NoSQL quand...

**Les volumes sont massifs et la scalabilité horizontale est nécessaire**

- Des milliards de documents, des téraoctets de données
- Le coût du scale-up (machines plus puissantes) devient prohibitif
- → Cassandra, MongoDB avec sharding

**Le schéma est hétérogène ou évolue rapidement**

- Catalogues de produits avec des attributs variables par catégorie
- Applications en phase de prototypage rapide
- Données provenant de sources diverses non uniformisées
- → MongoDB

**Les accès sont simples et la latence doit être minimale**

- Cache applicatif : lire/écrire une valeur par clé en quelques microsecondes
- Stockage de sessions utilisateurs
- → Redis

**Les relations complexes entre données sont au cœur du modèle**

- Réseaux sociaux, détection de fraude, recommandation
- → Neo4j

**Les écritures sont massives et distribuées géographiquement**

- Collecte de métriques, journaux d'événements, données IoT
- → Cassandra

---

### La démarche de choix

```
         Le modèle de données est-il connu et stable ?
                    /                \
                 OUI                 NON
                  │                   │
     Les jointures sont-elles      Schéma flexible nécessaire
     nombreuses et complexes ?     → MongoDB
           /         \
         OUI          NON
          │             │
      SQL classique   Volume > 1 To ou
      (PostgreSQL,    écriture massive ?
       MySQL)              /        \
                         OUI        NON
                          │          │
                     Cassandra    MongoDB ou
                                  SQL avec cache Redis
```

---

### Approche Polyglot Persistence

Le **polyglot persistence** consiste à utiliser **plusieurs bases de données** dans la même application, chacune choisie pour ce qu'elle fait de mieux.

Exemple d'architecture d'un site e-commerce :

```
┌─────────────────────────────────────────────────────────┐
│                   Application e-commerce                │
├──────────────┬──────────────┬─────────────┬─────────────┤
│  Catalogue   │  Commandes   │   Cache     │  Reco.      │
│  produits    │  & paiements │  sessions   │  produits   │
│              │              │             │             │
│  MongoDB     │  PostgreSQL  │    Redis    │   Neo4j     │
│  (schéma     │  (ACID,      │  (latence   │  (graphe de │
│   flexible)  │   fiable)    │   <1ms)     │   produits) │
└──────────────┴──────────────┴─────────────┴─────────────┘
```

**Avantages** : chaque composant utilise l'outil le mieux adapté à ses besoins.

**Inconvénients** :
- Complexité opérationnelle accrue (maintenir plusieurs systèmes)
- Pas de transactions cross-bases
- Courbe d'apprentissage pour chaque technologie

## Notions d'architecture distribuée

### La réplication

La **réplication** consiste à maintenir des **copies identiques** des données sur plusieurs serveurs (réplicas). Elle apporte :

- **Haute disponibilité** : si le serveur primaire tombe, un secondaire prend le relais
- **Performances en lecture** : les lectures peuvent être distribuées sur les secondaires
- **Durabilité** : les données sont en sécurité même en cas de panne matérielle

#### Réplication dans MongoDB — Replica Set

Un **Replica Set** MongoDB est composé de :

```
         ┌─────────────────┐
         │    Primaire     │ ◄── Toutes les écritures
         │  (Primary)      │
         └────────┬────────┘
                  │ réplication oplog
         ┌────────▼────────┐    ┌─────────────────┐
         │   Secondaire 1  │    │   Secondaire 2  │
         │  (Secondary)    │    │  (Secondary)    │
         │  lectures opt.  │    │    ou Arbiter   │
         └─────────────────┘    └─────────────────┘
```

- Toutes les **écritures** se font sur le **primaire**
- Les modifications sont **répliquées** sur les secondaires via l'oplog
- En cas de panne du primaire, une **élection** désigne automatiquement un nouveau primaire
- Nombre minimum de nœuds recommandé : **3** (pour éviter le split-brain)

---

### Le sharding (partitionnement horizontal)

Le **sharding** consiste à **distribuer les données** sur plusieurs serveurs, chaque serveur ne stockant qu'une partie des données. C'est la solution pour dépasser les limites d'un seul serveur.

```
              Données totales
           ┌────────────────────┐
           │  Toute la collec.  │
           └────────────────────┘
                    │ sharding
       ┌────────────┼────────────┐
       │            │            │
   Shard 1      Shard 2      Shard 3
  users A-H    users I-P    users Q-Z
```

**La shard key** — clé de partitionnement

Le choix de la shard key est critique :

```javascript
// Sharding de la collection "commandes" par clientId
sh.shardCollection("ecommerce.commandes", { clientId: "hashed" })
```

Une bonne shard key doit :
- Avoir une **cardinalité élevée** (beaucoup de valeurs distinctes)
- Distribuer les **écritures uniformément** (éviter les "hot spots")
- Permettre le **ciblage** : les requêtes fréquentes ne doivent interroger qu'un seul shard

**Attention** : un mauvais choix de shard key est très difficile à corriger après coup.

---

### Haute disponibilité

La haute disponibilité (HA) vise à minimiser les interruptions de service. Elle repose sur plusieurs mécanismes :

**Éliminer les points de défaillance unique (SPOF)**

Chaque composant critique doit être redondant :

```
                    Load Balancer (redondant)
                    /                      \
          Replica Set A              Replica Set B
         (Primaire + 2 sec.)        (Primaire + 2 sec.)
                    \                      /
                        Shard Router
                     (mongos, redondant)
```

**Stratégie de déploiement multi-zones**

Pour résister à la panne d'un datacenter entier, les réplicas doivent être dans des **zones de disponibilité** (Availability Zones) différentes, voire des régions géographiques différentes.

```
Zone A (Paris)      Zone B (Londres)     Zone C (Amsterdam)
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│  Primaire    │───▶│  Secondaire  │───▶│  Secondaire  │
│              │    │              │    │              │
└──────────────┘    └──────────────┘    └──────────────┘
```

Si la Zone A tombe, le secondaire de la Zone B est élu primaire automatiquement.

---

### Résumé des concepts d'architecture distribuée

| Concept | Rôle | Technologie |
|---------|------|-------------|
| Réplication | Copies des données, haute disponibilité | MongoDB Replica Set, Cassandra |
| Sharding | Distribution des données, scalabilité | MongoDB Sharding, Cassandra vnodes |
| Load balancing | Distribution du trafic | HAProxy, AWS ELB, mongos |
| Consensus | Élection du primaire | Raft (MongoDB), Paxos |
| Cohérence éventuelle | Propagation asynchrone | Cassandra, DynamoDB |

## Conclusion

Le paysage des bases de données s'est considérablement enrichi depuis l'émergence du NoSQL. Il n'existe pas de solution universelle : chaque famille répond à des besoins spécifiques.

**Les points clés à retenir** :

1. **Le théorème CAP** impose des compromis : on choisit entre cohérence forte et disponibilité maximale.

2. **MongoDB** est un excellent choix généraliste pour les données hétérogènes, avec une modélisation guidée par les requêtes.

3. **Redis** excelle comme couche de cache pour réduire la latence et soulager une base principale.

4. **Cassandra** est imbattable pour les charges massives en écriture et la distribution géographique.

5. **Neo4j** est le choix naturel quand les relations entre données sont aussi importantes que les données elles-mêmes.

6. Le **polyglot persistence** est une approche mature : combiner plusieurs technologies selon les besoins de chaque composant.

7. SQL et NoSQL ne s'opposent pas — ils se **complètent**. La question n'est pas "SQL ou NoSQL ?" mais "quel outil pour quel problème ?".
