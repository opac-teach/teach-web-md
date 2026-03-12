# Bases de données orientées graphe

## Principe de fonctionnement

### Pourquoi les graphes ?

Certaines données sont fondamentalement relationnelles dans le sens *graphe* du terme : les connexions entre entités sont aussi importantes que les entités elles-mêmes.

**Le problème des jointures récursives en SQL**

Prenons un réseau social. Pour trouver les amis d'amis d'une personne en SQL :

```sql
-- Amis directs
SELECT b.id FROM amis WHERE a_id = 1;

-- Amis d'amis : déjà plus complexe
SELECT c.id FROM amis b1
JOIN amis b2 ON b1.b_id = b2.a_id
WHERE b1.a_id = 1;

-- Amis d'amis d'amis : encore une jointure...
-- À N degrés de séparation : N jointures, performances catastrophiques
```

Les bases de données relationnelles ne sont pas optimisées pour la traversée de relations profondément imbriquées. Plus le graphe est profond, plus les requêtes SQL deviennent lentes et complexes.

**La solution : stocker les relations comme des citoyens de première classe**

Dans une base orientée graphe, les relations sont des entités à part entière avec leurs propres propriétés, stockées physiquement de façon adjacente aux nœuds qu'elles relient. Parcourir une relation est une opération à temps constant, quel que soit la taille du graphe.

---

### Les composants d'un graphe de propriétés

Le modèle le plus courant est le **Property Graph Model** (utilisé par Neo4j) :

#### Les nœuds (Nodes)

Représentent les **entités** du domaine. Chaque nœud peut avoir :
- Un ou plusieurs **labels** (types) : `Person`, `Movie`, `City`
- Des **propriétés** (paires clé-valeur) : `{ nom: "Alice", age: 28 }`

```
(Alice:Person { nom: "Alice", age: 28 })
```

#### Les relations (Relationships)

Représentent les **connexions** entre nœuds. Chaque relation a :
- Un **type** obligatoire : `CONNAÎT`, `TRAVAILLE_CHEZ`, `A_ACHETÉ`
- Une **direction** : de A vers B
- Des **propriétés** optionnelles : `{ depuis: 2020, force: 0.8 }`

```
(Alice)-[:CONNAÎT { depuis: 2020 }]->(Bob)
```

> Les relations sont **directionnelles** dans le modèle, mais peuvent être traversées dans les deux sens dans les requêtes.

#### Les propriétés

Tant les nœuds que les relations peuvent stocker des propriétés (chaînes, nombres, booléens, listes...).

---

### Représentation visuelle

```
  [Paris]────SITUÉ_EN────[France]
     │
HABITE (depuis: 2019)
     │
  [Alice]────CONNAÎT (depuis: 2020)────[Bob]
     │                                   │
TRAVAILLE_CHEZ                     TRAVAILLE_CHEZ
     │                                   │
  [EFREI]                           [Google]
```

## Neo4j et le langage Cypher

### Neo4j

**Neo4j** est la base de données orientée graphe la plus utilisée au monde. Elle est disponible en version open source (Community Edition) et entreprise.

Caractéristiques techniques :
- Stockage natif des graphes (index-free adjacency)
- Transactions ACID complètes
- Interface web **Neo4j Browser** pour explorer les graphes visuellement
- Langage de requête **Cypher**
- API REST et drivers officiels (Python, JavaScript, Java, Go...)

---

### Le langage Cypher

**Cypher** est le langage de requête déclaratif de Neo4j. Sa syntaxe est conçue pour ressembler visuellement à des graphes.

#### Syntaxe de base

```cypher
-- Nœud avec label et propriétés
(alice:Person { nom: "Alice", age: 28 })

-- Relation directionnelle
(alice)-[:CONNAÎT]->(bob)

-- Relation avec propriétés
(alice)-[:CONNAÎT { depuis: 2020 }]->(bob)
```

---

#### Créer des données — `CREATE` et `MERGE`

```cypher
// Créer un nœud
CREATE (p:Person { nom: "Alice", age: 28 })

// Créer plusieurs nœuds et une relation
CREATE (alice:Person { nom: "Alice" })
CREATE (bob:Person { nom: "Bob" })
CREATE (alice)-[:CONNAÎT { depuis: 2020 }]->(bob)

// MERGE : créer si n'existe pas, sinon ne rien faire
MERGE (p:Person { nom: "Alice" })
ON CREATE SET p.createdAt = datetime()
ON MATCH SET p.lastSeen = datetime()
```

---

#### Interroger les données — `MATCH`

```cypher
// Trouver tous les nœuds Person
MATCH (p:Person)
RETURN p.nom, p.age

// Trouver les amis d'Alice
MATCH (alice:Person { nom: "Alice" })-[:CONNAÎT]->(ami)
RETURN ami.nom

// Trouver les amis d'amis d'Alice
MATCH (alice:Person { nom: "Alice" })-[:CONNAÎT*2]->(ami2)
RETURN DISTINCT ami2.nom

// Chemins de longueur variable (1 à 3 degrés de séparation)
MATCH (alice:Person { nom: "Alice" })-[:CONNAÎT*1..3]->(personne)
RETURN DISTINCT personne.nom
```

---

#### Filtrer avec `WHERE`

```cypher
// Personnes de plus de 25 ans qui connaissent Alice
MATCH (p:Person)-[:CONNAÎT]->(alice:Person { nom: "Alice" })
WHERE p.age > 25
RETURN p.nom, p.age
ORDER BY p.age DESC
```

---

#### Mettre à jour — `SET` et `REMOVE`

```cypher
// Ajouter/modifier une propriété
MATCH (p:Person { nom: "Alice" })
SET p.ville = "Paris", p.age = 29

// Supprimer une propriété
MATCH (p:Person { nom: "Alice" })
REMOVE p.age

// Ajouter un label
MATCH (p:Person { nom: "Alice" })
SET p:Admin
```

---

#### Supprimer — `DELETE` et `DETACH DELETE`

```cypher
// Supprimer une relation
MATCH (alice:Person { nom: "Alice" })-[r:CONNAÎT]->(bob:Person { nom: "Bob" })
DELETE r

// Supprimer un nœud et toutes ses relations
MATCH (p:Person { nom: "Alice" })
DETACH DELETE p
```

---

#### Exemples avancés

**Recommandation : films vus par des amis mais pas encore par Alice**

```cypher
MATCH (alice:Person { nom: "Alice" })-[:CONNAÎT]->(ami)-[:A_VU]->(film:Movie)
WHERE NOT (alice)-[:A_VU]->(film)
RETURN film.titre, COUNT(ami) AS recommandations
ORDER BY recommandations DESC
LIMIT 5
```

**Chemin le plus court entre deux personnes**

```cypher
MATCH path = shortestPath(
  (alice:Person { nom: "Alice" })-[:CONNAÎT*]-(cible:Person { nom: "Charlie" })
)
RETURN path, length(path) AS distanceSociale
```

## Cas d'usage

### Réseaux sociaux

Le cas d'usage originel des bases graphe. Les requêtes typiques sont :

- **Suggestions d'amis** : trouver les amis d'amis non encore connectés
- **Fil d'actualité** : trouver les publications des personnes que je suis
- **Degré de connexion** : combien de degrés séparent deux utilisateurs ?
- **Détection de communautés** : identifier des groupes de personnes fortement connectées

```cypher
// Suggestion d'amis : amis d'amis pas encore connectés à Alice
MATCH (alice:Person { nom: "Alice" })-[:CONNAÎT]->(ami)-[:CONNAÎT]->(suggestion)
WHERE NOT (alice)-[:CONNAÎT]->(suggestion)
  AND suggestion <> alice
RETURN suggestion.nom, COUNT(ami) AS amisEnCommun
ORDER BY amisEnCommun DESC
```

---

### Détection de fraude

Les graphes excellent pour détecter des schémas frauduleux basés sur les relations entre entités :

- Plusieurs comptes bancaires reliés à un même numéro de téléphone
- Transactions circulaires entre des entités apparemment indépendantes
- Partage d'adresses IP, d'adresses postales ou de cartes bancaires entre des comptes "distincts"

```cypher
// Détecter des comptes partageant le même numéro de téléphone
MATCH (c1:Compte)-[:UTILISE]->(tel:Telephone)<-[:UTILISE]-(c2:Compte)
WHERE c1 <> c2
RETURN c1.id, c2.id, tel.numero AS telephonePartagé
```

---

### Moteurs de recommandation

Les recommandations basées sur le comportement collaboratif sont naturellement exprimées en graphe :

```cypher
// "Les clients qui ont acheté X ont aussi acheté..."
MATCH (client:Client)-[:A_ACHETÉ]->(produit:Produit { nom: "Laptop" })
      <-[:A_ACHETÉ]-(autreClient:Client)-[:A_ACHETÉ]->(recommandation:Produit)
WHERE NOT (client)-[:A_ACHETÉ]->(recommandation)
RETURN recommandation.nom, COUNT(autreClient) AS score
ORDER BY score DESC
LIMIT 5
```

---

### Autres cas d'usage

| Domaine | Application |
|---------|-------------|
| Logistique | Optimisation de routes, graphes de transport |
| Cybersécurité | Analyse de réseaux d'attaquants, propagation de malwares |
| Sciences de la vie | Réseaux de protéines, interactions médicamenteuses |
| Gestion des connaissances | Knowledge graphs, ontologies, graphes de connaissances |
| IT / Infrastructure | Cartographie des dépendances, analyse d'impact |
| Finance | Analyse des risques de contrepartie, chaînes de propriété |

---

### Quand choisir une base orientée graphe ?

**Choisir Neo4j si** :

- Les **relations entre entités** sont au cœur du modèle métier
- Vous avez besoin de **traversées profondes** (plusieurs degrés de séparation)
- Les requêtes portent sur des **patterns de connexions** complexes
- La structure du graphe **évolue fréquemment**

**Ne pas choisir Neo4j si** :

- Les données sont principalement tabulaires sans relations complexes
- Les requêtes sont essentiellement des lectures simples par clé
- Vous avez besoin de traiter des volumes massifs de données analytiques (préférer Cassandra ou un data warehouse)
