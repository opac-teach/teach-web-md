# Divers

## assert

Si l’on souhaite garantir une condition pendant l’execution de notre programme, on peut utiliser assert. Si la condition est fausse, le programme va s’arreter.

```cpp
#include <cassert>

int a = 5;
int b = 6;
assert(a < b);
```

## Concatenation

Lorsqu’on a besoin de remplir des chaines de caractères avec des valeurs de variables, on peut utiliser `std::streamstring`

```cpp
#include <sstream>

int a = 5;
float b = 12.5;
std::string s = "coucou";

std::stringstream ss;
ss << "a: " << a << " b: " << b << " s: " << s;

std::string final = ss.str(); // -> "a: 5 b: 12.5 s: coucou"
```
