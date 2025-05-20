# Server functions

En plus du rendu côté serveur et des routes handlers, React propose maintenant un autre système pour effectuer des actions côté serveur, les serveur functions (aussi appelées server actions).

- https://react.dev/reference/rsc/server-functions
- https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations

Ces fonctions sont très similaires aux routes handlers, mais à la différence qu'au lieu de définir une API REST, avec URL et un schema de données, que le client appelera, le client peut directement appeler une fonction. Cela fait gagner énormément de temps, car il n'est plus nécéssaire de creer des routes pour chaques actions, de sérialiser les données, les valider, etc... On appelle une fonction comme si elle était présente côté client. 

Ces fonctions peuvent être appelées depuis n'importe quel composant dans un event handler, useEffect, ou même passé comme directement comme action à un formulaire. 

Ils peuvent être définis:
- Dans un server component, une fonction marquée avec `'use server'` sera une server function.

```tsx
async function Component() {
  async function create() {
   'use server'
    await db.create({
      name: 'John Doe',
    })
  }

  return (
      <button type="submit" onClick={create}>Create</button>
  )
}
```

- Dans un fichier commençant par `'use server'`, toutes les fonctions de ce fichier seront des server functions.

```tsx
'use server'

export async function login(formData: FormData) {
  if (formData.get('password') === PASSWORD) {
    return true
  }
  throw new Error('Invalid password')
}
```

```tsx
'use client'
import { login } from './actions'

function LoginForm() {
    return (
        <form action={login}>
            <input type="password" name="password" />
            <button type="submit">Login</button>
        </form>
    )
}
```

### Gestion de l'état

Le hook `useActionState` permet de gérer l'état d'une server function.

```tsx
'use client'

import { login } from './actions'

function Component() {
  const [state, formAction, isPending] = useActionState(login, null)
  return (
    <form action={formAction}>
      <input type="text" name="name" />
      <button type="submit" disabled={isPending}>Create</button>
      {state.error && <p>{state.error}</p>}
    </form>
  )
}
```

Les exceptions ne sont pas gérés dans cette situation. Si l'action emet une erreur, le front l'ignorera, à moins qu'un fichier `error.tsx` soit présent, dans ce cas ce composant sera affiché.

Pour gérer correctement les erreurs, il est preferable d'éviter d'emetre des erreurs depuis les actions, mais plutot toujours une réponse ok avec un objet contenant des informations sur le succes de l'opération, par exemple:

```tsx
'use server'

export async function login(formData: FormData) {
  if (formData.get('password') === PASSWORD) {
    return {
      success: true,
      data: user
    }
  } else (
    return {
      success: false,
      error: 'invalid password'
    }
  )
}
```