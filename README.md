# API d'enregistrement d'utilisateurs et gestion de produits

Ce projet est un serveur Node.js (probablement avec Express) qui permet de gérer l'enregistrement et l'authentification des utilisateurs, l'envoi de mails, ainsi que la gestion sécurisée de produits via une API REST.

---

## Fonctionnalités

### Authentification

- Enregistrement d'un utilisateur (`/auth/register`)
- Connexion d'un utilisateur (`/auth/login`)
- Envoi d’un email à l’utilisateur (ex. : confirmation ou reset)
- Modification du mot de passe
- Réinitialisation du mot de passe

###  Protection des routes

Certaines routes liées aux produits nécessitent que l'utilisateur soit **connecté (authentifié)** via un token JWT.

###  Gestion des produits (routes protégées)

- `POST /products` : Ajouter un nouveau produit
- `PATCH /products/:id` : Mettre à jour un produit (hors statut)
- `PATCH /products/:id/:status` : Modifier uniquement le statut en stock
- `DELETE /products/:id` : Supprimer un produit

---

##  Installation

### Prérequis

- Node.js 
- MongoDB 
- Un compte sur un service mail ( Gmail)

##  Structure du projet
enregistrement/     
├──config/      
├──controllers/     
├── models/     
├── routes/     
├── tests/      
├── utils/      
├── .env        
├── serveur.js      
├── gitignore       
├──package-lock.json        
├── package.json        
└── README.md   

## Technologies utilisées
    Google slides
    Node.js
    Express
    MongoDB 
    JWT pour l’authentification
    bcrypt
    cors
    dotenv
    express
    jsonwebtoken
    mongoose
    nodemailer
    nodemon
    uuid
## Auteur
Nadjla Sefadine, Salima Nousradine ,Ahmad Erda,Hissein Blaise
## Test
postman "https://www.postman.com/mission-observer-72767626-5882125/workspace/workspace-publique/collection/47074194-b152f12f-8b0f-4010-bcdb-5e2d637e1bd0?action=share&creator=47074194"

### Étapes

```bash
git clone https://github.com/NadjlaSefadine/enregistrement.git
cd enregistrement
npm install
