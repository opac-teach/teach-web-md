# Buffer overflow

## Memory safety

Les buffer overflows sont parmi les vulnérabilités les plus courantes et dangereuses dans les programmes C. Ils se produisent lorsqu'un programme écrit plus de données dans un tampon (buffer) qu'il ne peut en contenir, ce qui provoque l'écrasement des données adjacentes en mémoire.

Ils peuvent amener à:

- Des plantages de programmes
- Des fuites d'informations sensibles
- L'exécution de code arbitraire par un attaquant

Rôle d’un expert en securité:

- Trouver ces vulnerabilités dans des logiciels et les résoudre
- Empecher ces vulnerabilités dans les nouveaux codes

## Rust

## Exemples de Buffer Overflows

### Exemple 1: Débordement de tableau sur la pile

```c
#include <stdio.h>
#include <string.h>

void fonction_vulnerable() {
char buffer[10]; // Un petit buffer de 10 caractères

    // Danger: nous copions 20 caractères dans un buffer de taille 10
    strcpy(buffer, "Ceci est une chaîne beaucoup trop longue!");

    printf("Buffer contient: %s\n", buffer);

}

int main() {
fonction_vulnerable();
return 0;
}
```

Ce code provoquera probablement un "Segmentation fault" car `strcpy()` ne vérifie pas les limites du buffer de destination.

#### Solution: Utiliser des fonctions sécurisées

```c
#include <stdio.h>
#include <string.h>

void fonction_securisee() {
char buffer[10];

    // Utilisation de strncpy au lieu de strcpy
    strncpy(buffer, "Ceci est une chaîne trop longue!", sizeof(buffer) - 1);

    // Assurer que la chaîne est terminée par un caractère nul
    buffer[sizeof(buffer) - 1] = '\0';

    printf("Buffer contient: %s\n", buffer);

}

int main() {
fonction_securisee();
return 0;
}
```

### Exemple 2: Corruption de variables adjacentes

```c
#include <string.h>

void fonction_vulnerable() {
    int valeur_importante = 42;
    char buffer[10];

    printf("Avant overflow: valeur_importante = %d\n", valeur_importante);

    // Danger: débordement du buffer qui va écraser valeur_importante
    strcpy(buffer, "AAAAAAAAAAAAAAAAAA");

    printf("Après overflow: valeur_importante = %d\n", valeur_importante);

}

int main() {
fonction_vulnerable();
return 0;
}
```

Dans cet exemple, la variable `valeur_importante` sera écrasée par le débordement de `buffer`.

#### Solution 2: Vérifier les limites manuellement

```c
#include <stdio.h>
#include <string.h>

void fonction_securisee(const char \*entree) {
char buffer[10];

    // Vérifier la taille de l'entrée avant de copier
    if (strlen(entree) >= sizeof(buffer)) {
        printf("Erreur: entrée trop longue pour le buffer\n");
        return;
    }

    strcpy(buffer, entree);
    printf("Buffer contient: %s\n", buffer);

}

int main() {
fonction_securisee("Court"); // OK
fonction_securisee("Ceci est une chaîne beaucoup trop longue!"); // Rejeté
return 0;
}
```

### Exemple 3: Exploitation d'un buffer overflow pour modifier le flux d'exécution

```c
#include <stdio.h>
#include <string.h>

void fonction_secrete() {
printf("Félicitations! Vous avez réussi à exécuter la fonction secrète!\n");
}

void fonction_vulnerable(char *entree) {
    char buffer[16];
    int (*fonction_ptr)() = NULL;

    // Stockage du pointeur de fonction juste après le buffer
    fonction_ptr = NULL;

    // Copie dangereuse sans vérification de taille
    strcpy(buffer, entree);

    printf("Buffer contient: %s\n", buffer);

    // Si le pointeur a été modifié par l'overflow, il sera exécuté
    if (fonction_ptr) {
        fonction_ptr();
    }

}

int main() {
// Un attaquant pourrait construire une entrée qui écrase fonction_ptr
// avec l'adresse de fonction_secrete
    fonction_vulnerable("AAAAAAAAAAAAAAAA\xXX\xXX\xXX\xXX");
    return 0;
}
```

Note: Ce code est simplifié pour l'illustration. Dans un vrai exploit, les valeurs `\xXX` seraient remplacées par l'adresse mémoire réelle de `fonction_secrete`.

#### Solution: Utiliser des fonctions de la famille (C11)

```c
#define **STDC_WANT_LIB_EXT1** 1
#include <stdio.h>
#include <string.h>

void fonction_securisee() {
char buffer[10];

    // Utilisation de strcpy_s (disponible en C11)
    strcpy_s(buffer, sizeof(buffer), "Trop long");

    printf("Buffer contient: %s\n", buffer);

}

int main() {
fonction_securisee();
return 0;
}
```

#### Solution bis: Utiliser snprintf pour les chaînes formatées

```c
#include <stdio.h>

void fonction_securisee(const char \*nom) {
char buffer[20];

    // snprintf limite automatiquement l'écriture à la taille spécifiée
    snprintf(buffer, sizeof(buffer), "Bonjour, %s!", nom);

    printf("Buffer contient: %s\n", buffer);

}

int main() {
fonction_securisee("Étudiant");
fonction_securisee("Étudiant avec un nom très très long");
return 0;
}
```

## Bonnes pratiques pour éviter les Buffer Overflows

1. **Toujours vérifier les limites** des buffers avant d'y écrire des données.
2. **Utiliser des fonctions sécurisées** comme `strncpy()`, `strncat()`, `snprintf()` au lieu de `strcpy()`, `strcat()`, `sprintf()`.
3. **Valider toutes les entrées utilisateur** avant de les traiter.
4. **Utiliser des outils d'analyse statique** pour détecter les vulnérabilités potentielles.
5. **Considérer l'utilisation de langages plus sûrs** pour les applications critiques.

## Exercice pratique

Voici un exemple de code avec une vulnérabilité de buffer overflow:

```c
#include <stdio.h>
#include <string.h>

void fonction_vulnerable(char *entree, int taille) {
    char buffer[10];
    int number = 5;

    for(int i = 0; i < taille; i++) {
        buffer[i] = entree[i];
    }

    printf("Buffer contient: %s\n", buffer);
    printf("Number: %d\n", number);
}

int main() {
    fonction_vulnerable("ABCD", 4);
    return 0;
}
```

- Modifier le code pour exploiter la vulnérabilité
- Corriger le code pour éliminer la vulnérabilité
