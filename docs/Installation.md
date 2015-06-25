Manuel d’installation – Getting Started
=======================================

Ce petit manuel indique la marche à suivre pour être capable de
reprendre ultérieurement le développement de ce projet. La version la
plus à jour est en `*.pdf` mais un fichier `*.md`[^1] est généré pour
une lecture directement sur GitHub.

#### Pour les gens pressés

Si les explications qui suivent ne vous intéressent pas, vous pouvez
vous contentez de d’exécuter ces commandes dans l’ordre :

-   `mkdir ~/AgentsAutonomes && ~`

-   `git clone https://github.com/2marcn/AgentsAutonomes AgentsAutonomes`

-   `cd ~/AgentsAutonomes`

-   `wget http://downloads.typesafe.com/typesafe-activator/1.3.5/ typesafe-activator-1.3.5.zip`

-   `unzip typesafe-activator-1.3.5.zip .`

-   `./activator compile`

-   `./activator eclipse`

-   `./activator run -jvm-debug 8888`

#### Copie du dépôt

Il suffit, sous <span style="font-variant:small-caps;">gnu</span> /
Linux, d’exécuter la commande :

`git clone https://github.com/2marcn/AgentsAutonomes AgentsAutonomes`

pour obtenir la dernière version de notre projet dans le dossier
`AgentsAutonomes` (le dernier argument). L’utilisateur d’un système
Windows peut obtenir le même résultat en utilisant [GitHub for
Windows](https://windows.github.com/).

#### Téléchargement d’Activator

Activator est un ensemble organisé d’outils de programmation et
d’exécution que nous utilisons. Il se télécharge sur cette page :

<https://www.typesafe.com/get-started>.

Il suffit d’extraire de l’archive le script `activator`, le fichier de
commande `*.bat` et l’exécutable `activator-launch-*.*.*.jar` dans le
répertoire du projet. A noter que sur un système Arch Linux, l’<span
style="font-variant:small-caps;">aur</span> contient le paquet
`typesafe-activator` qui peut être installé pour gérer Activator avec un
gestionnaire de paquet.

Notre dépôt contient déjà un projet Play, il n’est donc pas besoin d’en
créer un. Il contient également Activator qui est directement invoquable
sous Windows ou <span style="font-variant:small-caps;">gnu</span> /
Linux depuis le répertoire du projet avec la commande :

`./activator`

On entre alors en mode interactif et l’on peut lancer successivement
`clean`, `compile` puis `run`. La première phase de compilation peut
être particulièrement lente si le répertoire `~/.ivy2` n’existe pas et
qu’Activator doit télécharger toutes les bibliothèques. La commande
`run`, qui lance le serveur Play, prend également en charge la phase de
compilation si un changement est détecté.

#### Modification du projet avec Eclipse

Pour modifier notre code dans Eclipse, il faut lancer la commande

`activator eclipse`.

Il est toutefois possible d’utiliser un autre <span
style="font-variant:small-caps;">ide</span> comme Netbeans, à condition
de créer un projet Java à partir de sources existantes.

#### Déboguage du projet

On ne peut pas lancer notre programme directement depuis Eclipse
puisqu’il faut laisser Activator créer et faire tourner le serveur Play.
Néanmoins, il est possible de spécifier à la machine virtuelle Java un
numéro de port de débug, par exemple :

`activator run -jvm-debug 8888`

puis de lancer sur Eclipse le déboguage d’une application Java distante.

#### Lancement du programme

Comme vu précédemment, la commande

`activator run`

permet de lancer notre programme sans activer le déboguage. Il fois le
serveur Play initialisé, il faut se rendre à l’adresse

`localhost:9000`

Selon les versions de logiciels utilisés, cette adresse est équivalente
à `/0:0:0:0:0:0:0:0:9000` (<span
style="font-variant:small-caps;">ip</span> v.6) ou `127.0.0.1:9000` en
<span style="font-variant:small-caps;">ip</span> v.4. Il est possible
que la base de données ait besoin d’être mise à jour : dans ce cas, un
script est proposé à l’exécution au démarrage du programme.

#### Accès à la base de données

Nous utilisons le moteur de base de données h2 qui a l’avantage d’être
léger et accessible facilement avec Activator depuis une interface web.
Il faut d’abord lancer Activator :

`activator`

avant de lancer le moteur d’exploration de la base :

`h2-browser`

Si ce n’est pas fait automatiquement, on se rendra au choix à l’adresse
`http://localhost:8082` ou `http://192.168.1.50:8082`. En cas de
problème de connexion, il faut bien vérifier que la classe du pilote est
`org.h2.Driver` et que l’<span
style="font-variant:small-caps;">url</span> de `jdbc` est
`jdbc:h2:mem:play`, comme spécifié dans le
`fichier conf/application.conf`.

[^1]: Généré par commande
    `pandoc -s docs/Installation.tex -o docs/Installation.md`.
