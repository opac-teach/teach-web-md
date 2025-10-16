# Nouveaux types de variables

Le C++ apporte de nouveaux types de variables qui faciliteront le travail pour les développeurs.

### bool

Permet de représenter des booléens: `true` et `false`.

```cpp
bool isReady = true;
```

### Modifier const

Si une variable ne doit jamais changer, ont dit que c’est une **constante**. Pour forcer une variable à être constante, nous rajouterons le mot clé `const` avant _ou_ après son type lors de sa definition.

```cpp
int const PI = 3.14;
const int PI = 3.14; // equivalent

PI = 6.2; // Plus possible
```

### auto

`auto` n’est pas vraiment un type de variable, mais un mot clé pour que le compilateur décide automatiquement du type de la variable, si on l’initialise au moment de sa déclaration et que son type n’est **pas ambigu**

Nécessaire d’utiliser au moins la version C++11 : `g++ -std=c++11`

```cpp
// ok
int varInt = 5;
auto varAuto = varInt;

// pas ok
auto varAuto2;
if(a < b) {
	varAuto2 = 5.5;
} else {
	varAuto2 = true;
}
```

# Les conteneurs

Une notion appelée conteneurs fait son apparition, et servira a stocker des ensembles de variables.

En C, notre seule option était d’utiliser des tableaux, qui servaient à stocker des suites de variables du même type. On les écrivait comme cela:

```cpp
int tableau[5] = { 1, 2, 3, 4, 5 };
```

Désormais, nous pourrons utiliser les conteneurs de la librairie standard, dont particulièrement `std::array` , `std::vector` et `std::string`.

Ces conteneurs ont pour rôle de stocker des ensemble d'elements, de manière differentes, mais en offrant des outils similaires pour tous.

## Types

- [Array](#array)
- [String](#string)
- [Vector](#vector)
- [Map](#map)
- [Set](#set)

### Array

https://en.cppreference.com/w/cpp/container/array

`std::array` est l’équivalent des tableaux que nous avions en C, c’est à dire **statiques**.

Nous ne pourrons plus modifier sa taille, ajouter ou supprimer des éléments une fois qui aura été créé.

Il est nécessaire d’inclure `<array>`

- Déclarer un tableau statique

```cpp
#include <array>

int main()
{
    // valeurs modifiables
    std::array<int, 5> tableau = { 1, 2, 3, 4, 5 };

    // similaire à
    int tableau[5];

    // valeurs non modifiables
    std::array<int, 5> const tableau_constant = { 1, 2, 3, 4, 5 };

    return 0;
}
```

Vous pouvez répérer une nouvelle syntaxe dans la déclaration de ce nouveau type de variable: `<int, 5>`. Cela veut dire que le type `std::array` est un **generique**. Nous verrons ce que cela veut dire précisement plus tard, mais dans ce cas précis, nous indiquons que ce tableau contiendra des variables de type `int` et en contiendra exactement `5`, de manière similaire à la syntaxe `int xxx[5]`

- Acceder aux elements

```cpp
// Comme en C
tableau[3]; // lit le 4 element
```

- Modifier un element

```cpp
// Comme en C
tableau[3] = 12;
```

- Remplir le tableau

```cpp
tableau.fill(10);
```

- Connaitre la taille

```cpp
std::size(tableau)
```

_Nous ne pouvions pas connaitre la taille d'un tableau en C !_

- Copier un tableau

```cpp
std::array<int, 5> copie_du_tableau = tableau;
// On obtient deux tableaux distincts
// si on modifie l'un, l'autre ne sera pas modifié

// Different de
int t1[5];
int t2[5];
t2 = t1;  // ici on a deux pointeurs sur un seul tableau
// si on modifie l'un, l'autre sera modifié aussi
```

- Itérer sur le tableau

```cpp
// For classique
for (int i = 0; i < std::size(tableau); i++)
{
    std::cout << tableau[i] << std::endl;
}
// For Each
for (int const element : tableau)
{
    std::cout << element << std::endl;
}
```

### String

https://en.cppreference.com/w/cpp/string/basic_string

Pour rappel, les chaines de caractères sont en fait des suites de caractères simples.

En C, nous utilisions les tableaux de caractères `char []` ou `char *`.

En C++ nous utiliserons `std::string`

Il est nécessaire d’inclure `<string>`

```cpp
#include <string>

int main()
{
		std::string phrase = "Voici une phrase.";

		phrase = "Voici une autre phrase.";

    return 0;
}
```

Leur fonctionnement de base est similaire aux Array, avec des possibilités en plus.

Dans l'exemple precedent, un amateur du C remarquera quelque chose d'étrange: en effet, en C, lorsqu'une chaine de caractère a été définit, sa taille est fixe et ne peut plus changer. Ici, on voit que la deuxieme chaine de caractère est plus longue que la première, et cela fonctionne quand même.

C'est un des gros avantage des conteneurs: il effectuent automatiquement des opérations essentielle, comme ici redimensionner la taille du tableau de caractères sous-jacent.

- **Premier et dernier caractère**

```cpp
std::cout << "Première lettre : " << phrase.front() << std::endl;
std::cout << "Dernière lettre : " << phrase.back() << std::endl;
```

- **Vérifier qu’une chaîne est vide**

```cpp
std::cout << "Est ce vide ? " << std::empty(phrase) << std::endl;
```

- **Ajouter ou supprimer un caractère à la fin**

```cpp
phrase.pop_back();     // supprimer un caractère a la fin
phrase.push_back('.'); // ajouter un caractère a la fin
```

- **Supprimer tous les caractères**

```cpp
phrase.clear();
```

- **Comparer deux chaines**

```cpp
phrase.compare("test");
std::string p2 = "test";
phrase.compare(p2);
```

- **Découper une chaine**

```cpp
std::string phrase = "Hello world";
std::string s1 = phrase.substr(0, 5);  // = "Hello"
std::string s2 = phrase.substr(6, 11); // = "world"
```

Ajouter un `s` apres une chaine de caractère le force à être un `std::string`

### Vector

https://en.cppreference.com/w/cpp/container/vector

Enfin, le nouveau type de tableau le plus interessant que nous allons retrouver en C++ est `std::vector`

Ce dernier nous permettra de créer des **tableaux dynamiques**, dont la taille pourra être modifiée. On pourra ajouter et supprimer des éléments à ce tableau.

Notons ici que les valeurs stockées en mémoire sont **contiguës**.

Il est nécessaire d’inclure `<vector>`

```cpp
#include <string>
// N'oubliez pas cette ligne.
#include <vector>

int main()
{
    std::vector<int> tableau_de_int;
    std::vector<double> tableau_de_double;
    // Même avec des chaînes de caractères c'est possible.
    std::vector<std::string> tableau_de_string;

    return 0;
}
```

Le fonctionnement est encore similaire à `array`, avec des choses en plus. Ce qui est faisable avec `array` est aussi faisable avec `vector`.

Ici, on voit qu'il n'est plus necessaire d'indiquer la taille du tableau dans sa déclaration, uniquement son type avec `<int>`. A leurs création, les vecteurs seront vides, (de taille nulle), et on pourra rajouter ou supprimer des elements quand on le souhaite.

- **Premier et dernier element**

```cpp
std::cout << "Premier : " << tableau_de_int.front() << std::endl;
std::cout << "Dernier : " << tableau_de_int.back() << std::endl;
```

- **Vérifier si un tableau est vide**

```cpp
std::cout << "Est-ce vide ? " << std::empty(tableau_de_int) << std::endl;
```

- **Ajouter un element à la fin**

```cpp
tableau_de_int.push_back(36);
```

- **Supprimer le dernier élément**

```cpp
tableau_de_int.pop_back();
```

- **Assigner des valeurs**

```cpp
tableau_de_int.assign(10, 42); // on affecte 10 fois la valeur 42
```

Exemple d’utilisation

```cpp
std::vector<std::string> tableau_de_string;

tableau_de_string.push_back("Phrase 1"); // Ajout à la fin
tableau_de_string.push_back("Phrase 2"); // Ajout à la fin

// For normal
for(int i=0; i< std::size(tableau_de_string); i++) {
	std::cout << tableau_de_string[i] << std::endl;
}

// For Each
for(std::string s : tableau_de_string) {
	std::cout << s << std::endl;
}

tableau_de_string.pop_back(); // Suppression du dernier
tableau_de_string.clear(); // Suppression de tous les elements
```

## Itérateurs

Les types de conteneurs que nous venons de voir sont particuliers car nous pouvons acceder à leurs élements par leur index numérique avec la notation `container[index] = element`. Cependant, certains types de conteneurs (que nous verrons bientôt) n’auront pas d’index composé d’entiers numériques successifs.

Pour parcourir les éléments de ces conteneurs, il a donc été inventé un nouveau type qu’on appelle **itérateur**.

### Utilisation

Pour déclarer un itérateur, nous prendrons le type de son conteneur et ajouterons `::iterator`, par exemple, `std::array<float, 5>::iterator`.

Pour des conteneurs constants, utiliser `const_iterator`

Pour créer un itérateur pointant sur le premier élément d'un conteneur, on utilise `std::begin()`

```cpp
std::vector<int> tableau = { 11, 22, 33, 44 };
std::vector<int>::iterator tableau_iterateur = std::begin(tableau);

// pour les conteneurs constants
std::vector<float> const tableau_constant = { 50, 51, 52, 53 } ;
std::vector<float>::const_iterator tableau_contant_iterateur = std::begin(tableau_constant);
```

Un itérateur permet de parcourir tous les élements d'un conteneur, et pour cela il va prendre la forme d'un pointeur vers un de ces éléments. Nous ferons avancer ce pointeur vers les éléménts suivants au fur et à mesure que nous avançons dans le parcours.

Pour acceder à un element pointé par un itérateur, il faut le **déreférencer**:

```cpp
std::cout << *tableau_iterateur << std::endl; // 11
```

Pour se déplacer, on incrémentera ou décrementera l’itérateur:

```cpp
std::cout << *tableau_iterateur << std::endl; // 11
tableau_iterateur++;
std::cout << *tableau_iterateur << std::endl; // 22
tableau_iterateur--;
std::cout << *tableau_iterateur << std::endl; // 11
tableau_iterateur += 2;
std::cout << *tableau_iterateur << std::endl; // 33
```

### Fin d'un itérateur

`std::end()` est une valeur spéciale que peut prendre un itérateur, qui indique que le nous avons parcouru tous les éléments du conteneur.

Celui-ci est également similaire à un pointeur, mais il ne pointera vers aucun élément du conteneur, plutot sur un element virtuel inexistant, **après** le dernier element.

Attention, il ne faut surtout pas déréferencer un tel itérateur, sinon le programme lancera une runtime exception et s'arretera.

```cpp
std::vector<int> tableau = { 11, 22, 33, 44 };
std::vector<int>::iterator tableau_iterateur = std::end(tableau);

tableau_iterateur--;
std::cout << *tableau_iterateur << std::endl; // 53
```

### Exemple de parcours

```cpp
#include <iostream>
#include <vector>

int main()
{
    std::vector<int> tableau = { -1, 28, 346, 84 };

    for (std::vector<int>::iterator it = std::begin(tableau); it != std::end(tableau); ++it)
    {
        std::cout << *it << std::endl;
    }

    return 0;
}
```

### Exemple raccourci

Il existe une manière encore plus simple d'itérer sur les conteneurs, mais sur laquelle on a moins le contrôle.

```cpp
void print_container(const std::vector<int>& container)
{
    for (int value : container) {
        std::cout << value << ' ';
    }
    std::cout << '\n';
}
```

Si la syntaxe est encore floue, continuez le cours et revenez ici plus tard.

### Utilisation des itérateurs dans les containers

Certaines fonctions proposées par les conteneurs pour les manipuler ne peuvent pas prendre d'index numériques comme parametres, mais doivent recevoir des itérateurs vers des posiitons.

- Exemple: **Supprimer** un élément dans un `vector` avec `erase`

```cpp
std::vector<int> nombres = { 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 };
// suppression du quatrième element
nombres.erase(std::begin(nombres) + 3);
// suppression des elements entre le premier (inclus) et le dernier (non inclus)
nombres.erase(std::begin(nombres), std::begin(nombres) + 2);
```

## Algorithms

La librairie standard offre un ensemble de fonctions qui se trouvent très utile pour utiliser les conteneurs.

```cpp
#include <algorithm>
```

- **compter** avec `count`

```cpp
std::string const phrase = "Exemple de phrase.";
// compter les 'e' dans toute la phrase
int const nombre_ez { std::count(std::begin(phrase), std::end(phrase), 'e') };
```

- **trouver** avec `find`

```cpp
std::string const phrase { "Exemple avec plusieurs mots." };

// On obtient un itérateur pointant sur le premier espace trouvé.
std::string::iterator iterateur_mot = std::find(std::begin(phrase), std::end(phrase), ' ');
// Si l'on n'avait rien trouvé, on aurait obtenu std::end(phrase) comme valeur de retour.

```

- **trier** avec `sort`

Fonctionne avec les nombres et les caractères. Cette fonction modifiera le container donné pour le réordonner

```cpp
std::vector<double> constantes_mathematiques = { 2.71828, 3.1415, 1.0836, 1.4142, 1.6180 };
std::sort(std::begin(constantes_mathematiques), std::end(constantes_mathematiques));
```

- **inverser** l’ordre avec `reverse`

Va également modifier le container de départ

```cpp
std::list<int> nombres { 2, 3, 1, 7, -4 };
std::reverse(std::begin(nombres), std::end(nombres));
```

- **Etc** … Il y en a beaucoup, allez lire les documentations ! Il existe certainement déjà un outil pour réaliser l’opération que vous souhaitez realiser…

## Plus de containers

Maintenant que nous avons vu les bases des containeurs et les itérateurs, nous pouvons utiliser des types plus complexes, qui eux ne possèdent pas forcement d'index numérique incrémental.

https://en.cppreference.com/w/cpp/container

### Set

Les sets sont des conteneurs qui contient un ensemble de valeurs uniques. A voir comme un `vector` mais où l’on ne pourra pas mettre deux fois la même valeur.

```cpp
std::set<int> set = {1, 5, 3};

std::array<int, 7> arr = {1, 2, 2, 3, 3, 3, 4};
std::set<int> s2 = std::set(arr.begin(), arr.end());
// s2 == { 1, 2, 3, 4 };
```

### Map

Les maps sont des listes indexées par des Clés→Valeurs. Les clés sont uniques.

Imaginer un tableau à deux colonnes:

| Clé | Valeur |
| --- | ------ |
| CPU | 10     |
| GPU | 15     |
| RAM | 20     |

```cpp
std::map<int, int> redirections;
redirections[80] = 8000; // ajouter/modifier un element
redirections[21] = 1021;
f.erase(21); // Supprimer un element

std::map<std::string, int> computer;
computer["CPU"] = 10;
computer["GPU"] = 15;
computer["RAM"] = 20;
std::cout << computer["GPU"];  // Recuperation de valeur

// Initialisation
std::map<std::string, int> details{{"CPU", 10}, {"GPU", 15}, {"RAM", 20}};

// Iterer avec iterateurs
for (std::map<std::string, int>::const_iterator it = m.begin(); it != m.end(); ++it) {
	std::cout << it->first << " = " << it->second;
}

// Iterer avec For Each
// Chaque ligne du tableau est une paire
for (std::pair<std::string, int> paire : m)
{
    std::cout << "Clé : " << paire.first << std::endl;
    std::cout << "Valeur : " << paire.second << std::endl << std::endl;
}
```

### Unordered

Map et Set sont des types appellés “ordonnées”, leur clés/valeurs sont triés par ordre croissant. Elles possèdent aussi une version “unordered”, qui est plus performante, mais dont l’ordre de lecture sera aléatoire.

```cpp
std::unordered_map<std::string, int> m;
std::unordered_set<int> s;
```

- Utilisez `std::map` lorsque vous avez besoin de maintenir les éléments triés ou lorsque vous avez besoin d'itérer sur les éléments dans un ordre spécifique.
- Utilisez `std::unordered_map` lorsque la performance est critique et que l'ordre des éléments n'a pas d'importance.

## Resumé des differents conteneurs

|        |  Type d'elements |  Taille variable |  Elements uniques |
| ------ | ---------------- | ---------------- | ----------------- |
| array  | \*               | non              | non               |
| vector |  \*              | oui              | non               |
| string | char             | oui              | non               |
| set    | \*               | oui              | oui               |
| map    | \* > \*          | oui              | non               |

### Exemple de serialisation/deserialisation

```cpp
    std::stringstream ss;
    std::string a = "bonjour";
    std::string b = "aurevoir";
    ss << a << ':' << b << std::endl;

    std::string concat = ss.str();

    size_t pos = concat.find(':');
    std::string aa = concat.substr(0, pos);   // == bonjour
    std::string bb = concat.substr(pos + 1);  // == aurevoir
```

# Polymorphisme

Le polymorphisme est un concept de la programmation orientée objet qui permet à utiliser des outils similaires sur différents types de données.

On peut distinguer le polymorphisme statique, qui est résolu à la compilation, et le polymorphisme dynamique, qui est résolu à l'exécution.

## Templates

Les templates sont des fonctions ou structure dont des variables ont des types qui peuvent changer.

```cpp
#include <vector>
#include <iostream>

template <typename T>
T addition(T a, T b)
{
    return a + b;
}

template<class T>
struct Coordinates
{
    T x;
    T y;
};

int main()
{
    float c = addition<float>(1.2, 2.3);
    int d = addition<float>(2, 3);
    std::cout << c << std::endl;
    std::cout << d << std::endl;

    struct Coordinates<int> c1;
    c1.x = 10;
    struct Coordinates<float> c2;
    c2.x = 10.5;
}
```

## La surcharge de fonction

La surcharge de fonctions (ou surchage de méthodes), est un concept en C++ qui permet de définir plusieurs fonctions ayant le même nom mais des signatures différentes au sein d'une même portée. La signature d'une fonction inclut son nom, le nombre et le type de ses paramètres. La surcharge permet d'implémenter des fonctions qui accomplissent des tâches similaires mais avec des types ou nombres de paramètres différents.

Par exemple:

```cpp
int addition(int a, int b) {
    return a + b;
}

// Fonction pour ajouter deux nombres à virgule flottante
double addition(double a, double b) {
    return a + b;
}

// Fonction pour ajouter trois entiers
int addition(int a, int b, int c) {
    return a + b + c;
}

std::cout << addition(3, 4) << std::endl; // Appelle addition(int, int)
std::cout << addition(3.5, 2.5) << std::endl; // Appelle addition(double, double)
std::cout << addition(1, 2, 3) << std::endl; // Appelle addition(int, int, int)
```

Au moment de l’appel à la fonction, le programme reconnaitra automatiquement, en fonction des paramètres donnés, laquelle appeler.

Les paramètres des prototypes des differentes fonction surchargées doivent être differentes pour qu’il puisse choisir. Le choix pour le compilateur **ne doit pas être ambigü**

L’exemple suivant ne fonctionne pas:

```cpp
int fonction(int a);
double fonction(int a); // Erreur : le type de retour seul ne peut pas différencier les fonctions

fonction(2); // Laquelle des deux choisir ?
```

## Surcharge d’opérateurs

Prochainement...
