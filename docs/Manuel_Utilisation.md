Manuel d’utilisation pour les utilisateurs

Généralités sur l’application :

L’application a deux fonctionnalités majeures :
•	Simuler la création et la gestion de recettes par un utilisateur => vue utilisateur
•	Simuler l’environnement auquel les objets connectés appartiennent en envoyant des triggers qui peuvent se dérouler dans la vie de tous les jours => vue administrateur

Utilisation pour user :

Un utilisateur doit avoir son username et password déjà créé dans la base de données. Une fois l’utilisateur est connecté au site, il a le choix entre deux possibilités : 
•	Voir les recettes qu’il a créées auparavant et qui lui appartiennent :
Dans cette vue, toutes les recettes appartenant à cet utilisateur sont visualisées. Un attribut indique pour chaque recette si elle est active ou non. L’utilisateur peut aussi activer ou désactiver une recette, voir le log de la recette et supprimer une recette.
•	Créer une recette de zéro :
L’utilisateur sera guidé par une interface ergonomique pour créer sa recette pas à pas. D’abord, il choisira le trigger channel (par exemple un détecteur de présence dans une chambre), le trigger (la détection de présence), le field (pour pouvoir ajouter un paramètre supplémentaire au trigger. Ex : l’heure à partir de laquelle on veut commencer la détection), l’action channel, l’action, le field (analogique à trigger channel, trigger et field respectivement) et enfin le titre de la recette.
La recette sera alors ajoutée et sauvegardée dans la base de données et appartiendra à cette utilisateur

Utilisation pour administrateur : 

Un administrateur, comme pour un utilisateur normal, doit sûrement avoir son username et password dans la base de données. L’administrateur a plusieurs fonctionnalités qui lui permettent de bien gérer le déroulement de la simulation et de la visualiser :
•	Lancer une simulation :
Le premier choix que l’admin doit faire est de choisir le type de la simulation à exécuter
o	Simulation manuelle :
Choisir un trigger et le lancer une seule fois
o	Simulation périodique :
Choisir un trigger et le lancer à une période donnée pour un certain temps. La condition d’arrêt sera précisée par l’administrateur
o	Simulation aléatoire :
Choisir un trigger, et ensuite choisir entre deux lois pour la simulation : la loi de poisson et la loi brownienne. Tout en choisissant aussi la condition d’arrêt.
•	Visualiser le graphe des relations :
Toute recette présente, crée une sorte de relation entre les objets (ou acteurs présents) et les messages de trigger ou d’action. L’administrateur aura alors une vue globale de son système qui lui permet de voir qui agit sur qui.
•	Visualiser le log :
Le log administrateur contient  toutes les informations nécessaires. Quand une simulation est lancée, des messages sont envoyés entre les acteurs. Ces messages ont un acteur source, et un acteur destination (les channels choisis dans la recette), et un message de trigger et un message d’action, et biensûr un état.
L’état permet de montrer comment les conflits ont lieu : 
Si deux utilisateurs appartenant à un même groupe d’utilisateurs (ou d’une même maison par exemple), donnent, pour une même condition, deux actions différentes il y aura un conflit.  Ex : user1 : s’il fait chaud, allumer le climatiseur ET user2 : s’il fait chaud, éteindre le climatiseur.
Ceci montre comment les conflits ont lieu. L’administrateur peut voir dans un tableau toutes le informations nécessaires pour détecter les conflits.

N.B : le but du projet étant de créer un simulateur, nous ne nous sommes pas concentrés sur le développement de parties qui ont une importance minimale au projet (comme permettre de créer un nouvel utilisateur à partir de l’interface de l’application). Donc les utilisateurs sont créés en hard coding.
