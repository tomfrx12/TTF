# TTF — Tutos Tom Fourneaux

Plateforme de tutoriels de développement web, conçue pour les étudiants. Chaque tutoriel est court, visuel et directement applicable.

## Stack technique

| Couche | Technologie |
|--------|-------------|
| Framework | Next.js 16 (App Router, Turbopack) |
| Langage | TypeScript |
| Style | Tailwind CSS |
| ORM | Prisma 7 |
| Base de données | PostgreSQL 15 |
| Auth | Cookie HttpOnly signé HMAC-SHA256 |
| Hash mots de passe | bcryptjs (cost 12) |
| Déploiement | Docker + Traefik + Let's Encrypt |

## Fonctionnalités

- Catalogue de tutoriels avec recherche et filtres par catégorie
- Page individuelle par tutoriel (slug)
- Système de complétion — marquer un tutoriel comme terminé
- Historique des tutoriels complétés par utilisateur
- Authentification (inscription / connexion / déconnexion)
- Session persistante via cookie HttpOnly (survit au refresh)
- Page de profil avec modification des infos et du mot de passe
- Interface d'administration : créer, modifier, supprimer des tutoriels et des catégories
- Gestion des utilisateurs (rôles admin / student)
- Upload d'images de couverture
- Charte éditoriale et calendrier de publication
- Sitemap dynamique et robots.txt

## Structure des pages

```
/                        → Accueil (derniers tutoriels, stats)
/tutoriels               → Catalogue avec recherche et filtres
/tutoriels/[slug]        → Page d'un tutoriel
/login                   → Connexion / Inscription
/users/[id]              → Profil utilisateur (onglets : Profil, Historique, Admin)
/admin                   → Interface d'administration (admin uniquement)
/charte-editoriale       → Charte éditoriale + calendrier de publication
/mentions-legales        → Mentions légales
```

## Installation locale

### Prérequis

- Node.js 20+
- Docker (pour PostgreSQL)

### Démarrage

```bash
# 1. Cloner le projet
git clone <url-du-repo>
cd TTF

# 2. Installer les dépendances
npm install

# 3. Copier et configurer les variables d'environnement
cp .env.example .env
# Éditer .env avec tes valeurs

# 4. Démarrer PostgreSQL
docker compose up -d

# 5. Initialiser la base de données
npx prisma db push

# 6. Créer les rôles
docker exec ttf_postgres_container psql -U DB_USER -d DB_NAME -c \
  "INSERT INTO \"Role\" (name) VALUES ('admin'), ('student');"

# 7. Lancer le serveur de développement
npm run dev
```

L'application est disponible sur [http://localhost:3000](http://localhost:3000).

## Variables d'environnement

```env
DB_USER=postgres
DB_PASSWORD=motdepasse
DB_NAME=ttf_database
DATABASE_URL=postgresql://postgres:motdepasse@localhost:5432/ttf_database
SESSION_SECRET=une-chaine-aleatoire-longue-et-securisee
PGADMIN_EMAIL=admin@example.com
PGADMIN_PASSWORD=motdepasse
```

## Déploiement (Docker + Traefik)

```bash
# Build et démarrage en production
sudo docker compose -f docker-compose.prod.yml up -d --build

# Initialisation de la BDD (première fois uniquement)
sudo docker exec ttf_app npx prisma db push

# Créer les rôles (première fois uniquement)
sudo docker exec ttf_postgres_container psql -U $DB_USER -d $DB_NAME -c \
  "INSERT INTO \"Role\" (name) VALUES ('admin'), ('student') ON CONFLICT DO NOTHING;"

# Passer un compte en admin
sudo docker exec ttf_postgres_container psql -U $DB_USER -d $DB_NAME -c \
  "UPDATE \"User\" SET \"roleId\" = (SELECT id FROM \"Role\" WHERE name = 'admin') WHERE email = 'ton@email.fr';"

# Mise à jour
git pull
sudo docker compose -f docker-compose.prod.yml up -d --build
```

## Sécurité

- Mots de passe hashés avec bcrypt (cost 12)
- Sessions via cookie `HttpOnly`, `SameSite=Strict`, `Secure` (prod), signé HMAC-SHA256
- Routes API protégées : 401 si non connecté, 403 si rôle insuffisant
- Upload limité aux images (jpeg, png, webp, gif) — 5 Mo max
- Validation email et longueur minimale du mot de passe (8 caractères)
- Headers de sécurité : `X-Content-Type-Options`, `X-Frame-Options`, `X-XSS-Protection`, `Referrer-Policy`
- Postgres non exposé publiquement en production
