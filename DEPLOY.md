# Guide de Déploiement Netlify pour BeninHeritage

Ce document détaille la procédure de déploiement sur Netlify pour l'application React/Vite.

## 1. Configuration requise

### Fichiers de configuration
- **`netlify.toml`** : Déjà créé à la racine du projet. Il configure le dossier de publication (`dist`), la commande de build (`npm run build`) et les redirections SPA.
- **`vite.config.ts`** : Déjà configuré avec `base: './'` et `outDir: 'dist'`.

### Pré-requis
- Un compte [Netlify](https://app.netlify.com/signup).
- Node.js installé localement (pour les tests).
- Netlify CLI installé globalement (optionnel mais recommandé) : `npm install -g netlify-cli`.

## 2. Commandes de Déploiement

### Option A : Déploiement via Git (Recommandé)
1. Poussez votre code sur un dépôt Git (GitHub, GitLab, Bitbucket).
2. Connectez-vous à Netlify et cliquez sur "New site from Git".
3. Sélectionnez votre dépôt.
4. Netlify détectera automatiquement les paramètres grâce au fichier `netlify.toml`.
5. Cliquez sur "Deploy site".

### Option B : Déploiement Manuel via CLI
Si vous souhaitez déployer depuis votre terminal sans passer par Git :

1. **Login** :
   ```bash
   netlify login
   ```

2. **Initialisation** (la première fois) :
   ```bash
   netlify init
   ```
   - Choisissez "Create & configure a new site".
   - Team : Votre équipe.
   - Site name : (laissez vide pour un nom aléatoire ou choisissez-en un).
   - Build command : `npm run build`
   - Directory to deploy : `dist`

3. **Déploiement (Preview)** :
   ```bash
   netlify deploy
   ```
   Ceci déploie une version de prévisualisation (draft).

4. **Déploiement (Production)** :
   ```bash
   netlify deploy --prod
   ```
   Ceci déploie la version live.

## 3. Pièges Fréquents et Points Critiques

### ⚠️ Page Blanche (White Screen of Death)
- **Cause** : Mauvaise configuration du `base` path dans Vite.
- **Solution** : Assurez-vous que `vite.config.ts` contient `base: './'` ou `base: '/'`. Le fichier `netlify.toml` gère les redirections, mais Vite doit savoir où chercher ses assets.

### ⚠️ Erreur 404 au rafraîchissement (Refresh)
- **Cause** : Le serveur Netlify ne sait pas que c'est une SPA et cherche un fichier correspondant à l'URL (ex: `/services.html` qui n'existe pas).
- **Solution** : La section `[[redirects]]` dans `netlify.toml` est cruciale :
  ```toml
  [[redirects]]
    from = "/*"
    to = "/index.html"
    status = 200
  ```

### ⚠️ Variables d'Environnement
- **Problème** : Les variables `.env` ne sont pas committées.
- **Solution** : Ajoutez vos variables d'environnement (ex: `VITE_API_URL`) dans l'interface Netlify :
  - Site settings > Build & deploy > Environment > Environment variables.
  - **Note** : Seules les variables commençant par `VITE_` sont exposées au client React.

### ⚠️ Build Fail (Erreurs TypeScript)
- **Cause** : Netlify exécute `tsc` (TypeScript Compiler) lors du build et échoue s'il y a des erreurs de typage strict.
- **Solution** :
  - Corrigez toutes les erreurs TypeScript avant de déployer.
  - OU (déconseillé en prod) modifiez le script build dans `package.json` pour ignorer les erreurs : `"build": "vite build"`. (Par défaut `vite build` n'exécute pas `tsc`, mais certains setups CI le font).

### ⚠️ Node Version
- **Problème** : Version de Node.js incompatible.
- **Solution** : Créez un fichier `.nvmrc` à la racine avec la version souhaitée (ex: `20`) ou définissez la variable d'environnement `NODE_VERSION` dans Netlify.

## 4. Vérification Finale

Avant de déployer, vous pouvez tester le build localement :

```bash
npm run build
npm run preview
```

Si `npm run preview` fonctionne et que vous pouvez naviguer sur le site localement (http://localhost:4173), le déploiement Netlify devrait fonctionner.
