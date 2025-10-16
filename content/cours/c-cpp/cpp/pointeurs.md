# Les pointeurs

### Rappel sur les pointeurs

Les pointeurs sont des outils qui nous permettent de savoir où est stockée une donnée dans la mémoire, et de pouvoir modifier des variables en dehors du scope dans lequel elles sont définies.

## Les references

En C++ est introduite la notion de **reference**. Le concept est similaire à celui des pointeurs, à la difference près qu’une reference s’utilise de la même manière qu’une variable normale, tout en restant liée à une autre variable.

Une réference est définie avec le symbole `&` lors de la déclaration, contrairement aux pointeurs qui sont définis avec `*`.

Lors de l'utilisation, pas besoin d'utiliser `*` pour accéder à la valeur pointée, ni à `&` pour obtenir l'adresse.

```cpp
int variable = 24;
int &variable_ref = variable;
// variable et variable_ref représentent éxactement la même chose et sont interchangeables

variable_ref = 42;
std::cout << variable << std::endl; // 42
std::cout << variable_ref << std::endl; // 42
```

### Passage par référence

Dans les fonctions, on peut passer des arguments par référence, en utilisant le symbole `&` dans la déclaration de la fonction. Cela signifie que la fonction pourra modifier la variable passée en argument, et aussi que celle-ci ne sera pas copiée (gain de performance).

En effet, quand on passe une variable par valeur à une fonction (pas de \* ou &), celle-ci est copiée dans une nouvelle variable locale à la fonction. Si la variable est grosse (comme un tableau ou une classe), cela peut être couteux en performance. Le fait de passer un pointeur ou une reference évite cette copie et améliore la vitesse d'éxecution et la consommation mémoire.

```cpp
#include <iostream>

void fonctionParRef(int &reference)
{
    reference = 10;
}

int main()
{
    int variable = 24;

    fonctionParRef(variable);
    std::cout << variable << std::endl; // 10

    return 0;
}
```

Cette syntaxe est un peu plus simple à écrire et utiliser que les pointeurs, mais elle ne convient pas dans tous les cas.

Petit rappel de l'équivalent avec des pointeurs:

```cpp
#include <iostream>

void fonctionParPointeur(int *pointeur)
{
    *pointeur = 10;
}

int main()
{
    int variable = 24;

    fonctionParPointeur(&variable);
    std::cout << variable << std::endl; // 10

    return 0;
}
```

Lorsqu'on veut bénéficier du gain de performances, mais qu'on ne souhaite pas qu'une fonction puisse modifier les variables passées en arguments, on peut les passer en **réference constante**.

```cpp
void fn(std::string& s)
{
		s = "hello"; // possible
}
void fn(const std::string& s)
{
		s = "hello"; // pas possible
}
```

```cpp
#include <vector>
#include <iostream>


void print_container(const std::vector<int>& c)
{
    for (int i : c) {
        std::cout << i << ' ';
    }
    std::cout << '\n';
}

int main()
{
    std::vector<int> c = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9};
    print_container(c);
}
```

### Types de pointeurs et références constantes

```cpp
std::string a = "hello";

// s est une reference non modifiable vers une variable modififable
const std::string &s1 = a;

s1 = "hello"; // Pas possible de le modifier

// s est un pointeur non modifiable vers une variable modifiable
std::string *const s3 = &a;

s3 = &b;      // Pas possible de modifier le pointeur
*s3 = "hehe"; // Ok de changer la valeur

// s est un pointeur non modifiable vers une variable non modifiable
const std::string *const s4 = &a;

s4 = &b;      // Pas possible de modifier le pointeur
*s4 = "hehe"; // Pas possible de modifier la valeur
```

## Allocation de la mémoire

En nous C utilisions `malloc` pour allouer de la mémoire, et `free` pour la libérer. Désormais nous utiliseront `new`et `delete`

```cpp
int * entier = new int; // alloue un entier

delete entier;          // libère l'entier

int * tableau = new int[10]; // alloue un tableau de 10 entiers

delete [] tableau;    // Libère un tableau d'entier, ne pas oublier les crochets []
```
