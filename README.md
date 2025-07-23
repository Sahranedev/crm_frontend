# CRM Vue.js – Guide de démarrage

## Fonctionnalités principales (Frontend)

- **Authentification** : Inscription et connexion sécurisées.
- **Tableau de bord** : Vue d'ensemble de l'activité (clients, opportunités, chiffre d'affaires, taux de conversion, répartition par statut).
- **Gestion des clients** :
  - Liste, recherche, tri, création, modification et suppression de clients.
- **Gestion des opportunités** :
  - Liste, recherche, tri, filtrage par statut, création, modification et suppression d'opportunités.
  - Association d'une opportunité à un client, gestion du montant et du statut (en cours, gagnée, perdue).

---

## Lancer le projet Frontend

1. **Installer les dépendances**
   ```bash
   npm install
   ```
   Veuillez exécuter cette commande dans le dossier du projet frontend pour installer toutes les dépendances nécessaires.

2. **Démarrer le serveur de développement**
   ```bash
   npm run dev
   ```
   L'application sera accessible sur [http://localhost:5173](http://localhost:5173) (ou le port affiché dans votre terminal).

---

## Lancer le projet Backend

0. **Cloner le dépôt backend**
   - Veuillez cloner le dépôt backend depuis GitHub :
     ```bash
     git clone https://github.com/Evanchauffour/crm_back.git
     ```
   - Placez-vous ensuite dans le dossier cloné pour suivre les instructions ci-dessous.

1. **Démarrer la base de données PostgreSQL**
   - Veillez à avoir Docker installé sur votre machine.
   - Lancez la base de données avec la commande suivante :
     ```bash
     docker-compose up -d
     ```
   - La base sera accessible sur `localhost:5433` avec :
     - Utilisateur : `crm_user`
     - Mot de passe : `crm_password`
     - Base : `crm_db`

2. **Configurer la connexion à la base**
   - Veuillez créer un fichier `.env` à la racine du dossier backend avec le contenu suivant :
     ```
     DATABASE_URL="postgresql://crm_user:crm_password@localhost:5433/crm_db"
     JWT_SECRET=Pslr97P2CXbze+k3j9C543pzIrOjNIqeEdIEspGnsvM=
     PORT=8000
     ```

3. **Installer les dépendances**
   ```bash
   npm install
   ```
   Exécutez cette commande dans le dossier backend pour installer toutes les dépendances nécessaires.

4. **Appliquer les migrations Prisma**
   ```bash
   npx prisma migrate dev
   ```
   Cette commande appliquera les migrations à votre base de données.

5. **(Optionnel) Peupler la base avec des données de test**
   ```bash
   npx ts-node prisma/seed.ts
   ```
   Utilisez cette commande pour insérer des données de test dans la base, si besoin.

6. **Lancer le serveur backend**
   ```bash
   npm run start:dev
   ```
   Le serveur backend sera alors accessible sur le port 8000 (ou celui défini dans votre fichier `.env`).
