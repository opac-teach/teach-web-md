# Hooks

En react, les hooks sont des fonctions (systematiquement commençant par `use`) qui permettent de gérer l'état et les effets secondaires des composants. La librairie integre déjà un ensemble de hooks indispensable, et il est possible de créer ses propres hooks.

## useState

https://react.dev/reference/react/useState

Comme vu precedement, les variables locales des composants sont réinitialisées à chaque rendu. Pour conserver une valeur entre les rendus, on peut utiliser le hook `useState`. Celui ci retourne une paire de valeurs: la valeur courante et une fonction pour la modifier.

Lorsqu'une variable créée avec `useState` est modifiée avec son `set...`, tous les composants affichant cette variable seront re-rendus.

```tsx
function Counter() {
    const [count, setCount] = useState(0);
    return <div>
        <p>Count is {count}</p>
        <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
}
```

Attention: il ne faut pas modifier directement l'état d'une variable (`count` ici)

Pour modifier des valeurs dans un objet ou un tableau, on peut déstructurer, ou utiliser le prototype `set...(prevState => newState):
```tsx
const [data, setData] = useState({
    value: 0,
    name: "John"
});
setData({
    ...data,
    value: data.value + 1
})
setData(prev => ({
    ...prev,
    value: prev.value + 1
}))
```

## useEffect

https://react.dev/reference/react/useEffect

Ce hook servira a executer des actions qui auront des effets secondaires, tel que des appels API, des événements, des animations, etc.

Il prend en paramètre une fonction et un tableau de valeurs. La fonction sera appelée à chaque fois qu'une des valeurs du tableau change. Si un tableau vide est passé, la fonction sera appelée une seule fois après que le composant ait été créé.

Cette fonction peut retourner une fonction de nettoyage qui sera appelée lorsque l'effet sera relancé, ou lorsque le composant sera démonté.

```ts
useEffect(() => {
    console.log("Component mounted")

    return () => console.log("Component unmounted") // optionnel
}, [])

const [count, setCount] = useState(0);
useEffect(() => {
    console.log("count changed", count)
}, [count])
```

Attention: Toutes les variables qui peuvent potentiellement changer dans la fonction doivent être dans le tableau de dépendances.

## useMemo

https://react.dev/reference/react/useMemo

useMemo est un Hook React qui vous permet de mettre en cache le résultat d’un calcul d’un rendu à l’autre. Comme useEffect, il prend en paramètre une fonction et un tableau de valeurs. La fonction sera appelée à chaque fois qu'une des valeurs du tableau change.

Cela evite d'effectuer le même calcul à chaque rendu du composant. 

```tsx
const memoizedValue = useMemo(() => {
    return expensiveComputation(a, b);
}, [a, b]);
```


## useCallback

https://react.dev/reference/react/useCallback

useCallback est similaire à useMemo, sauf qu'il conserve une fonction plutot qu'une valeur.

```tsx
const memoizedCallback = useCallback(() => {
    doSomething(a, b);
}, [a, b]);
```

Cela permet d'optimiser les performances des composants et des hooks personnalisés en évitant de re-créer les fonctions à chaque rendu.

## useRef

https://react.dev/reference/react/useRef

useRef est un Hook React qui vous permet de créer une référence vers une valeur qui n'a pas d'incidence sur le rendu du composant. Si cette valeur change, le rendu ne sera pas ré-executé. Il est souvent utiliser pour stocker des references vers des elements du DOM

```tsx
const intervalRef = useRef(null);  
const inputRef = useRef(null);

function handleClick() {
    inputRef.current.focus();
}

useEffect(() => {
    intervalRef.current = setInterval(() => {
        console.log("tick");
    }, 1000);
    return () => clearInterval(intervalRef.current);
}, []);

return <div>
    <input ref={inputRef} />
    <button onClick={handleClick}>Focus</button>
</div>
```

## useContext

https://react.dev/reference/react/useContext

useContext est un Hook React qui vous permet d'acceder aux données d'un contexte.

```tsx
const MyContext = createContext(null);

function App() {
    return (
        <MyContext.Provider value="Hello">
            <MyComponent />
        </MyContext.Provider>
    )
}

function MyComponent() {
    const value = useContext(MyContext);
    return <div>{value}</div>;
}
```

Les contextes permettent de partager des données entre les composants sans avoir à les passer explicitement à chaque composant en tant que props.

# Hooks personnalisés

Il est possible de créer ses propres hooks. Pour cela, il faut suivre les règles de hooks et utiliser les hooks existants.

```tsx

function useCounter() {
    const [count, setCount] = useState(0)

    function increment() {
        setCount(count + 1)
    }

    useEffect(() => {
        console.log("count changed", count)
    }, [count])

    return [count, increment]
}

function MyComponent() {
    const [count, increment] = useCounter();
    return <div>
        <p>Count is {count}</p>
        <button onClick={increment}>Increment</button>
    </div>
}
```


# Rule of hooks

Les hooks doivent impérativement être utilisés à la racine d'un composant ou d'un autre hook, c'est à dire jamais de manière conditionnelle ou imbriquée. 

```jsx
function Counter() {
  const [count, setCount] = useState(0); // ✅
  if(count > 10) {
    const [count2, setCount2] = useState(0); // ❌
  }
  for (let i = 0; i < 10; i++) {
    const theme = useContext(ThemeContext); // ❌
  }
  if(count > 10) {
    return <div>Count is greater than 10</div>
  }
  const [count3, setCount3] = useState(0); // ❌
  //...
}
```


https://react.dev/reference/rules/rules-of-hooks

