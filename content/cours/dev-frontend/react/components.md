# Composants

Une application React est constituée de composants imbriqués. Séparer une application en composant permet de découper le code par rôle (single responsibility) et factoriser des zones réutilisables. 

## JSX

En React, un composant est une fonction. Pour décrire le rendu d'un composant, on utilise la syntaxe JSX, qui ressemble à du HTML mais est en réalité une extension de JavaScript.

https://react.dev/learn/your-first-component

Un composant peut être imbriqué dans un autre composant, et ainsi de suite.

Pour afficher des données dans un composant (interpolation), on utilise les accolades `{}`.

```tsx
function App() {
  return (
    <div>
      <Counter />
    </div>
  )
}
function Counter() {
  const count = 10;
  return <div>Count is {count}</div>
}
```

## Lifecycle

Une fonction de composant est appelée à chaque fois que le composant est rendu. React décide de quand ce rendu est déclenché, généralement par un changement d'état ou une modification de props.

Cela signifie que l'état des variables locales est perdu à chaque rendu, on va donc en general utiliser des constantes. 

```tsx
function Counter() {
  let count = 10;
  count++; // la valeur sera remise à 10 à chaque rendu
  return <div>Count is {count}</div>
}
```

https://react.dev/learn/keeping-components-pure

## Props

Pour passer des données à un composant, on utilise les props. Les props sont passées en argument à la fonction du composant.

```tsx
function App() {
    const name = "John";
    return <Hello name={name} />
}
function Hello({ name }) {
    return <div>Hello {name}</div>
}
``` 

https://react.dev/learn/passing-props-to-a-component

## Différence notables entre HTML et JSX

- `class` -> `className`
- `for` -> `htmlFor`
- `tabindex` -> `tabIndex`
- `key`: identifiant unique pour les éléments du rendu en liste
- `ref`: référence à un élément du DOM
- `onClick`: gestionnaire d'événement de clic
- `onChange`: gestionnaire d'événement de changement
- ...

## Interpolation avancée

Dans le JSX, le code placé entre accolades est interprété comme du JavaScript, il est donc possible d'utiliser des expressions complexes.

```tsx
function App() {
    const name = "John";
    const data = [0, 1, 2]
    return (
        <div>
            {/* Interpolation simple */}
            <p>{`Hello ${name}`}</p>
            <p>{1+1}</p>

            {/* Conditionnel */}
            {data[0] > 0 && <p>data[0] is greater than 0</p>}
            
            {/* Conditionnel ternaire */}
            <p>{Math.random() > 0.5 ? "Hello" : "World"}</p>

            {/* Rendu d'une liste */}
            <p>{data.map((item) => <span key={item}>{item}</span>)}</p>
        </div>
    )
}
```

Le rendu sera:
```html
<div>
    <p>Hello John</p>
    <p>2</p>

    <p>World</p>
    
    <p><span>0</span><span>1</span><span>2</span></p>
</div>
```

- https://react.dev/learn/conditional-rendering
- https://react.dev/learn/rendering-lists

## Evenements

Les événements sont des actions effectuées par l'utilisateur ou le navigateur, qui déclencheront des fonctions.

```tsx
function App() {
    function handleClick() {    
        alert("Hello")
    }
    function handleChange(event) {
        console.log(event.target.value)
    }
    return (
        <div>
            <input type="text" onChange={handleChange} />
            <button onClick={handleClick}>Click me</button>
        </div>
    )
}
```

## Fragments

Il est parfois necessaire de retourner plusieurs éléments d'un composant, sans pour autant les placer dans une balise HTML commune. Pour cela, on peut utiliser un fragment.

```tsx
function App() {
    return (
        // equivalent à <Fragment>
        <>
            <p>Hello</p>
            <p>World</p>
        </>
    )
}
```



## Typescript

Il est vivement recommandé d'utiliser TypeScript pour tous les projets Javascript, nottament avec React. Les composants seront alors écrits en TSX. 

Exemple de composant correctement typé:

```tsx
interface ButtonProps {
  label: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
  return (
    <button
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
```