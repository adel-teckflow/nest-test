# 🔐 SÉCURITÉ - ENDPOINTS USERS

## ✅ Endpoints disponibles

### 1. **POST /auth/register** (Public)

Crée un nouvel utilisateur avec le rôle `USER` (impossible de se créer en ADMIN)

```bash
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "username": "john_doe"
}
```

### 2. **POST /auth/login** (Public)

Se connecte et reçoit un token JWT valide 7 jours

```bash
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

### 3. **GET /users** (Protégé - JWT requis)

Récupère la liste de tous les utilisateurs

```bash
GET /users
Authorization: Bearer <token>
```

### 4. **GET /users/:id** (Protégé - JWT requis)

Récupère un utilisateur par ID

```bash
GET /users/:id
Authorization: Bearer <token>
```

---

## ⛔ Endpoints SUPPRIMÉS (Sécurité)

- ❌ `POST /users` - Supprimé (créer via `/auth/register` uniquement)
- ❌ `PATCH /users/:id` - Supprimé (pas de modification directe)
- ❌ `DELETE /users/:id` - Supprimé (fonctionnalité admin uniquement)

---

## 🛡️ Améliorations de sécurité appliquées

1. **Création sécurisée** : Le rôle est forcé à `USER`, impossible de se créer ADMIN
2. **Hashage des mots de passe** : `bcrypt` avec salt 10
3. **Validation des entrées** :
   - Email format requis
   - Mot de passe minimum 6 caractères
   - Champs obligatoires

4. **Authentification JWT** :
   - Token expire après 7 jours
   - Routes GET /users protégées par JWT
   - Secret stocké en variable d'environnement

5. **Erreurs génériques** : "Email ou mot de passe incorrect" (pas de leak d'info)

---

## 🔧 Configuration requise

### 1. Créer le fichier `.env`

```bash
cp .env.example .env
```

### 2. Remplir les variables

```env
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/nest-test
JWT_SECRET=votre_secret_jwt_super_securise_ici_min_32_chars
NODE_ENV=development
```

### 3. Installer les dépendances

```bash
npm install
# ou
yarn install
```

---

## ✨ Exemple d'utilisation complet

### 1️⃣ S'enregistrer

```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"user@test.com","password":"pass123","username":"testuser"}'
```

**Réponse:**

```json
{
  "id": "507f1f77bcf86cd799439011",
  "email": "user@test.com",
  "username": "testuser",
  "role": "USER",
  "message": "Utilisateur créé avec succès. Connectez-vous avec vos identifiants."
}
```

### 2️⃣ Se connecter

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@test.com","password":"pass123"}'
```

**Réponse:**

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "user@test.com",
    "username": "testuser",
    "role": "USER"
  }
}
```

### 3️⃣ Consulter les utilisateurs (avec token)

```bash
curl -X GET http://localhost:3000/users \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

---

## ⚙️ Variables d'environnement

| Variable      | Description                   | Exemple                       |
| ------------- | ----------------------------- | ----------------------------- |
| `MONGODB_URI` | URL de connexion MongoDB      | `mongodb+srv://...`           |
| `JWT_SECRET`  | Secret pour signer les tokens | `min 32 caractères`           |
| `NODE_ENV`    | Environnement                 | `development` ou `production` |

---

## 📋 Checklist de sécurité

- ✅ Rôle forcé à USER lors de l'inscription
- ✅ Mots de passe hashés avec bcrypt
- ✅ Validation des entrées
- ✅ Endpoints sensibles protégés par JWT
- ✅ Erreurs génériques (pas de leak d'info)
- ✅ GET /users protégés
- ✅ POST/PATCH/DELETE /users supprimés
- ✅ Secret JWT dans les variables d'environnement
