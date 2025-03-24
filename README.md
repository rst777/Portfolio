FR
# Portfolio

#### Requirements

##### Lancement de ma dataBase (mongoDB).

  ######  npm start

##### Lancement de JS (react)

###### npm run dev


#### Ma Structure
1. Créations des controlleurs
2. Créations des routes
3. Configuration des routes dans app.js

```
mon-portfolio-api/
│── coverage/               # Rapports de couverture des tests
│── node_modules/           # Dépendances Node.js (ne pas modifier)
│── src/
│   ├── controllers/        # Contient la logique métier
│   │   ├──
│   ├── middleware/         # Middlewares (gestion des erreurs, authentification...)
│   ├── models/             # Modèles de données (Mongoose)
│   │   ├── contact.model.js
│   │   ├── project.model.js
│   │   ├── .js
│   ├── routes/             # Routes de l'API
│   │   ├── contactRoutes.js
│   │   ├── projectRoutes.js
│   │   ├── .js
│   ├── app.js              # Initialisation Express
│   ├── db.js               # Connexion MongoDB
│   ├── server.js           # Lancement du serveur
├── tests/                  # Fichiers de tests Jest
├── .env                    # Variables d'environnement
├── .gitignore              # Fichiers ignorés par Git
├── package.json            # Dépendances et scripts npm
├── package-lock.json       # Verrouillage des versions npm
├── README.md               # Documentation du projet
```
✅
✔️ Séparation des fichiers : Routes, modèles et contrôleurs sont bien séparés.
✔️ Utilisation de src/db.js : Permet de centraliser la connexion MongoDB.
✔️ Utilisation de fichiers .env : Garde les informations sensibles hors du code.
✔️ Organisation claire : Routes, modèles et contrôleurs ont leurs propres dossiers.

controllers/ : Ce dossier contient la logique de ton application, c'est-à-dire les fonctions qui traitent les requêtes HTTP, interagissent avec la base de données et renvoient les réponses au client.

routes/ : Ce dossier contient les fichiers qui définissent les routes de ton API. Chaque fichier correspond à un ensemble de routes pour une ressource spécifique (comme projects, contacts, etc.).

models/ : Ce dossier contient les définitions de tes modèles de données. Si tu utilises une base de données comme MongoDB, tu y définis les schémas avec Mongoose.

Si tu ne veux pas de la partie skills (compétences), voici ce que tu peux avoir dans chacun de ces dossiers :

1. controllers/ :
Contient des fichiers qui gèrent la logique des routes pour des entités comme projects et contacts. Par exemple :

projectController.js : contient les fonctions pour ajouter, récupérer, mettre à jour ou supprimer un projet.
contactController.js : contient les fonctions pour ajouter, récupérer ou modifier les informations de contact (si nécessaire).
2. routes/ :
Contient des fichiers de routes qui définissent les endpoints pour chaque ressource :

projectRoutes.js : contient les routes pour gérer les projets.
contactRoutes.js : contient les routes pour gérer les informations de contact.
3. models/ :
Contient les fichiers pour définir les schémas de Mongoose (si tu utilises MongoDB) :

project.model.js : définit le schéma pour la collection des projets.
contact.model.js : définit le schéma pour la collection des contacts (si nécessaire).

```
/mon-portfolio-api
  /src
    /controllers
      - projectController.js
      - contactController.js
      - donationController.js
      - donationCampaignController.js
    /models
      - project.model.js
      - contact.model.js
      - donation.model.js
      - donationCampaign.model.js
    /routes
      - projectRoutes.js
      - contactRoutes.js
      - campaignRoutes.js
      - donationCampaignRoutes.js
      - donationRoutes.js
    /app.js
    /server.js
    /db.js
```
- donationCampaign représente une campagne de collecte de fonds, avec des informations sur la campagne en elle-même.
donation représente un don individuel fait par un utilisateur à une campagne donnée.
Ces deux entités fonctionnent ensemble, mais ont des rôles différents dans le système.

### 1er. Lancement de ma dataBase (mongoDB).

  ###   npm start

> mon-portfolio-api@1.0.0 start
> nodemon src/server.js

[nodemon] 3.1.9
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,cjs,json
[nodemon] starting `node src/server.js`
✅ API en cours d'exécution sur http://localhost:3000
🟢 MongoDB connecté
✅ Connecté à MongoDB

```
mon-portfolio-react/
│
├── public/
│
├── src/
│   ├── assets/
│   │   └── react.svg
│   │
│   ├── components/
│   │   ├── AboutPage.jsx
│   │   ├── CampaignDetails.jsx
│   │   ├── Campaigns.jsx
│   │   ├── CampaignSelector.jsx
│   │   ├── DonationForm.jsx
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   ├── HomePage.jsx
│   │   └── index.jsx
│   │
│   ├── hooks/
│   │   └── useCampaigns.js
│   │
│   ├── styles/
│   │   ├── AboutPage.css
│   │   ├── App.css
│   │   ├── Campaign.css
│   │   ├── CampaignSelector.css
│   │   ├── DonationForm.css
│   │   ├── Footer.css
│   │   ├── Header.css
│   │   ├── HomePage.css
│   │   ├── index.css
│   │   └── style.css
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── README.md
└── vite.config.js
```
### 2nd Lancement de JS (react)

### npm run dev

> mon-portfolio-react@0.0.0 dev
> vite


  VITE v6.2.0  ready in 389 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help



## GLOSSAIRE

1. cors (Cross-Origin Resource Sharing) est un mécanisme qui permet aux navigateurs web d'autoriser ou de bloquer des requêtes faites par une origine différente du serveur.

🔹 Pourquoi cors est-il utile ?
Si le frontend (React, Vue, etc.) tourne sur http://localhost:5173 et que le backend est sur http://localhost:3000, alors le navigateur bloque par défaut les requêtes AJAX à cause des politiques de sécurité (Same-Origin Policy). cors permet de lever cette restriction et d'autoriser certaines requêtes.

2. morgan est un middleware pour Express qui sert à logger (enregistrer) les requêtes HTTP dans la console. Il est utile pour voir en temps réel les requêtes envoyées à ton serveur, ce qui aide au debugging.

🔹 Pourquoi utiliser morgan ?
Il affiche les requêtes HTTP dans la console avec des infos utiles (méthode, URL, statut, temps de réponse).
Utile pour comprendre ce qui se passe sur ton API (ex: erreurs, performances).
Peut être configuré pour stocker les logs dans un fichier.

3. $inc : C'est une opérateur MongoDB qui permet d'incrémenter une valeur numérique sans affecter l'ensemble du document. Ici, on l'utilise pour augmenter raisedAmount de la campagne avec le montant du don.

#### Middleware

**Un middleware dans Express.js est une fonction qui a accès à trois éléments clés**:
1. L'objet de requête **(req)**
2. L'objet de réponse **(res)**
3. La fonction middleware suivante dans le cycle requête-réponse de l'application **(next)**

Les middlewares ont plusieurs rôles importants:

*	Exécuter du code
* Apporter des modifications aux objets de requête et de réponse
* Terminer le cycle requête-réponse
* Appeler la fonction middleware suivante dans la pile

Le middleware est au cœur du fonctionnement d'Express.js. En effet, une application Express
n'est essentiellement qu'une série d'appels de fonctions middleware. Ces fonctions peuvent
effectuer diverses tâches telles:
- **que le parsing du corps de la requête**,
- **la gestion des sessions**,
- **le service de fichiers statiques**.

- Les middlewares peuvent être appliqués à **l'ensemble de l'application**, à **des routes spécifiques**,
ou à **une combinaison de route et de méthode HTTP particulière**. Ils sont ajoutés à l'application via des **méthodes comme app.use() ou app.get()**.
Un aspect crucial du middleware est l'utilisation de la **fonction next**().
- Si un **middleware ne termine pas le cycle requête-réponse, il doit appeler next()**
pour **passer le contrôle au middleware suivant**, **sinon la requête restera en suspens**.

- Les middlewares sont des fonctions intermédiaires qui traitent les requêtes HTTP avant qu'elles n'atteignent les gestionnaires de route finaux15.

- Les middlewares dans Express.js peuvent effectuer diverses tâches importantes, telles que :

1. Valider les données de la requête

2. Accéder à une base de données

3. Agir comme un pare-feu

4. Journaliser des informations

5. Compresser les réponses

6. Gérer les erreurs

7. Mettre en cache les réponses

**Ces fonctions middleware ont accès aux objets de requête (req), de réponse (res), et à la fonction middleware suivante dans le cycle requête-réponse, généralement appelée next.**

En plaçant les middlewares dans un dossier dédié, on améliore l'organisation du projet, rendant le code plus maintenable et plus facile à comprendre. Cela permet également de réutiliser facilement ces middlewares dans différentes parties de votre application.

Pour utiliser un middleware, on peut le monter sur un chemin spécifique ou sur toutes les routes de votre application en utilisant app.use()5. Par exemple :

```
javascript
app.use((req, res, next) => {
  console.log('Time:', Date.now())
  next()
})
```
Ce middleware sera exécuté pour chaque requête reçue par votre application.

En résumé, le dossier middleware dans la structure de projet Express.js est un emplacement centralisé pour stocker et organiser les fonctions middleware personnalisées, ce qui améliore la modularité et la maintenabilité de votre application.



#### Exemples d'utilisation d'un parser

1️⃣ // Exemple de chaîne JSON
const jsonString = '{"nom": "Alice", "âge": 30, "ville": "Paris"}';

// Fonction pour parser la chaîne JSON
function parseJson(jsonString) {
    try {
        // Conversion de la chaîne JSON en objet JavaScript
        const data = JSON.parse(jsonString);

        // Extraction des informations
        const nom = data.nom;
        const âge = data.âge;
        const ville = data.ville;

        // Affichage des informations
        console.log(`Nom: ${nom}`);
        console.log(`Âge: ${âge}`);
        console.log(`Ville: ${ville}`);
    } catch (error) {
        // Gestion des erreurs de parsing
        console.error("Erreur lors du parsing du JSON:", error);
    }
}

// Appel de la fonction avec la chaîne JSON
parseJson(jsonString);
Ce code prend une chaîne JSON, la convertit en un objet JavaScript, puis extrait et affiche les informations contenues dans cet objet. Si la chaîne JSON est mal formée, une erreur sera capturée et affichée.
3️⃣ Parser du SQL (ex: comprendre une requête)

Un parser SQL analyse une requête pour vérifier qu'elle est correcte et pour la transformer en instructions exécutables par la base de données.

#### 📌 Pourquoi utiliser un parser ?

✅ Vérification syntaxique → Vérifie si le texte/code est valide.
✅ Transformation → Convertit un texte brut en une structure utilisable.
✅ Extraction d’informations → Permet de récupérer des données spécifiques (ex: récupérer du JSON, du HTML, du XML, etc.).

#### 💡 En gros, un parser permet de transformer des données brutes en quelque chose d’exploitable ! 🚀

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

Avantages d'utiliser un custom hook
- Réutilisabilité : Vous pouvez réutiliser le hook useCampaigns dans plusieurs composants sans dupliquer la logique de récupération des données.
- Séparation des préoccupations : La logique de récupération des données est séparée de la logique de rendu des composants, ce qui rend le code plus propre et plus facile à maintenir.
- Gestion des erreurs : Le hook gère les erreurs de manière centralisée, ce qui simplifie la gestion des erreurs dans les composants.
- En résumé, le hook useCampaigns est une manière efficace de récupérer et de gérer les données des campagnes de dons dans votre application React.

#### Mongoose-paginate-v2 est une bibliothèque de pagination pour Mongoose, un outil de modélisation d'objets pour MongoDB et Node.js.

##### Voici ses principales caractéristiques :

* C'est un plugin qui ajoute des fonctionnalités de pagination aux schémas Mongoose.
* Il permet de paginer facilement les résultats des requêtes Mongoose en ajoutant une méthode paginate() aux modèles.
* Il offre la possibilité de personnaliser les clés de retour directement dans la requête, évitant ainsi le besoin de code supplémentaire pour la transformation des données.
* Il prend en charge à la fois la pagination basée sur les pages et la pagination basée sur les curseurs.
* Il permet de spécifier des options comme le tri, la sélection de champs, la population de références, et l'utilisation de requêtes lean pour de meilleures performances.
* Il retourne des informations utiles comme le nombre total de documents, le nombre total de pages, et des indicateurs pour les pages suivantes et précédentes.
* Cette bibliothèque simplifie grandement la mise en place de la pagination dans les applications Node.js utilisant Mongoose et MongoDB.

###### 1. Objectif de la pagination :
Imaginez que vous avez 1000 projets dans votre base de données. Au lieu de les charger tous d'un coup (ce qui serait lent et inefficace), vous les affichez par petits groupes, disons 10 à la fois.

###### 2. Comment ça marche :

* Vous décidez combien d'éléments vous voulez par page (appelons ça limit).

* Vous gardez une trace de quelle page vous êtes actuellement (appelons ça page).

###### 3. Dans le code :
```
javascript
const { page = 1, limit = 10 } = req.query;
const startIndex = (page - 1) * limit;
```
Si vous êtes sur la page 1, vous commencez au début (index 0).
Si vous êtes sur la page 2, vous commencez au 11ème élément (index 10).
Et ainsi de suite...

###### 4. Utilisation dans Mongoose :
```
javascript
const projects = await Project.find().skip(startIndex).limit(limit);
```
* skip(startIndex) dit à Mongoose de sauter les premiers startIndex éléments.

* limit(limit) dit à Mongoose de ne renvoyer que limit éléments après cela.

###### 5. Exemple concret :

Si vous avez 100 projets et que vous voulez 10 projets par page :
* Page 1 : projets 1-10
* Page 2 : projets 11-20
* Page 3 : projets 21-30
etc.

C'est comme si vous feuilletiez un grand livre, mais en ne lisant que quelques pages à la fois, plutôt que de tout lire d'un coup.

##### Chacun gère un aspect spécifique de votre logique métier :

* projectController : Gère les opérations CRUD pour les projets.
* donationController : S'occupe des dons individuels et de leur traitement.
* donationCampaignController : Gère les campagnes de dons, y compris leur création, mise à jour, et les dons associés.
* contactController : Bien que actuellement un squelette, il est destiné à gérer les opérations liées aux contacts.
* Ces contrôleurs séparent la logique métier de vos routes, ce qui rend votre code plus modulaire, plus facile à maintenir et à tester. Ils sont essentiels pour structurer correctement votre application backend.

##### Chaque fichier de route correspond généralement à un contrôleur et définit les points d'entrée HTTP pour les différentes opérations. Voici comment cela fonctionne typiquement :

projectRoutes.js : Définit les routes pour les opérations sur les projets.

donationRoutes.js : Gère les routes pour les dons individuels.

donationCampaignRoutes.js : Définit les routes pour les opérations sur les campagnes de dons.

contactRoutes.js : Établit les routes pour la gestion des contacts.


##### La logique de la route protégée fait référence au code qui sera exécuté une fois que l'authentification par API_KEY a réussi. Cette logique dépend entièrement de ce que vous voulez que cette route fasse. Voici quelques exemples de ce que pourrait contenir la logique de la route protégée :

1. Renvoyer des données sensibles :
```
javascript
router.get('/protected-route', apiAuth, (req, res) => {
  res.json({ secretData: "Informations confidentielles" });
});
```
2. Effectuer une opération spécifique :
```
javascript
router.get('/protected-route', apiAuth, (req, res) => {
  // Exemple : récupérer des données d'utilisateur
  const userData = fetchUserData();
  res.json(userData);
});
```
3. Interagir avec une base de données :
```
javascript
router.get('/protected-route', apiAuth, async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM sensitive_table');
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la récupération des données" });
  }
});
```
##### La logique de la route protégée peut inclure n'importe quelle fonctionnalité que vous souhaitez restreindre aux utilisateurs authentifiés avec la bonne API_KEY.


### Snippet
```
/**
 * 🔹 Connexion (Login)
 * @route POST /auth/login
 */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation des entrées
    if (!email || !password) {
      return res.status(400).json({ message: "Email et mot de passe sont requis" });
    }

    const contact = await Contact.findOne({ email });

    // Vérifiez si l'utilisateur existe et si le mot de passe est correct
    if (!contact || !(await contact.comparePassword(password))) {
      return res.status(401).json({ message: "Identifiants invalides" });
    }

    // Génération du token JWT
    const token = jwt.sign(
      { userId: contact._id, email: contact.email },
      JWT_SECRET,
      { expiresIn: TOKEN_EXPIRATION_TIME }
    );

    res.json({
      message: "Connexion réussie",
      token,
      expiresIn: TOKEN_EXPIRATION_TIME,
    });
  } catch (error) {
    console.error("Erreur lors de la connexion:", error);
    res.status(500).json({ message: "Erreur lors de la connexion" });
  }
};
```
