Partie 1 — Introduction et fondements (1h30)
1.1 Rappels sur les bases de données relationnelles et leurs limites face aux besoins actuels (volumétrie, scalabilité horizontale, données non structurées)
1.2 Contexte d'émergence du NoSQL : Big Data, applications web à grande échelle
1.3 Le théorème CAP et le modèle BASE vs ACID
1.4 Panorama des quatre familles NoSQL : clé-valeur (Redis), document (MongoDB), colonne (Cassandra), graphe (Neo4j) — principes, cas d'usage et positionnement de chacune

Partie 2 — MongoDB : concepts et modélisation (1h30)
2.1 Architecture de MongoDB : bases, collections, documents JSON/BSON, ObjectId
2.2 Schéma flexible : avantages, risques et bonnes pratiques de validation de schéma
2.3 Modélisation documentaire : imbrication vs référencement, dénormalisation assumée
2.4 Penser par les requêtes : concevoir son modèle en fonction des accès aux données
2.5 Comparaison avec la modélisation relationnelle sur un exemple concret

Partie 3 — MongoDB : requêtes et manipulation de données (1h30)
3.1 Opérations CRUD : insertOne, insertMany, find, updateOne, updateMany, deleteOne, deleteMany
3.2 Opérateurs de requête : comparaison (gt, $lt, $in…), logiques (
and, or, $not), sur tableaux (
elemMatch, $all, $size)

3.3 Requêtes sur documents imbriqués et notation pointée
3.4 Projections, tri et pagination (sort, skip, limit)
3.5 Mises à jour partielles : $set, $unset, $push, $pull, $inc, $addToSet, upsert

Partie 4 — MongoDB : agrégation et indexation (1h)
4.1 Pipeline d'agrégation : principes et étapes principales ($match, $group, $sort, $project, $unwind, $lookup)
4.2 Exemples concrets : statistiques, jointures entre collections, transformations de données
4.3 Indexation : index simples, composés, textuels, multiclés
4.4 Analyser les performances d'une requête avec explain()

Partie 5 — Bases de données orientées graphe (0h30)
5.1 Principe de fonctionnement : nœuds, relations, propriétés
5.2 Présentation de Neo4j et du langage Cypher
5.3 Cas d'usage : réseaux sociaux, détection de fraude, recommandation

Partie 6 — Synthèse et choix technologiques (1h)
6.1 Tableau comparatif des familles NoSQL : modèle de données, cohérence, scalabilité
6.2 NoSQL vs SQL : quand choisir l'un ou l'autre, approche polyglot persistence
6.3 Notions d'architecture distribuée : réplication, sharding, haute disponibilité
