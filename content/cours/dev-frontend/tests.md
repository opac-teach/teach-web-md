# Les tests pour le frontend

Les tests sont une partie importante du développement frontend. Ils permettent de s'assurer que le code fonctionne comme prévu et de détecter les erreurs avant qu'elles ne soient visibles par les utilisateurs.

Contrairement au backend où les tests garantissent une bonne gestion des données et des permissions des utilisateurs, les tests frontend n'assurent pas la sécurité des données, mais bien du bon fonctionnement de l'application et d'une bonne UX.

## Tests unitaires

Les tests unitaires sont des tests qui vérifient le bon fonctionnement d'une partie isolée de code. En frontend on testera typiquement les composants ou les composables/hooks.

Les parties du code à tester doivent être impérativement **isolées** du reste de l'application, c'est à dire qu'on ne doit pas executer du code qui n'est pas dans le code à tester (en dehors des librairies).
Pour cela on peut utiliser des **mocks** ou des **stubs** qui vont remplacer les parties du code tierces.

Dans chaque unité testée, il faudra prendre en compte les différents cas de figure (embranchements) que le code peut prendre. Des outils de **coverage** permettent de savoir les parties du code testées ou non.

## Tests d'intégration (End to End)

Les tests d'intégration sont des tests qui vérifient le bon fonctionnement de l'application dans son ensemble. Pour les lancer, on démarrera un serveur similaire à un serveur de production, l'application sera connectée au backend, et on simulera l'utilisation d'un utilisateur via navigateur qui sera controlé par le test, et on verifiera que l'application se comporte comme prévu.

Il ne sera pas necessaire et possible de tester tous les cas d'usage possible en test d'integration, mais on essaira au moins de couvrir les cas d'usage habituels et critiques.
