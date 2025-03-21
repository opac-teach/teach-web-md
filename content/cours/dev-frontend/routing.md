# Routage côté client

## Single Page Application (SPA)

- **Définition**
  - Application web monopage
  - Navigation sans rechargement
  - Expérience fluide type "application native"
- **Fonctionnement**
  - Chargement initial de l'application
  - Mise à jour dynamique du contenu
  - Gestion de l'historique du navigateur

```mermaid
sequenceDiagram
    participant U as Navigateur
    Note right of U: Demarrage de l'application
    participant R as Router (index.html)
    U->>R: /page_1
    create participant Page_1_Component
    R->>Page_1_Component: Charge le composant affiché
    Note right of U: Conserve l'état de l'app
    U->>R: /page_2
    create participant Page_2_Component
    R->>Page_2_Component: Charge le composant affiché
```

## Contre exemple

```mermaid
sequenceDiagram
    participant U as Utilisateur
    participant R as CDN
    Note right of U: Demarrage de l'application
    U->>R: /page_1.html
    create participant page_1.html
    R->>page_1.html: Telecharge le fichier dans un nouveau contexte
    U->>R: /page_2.html
    Note right of U: Demarrage de l'application
    create participant page_2.html
    R->>page_2.html: Telecharge le fichier dans un nouveau contexte
```

## SSG

Les application à rendu statique n'auront generalement pas besoin de routeur (comme ce site)
