/**
 * Configuration Firebase
 * Configuration pour le projet portfolio-1a2cd
 */

// Configuration Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBs43_gySeoRY0VGmmFui5Cmmuj16MRdns",
    authDomain: "portfolio-1a2cd.firebaseapp.com",
    projectId: "portfolio-1a2cd",
    storageBucket: "portfolio-1a2cd.appspot.com",
    messagingSenderId: "76905051849",
    appId: "1:76905051849:web:portfolio"
};

// Initialiser Firebase
firebase.initializeApp(firebaseConfig);

// Initialiser les services
const auth = firebase.auth();
const db = firebase.firestore();

// Configuration Firestore
const settings = {
    timestampsInSnapshots: true
};
db.settings(settings);

// Export pour utilisation globale
window.FirebaseApp = {
    auth,
    db,
    firebase
};
