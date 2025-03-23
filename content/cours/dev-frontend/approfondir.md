# Notions supplémentaires

### CORS & XSS

Le CORS est un mécanisme de sécurité qui permet de limiter les risques de XSS (Cross-Site Scripting).
Le XSS est un type de faille de sécurité qui permet à un attaquant de placer du code JavaScript dans une page web.

Le principe est simple : quand un navigateur récupère une ressource depuis une autre origine, il vérifie si l'origine est autorisée à accéder à la ressource. Cette autorisation est définie dans l'en-tête `Access-Control-Allow-Origin`, qui doit définir les origines (~domaines) autorisées.
Si votre application n'arrive pas à récupérer une ressource, c'est que le serveur n'a pas configuré le CORS correctement ou que vous accédez à une ressource que vous n'êtes pas autorisé à accéder.

## Autres notions à approfondir

- Service workers et multithreading
- Local Storage, IndexedDB
- Authentification
- Lazy loading et prefetch
- WebAssembly
- Edge/Fluid Computing
- Web Components
- PWA
