## Pare-feu

Nous allons ébaucher un programme de pare feu, qui servira a analyser du traffic réseau et autoriser ou refuser des communications.

Pour commencer, on va créer un simple filtre sur des numéros de ports à autoriser ou non.

Il devra être possible de:

- Ajouter un port autorisé
- Supprimer un port autorisé
- Analyser un port
- Activer/Désactiver le pare-feu
  - Quand le pare feu est désactivé, il laisse passer tout le traffic
  - Par defaut, il est desactivé
  - Par défaut, tous les ports sont interdits

Utiliser `assert` pour tester la classe et verifier son fonctionnement, par exemple:

```cpp
#include <cassert>
#include "Firewall.hpp"

int main()
{
    Firewall firewall;

    assert(!firewall.check(21));
    firewall.allow(21);
    assert(firewall.check(21));

    return 0;
}
```
