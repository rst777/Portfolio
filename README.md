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
Si ton frontend (React, Vue, etc.) tourne sur http://localhost:5173 et que ton backend est sur http://localhost:3000, alors le navigateur bloque par défaut les requêtes AJAX à cause des politiques de sécurité (Same-Origin Policy). cors permet de lever cette restriction et d'autoriser certaines requêtes.

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
effectuer diverses tâches telles **que le parsing du corps de la requête**, **la gestion des sessions**,
ou **le service de fichiers statiques**.

Les middlewares peuvent être appliqués à **l'ensemble de l'application**, à **des routes spécifiques**,
ou à **une combinaison de route et de méthode HTTP particulière**. Ils sont ajoutés à l'application via des **méthodes comme app.use() ou app.get()**.
Un aspect crucial du middleware est l'utilisation de la **fonction next**().
Si un **middleware ne termine pas le cycle requête-réponse, il doit appeler next()**
pour **passer le contrôle au middleware suivant**, **sinon la requête restera en suspens**.



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
Réutilisabilité : Vous pouvez réutiliser le hook useCampaigns dans plusieurs composants sans dupliquer la logique de récupération des données.
Séparation des préoccupations : La logique de récupération des données est séparée de la logique de rendu des composants, ce qui rend le code plus propre et plus facile à maintenir.
Gestion des erreurs : Le hook gère les erreurs de manière centralisée, ce qui simplifie la gestion des erreurs dans les composants.
En résumé, le hook useCampaigns est une manière efficace de récupérer et de gérer les données des campagnes de dons dans votre application React.
