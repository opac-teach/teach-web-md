# Organisation du code

Afin d’éviter d’avoir des fichiers de code trop gros, il est habituel de séparer le code en plusieurs fichiers. Les classes seront en general écrite chacune dans un fichier à part.

Pour pouvoir utiliser des classes, fonctions ou autre déclarées dans d’autres fichiers, il faudra créer des fichiers de header et les inclure là où on les utilise

### Contenus des fichiers

```cpp
// Voiture.hpp

#ifndef _VOITURE_H
#define _VOITURE_H

#include <string>

class Voiture
{
private:
    std::string marque;

public:
    Voiture(const Voiture &v);
    Voiture(std::string m, int a);
    ~Voiture();

    std::string getMarque();
    void setMarque(const std::string &m);
};

#endif
```

```cpp
// Voiture.cpp

#include <iostream>
#include <string>
#include "Voiture.hpp"

Voiture::Voiture(const Voiture &v) : marque(v.marque), annee(v.annee)
{
}
Voiture::Voiture(std::string m, int a)
{
    marque = m;
    annee = a;
}

Voiture::~Voiture()
{
    std::cout << "Destruction de la voiture " << marque << std::endl;
}

std::string Voiture::getMarque()
{
    return marque;
}

void Voiture::setMarque(const std::string &m)
{
    marque = m;
}
```

```c
// main.cpp
#include "Voiture.hpp"

int main()
{
    Voiture v1 = Voiture("Toyota", 2001);
    v2->setMarque("Renault");
}
```

### Compilation

Pour compiler un programme qui contient plusieurs fichiers, il suffit d’ajouter tous les fichiers .cpp au compilateur:

`g++ -o executable main.cpp class.cpp`

### Makefile

Cet outil permet de faciliter la compilation.

Voici un exemple pour le C++:

```makefile
OUT = main

SRC = *.cpp
CFLAGS = -O -Wall -std=c++17
CC = g++
OBJ = $(SRC:.cpp = .o)

$(OUT): $(OBJ)
	$(CC) $(CFLAGS) -o $(OUT) $(OBJ)

clean:
	rm -f $(OUT) *.o
```

Cette configuration compilera tous les fichiers .cpp dans le dossier courant et créera un executable qui s’appellera `main`
Pour compiler, lancer la commande `make`
