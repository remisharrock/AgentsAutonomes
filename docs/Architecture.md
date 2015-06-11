Architecture du projet
======================

## Présentation générale

Nous voulons faire une simulation de ifttt. Pour cela, nous utilisons deux niveaux d'abstraction :

 1. Le niveau des modèles. Ce niveau est le plus abstrait et définit des catégories dont on donnera en quelque sorte des implémentations dans le niveau inférieur.
	* Un canal (`models.Channel` dans le code) est une catégorie d'éléments de l'internet des objets : ce peut être une classe d'objets physiques ou immatériels comme un capteur, une lampe, le compte d'un service en ligne, un site de news. Comme dans ifttt, des canaux ont des signaux (triggers en anglais et `models.Trigger` dans le code) et des actions.
	* Les signaux sont levés par le canal pour signaler un changement : ce peut-être un changement d'environnement (l'ouverture d'une porte, la détection d'un mouvement) ou un changement interne (un délai expire, une date échoit). Sémantiquement, un signal mentionne généralement un objet et le nouvel état de ce dernier ou ce qui a provoqué ce changement d'état (par exemple : « la porte est ouverte » pour un capteur de porte ou « quelque chose à bougé » pour un détecteur de mouvement). Il peut mentionner des modalités (dans le cas d'une porte, on peut mentionner son degré d'ouverture).
	* Toujours de la même manière que ifttt, des recettes (`models.Recipe`) peuvent être créées pour matérialiser des réactions automatiques à un changement. La phrase « if this then that » montre bien que si un événement arrive, alors un canal va agir d'une certaine manière : une recette matérialise une relation de causalité entre deux acteurs. Outre son nom, son propriétaire et d'autres attributs, elle contient principalement quatre membres : un canal émetteur, un signal émis, un canal récepteur et une action : le canal émetteur lève un de ses signaux et à cause de cela, le canal récepteur accomplit l'action précisée dans la recette. Contrairement à certains de ses concurrents, une recette de ifttt ne peut lier plus d'un canal émetteur, un signal émis, un canal récepteur et une action : c'est atomique.
	* Sémantiquement, les actions contiennent un verbe, un objet et si besoin des modalités complémentaires. Le sujet de l'action est toujours le canal récepteur. Par exemple, une action simple est : « allume la lumière » et une action plus élaborée « allume la lampe en jaune, en mode économie d'énergie et à moyenne intensité ». Une recette lie de manière statique un unique élément pour chacun de ses quatre membres principaux : la sémantique est donc figée. En revanche, les modalités de l'action peuvent être définies en fonction de celles du signal émis.
 2. Le niveau des acteurs est en quelque sorte une représentation concrète du monde. Il contient des acteurs qui évoluent indépendamment et communiquent par message. La communication entre ces acteurs suit le formalisme indiqué plus haut.
 	* Le mode d'action d'un acteur est définit par un canal. Un acteur peut donc être vu comme une instance d'un canal.
 	* Les messages échangés par des acteurs ont la sémantique soit d'un signal, soit d'une action. De la même manière qu'une lettre à la Poste, ils peuvent être envoyés anonymement mais ont forcément un destinataire. Les acteurs ne communiquent que par message.
 	* A ce niveau concret, une recette est définie comme relation de causalité entre deux acteurs et « if this then that » devient : quand un acteur envoit un message qui contient un signal, alors un autre acteur reçoit un message qui lui dit d'accomplir telle action. Dans le monde physique, un capteur ne sait faire qu'une chose : lever des signaux. Pour respecter la simplicité des objets physiques, un pseudo-acteur est définit (`actors.Controller` dans le code) pour permettrent aux acteurs de lever des signaux simplement en envoyant un message à ce pseudo-acteur. Les recettes sont « diluées » dans ce pseudo-acteur : à réception d'un message signal d'un acteur, le pseudo-acteur regarde si une relation de causalité existe. Le cas échéant, il envoit anonyment un message d'action à l'acteur définit.
 	* Ce pseudo-acteur représente ifttt mais ce n'est pas la seule architecture possible. On peut également rendre chaque acteur conscient des relations de causalité qui le lie aux autres (plus précisément : qui en lient d'autres aux messages signaux qu'il leur enverra). Cette architecture présente des avantages indéniables, puisqu'elle rend le système réellement distribué. Le projet est actuellement réparti en deux branches pour étudier la facilité d'implémentation de chacune.
 	* Ce pseudo-acteur est utile pour envoyer des messages signaux et simuler des changements. La période caractérisant l'envoi de ces messages est définit par une loi de probabilité qui peut être fixe (toutes les trente secondes) ou plus évoluée : lois de Bernouilli, Gauss, Poisson…
 	
## Présentation technique

### Conception

Parler des patrons de conception : `Controller` est singleton et contient le seul `ActorSystem`, les autres objets ayant des références vers ce derniers. Pour générer à la volée les messages d'action en fonction des messages signaux reçus, `Controller` utilise le patron de conception de la fabrique. D'abord explicite, il est maintenant sous-jacents des λ-expressions.

Java 8 permet une manipulation intuitive des collections de données grace au λ-calcul (`filter`, `map`, `flatMap`)

### Un défaut conceptuel

Dans toute discussion sur ce sujet, nous commençons toujours par parler des canaux pour en venir ensuite aux acteurs, définis par rapport aux canaux. Notre utilisation de akka est sur ce point erronnée car nous définissons les acteurs dans le code et les canaux dans la base. Il serait séduisant de définir et de charger dynamiquement les classes des acteurs rendues nécessaires par les canaux.

Les premières recherches menées en sens font état d'un niveau de technicité extrême et d'une complexité faramineuse :
 * http://twit88.com/blog/2007/10/21/compile-and-reload-java-class-dynamically-using-apache-commons-jci/
 * http://javahowto.blogspot.de/2006/07/javaagent-option.html
 * http://www.nurkiewicz.com/2009/09/injecting-methods-at-runtime-to-java.html
 * En fait, il semble même que des projets de recherche soient menés en ce sens : https://github.com/Sable/soot/wiki/Adding-attributes-to-class-files-%28Advanced%29

Tout bien réfléchi, les acteurs ont tout de même une intelligence qui échappe aux canaux et correspondent à des objets physiques qui ne sont pas facilement modifiables. Le paradigme de l'administrateur de ifttt est d'en abstraire un type en créant des canaux qui regroupe des acteurs tandis que celui de l'utilisateur est de redescendre des canaux vers les objets physiques.

En fin de compte, restons comme nous sommes. Les deux doivent être définis en étroite accointance.

### Utilisation

Parler des classes et des manières « pratiques » de les utiliser avec des exemples de code and so on…

