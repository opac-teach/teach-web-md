# Les flux

De nouveaux opérateurs font leur entrée, appelés flux (stream), représentés par les symboles `<<` et `>>`.

Ils permettent de gérer un flux de données entre des entités, et la donnée se dirige dans le sens des flèches.

`a << b;`: `b` va vers `a`

`a >> b;`: `a` va vers `b`

# Entrées/sorties

En C, pour afficher et demander des informations dans la console, nous utilisions `printf` et `scanf`.

Désormais nous utiliserons les entrées et sorties de la bibliothèque standard.

Il est nécessaire d’inclure `<iostream>`

## Sorties

Pour afficher des messages dans la console, on utilisera la **sortie standard**.
Voici comment fonctionne la sortie avec `std::cout`

```cpp
#include <iostream>

int main()
{

    // On peut afficher une chaine de caractère
    std::cout << "Bonjour" << std::endl;
    // printf("Bonjour\n");

    // Ou bien un caractère seul.
    std::cout << 'A' << std::endl;

    // Ou bien un chiffre.
    std::cout << 7 << std::endl;

    // Ou bien une variable
    int temperature = 25;
    std::cout << temperature << std::endl;

    // On peut aussi les combiner
    std::cout << "Il fait " << temperature << " degrées" << std::endl;
    // printf("Il fait  %d degrées\n", temperature);

    return 0;
}
```

Pour sauter des lignes, nous utilisons `std::endl` (équivalent de `\n` )

Et plus besoin de se rappeler les codes des types de variables avec `printf` !

## Entrées

Pour les entrées nous utiliserons l'**entrée standard** avec `std::cin` en changeant le sens des crochets `>>`

```cpp

#include <iostream>

int main()
{
    std::cout << "Entre ton age : " << std::endl;
    int age = 0;
    std::cin >> age;
    std::cout << "Tu as " << age << " ans.\n";

    return 0;
}
```

Pour les chaines de caractères, utiliser `std::getline`

```cpp

#include <iostream>

int main()
{
    std::string phrase;
    std::getline(std::cin, phrase);
    std::cout << phrase;

    return 0;
}
```

Pour savoir dans quel sens placer les flèches, il suffit de se demander dans quel sens va l'information:

- `std::cout << "hello";`: "hello" va vers `cout` (sortie)
- `std::cin >> variable;`: `cin` (entrée) va vers `variable`

## Fichiers

Pour lire et écrire dans des fichiers, nous utiliserons `std::ifstream` et `std::ofstream`

### Lecture

```cpp
#include <iostream>
#include <fstream>
#include <string>

int main() {
    std::ifstream file("example.txt"); // ouverture de fichier en lecture
    if (!file.is_open()) {             // verification qu'il s'est bien ouvert
        std::cerr << "Erreur lors de l'ouverture du fichier." << std::endl;
        return 1;
    }

    std::string line;
    while (std::getline(file, line)) {  // lecture ligne par ligne
        std::cout << line << std::endl;
    }

    file.seekg(0, std::ios::beg);       // deplacement du curseur au debut

    char c;
    while (file.get(c)) {  // lecture lettre par lettre
        std::cout << c;
    }

    file.close();                       // Fermeture du fichier
    return 0;
}
```

### Ecriture

```cpp
#include <iostream>
#include <fstream>

int main() {
    std::ofstream file("output.txt");  // ouverture de fichier en ecriture
    if (!file.is_open()) {
        std::cerr << "Erreur lors de l'ouverture du fichier." << std::endl;
        return 1;
    }

    file << "Ceci est une ligne de texte." << std::endl; // ecriture dans le fichier
    file << "Ceci est une autre ligne de texte." << std::endl;

    file.close();
    return 0;
}
```

**Attention**, par défaut ici on va écraser le contenu du fichier. Tout le contenu precedent sera perdu.

Si on veut rajouter du contenu à la fin, on écrira:

```cpp
std::ofstream file("output.txt", std::ios::app); // append
```

## Gestions des erreurs des entrées

Avec le code suivant, si on tape une chaine de caractère au lieu d’un entier, on aura un problème pour taper son nom:

```cpp
#include <iostream>
#include <string>

int main()
{
    std::cout << "Entre ton age : ";
    unsigned int age = 0;

    std::cin >> age;
    std::cout << "Tu as " << age << " ans.\n";
    std::cout << "Entre ton nom : ";
    std::string nom = "";
    std::cin >> nom;
    std::cout << "Tu t'appelles " << nom << ".\n";

    return 0;
}
```

La solution réside dans l’exemple suivant, qui va tester si l’entrée s’est bien passée, et remettre a zero `cin` autrement

```cpp

#include <iostream>
#include <limits>
#include <string>

template <typename T>
void input(T &var)
{
    while (!(std::cin >> var))
    {
        std::cout << "Il y a eu une erreur, recommencer:" << std::endl;
        std::cin.clear();                                                   // On remet std::cin dans un état fonctionnel.
        std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n'); // On vide les caractères mémorisés.
    }
    std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n'); // On vide les caractères mémorisés.
}

int main()
{
    unsigned int age = 0;

    std::cout << "Entre ton age : ";
    input(age);
    std::cout << "Ton age " << age << std::endl;

    return 0;
}
```
