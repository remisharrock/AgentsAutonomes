Architecture du projet
======================

## Présentation générale

### Niveaux d'abstraction

Nous voulons faire une simulation de ifttt. Pour cela, nous utilisons deux niveaux d'abstraction :

 1. Le niveau des modèles. Ce niveau est le plus abstrait et définit des catégories dont on donnera en quelque sorte des réalisations (au sens philosophique du terme : rendre réel ; synonyme de l'anglais « to implement ») dans le niveau inférieur.
	* Un canal (`models.Channel` dans le code) est une catégorie d'éléments de l'internet des objets (plus précisément : une catégorie d'objets de l'internet) : ce peut être une classe d'objets physiques ou immatériels comme un capteur, une lampe, le compte d'un service en ligne, un site de news. Comme dans ifttt, des canaux ont des signaux (triggers en anglais et `models.Trigger` dans le code) et des actions.
	* Les signaux sont levés par le canal pour signaler un changement : ce peut-être un changement d'environnement (l'ouverture d'une porte, la détection d'un mouvement) ou un changement interne (un délai expire, une date échoit). Sémantiquement, un signal mentionne généralement un objet et le nouvel état de ce dernier ou ce qui a provoqué ce changement d'état (par exemple : « la porte est ouverte » pour un capteur de porte ou « quelque chose à bougé » pour un détecteur de mouvement). Il peut mentionner des modalités (dans le cas d'une porte, on peut mentionner son degré d'ouverture).
	* Toujours de la même manière que ifttt, des recettes (`models.Recipe`) peuvent être créées pour matérialiser des réactions automatiques à un changement. La phrase « if this then that » montre bien que si un événement arrive, alors un canal va agir d'une certaine manière : une recette matérialise une relation de causalité entre deux acteurs. Outre son nom, son propriétaire et d'autres attributs, elle contient principalement quatre membres : un canal émetteur, un signal émis, un canal récepteur et une action : le canal émetteur lève un de ses signaux et à cause de cela, le canal récepteur accomplit l'action précisée dans la recette. Contrairement à certains de ses concurrents, une recette de ifttt ne peut lier plus d'un canal émetteur, un signal émis, un canal récepteur et une action : c'est atomique.
	* Sémantiquement, les actions contiennent un verbe, un objet et si besoin des modalités complémentaires. Le sujet de l'action est toujours le canal récepteur. Par exemple, une action simple est : « allume la lumière » et une action plus élaborée « allume la lampe en jaune, en mode économie d'énergie et à moyenne intensité ». Une recette lie de manière statique un unique élément pour chacun de ses quatre membres principaux : la sémantique est donc figée. En revanche, les modalités de l'action peuvent être définies en fonction de celles du signal émis. Si l'on considère la recette actuelle comme une bijection, on propose une évolution possible de ce modèle pour avoir une surjection, une injection ou encore autre chose.
 2. Le niveau des acteurs est en quelque sorte une représentation concrète du monde. Il contient des acteurs qui évoluent indépendamment et communiquent par message. La communication entre ces acteurs suit le formalisme indiqué plus haut.
 	* Le mode d'action d'un acteur est définit par un canal. Un acteur peut donc être vu comme une instance d'un canal.
 	* Les messages échangés par des acteurs ont la sémantique soit d'un signal, soit d'une action. De la même manière qu'une lettre à la Poste, ils peuvent être envoyés anonymement mais ont forcément un destinataire. Les acteurs ne communiquent que par message.
 	* A ce niveau concret, une recette est définie comme relation de causalité entre deux acteurs et « if this then that » devient : quand un acteur envoit un message qui contient un signal, alors un autre acteur reçoit un message qui lui dit d'accomplir telle action. Dans le monde physique, un capteur ne sait faire qu'une chose : lever des signaux. Pour respecter la simplicité des objets physiques, un pseudo-acteur est définit (`actors.Controller` dans le code) pour permettrent aux acteurs de lever des signaux simplement en envoyant un message à ce pseudo-acteur. Les recettes sont « diluées » dans ce pseudo-acteur : à réception d'un message signal d'un acteur, le pseudo-acteur regarde si une relation de causalité existe. Le cas échéant, il envoit anonyment un message d'action à l'acteur définit.
 	* Ce pseudo-acteur est utile pour envoyer des messages signaux et simuler des changements. La période caractérisant l'envoi de ces messages est définit par une loi de probabilité qui peut être fixe (toutes les trente secondes) ou plus évoluée : lois de Bernouilli, Gauss, Poisson…
 	* Pour plus de détail sur les alternatives à cette architecture, voir plus bas le paragraphe « Vers un système d'acteurs auto-organisé ? ».

### Relation de génération entre les deux niveaux

Nous définissons plus haut les acteurs par rapport aux canaux. Cette démarche est cependant erronnée à cause de akka qui nous force en quelque sorte à définir programmatiquement les acteurs : leur définition n'est donc pas chargée en base mais codée « en dur » et iceux ne sont donc pas déduits des canaux comme le présentaient les explications précédentes.

Loin de poser problème, il suffit de considérer que les acteurs ont tout de même une intelligence qui échappe aux canaux et correspondent à des objets physiques qui ne sont pas facilement modifiables. Le paradigme d'ifttt est d'en abstraire des catégories en créant un canal qui regroupe des acteurs tandis que celui de l'utilisateur est de redescendre du canal vers son objet physique. La dichotomie de ces deux mouvements de pensée (induction d'ifttt et déduction de l'utilisateur) renvoie à un phénomène déjà existant dans ifttt : il est donc naturel que nous le rencontrions également.

En conclusion, les éléments des deux niveaux doivent être définis en étroite accointance.

## Présentation technique

### Conception générale

Pour générer à la volée les messages d'action en fonction des messages signaux reçus, `Controller` utilise le patron de conception de la fabrique. D'abord explicite, il est maintenant sous-jacents des λ-expressions.

Java 8 permet une manipulation intuitive des collections de données grace au λ-calcul (`filter`, `map`, `flatMap`)

### Manipuler facilement le système d'acteurs avec `SystemProxy`

A décrire : à quel problème ça répond, qu'est-ce que ça fait, comment ça le fait ?

### Construire à la volée un message d'action en fonction d'un message émis avec `MessageMap`

Du Java 8, de la réflexion, de la généricité… bon appétit. Savoir comment ça se passe à l'intérieur n'est pas important, on veut juste savoir comment ça marche.

### Tirer à la volée une ligne téléphonique entre deux acteurs avec `Commutator`

A décrire : à quel problème ça répond, qu'est-ce que ça fait, comment ça le fait ?

(to be expanded) Les attributs des messages doivent être objets et non des types primitifs pour pouvoir être nul. Si nul, l'attribut correspondant de l'acteur n'est pas changé.

### Définir un envoi de message automatique avec `RandomScheduler`

En faisant un parallèle avec la vie réelle, il y a principalement trois manières d'initier un message automatique :
 * La manière la plus simple est de commander une action, donc d'envoyer un message d'action à un acteur ;
 * On peut aussi simuler l'émission d'un signal par un acteur ;
 * Enfin, si un objet est suffisament évolué, il peut envoyer des messages tout seul et on peut le faire agir en ce sens.

La classe `RandomScheduler` propose les deux premières façons de faire. La troisième est laissée au soin du lecteur.

Cet envoi automatique peut être interrompu par l'utilisateur qui peut également donner un nombre ou un temps limite d'envoi.

### Vers un système d'acteurs auto-organisé ?

Le pseudo-acteur défini plus haut n'est pas un acteur, d'où sa dénommination : c'est un objet. Quelles sont les possibilités de se passer d'un tel objet pour un système d'acteurs qui s'organiserait de lui-même ?
 1. Des acteurs plus intelligents. Il est possible rendre chaque acteur conscient des relations de causalité qui le lient aux autres. Cette architecture présente des avantages indéniables, puisqu'elle rend le système réellement distribué. Le projet est actuellement réparti en deux branches pour étudier la facilité d'implémentation de chacune. Conceptuellement attirante, elle poserait cependant des questions techniques hardues puisqu'il faudrait définir des « tranches » de pseudo-acteur. Elle s'éloigne en outre un peu plus du monde réel puisque les acteurs recouverts la tranche de pseudo-acteur ne représente plus un objet du monde réel.
 2. Toujours plus d'acteurs. D'aucun pourrait souhaiter que les classes d'objet définies soient des acteurs (c'est-à-dire réalisent l'interface `UntypedActor`) : cela serait tout à fait possible, aurait l'élégance de montrer qu'ifttt accepte une décomposition kiss et serait enfin plus proche du monde réel. Nous objections que cela ne serait cependant pas sans poser de vrais problèmes conceptuels :
	* On attend tout d'abord dans ce projet qu'un acteur puisse être lié par des relations de causalité : serait-il acceptable qu'une relation de causalité lie les acteurs `MessageMap` ou `Commutator`, qui sont utilisés pour caractériser justement ces relations ?
	* Si `Commutator` était un acteur alors il perdrait son rôle de commutateur (donc de médium de communication) pour devenir un routeur. En effet, un objet commutateur n'envoie pas de message en son nom propre mais ne fait qu'ouvrir une ligne téléphonique directe entre deux acteurs qui se parlent par l'intermédiaire d'une fonction de traduction. Un acteur devrait plutôt parler en son nom plutôt qu'utiliser la méthode `forward(Object message, ActorContext context)`.
	* La classe `RandomScheduler` pourrait effectivement devenir un acteur. Au lieu d'un objet condamné à un certain immobilisme, on pourrait alors considérer l'acteur `RandomScheduler` résultant comme une espèce de Zorro masqué, qui reste discret mais se place derrière un acteur pour lui soufler quoi faire.
 3. Mise en abyme : l'exemple type de la fausse bonne idée. Les acteurs tels que définit par akka peuvent contenir d'autres acteurs. On peut pousser la proposition précédente encore plus loin en intégrant les acteurs qui réalisent des canaux dans des meta-acteurs. On s'éloigne alors du monde réel tout en générant des problèmes techniques. Il n'y a donc à cela aucun intérêt.

Nous avons choisi dans cette branche de nous inspirer de la « philosophie de développement » kiss : keep it simple stupid. Le nom de la branche vient de là.

### Un défaut conceptuel : le serpent qui se mord la queue

Dans toute discussion sur ce sujet, nous commençons toujours par parler des canaux pour en venir ensuite aux acteurs, définis par rapport aux canaux. Or en réalité nous définissons les acteurs dans le code et les canaux dans la base : pourrions-nous définir et charger dynamiquement les classes des acteurs rendues nécessaires par les canaux ?

Les premières recherches menées en sens font état d'un niveau de technicité extrême et d'une complexité faramineuse :
 * http://twit88.com/blog/2007/10/21/compile-and-reload-java-class-dynamically-using-apache-commons-jci/
 * http://javahowto.blogspot.de/2006/07/javaagent-option.html
 * http://www.nurkiewicz.com/2009/09/injecting-methods-at-runtime-to-java.html
 * En fait, il semble même que des projets de recherche soient menés en ce sens : https://github.com/Sable/soot/wiki/Adding-attributes-to-class-files-%28Advanced%29

Bien que techniquement passionnant, l'analyse que nous faisons de la relation de génération entre les deux niveaux d'abstraction tend à montrer que ce ne serait qu'une inutile fioriture dans l'état d'avancement actuel de ce projet.

### What « Model is an abstraction of Actor » is and how we could implement it

Model is an abstraction of Actor. Because it takes a class reference, one could have subtypes of this class. By the way, the best abstraction would be to link a model to an interface which some actors would implements. It would allow something like multiple inheritance. As an actor would implements several interfaces, it could be sent different messages. The main issue with this idea is an actor only receive message by onReceive() and the message sending protocol doesn't imply any other method.

### Qualification des recettes

Bijectif mais on peut faire injectif ou surjectif. L'injectivité peut donner lieu à définir un délai d'attente des conditions et nécessite l'ajout d'un acteur intermédiaire dans le commutateur. La surjectivité peut se réaliser

### Utilisation

Parler des classes et des manières « pratiques » de les utiliser avec des exemples de code and so on…

### Dernière soutenance

Ce qui fait briller les yeux de Mme Vigne :
 * Qualimétrie (pas encore fait)
 * Java 8 : flux, lambda-calcul
 * Interface fonctionnelle : on doit bien pouvoir en placer une en réfléchissant bien.
 * Réification des génériques
 * Patrons de conception
 * …
