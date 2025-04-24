# Cheat Sheet - Langage C

## Compilation

### Compiler

`gcc -Wall nom_du_fichier.c -o nom_de_lexecutable`

### Executer

`./nom_de_lexecutable`

# Syntaxe

- Pas sensible aux espaces, tabulations et sauts de ligne
- Les instructions doivent êtres séparés d’un `;`
- Un bloc est séparé par accolades `{ }`
- Chaque bloc indente vers la droite

### Casing

```c
int couleurVoiture;   // camelCase
int couleur_voiture;  // snake_case
int CouleurVoiture;   // PascalCase
#DEFINE COULEUR_VOITURE;  // UPPER_CASE
```

### Préprocesseur

Instructions commençant par `#`

- `include` : Inclure un fichier
- `define` : définir une constante
- `ifdef`, `endif`: si une constante est définie

# Variables

```c
// Déclaration (type + nom)
int var;

// Affectation ( = valeur )
var = 5;

// Déclaration + Affectation
int var = 5;
```

### Types

- `char`: caractères ( `'a'`, `'5'`, `'!'`, `'\n'`, …)
- `int`, `long`: nombres entiers (0, 1, 2, -5, …)
- `float`, `double`: nombres flottants (0.5, 5.2, -23.212 …)

Variable **signée**: positive ou négative

Variable **non signée**: uniquement positive (`unsigned char`, `unsigned int`, …)

### Tailles et plages de valeurs

Plage de valeurs: Avec X bits on peut compter jusqu’a `2^X-1` >> 8 bits ⇒ 2^8-1 = 255

1 octet = 8 bits

| Type            | Taille (octets) | Borne inférieure     | Borne supérieure        |
| --------------- | --------------- | -------------------- | ----------------------- |
| `char`          | 1               | -128                 | +127                    |
| `unsigned char` | 1               | 0                    | 255                     |
| `int`           | 4               | -2,147,483,648       | +2,147,483,647          |
| `unsigned int`  | 4               | 0                    | 4,294,967,295           |
| `long`          | 8               | -9223372036854775808 | +9223372036854775807    |
| `float`         | 4               | 1.2E-38              | 3.4E+38 (6 décimales)   |
| `double`        | 8               | 2.3E-308             | 1.7E+308 (15 décimales) |

### Booléens

Vrai ou faux / 0 ou 1

`true` / `false`

# Entrées/sorties

- Afficher texte: `printf("...", var1, var2)`
- Demander texte: `scanf("...", &var1, &var2)`
- Sauter une ligne: `\n`
- Doit inclure `stdio.h` pour les utiliser

### Codes de format

| Groupe                | Code de format | Types                                            |
| --------------------- | -------------- | ------------------------------------------------ |
| entiers signés        | `%d`           | `char`, `int`, `long`                            |
| entiers non signés    | `%u`           | `unsigned char`, `unsigned int`, `unsigned long` |
| flottants             | `%f`           | `float`, `double`                                |
| caractère             | `%c`           | `char`, `unsigned char`                          |
| chaines de caractères | `%s`           | `char *`                                         |

```c
#include <stdio.h>

int age;
printf("Quel est votre age ? \n");
scanf("%d", &age);
printf("Vous avez %d ans\n", age);
```

# Opérateurs

### Arithmétiques

```c
// addition
c = a + b;
// soustration
c = a - b;
// division
c = a / b;
// multiplication
c = a * b;
// modulo (reste de la division euclidienne)
c = a % b;

c = -a;

a += b;   /* == */   a = a + b;
a -= b;   /* == */   a = a - b;
a *= b;   /* == */   a = a * b;
a /= b;   /* == */   a = a / b;
a %= b;   /* == */   a = a % b;

i++;    /* == */  i = i + 1;
i--;    /* == */  i = i - 1;
```

### Booléens

```c
// égalité
a == b
// non-égalité
a != b

// strictement plus grand
a > b
// plus grand ou égal
a >= b

// strictement plus petit
a < b
// plus petit ou égal
a <= b
```

### Logique

```c
// AND (ET logique)
a && b

// OR (OU logique)
a || b

// NOT (NON logique)
!a

// Loi de Morgan
(a && b) == !(!a || !b)
```

### Tableau Opérateurs logiques AND et OR

| A    | B    | A AND B | A OR B |
| ---- | ---- | ------- | ------ |
| VRAI | VRAI | VRAI    | VRAI   |
| VRAI | FAUX | FAUX    | VRAI   |
| FAUX | FAUX | FAUX    | FAUX   |
| FAUX | VRAI | FAUX    | VRAI   |

### Tableau Opérateur logique NOT

| A    | NOT A |
| ---- | ----- |
| VRAI | FAUX  |
| FAUX | VRAI  |

# Contrôle de flux

## Structures conditionnelles

```c
// Si
if(/* condition */) {
	/* alors */
}

// Si, sinon
if(/* condition */) {
	/* alors */
}
else {
	/* sinon */
}

// Si, sinon si, sinon
if(/* condition */) {
	/* alors */
}
else if(/* condition */) {
	/* alors */
}
else {
	/* sinon */
}

switch (/* variable */) {
  case /* valeur 1 */:
  {
	  // ...
    break;
  }
  case /* valeur 2 */:
  {
	  // ...
    break;
  }
  default:
  {
    // ...
  }
}
```

## Boucles

```c
// Tant que:
while(/* condition */) {
	// bloc
}
// Exemple
int a = 0;
while(a < 10) {
	printf("%d", a);
	a++;
}

// Pour
for(/* initialisation */ ; /* condition */ ; /* itération */) {
  // bloc
}
// Exemple
for(int i=0; i < 10; i++) {
  printf("%d", i);
}
```

### Arrets de boucle

Utilisable **UNIQUEMENT** dans `while` `for` `switch`

- `continue` : sauter la suite de la boucle et retourner au début de celle-ci
- `break` arrêter la boucle

# Fonctions

![image.png](../assets/fn_decl.png)

```c
// Exemple
int somme(int a, int b) {
	return a + b;
}
```

- Une fonction est définie par son **prototype**: **nom**, **type de retour**, **arguments** (paramètres)
- Une fonction est dite **récursive** lorsqu’elle s’appelle elle même.
- Fonction principale: `int main()`
  - sa valeur de retour définit si le programme s’est bien executé (0: Succès, 1: Erreur)
