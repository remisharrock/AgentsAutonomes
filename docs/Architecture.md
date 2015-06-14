Architecture du projet
======================

Nous commencons par définir les concepts utilisés dans ce projet. En quelque sorte, une fois que les mots auront un sens, nous détaillons notre proposition technique.

Sommaire (mis à jour à la main, vérifier)

* Présentation générale
 * Niveaux d'abstraction
 * Relation de génération entre les deux niveaux
* Présentation technique
 * Conception générale
 * Manipuler facilement le système d'acteurs avec `SystemProxy`
 * Construire à la volée un message d'action en fonction d'un message émis avec `MessageMap`
 * Tirer à la volée une ligne téléphonique entre deux acteurs avec `Commutator`
 * Définir un envoi de message automatique avec `RandomScheduler`
* Vers un système d'acteurs auto-organisé ?
* Un défaut conceptuel : le serpent qui se mord la queue
* What « Model (in MVC) is an abstraction of Actor » is and how we could implement it
* Formalisation des recettes : vers une généralisation ?
 * Rappels mathématiques
 * Définitions
 * Lien entre une recette et une relation de causalité
* Utilisation
* Dernière soutenance

## Présentation générale

### Niveaux d'abstraction

Nous voulons faire une simulation de ifttt. Pour cela, nous utilisons deux niveaux d'abstraction :

 1. Le niveau des modèles. Ce niveau est le plus abstrait et définit des catégories dont on donnera en quelque sorte des réalisations (au sens philosophique du terme : rendre réel ; synonyme de l'anglais « to implement ») dans le niveau inférieur.
	* Un canal (`models.Channel` dans le code) est une catégorie d'éléments de l'internet des objets (plus précisément : une catégorie d'objets de l'internet) : ce peut être une classe d'objets physiques ou immatériels comme un capteur, une lampe, le compte d'un service en ligne, un site de news. Comme dans ifttt, des canaux ont des signaux (triggers en anglais et `models.Trigger` dans le code) et des actions.
	* Les signaux sont levés par le canal pour signaler un changement : ce peut-être un changement d'environnement (l'ouverture d'une porte, la détection d'un mouvement) ou un changement interne (un délai expire, une date échoit). Sémantiquement, un signal mentionne généralement un objet et le nouvel état de ce dernier ou ce qui a provoqué ce changement d'état (par exemple : « la porte est ouverte » pour un capteur de porte ou « quelque chose a bougé » pour un détecteur de mouvement). Il peut mentionner des modalités (dans le cas d'une porte, on peut mentionner son degré d'ouverture).
	* Toujours de la même manière que ifttt, des recettes (`models.Recipe`) peuvent être créées pour matérialiser des réactions automatiques à un changement. La phrase « if this then that » montre bien que si un événement arrive, alors un canal va agir d'une certaine manière : une recette matérialise une relation de causalité entre deux acteurs. Outre son nom, son propriétaire et d'autres attributs, elle contient principalement quatre membres : un canal émetteur, un signal émis, un canal récepteur et une action : le canal émetteur lève un de ses signaux et à cause de cela, le canal récepteur accomplit l'action précisée dans la recette. Contrairement à certains de ses concurrents, une recette de ifttt ne peut lier plus d'un canal émetteur, un signal émis, un canal récepteur et une action : c'est atomique.
	* Sémantiquement, les actions contiennent un verbe, un objet et si besoin des modalités complémentaires. Le sujet de l'action est toujours le canal récepteur. Par exemple, une action simple est : « allume la lumière » et une action plus élaborée « allume la lampe en jaune, en mode économie d'énergie et à moyenne intensité ». Une recette lie de manière statique un unique élément pour chacun de ses quatre membres principaux : la sémantique est donc figée. En revanche, les modalités de l'action peuvent être définies en fonction de celles du signal émis. Si l'on considère la recette actuelle comme une bijection, on propose une évolution possible de ce modèle pour avoir une surjection, une injection ou encore autre chose.
 2. Le niveau des acteurs est en quelque sorte une représentation concrète du monde. Il contient des acteurs qui évoluent indépendamment et communiquent par message. La communication entre ces acteurs suit le formalisme indiqué plus haut.
 	* Le mode d'action d'un acteur est définit par un canal. Un acteur peut donc être vu comme une instance d'un canal.
 	* Les messages échangés par des acteurs ont la sémantique soit d'un signal, soit d'une action. De la même manière qu'une lettre à la Poste, ils peuvent être envoyés anonymement mais ont forcément un destinataire. Les acteurs ne communiquent que par message. Les messages peuvent contenir des modalités qui précisent le changement décrit par le signal ou l'action à effectuer.
 	* A ce niveau concret, une recette est définie comme relation de causalité entre deux acteurs et « if this then that » devient : quand un acteur envoit un message qui contient un signal, alors un autre acteur reçoit un message qui lui dit d'accomplir telle action. Dans le monde physique, un capteur ne sait faire qu'une chose : lever des signaux. Pour respecter la simplicité des objets physiques, un pseudo-acteur est définit (`actors.Commutator` dans le code) pour permettrent aux acteurs de lever des signaux simplement en envoyant un message à ce pseudo-acteur. C'est formellement un objet, pas un acteur. Les recettes sont « diluées » dans ce pseudo-acteur : à réception d'un message signal d'un acteur, le pseudo-acteur regarde si une relation de causalité existe. Le cas échéant, il envoit anonymement un message d'action à l'acteur définit.
 	* Ce pseudo-acteur est utile pour envoyer des messages signaux et simuler des changements. La période caractérisant l'envoi de ces messages est définit par une loi de probabilité qui peut être fixe (toutes les trente secondes) ou plus évoluée : lois de Bernouilli, Gauss, Poisson…
 	* Pour plus de détail sur les alternatives à cette architecture, voir plus bas le paragraphe « Vers un système d'acteurs auto-organisé ? ».

### Relation de génération entre les deux niveaux

Nous définissons plus haut les acteurs par rapport aux canaux. Cette démarche est cependant erronnée à cause de akka qui nous force en quelque sorte à définir programmatiquement les acteurs : leur définition n'est donc pas chargée en base mais codée « en dur » et iceux ne sont donc pas déduits des canaux comme le présentaient les explications précédentes.

Loin de poser problème, il suffit de considérer que les acteurs ont tout de même une intelligence qui échappe aux canaux et correspondent à des objets physiques qui ne sont pas facilement modifiables. Le paradigme d'ifttt est d'en abstraire des catégories en créant un canal qui regroupe des acteurs tandis que celui de l'utilisateur est de redescendre du canal vers son objet physique. La dichotomie de ces deux mouvements de pensée (induction d'ifttt et déduction de l'utilisateur) renvoie à un phénomène déjà existant dans ifttt : il est donc naturel que nous le rencontrions également.

En conclusion, les éléments des deux niveaux doivent être définis en étroite accointance.

## Présentation technique

### Conception générale

Pour générer des objets à la volée, ce code utilise le patron de conception de la fabrique. D'abord explicite, il est maintenant sous-jacents des λ-expressions qui ont l'avantage d'être bien plus lisibles. On peut définir à la volée un comportement à adopter, un message, une période : tout cela peut donc changer à chaque fois. 

Java 8 permet une manipulation intuitive des collections de données grace au λ-calcul (`filter`, `map`, `flatMap`)

### Manipuler facilement le système d'acteurs avec `SystemProxy`

A décrire : à quel problème ça répond, qu'est-ce que ça fait, comment ça le fait ?

### Construire à la volée un message d'action en fonction d'un message émis avec `MessageMap`

Du Java 8, de la réflexion, de la généricité… bon appétit. Savoir comment ça se passe à l'intérieur n'est pas important, on veut juste savoir à quoi ça sert.

### Tirer à la volée une ligne téléphonique entre deux acteurs avec `Commutator`

A décrire : à quel problème ça répond, qu'est-ce que ça fait, comment ça le fait ?

Tordons le cou à une fausse idée : `Commutator` utilise une réalisation de l'interface `LookUpEventBus`. Cette interface fonctionne avec un patron éditeur / lecteur (« publisher / subscriber » en anglais). En revanche, le commutateur porte bien son nom puisse qu'il a pour effet d'établir comme une ligne téléphonique entre deux acteurs. De la même manière que dans la boucle locale, il n'y a pas $n!$ lignes pour relier n utilisateurs du téléléphone mais que la commutation par circuit donne cette illusion, l'objet `Commutator` donne cette illusion : dans le cas d'une relation de causalité strictement bijective, il ne peut y avoir qu'un destinateur et un destinataire. En revanche, le patron éditeur / lecteur est effectif si plusieurs relations de causalité prennent pour source la même classe de message et le même acteur.

(to be expanded) Les attributs des messages doivent être objets et non des types primitifs pour pouvoir être nul. Si nul, l'attribut correspondant de l'acteur n'est pas changé.

### Définir un envoi de message automatique avec `RandomScheduler`

En faisant un parallèle avec la vie réelle, il y a principalement trois manières d'initier un message automatique :
 * La manière la plus simple est de commander une action, donc d'envoyer un message d'action à un acteur ;
 * On peut aussi simuler l'émission d'un signal par un acteur ;
 * Enfin, si un objet est suffisament évolué, il peut envoyer des messages tout seul et on peut le faire agir en ce sens.

La classe `RandomScheduler` propose les deux premières façons de faire. La troisième est laissée au soin du lecteur.

Cet envoi automatique peut être interrompu par l'utilisateur qui peut également donner un nombre ou un temps limite d'envoi.

## Vers un système d'acteurs auto-organisé ?

Le pseudo-acteur défini plus haut n'est pas un acteur, d'où sa dénommination : c'est un objet. Quelles sont les possibilités de se passer d'un tel objet pour un système d'acteurs qui s'organiserait de lui-même ?
 1. Des acteurs plus intelligents. Il est possible rendre chaque acteur conscient des relations de causalité qui le lient aux autres. Cette architecture présente des avantages indéniables, puisqu'elle rend le système réellement distribué. Le projet est actuellement réparti en deux branches pour étudier la facilité d'implémentation de chacune. Conceptuellement attirante, elle poserait cependant des questions techniques hardues puisqu'il faudrait définir des « tranches » de pseudo-acteur. Elle s'éloigne en outre un peu plus du monde réel puisque les acteurs recouverts la tranche de pseudo-acteur ne représente plus un objet du monde réel.
 2. Toujours plus d'acteurs. D'aucun pourrait souhaiter que les classes d'objet définies soient des acteurs (c'est-à-dire réalisent l'interface `UntypedActor`) : cela serait tout à fait possible, aurait l'élégance de montrer qu'ifttt accepte une décomposition kiss et serait enfin plus proche du monde réel. Nous objections que cela ne serait cependant pas sans poser de vrais problèmes conceptuels :
	* On attend tout d'abord dans ce projet qu'un acteur puisse être lié par des relations de causalité : serait-il acceptable qu'une relation de causalité lie les acteurs `MessageMap` ou `Commutator`, qui sont utilisés pour caractériser justement ces relations ?
	* Si `Commutator` était un acteur alors il perdrait son rôle de commutateur (donc de médium de communication) pour devenir un routeur. En effet, un objet commutateur n'envoie pas de message en son nom propre mais ne fait qu'ouvrir une ligne téléphonique directe entre deux acteurs qui se parlent par l'intermédiaire d'une fonction de traduction. Un acteur devrait plutôt parler en son nom plutôt qu'utiliser la méthode `forward(Object message, ActorContext context)`.
	* La classe `RandomScheduler` pourrait effectivement devenir un acteur. Au lieu d'un objet condamné à un certain immobilisme, on pourrait alors considérer l'acteur `RandomScheduler` résultant comme une espèce de Zorro masqué, qui reste discret mais se place derrière un acteur pour lui soufler quoi faire.
 3. Mise en abyme : l'exemple type de la fausse bonne idée. Les acteurs tels que définit par akka peuvent contenir d'autres acteurs. On peut pousser la proposition précédente encore plus loin en intégrant les acteurs qui réalisent des canaux dans des meta-acteurs. On s'éloigne alors du monde réel tout en générant des problèmes techniques. Il n'y a donc à cela aucun intérêt.

Nous avons choisi dans cette branche de nous inspirer de la « philosophie de développement » kiss : keep it simple stupid. Le nom de la branche vient de là.

## Un défaut conceptuel : le serpent qui se mord la queue

Dans toute discussion sur ce sujet, nous commençons toujours par parler des canaux pour en venir ensuite aux acteurs, définis par rapport aux canaux. Or en réalité nous définissons les acteurs dans le code et les canaux dans la base : pourrions-nous définir et charger dynamiquement les classes des acteurs rendues nécessaires par les canaux ?

Les premières recherches menées en sens font état d'un niveau de technicité extrême et d'une complexité faramineuse :
 * http://twit88.com/blog/2007/10/21/compile-and-reload-java-class-dynamically-using-apache-commons-jci/
 * http://javahowto.blogspot.de/2006/07/javaagent-option.html
 * http://www.nurkiewicz.com/2009/09/injecting-methods-at-runtime-to-java.html
 * En fait, il semble même que des projets de recherche soient menés en ce sens : https://github.com/Sable/soot/wiki/Adding-attributes-to-class-files-%28Advanced%29

Bien que techniquement passionnant, l'analyse que nous faisons de la relation de génération entre les deux niveaux d'abstraction tend à montrer que ce ne serait qu'une inutile fioriture dans l'état d'avancement actuel de ce projet.

## What « Model (in MVC) is an abstraction of Actor » is and how we could implement it

Model is an abstraction of Actor. Because it takes a class reference, one could have subtypes of this class. By the way, the best abstraction would be to link a model to an interface which some actors would implements. It would allow something like multiple inheritance. As an actor would implements several interfaces, it could be sent different messages. The main issue with this idea is an actor only receive message by onReceive() and the message sending protocol doesn't imply any other method.

## Formalisation des recettes : vers une généralisation ?

Nous commençons par faire quelques rappels mathématiques puis nous définissons ce qu'est une recette et une relation de causalité. Une fois cela fait, nous voyons comment les deux notions peuvent être liées.

### Rappels mathématiques

On rappelle qu'une application est une relation mathématique entre deux ensembles pour laquelle chaque élément du premier est relié à un unique élément du second. On rappelle qu'une relation dans un ensemble $E$ est caractérisée par un sous-ensemble du produit cartésien $E × E$, soit une collection de doublet d'éléments de $E$.

### Définitions

Soit $S$ et $C$ respectivement les ensembles des signaux et des canaux. L'ensemble $S$ se décompose en deux parties exclusives $S_E$ et $S_R$ car un signal est soit émis (le premier) soit reçu (le second). Un canal peut avoir plusieurs signaux. Un canal sans signal est comme une soupe sans sel : c'est moins bon puisqu'il ne peut pas communiquer.

Une recette de rang $(m, n)$ est une relation de $\left(S×C\right)^m$ dans $\left(S×C\right)^m$ qui lie m doublets à n autre doublets. Une recette dont le rang n'est pas récisé est une recette de rang $(1, 1)$. Une recette est dite réalisable si et seulement si :
 * Pour tout doublet (s, c) de $\left(S×C\right)^m$, $s$ est élément de $E$ (c'est un signal émis) ;
 * Pour tout doublet (s, c) de $\left(S×C\right)^n$, $s$ est élément de $R$ (c'est un signal reçu) ;
Pour définir clairement les choses, une recette (de rang $(1, 1)$) est une application dans $S×C$ qui lie un doublet $d_1 = (e, c_1)$ à un autre doublet $d_2 = (r, c_2)$. Une telle recette est dite réalisable si et seulement si $e$ appartient à $E et $r$ à $R$.
On notera incidemment que les canaux impliqués dans une recette ne sont, suivant cette définition, pas forcément, tous différents.

D'autre part, soit $M$ et $A$ respectivement l'ensemble des espaces de messages et l'ensemble des espaces acteurs. Tout élément de $A$ est un acteur, qui peut envoyer et recevoir des messages. Tout élément de l'ensemble $M$ des espaces des message appartient exclusivement à l'un des deux sous-ensembles $M_E$ et $M_A$ car un message contient une sémantique particulière : il est envoyé par un acteur après un évènement ou reçu par un acteur pour accomplir une action.

Précisons tout de suite cette formulation d' « ensemble d'espace » qui peut sembler lourde et inutile. Par la suite nous parlerons pour alléger les phrases d'ensemble de classes de messages. Si nous détaillons pour les messages, une explication du même acabit vaut aussi pour les acteurs. Peut-être pourrions-nous pour les messages parler d'ensemble de classes : tout message a une sémantique particulière : il est d'une classe particulière (par exemple : la classe des messages qui disent que quelqu'un est entré dans la pièce, ou qui ordonnent à une lampe de s'allumer) mais chaque message possède ses propres modalités (la quantité de mouvement détectée, la couleur dont allumer la lampe, la valeur du potentiomètre). Chaque espace regroupe les messages qui ont la même sémantique. Chacun de ces espaces est de dimension le nombre de modalités des message de cette sémantique.

Une relation de causalité de rang (m, n) est définie sur $\left(M×A\right)^m$ dans $\left(M×A\right)^m$ et lie m doublets « d'émission » à n doublets « de réception ». Une relation de causalité dont le rang n'est pas précisé est de rang (1, 1). Par un abus de langage bien pratique, on définit les types de rang suivants :
 * Une relation de causalité de rang $(m, n), m > n$ est une injection dite stricte quand $n = 1$ ;
 * Une relation de causalité de rang $(m, n), n > m$ est une surjection dite stricte quand $m = 1$ ;
 * Une relation de causalité de rang $(m, n), m = n$ est une bijection dite stricte quand $m = n = 1$.

Puisque les acteurs envoient et recoivent des messages et non des classes de message, il faut également munir la relation de causalité d'une fonction reçoit les messages émis et envoient des messages d'action. Je ne sais pas comment définir proprement les ensembles de départ et d'arrivée de cette fonction mais ce qui est sûr, c'est que ces arguments sont m messages de classes éléments de $M$ et produit comme résultat au plus n messages sur l'ensemble d'arrivée. Cela veut dire que la fonction reçoit un message de chaque acteur de départ liés par la relation de causalité mais, en fonction de ses entrées, n'envoit pas forcément un message à tous les acteurs d'arrivée de la relation.

Ceci peut sembler attirant sur le papier mais une facette importante des relations de causalité reste à traîter : notre mimétisme du réel nous impose d'ajouter à une relation de causalité un délai de traitement : ce délai court à partir du premier message sur $m$ émis par un acteur et les $m - 1$ messages suivants doivent être reçus au plus tard strictement avant l'expiration de ce délai pour déclencher une causalité.

Notre code se borne pour l'instant à proposer des relations de causalité de rang (1, 1) qui sont dont des bijections strictes. Le délai de traitement n'est donc pas utile et n'est pas considéré.

### Lien entre une recette et une relation de causalité

Nous pouvons relier ces deux notions.

Euh en fait ça se fait à l'instinct dans le code puisque le niveau 1 n'est utilisé que par l'interface et que pour l'instant il n'y a pas d'interface. Les exemples du code n'utilisent que des événements de niveau 2. Mais c'est une vraie question qu'il faut traiter.

# Utilisation

Parler des classes et des manières « pratiques » de les utiliser avec des exemples de code and so on…

Bah euh la javadoc et les exemples du code peuvent suffire (temporairement) à ce point.

# Dernière soutenance

Ce qui fait briller les yeux de Mme Vigne :
 * Qualimétrie (pas encore fait)
 * Java 8 : flux, lambda-calcul
 * Interface fonctionnelle : on doit bien pouvoir en placer une en réfléchissant bien.
 * Réification des génériques
 * Patrons de conception
 * …
