# Introduction et fondements

## Rappels sur les bases de données relationnelles et leurs limites

### Les bases de données relationnelles

Les bases de données relationnelles (SGBDR) existent depuis les années 1970. Elles reposent sur quelques principes fondamentaux :

- **Des tables** organisées en lignes et colonnes
- **Un schéma fixe** défini à l'avance (DDL)
- **Le langage SQL** pour interroger et manipuler les données
- **Les contraintes d'intégrité** (clés primaires, clés étrangères, unicité)

Les SGBDR classiques — PostgreSQL, MySQL, Oracle, SQL Server — sont matures, bien documentés et couvrent la majorité des besoins métiers traditionnels.

### Les limites face aux besoins actuels

À partir des années 2000, l'explosion du web et des données a mis en évidence plusieurs limites structurelles :

**Volumétrie**

Un SGBDR classique stocke ses données sur un seul serveur (architecture *scale-up*). Pour gérer des téraoctets voire des pétaoctets, on doit acheter des machines de plus en plus puissantes et coûteuses. Il existe une limite physique et financière à cette approche.

**Scalabilité horizontale**

La scalabilité horizontale consiste à ajouter des machines bon marché plutôt que d'améliorer une seule machine. Les SGBDR relationnels sont difficiles à distribuer horizontalement car :

- Les jointures entre tables nécessitent que toutes les données soient accessibles simultanément
- Les transactions ACID imposent une coordination forte entre nœuds
- Le partitionnement des données (sharding) est complexe à mettre en œuvre

**Données non structurées**

Les SGBDR imposent un schéma rigide. Or de nombreuses données modernes résistent à cette contrainte :

- Un produit e-commerce peut avoir des attributs très variables selon sa catégorie
- Les données issues de capteurs IoT n'ont pas toutes le même format
- Les contenus générés par les utilisateurs (posts, commentaires, métadonnées) évoluent constamment

Modifier le schéma d'une table de plusieurs centaines de millions de lignes est une opération coûteuse et risquée.

## Contexte d'émergence du NoSQL : Big Data et applications web à grande échelle

### L'essor du Big Data

Le terme **Big Data** désigne des volumes de données trop grands, trop rapides ou trop variés pour être traités par les outils traditionnels. On le caractérise par les **3 V** :

| Dimension | Description | Exemple |
|-----------|-------------|---------|
| **Volume** | Quantité de données générées | Des milliards de tweets par jour |
| **Vélocité** | Vitesse de génération et de traitement | Flux temps réel d'un réseau social |
| **Variété** | Hétérogénéité des formats | Texte, images, JSON, logs, capteurs |

### Les pionniers du NoSQL

Face à ces défis, les grands acteurs du web ont développé leurs propres solutions :

- **Google** publie en 2003 le papier *MapReduce* et en 2006 *Bigtable*, une base de données orientée colonnes pour indexer le web
- **Amazon** publie en 2007 *Dynamo*, une base clé-valeur hautement disponible pour son infrastructure e-commerce
- **Facebook** développe *Cassandra* en 2008 pour gérer les boîtes de messages de ses utilisateurs

Ces solutions sacrifient certaines garanties des SGBDR (notamment la cohérence stricte) pour gagner en disponibilité et en capacité de distribution.

Le terme **NoSQL** (*Not Only SQL*) est popularisé en 2009 pour désigner cet ensemble de technologies alternatives.

### Applications web modernes

Les applications web à grande échelle ont des exigences particulières :

- **Haute disponibilité** : un temps d'arrêt coûte de l'argent (Amazon estime qu'une seconde d'indisponibilité coûte plusieurs milliers de dollars)
- **Latence faible** : les utilisateurs abandonnent une page qui met plus de 3 secondes à charger
- **Montée en charge élastique** : le trafic peut multiplier par 10 lors d'un événement (soldes, lancement de produit)

## Le théorème CAP et le modèle BASE vs ACID

### Le théorème CAP

Formulé par Eric Brewer en 2000, le **théorème CAP** (aussi appelé théorème de Brewer) énonce qu'un système distribué ne peut garantir simultanément que deux des trois propriétés suivantes :

```
        Cohérence (C)
           /\
          /  \
         /    \
        /      \
       /________\
  Disponibilité  Tolérance au
      (A)        partitionnement (P)
```

- **C — Consistency (Cohérence)** : tous les nœuds voient les mêmes données au même moment. Après une écriture, toute lecture renvoie la valeur la plus récente.
- **A — Availability (Disponibilité)** : le système répond toujours aux requêtes, même si certains nœuds sont défaillants.
- **P — Partition tolerance (Tolérance au partitionnement)** : le système continue de fonctionner même si des messages sont perdus ou si des nœuds sont déconnectés.

Dans un réseau réel, les partitions réseau sont inévitables. Un système distribué doit donc choisir entre **CP** ou **AP** :

| Choix | Exemples | Compromis |
|-------|----------|-----------|
| **CP** | HBase, Zookeeper, MongoDB (par défaut) | Refuse de répondre si non cohérent |
| **AP** | CouchDB, Cassandra, DynamoDB | Peut renvoyer des données obsolètes |
| **CA** | SGBDR classiques (non distribués) | Ne tolère pas les partitions |

> **Note** : Le théorème CAP a été affiné depuis sa formulation initiale. En pratique, il s'agit d'un continuum de compromis plutôt que d'un choix binaire.

### ACID vs BASE

**ACID** est le modèle de cohérence des bases de données relationnelles :

- **A**tomicité : une transaction réussit entièrement ou échoue entièrement
- **C**ohérence : la base passe d'un état valide à un autre état valide
- **I**solation : les transactions concurrentes ne s'interfèrent pas
- **D**urabilité : une transaction validée est persistée même en cas de panne

**BASE** est le modèle adopté par de nombreux systèmes NoSQL :

- **B**asically **A**vailable : le système garantit la disponibilité (selon le CAP)
- **S**oft state : l'état du système peut changer avec le temps, même sans nouvelles entrées
- **E**ventually consistent : le système *finira* par être cohérent, mais pas nécessairement immédiatement

```
ACID                                BASE
──────────────────────────────────────────────────────
Cohérence forte     ←→    Cohérence éventuelle
Isolation           ←→    Optimistic locking
Pessimiste          ←→    Optimiste
Difficile à scaler  ←→    Scalabilité horizontale
```

## Panorama des quatre familles NoSQL

### Bases clé-valeur — Redis

**Principe** : les données sont stockées comme des paires clé → valeur. La clé est une chaîne, la valeur peut être n'importe quel type (chaîne, liste, ensemble, hash...).

```
SET user:42:name "Alice"
GET user:42:name  → "Alice"
```

**Caractéristiques** :
- Extrêmement rapide (données en mémoire)
- Structure simple, pas de requêtes complexes
- Idéal pour le cache, les sessions, les files de messages

**Avantages** :
- Latence sub-milliseconde grâce au stockage en mémoire
- Très faible complexité opérationnelle
- Supporte des structures variées (listes, sets, hash, sorted sets)

**Inconvénients** :
- Capacité limitée par la RAM disponible
- Pas de requêtes complexes ni de relations entre données
- Persistance sur disque optionnelle (risque de perte en cas de crash)

**Cas d'usage** : cache applicatif, stockage de sessions, classements en temps réel, pub/sub.

**Redis** est le représentant le plus populaire. Il est souvent utilisé comme couche de cache devant un SGBDR.

---

### Bases orientées documents — MongoDB

**Principe** : les données sont stockées sous forme de **documents** (JSON/BSON). Chaque document peut avoir une structure différente.

```json
{
  "_id": "ObjectId('...')",
  "nom": "Alice Martin",
  "age": 28,
  "adresses": [
    { "ville": "Paris", "type": "domicile" },
    { "ville": "Lyon", "type": "travail" }
  ]
}
```

**Caractéristiques** :
- Schéma flexible
- Requêtes riches sur les champs et documents imbriqués
- Scalabilité horizontale via le sharding

**Avantages** :
- Schéma évolutif sans migration lourde
- Modèle de données proche des objets métier (JSON natif)
- Bonne expressivité des requêtes (filtres, agrégations, index)

**Inconvénients** :
- Dénormalisation pouvant entraîner de la redondance de données
- Pas de jointures natives performantes entre collections
- La flexibilité du schéma peut devenir un risque sans gouvernance

**Cas d'usage** : catalogues de produits, gestion de contenu, applications avec données hétérogènes.

**MongoDB** est la base documentaire la plus utilisée. Nous l'étudierons en détail dans les parties suivantes.

---

### Bases orientées colonnes — Cassandra

**Principe** : les données sont organisées en colonnes plutôt qu'en lignes. Les colonnes fréquemment consultées ensemble sont regroupées (*column families*).

```
Clé de partition → famille de colonnes
user_id:42 → { name: "Alice", email: "alice@...", created_at: "2024-01-01" }
```

**Caractéristiques** :
- Excellente performance en écriture
- Conçu pour la distribution massive (pas de SPOF)
- Requêtes optimisées pour des patterns d'accès prédéfinis

**Avantages** :
- Scalabilité horizontale quasi linéaire
- Haute disponibilité par réplication multi-datacenter
- Performances en écriture très élevées, même à grande échelle

**Inconvénients** :
- Modèle de données rigide : le schéma dépend des requêtes prévues à l'avance
- Cohérence éventuelle par défaut (modèle BASE)
- Pas de jointures, pas de transactions multi-lignes complexes

**Cas d'usage** : séries temporelles, journaux d'événements, données IoT, analytics à grande échelle.

**Apache Cassandra** (initialement développé par Facebook) est utilisé par Netflix, Apple, Instagram pour des charges massives en écriture.

---

### Bases orientées graphe — Neo4j

**Principe** : les données sont représentées sous forme de **nœuds** (entités) et de **relations** (arêtes), chacun pouvant porter des propriétés.

```
(Alice)-[:CONNAÎT {depuis: 2020}]->(Bob)
(Bob)-[:TRAVAILLE_CHEZ]->(EFREI)
```

**Caractéristiques** :
- Exploration efficace des relations complexes
- Traversée de graphes en temps constant
- Langage de requête Cypher (déclaratif)

**Avantages** :
- Performances constantes sur les traversées de relations, quelle que soit la taille du graphe
- Modélisation intuitive pour les données fortement connectées
- Cypher est lisible et expressif pour les requêtes relationnelles complexes

**Inconvénients** :
- Peu adapté aux données tabulaires ou aux requêtes analytiques massives
- Scalabilité horizontale plus difficile que les autres familles NoSQL
- Courbe d'apprentissage si l'on ne pense pas nativement en graphes

**Cas d'usage** : réseaux sociaux, détection de fraude, moteurs de recommandation, graphes de connaissances.

---

### Tableau récapitulatif

| Famille | Modèle | Forces | Exemples |
|---------|--------|--------|----------|
| Clé-valeur | Paires clé → valeur | Rapidité, simplicité | Redis, DynamoDB |
| Document | Documents JSON/BSON | Flexibilité, requêtes riches | MongoDB, CouchDB |
| Colonne | Familles de colonnes | Écriture massive, distribution | Cassandra, HBase |
| Graphe | Nœuds + relations | Traversée de relations | Neo4j, Amazon Neptune |
