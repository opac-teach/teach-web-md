# Styles, CSS et UI

Historiquement, il a existé de nombreux outils pour faciliter l'intégration du design dans une page web.

La technologie principale pour construire le style d'une page web est le CSS. Cependant, il devient rapidement fastidieux de n'utiliser que celui-ci lorsqu'une application grandit. C'est pourquoi de nombreux outils ont été créés pour faciliter l'expérience développeur et maintenir un code propre et maintenable.

Historiquement, on peut retrouver des outils comme **Bootstrap** ou **Material Design**. Aujourd'hui, la norme s'est tournée vers **Tailwind**, qui a été largement adopté et qui est très robuste.
Beaucoup de librairies l'utilisent comme base, et elle permet de modifier rapidement le style d'une page de manière cohérente, globale et indépendante.

Un développeur qui maîtrisera Tailwind pourra rapidement s'adapter à un projet existant qui l'utilise, et ce, peu importe les autres technologies utilisées.

## UX : Style VS UI

L'expérience utilisateur (UX) sera déterminée par deux facteurs : le style (CSS) et l'interface utilisateur (UI).

Il est important de distinguer le style de l'UI : le style détermine à quoi l'application ressemble, et l'UI détermine comment elle réagit.

Il existe donc trois types de librairies différentes :

- Les librairies de style pur (Tailwind)
- Les librairies d'UI pur (HeadlessUI, Radix)
- Les librairies de style + UI (Material Design, shadcn, daisyUI)

Ces librairies pourront être spécifiques à un framework (react, vue), ou bien utilisables peu importe le framework utilisé.

## Design System

Lorsqu'une application grandit, il est important de s'assurer que son design soit cohérent à la charte graphique de l'entreprise. Les designers vont alors créer un design system, qui sera utilisé par les développeurs pour construire l'ensemble des composants d'interface.

Les librairies de styles et de composants pourront être personnalisées pour respecter le design system (typographie, couleurs, espacements, etc).

## Libraries

### Style

- [Tailwind CSS](https://tailwindcss.com/)

### UI

- [DaisyUI](https://daisyui.com/)
- [shadcn/ui](https://ui.shadcn.com/) (existe pour React et Vue)

### Headless

- [HeadlessUI](https://headlessui.com/)
- [Radix](https://www.radix-ui.com/) (React)
- [Reka UI](https://reka-ui.com/) (Vue)

### Icones

- [Heroicons](https://heroicons.com/)
- [Lucide](https://lucide.dev/)
