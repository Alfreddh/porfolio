# 🎨 Portfolio Personnel - Alfred B.

Un portfolio moderne et professionnel développé avec HTML5, CSS3, Bootstrap 5 et JavaScript vanilla.

## ✨ Fonctionnalités

- **Design moderne** avec thème clair/sombre
- **Responsive** - Optimisé pour tous les appareils
- **Animations fluides** et micro-interactions
- **Filtrage de projets** par catégorie
- **Formulaire de contact** avec Firebase
- **Dashboard sécurisé** pour gérer les messages
- **SEO optimisé** avec métadonnées complètes

## 🚀 Technologies utilisées

- **Frontend :** HTML5, CSS3, JavaScript (Vanilla)
- **Framework :** Bootstrap 5
- **Icônes :** Bootstrap Icons
- **Polices :** Google Fonts (Poppins + Inter)
- **Base de données :** Firebase Firestore
- **Authentification :** Firebase Auth
- **Images :** Unsplash (CDN)

## 📁 Structure du projet

```
portfolio/
├── index.html              # Page principale
├── login.html              # Page de connexion
├── dashboard.html          # Dashboard des messages
├── firebase-config.js      # Configuration Firebase
├── config.js              # Configuration générale
├── assets/
│   ├── css/
│   │   └── style.css      # Styles personnalisés
│   ├── js/
│   │   ├── main.js        # JavaScript principal
│   │   └── dashboard.js   # JavaScript du dashboard
│   └── cv-alfred-b.pdf    # CV (exemple)
└── README.md
```

## 🎯 Sections du portfolio

1. **Hero** - Présentation et call-to-action
2. **À propos** - Parcours et compétences
3. **Compétences** - Technologies maîtrisées
4. **Projets** - Réalisations avec filtres
5. **Services** - Offres de services
6. **Témoignages** - Avis clients
7. **Blog** - Articles récents
8. **Contact** - Formulaire de contact

## 🔧 Personnalisation

### Modifier les informations personnelles

Éditez `config.js` pour personnaliser :
- Nom et titre
- Statistiques
- Compétences
- Services
- Témoignages
- Articles de blog
- Liens sociaux

### Changer les couleurs

Modifiez les variables CSS dans `assets/css/style.css` :
```css
:root {
    --primary-color: #6C5CE7;
    --secondary-color: #00D1B2;
    --light-bg: #F8F9FB;
    --dark-bg: #0B0B0C;
}
```

### Ajouter des projets

Modifiez le tableau `projects` dans `assets/js/main.js` :
```javascript
const projects = [
    {
        id: 1,
        title: "Nom du projet",
        description: "Description courte",
        image: "URL de l'image",
        category: "web|mobile|ui-ux|autres",
        tags: ["React", "Node.js"],
        demoLink: "https://demo.com",
        codeLink: "https://github.com/...",
        longDescription: "Description détaillée"
    }
];
```

## 📧 Configuration Firebase

### 1. Créer un projet Firebase
- Allez sur [Firebase Console](https://console.firebase.google.com/)
- Créez un nouveau projet
- Activez Authentication (Email/Password)
- Activez Firestore Database

### 2. Configurer les règles Firestore
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /messages/{document} {
      allow read, write: if true;
    }
  }
}
```

### 3. Mettre à jour la configuration
Remplacez les valeurs dans `firebase-config.js` avec vos propres identifiants Firebase.

### 4. Créer un compte utilisateur
- Dans Firebase Console → Authentication → Users
- Ajoutez votre compte pour accéder au dashboard

## 🌐 Déploiement

### GitHub Pages
1. Poussez votre code sur GitHub
2. Allez dans Settings → Pages
3. Sélectionnez la branche main
4. Votre site sera accessible à `https://username.github.io/repository`

### Autres plateformes
- **Netlify** : Drag & drop du dossier
- **Vercel** : Import depuis GitHub
- **Firebase Hosting** : `firebase deploy`

## 📱 Responsive Design

Le portfolio est optimisé pour :
- **Desktop** : 1200px+
- **Tablet** : 768px - 1199px
- **Mobile** : 320px - 767px

## 🔒 Sécurité

- **Dashboard protégé** par authentification Firebase
- **Validation côté client** des formulaires
- **Règles Firestore** configurables
- **HTTPS** recommandé en production

## 📈 Performance

- **Images optimisées** via Unsplash CDN
- **CSS/JS minifiés** pour la production
- **Lazy loading** des images
- **Animations optimisées** avec CSS

## 🎨 Thèmes

- **Mode clair** : Fond clair, texte sombre
- **Mode sombre** : Fond sombre, texte clair
- **Préférence utilisateur** sauvegardée

## 📞 Support

Pour toute question ou problème :
1. Vérifiez la console du navigateur (F12)
2. Consultez la documentation Firebase
3. Vérifiez la configuration dans `firebase-config.js`

---

**Développé avec ❤️ par Alfred B.**
