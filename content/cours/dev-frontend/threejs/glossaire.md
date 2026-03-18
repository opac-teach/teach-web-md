# Glossaire

### Vecteur

Un vecteur représente une direction et une magnitude dans l'espace. En 3D :

$$\vec{v} = (x,\ y,\ z)$$

La magnitude (longueur) du vecteur :

$$\|\vec{v}\| = \sqrt{x^2 + y^2 + z^2}$$

Un vecteur **normalisé** a une magnitude de 1 :

$$\hat{v} = \frac{\vec{v}}{\|\vec{v}\|}$$

### Scalaire

Un scalaire est une valeur numérique simple, sans direction. Il peut multiplier un vecteur pour changer sa magnitude :

$$k \cdot \vec{v} = (k \cdot x,\ k \cdot y,\ k \cdot z)$$

### Matrice

Une matrice 4×4 est utilisée en 3D pour représenter des transformations (translation, rotation, échelle). En Three.js, `Matrix4` est omniprésente :

$$M = \begin{pmatrix} m_{00} & m_{01} & m_{02} & m_{03} \\ m_{10} & m_{11} & m_{12} & m_{13} \\ m_{20} & m_{21} & m_{22} & m_{23} \\ m_{30} & m_{31} & m_{32} & m_{33} \end{pmatrix}$$

### Angles d'Euler

Les angles d'Euler décomposent une rotation 3D en trois rotations successives autour des axes $X$, $Y$, $Z$ (respectivement **pitch**, **yaw**, **roll**) :

$$R = R_Z(\psi) \cdot R_Y(\theta) \cdot R_X(\phi)$$

avec $\phi \in [-180°, 180°]$, $\theta \in [-90°, 90°]$, $\psi \in [-180°, 180°]$.

C'est la représentation la plus intuitive, mais l'ordre des rotations **compte** ($R_X \cdot R_Y \neq R_Y \cdot R_X$), et elle souffre du **gimbal lock** : lorsque $\theta = \pm 90°$, les axes $X$ et $Z$ s'alignent et on perd un degré de liberté.

### Quaternion

Un quaternion représente une **rotation** dans l'espace 3D sans souffrir du blocage de cardan (_gimbal lock_). Il est composé d'une partie scalaire et d'un vecteur :

$$q = (w,\ x,\ y,\ z) \quad \text{avec} \quad w^2 + x^2 + y^2 + z^2 = 1$$

Une rotation d'angle $\theta$ autour d'un axe unitaire $\hat{u} = (u_x, u_y, u_z)$ s'encode :

$$q = \left(\cos\frac{\theta}{2},\ u_x\sin\frac{\theta}{2},\ u_y\sin\frac{\theta}{2},\ u_z\sin\frac{\theta}{2}\right)$$

### Normale

Un vecteur normal est un vecteur **perpendiculaire** à une surface en un point donné. Il est unitaire par convention :

$$\hat{n} = \frac{\vec{a} \times \vec{b}}{\|\vec{a} \times \vec{b}\|}$$

où $\vec{a}$ et $\vec{b}$ sont deux arêtes du triangle. Les normales sont indispensables pour le calcul de l'éclairage et les réponses aux collisions.

### Rayon

Un rayon est une demi-droite définie par une origine $\vec{o}$ et une direction $\hat{d}$ (unitaire). Tout point du rayon s'écrit :

$$\vec{r}(t) = \vec{o} + t\cdot\hat{d} \quad (t \geq 0)$$

Utilisé pour le **raycasting** : détecter ce que vise le curseur, les tirs, la ligne de vue.

### AABB

Une _Axis-Aligned Bounding Box_ est une boîte de collision dont les faces sont parallèles aux axes du repère. Elle se définit par deux points :

$$\text{AABB} = (\vec{p}_{min},\ \vec{p}_{max}) \quad \text{avec} \quad \vec{p}_{min} = (x_{min}, y_{min}, z_{min})$$

Un point $\vec{p}$ est à l'intérieur si :

$$x_{min} \leq p_x \leq x_{max} \quad \land \quad y_{min} \leq p_y \leq y_{max} \quad \land \quad z_{min} \leq p_z \leq z_{max}$$

### UV

Les coordonnées UV sont des coordonnées 2D $(u, v) \in [0,1]^2$ qui associent chaque sommet d'un maillage à un point d'une texture :

$$\text{couleur}(u, v) = \text{texture}[u \cdot W,\ v \cdot H]$$

où $W$ et $H$ sont les dimensions en pixels de la texture. $u$ correspond à l'axe horizontal, $v$ à l'axe vertical.

# Opérations

## Vectorielle

### Dot product

Le produit scalaire (dot product) de deux vecteurs donne un **scalaire**. Il mesure à quel point deux vecteurs sont alignés :

$$\vec{a} \cdot \vec{b} = a_x b_x + a_y b_y + a_z b_z = \|\vec{a}\| \|\vec{b}\| \cos\theta$$

- Si $\vec{a} \cdot \vec{b} = 0$ : les vecteurs sont **perpendiculaires**
- Si $\vec{a} \cdot \vec{b} > 0$ : ils pointent dans le même sens
- Si $\vec{a} \cdot \vec{b} < 0$ : ils pointent en sens opposé

### Cross product

Le produit vectoriel (cross product) de deux vecteurs donne un **vecteur** perpendiculaire aux deux :

$$\vec{a} \times \vec{b} = \begin{pmatrix} a_y b_z - a_z b_y \\ a_z b_x - a_x b_z \\ a_x b_y - a_y b_x \end{pmatrix}$$

Sa magnitude vaut $\|\vec{a}\| \|\vec{b}\| \sin\theta$. Utilisé notamment pour calculer les **normales** de surfaces.

## Matricielle

### Multiplication matricielle

Appliquer une transformation $B$ puis $A$ à un vecteur $\vec{v}$ :

$$\vec{v}' = A \cdot B \cdot \vec{v}$$

L'ordre **compte** : $A \cdot B \neq B \cdot A$ en général.

Pour transformer un point, on multiplie la matrice par le vecteur colonne. En dimension $n$ :

$$\begin{pmatrix} x_1' \\ x_2' \\ \vdots \\ x_n' \end{pmatrix} = \begin{pmatrix} m_{11} & m_{12} & \cdots & m_{1n} \\ m_{21} & m_{22} & \cdots & m_{2n} \\ \vdots & & \ddots & \vdots \\ m_{n1} & m_{n2} & \cdots & m_{nn} \end{pmatrix} \cdot \begin{pmatrix} x_1 \\ x_2 \\ \vdots \\ x_n \end{pmatrix}$$

Chaque composante du résultat est la somme des produits de la ligne $i$ de $M$ avec le vecteur :

$$x_i' = m_{i1}\cdot x_1 + m_{i2}\cdot x_2 + \cdots + m_{in}\cdot x_n = \sum_{j=1}^{n} m_{ij} \cdot x_j$$

En 3D homogène ($n = 4$, avec $x_4 = 1$) :

$$\begin{pmatrix} x' \\ y' \\ z' \\ 1 \end{pmatrix} = M \cdot \begin{pmatrix} x \\ y \\ z \\ 1 \end{pmatrix}$$

$$x' = m_{11}x + m_{12}y + m_{13}z + m_{14}$$
$$y' = m_{21}x + m_{22}y + m_{23}z + m_{24}$$
$$z' = m_{31}x + m_{32}y + m_{33}z + m_{34}$$


## Transformation

Déplacer, tourner ou redimensionner un objet revient à lui appliquer une matrice. On distingue trois transformations fondamentales :

**Translation** d'un vecteur $\vec{t} = (t_x, t_y, t_z)$ :

$$T = \begin{pmatrix} 1 & 0 & 0 & t_x \\ 0 & 1 & 0 & t_y \\ 0 & 0 & 1 & t_z \\ 0 & 0 & 0 & 1 \end{pmatrix}$$

**Mise à l'échelle** par facteurs $(s_x, s_y, s_z)$ :

$$S = \begin{pmatrix} s_x & 0 & 0 & 0 \\ 0 & s_y & 0 & 0 \\ 0 & 0 & s_z & 0 \\ 0 & 0 & 0 & 1 \end{pmatrix}$$

**Rotation** d'angle $\theta$ autour de l'axe $Z$ :

$$R_z = \begin{pmatrix} \cos\theta & -\sin\theta & 0 & 0 \\ \sin\theta & \cos\theta & 0 & 0 \\ 0 & 0 & 1 & 0 \\ 0 & 0 & 0 & 1 \end{pmatrix}$$

La **transformation complète** d'un objet (modèle → monde) combine ces matrices :

$$M_{model} = T \cdot R \cdot S$$

# Caméra

## Projection perspective

La projection perspective transforme les coordonnées 3D en coordonnées 2D écran en simulant la perception humaine : les objets lointains paraissent plus petits. Elle est définie par :

- **FOV** (_Field of View_) : angle d'ouverture vertical $\alpha$
- **Aspect ratio** : rapport largeur/hauteur de l'écran $a = W/H$
- **Near/Far** : distances minimale $n$ et maximale $f$ du volume visible

Un point 3D $(x, y, z)$ est projeté en :

$$x_{écran} = \frac{x}{z \cdot \tan(\alpha/2)} \qquad y_{écran} = \frac{y}{z \cdot a \cdot \tan(\alpha/2)}$$

# Physique

## Forces

La force appliquée à un objet de masse $m$ produit une accélération $\vec{a}$ :

$$\vec{F} = m \cdot \vec{a}$$

Plusieurs forces peuvent s'additionner (gravité, vent, collisions…) :

$$\vec{F}_{total} = \vec{F}_1 + \vec{F}_2 + \cdots + \vec{F}_n$$

## Position, vitesse, accélération

Ces trois grandeurs sont liées par la dérivation / intégration par rapport au temps $t$ :

$$\vec{a}(t) = \frac{d\vec{v}}{dt}$$
$$\vec{v}(t) = \frac{d\vec{p}}{dt}$$
$$\vec{a}(t) = \frac{d^2\vec{p}}{dt^2}$$

$$\vec{v}(t) = \int \vec{a}\ dt \qquad \vec{p}(t) = \int \vec{v}\ dt$$

En simulation temps réel, on approxime avec un pas de temps $\Delta t$ (méthode d'Euler) :

$$\vec{v}_{n+1} = \vec{v}_n + \vec{a}_n \cdot \Delta t$$

$$\vec{p}_{n+1} = \vec{p}_n + \vec{v}_{n+1} \cdot \Delta t$$

## Gravité et animation

Sous l'effet de la gravité seule ($g \approx 9.8\ \text{m/s}^2$), la hauteur à l'instant $t$ est :

$$p_y(t) = p_{y_0} + v_{y_0} \cdot t - \frac{1}{2}g \cdot t^2$$

En animation image par image, on met à jour la hauteur à chaque pas $\Delta t$ :

$$v_{y_{n+1}} = v_{y_n} - g \cdot \Delta t$$

$$p_{y_{n+1}} = p_{y_n} + v_{y_{n+1}} \cdot \Delta t$$