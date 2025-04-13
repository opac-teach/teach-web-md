# Cheat Sheet - Langage C avancé

## Tableaux

Les tableaux sont des variables qui contiennent plusieurs elements.

Le premier index est 0.

```c
int tab[10];          // Declaration d'un tableau de taille 10
printf("%d", tab[0]); // Affichage du premier element du tableau
tab[9] = 5;           // Affectation du dernier element du tableau

int tab[] = { 2, 5, 7 }; // Affectation avec taille implicite lors de la declaration

int first_element(int tab[]) {
  return tab[0];
}

int tab[2][2] = { { 1, 2 }, { 3, 4 } }; // Tableau bidimensionnel (2 donc matrice)
```

## Chaines de caractères

- Les chaines de caractères (**string**) sont des suites de caractères.
- Représenté par des tableau de `char`
- Ecrit par des doubles apostrophes `"`
- Doivent finir par le symbole `\0`
- Le code pour `printf` est `%s`
- On ne met pas de `&` pour les `scanf` de chaines de caractère

```c
char string[255] = "Bonjour";
string[0] = 'C';
printf("%s", string);
scanf("%s", string);
```

## Structures

```c
struct Coordonnees
{
    int x;
    int y;
};

struct Coordonnees point = { 10, 20 };
point.x = 15;

struct Coordonnees *p = &point;
p->x = 20;
```

## Pointeurs

```c

void increment(int *p) {
  *p += 1;
}

int a = 10;

int *b = &a;
printf("%d", *b); // 10

*b = 20;
printf("%d", a); // 20

int *p = malloc(sizeof(int)); // Allocation dynamique
*p = 10;

increment(p);
printf("%d", *p); // 11

free(p); // Liberation de la memoire allouée
```
