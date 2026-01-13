# 🚀 MISE EN PLACE - GUIDE D'INSTALLATION

## ✅ Étapes complétées

- ✅ Endpoints sécurisés
- ✅ Routes POST/PATCH/DELETE /users supprimées
- ✅ JWT authentification ajoutée
- ✅ Validation des entrées
- ✅ Code compilé sans erreurs

## 📦 Installations à faire (1 minute)

### 1. Copier le fichier de configuration

```bash
cp .env.example .env
```

### 2. Éditer `.env` avec vos valeurs

```env
# Votre URL MongoDB
MONGODB_URI=mongodb+srv://username:password@cluster0.mongodb.net/nest-test?retryWrites=true&w=majority

# Un secret JWT complexe (min 32 caractères)
JWT_SECRET=your_super_secret_jwt_key_here_min_32_characters_recommended

# Environnement
NODE_ENV=development
```

### 3. Installer les dépendances (si pas déjà fait)

```bash
npm install
```

### 4. Lancer le serveur

```bash
npm run start:dev
```

Le serveur démarre sur `http://localhost:3000`

---

## 🧪 Tests rapides (utiliser Postman ou cURL)

### ✅ Test 1 : S'enregistrer

```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "username": "testuser"
  }'
```

**Résultat attendu:** 201 Created + user data

---

### ✅ Test 2 : Se connecter

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

**Résultat attendu:** 200 OK + access_token

---

### ✅ Test 3 : Consulter les users (protégé)

```bash
curl -X GET http://localhost:3000/users \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**Résultat attendu:** 200 OK + liste des users

---

### ❌ Test 4 : Sans token (doit échouer)

```bash
curl -X GET http://localhost:3000/users
```

**Résultat attendu:** 401 Unauthorized

---

### ❌ Test 5 : POST /users (doit échouer)

```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{
    "email": "hacker@example.com",
    "password": "password123",
    "username": "hacker",
    "role": "ADMIN"
  }'
```

**Résultat attendu:** 404 Not Found (route n'existe plus)

---

## 🔐 Points clés de sécurité

| Aspect            | Avant                     | Après            |
| ----------------- | ------------------------- | ---------------- |
| **POST /users**   | ✅ Disponible (DANGER)    | ❌ Supprimé      |
| **GET /users**    | ✅ Public                 | 🔒 Nécessite JWT |
| **Rôle à signup** | ⚠️ Contrôlable par client | 🔒 Forcé à USER  |
| **Mot de passe**  | ⚠️ Plain text             | 🔒 Hashé bcrypt  |
| **Token JWT**     | ❌ Pas de JWT             | ✅ 7 jours       |

---

## 📚 Documentation

- 📖 [AUTH_SECURITY.md](./AUTH_SECURITY.md) - Documentation sécurité complète
- 📖 [CHANGES_SUMMARY.md](./CHANGES_SUMMARY.md) - Résumé des modifications
- 📖 [.env.example](./.env.example) - Variables d'environnement requises

---

## ⚠️ Importance

**NE PAS oublier :**

1. ✅ Créer `.env` local
2. ✅ Ne jamais commiter `.env`
3. ✅ Utiliser un JWT_SECRET fort
4. ✅ Garder les secrets en variable d'environnement

---

## 💡 En cas de problème

### Erreur: "Cannot find module"

```bash
npm install
```

### Erreur: "JWT_SECRET not found"

```bash
# Vérifier le fichier .env existe et contient JWT_SECRET
cat .env
```

### Erreur: "MongoDB connection failed"

```bash
# Vérifier MONGODB_URI est correcte dans .env
# Vérifier que MongoDB Atlas accepte votre IP
```

---

## ✨ Fin !

Vous avez maintenant une API authentifiée 100% sécurisée !

- Enregistrement : `/auth/register`
- Connexion : `/auth/login`
- Lister users : `GET /users` (JWT requis)
- Créer user directement : ❌ IMPOSSIBLE
- Se créer ADMIN : ❌ IMPOSSIBLE

🚀 Prêt à partir en production !
