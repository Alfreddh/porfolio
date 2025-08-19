/**
 * Login - Authentification Firebase
 */

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const loginBtn = document.getElementById('loginBtn');
    const btnText = loginBtn.querySelector('.btn-text');
    const loadingSpinner = loginBtn.querySelector('.loading-spinner');
    const errorMessage = document.getElementById('errorMessage');
    const errorText = document.getElementById('errorText');
    const successMessage = document.getElementById('successMessage');
    const successText = document.getElementById('successText');

    // Vérifier si l'utilisateur est déjà connecté
    auth.onAuthStateChanged(function(user) {
        if (user) {
            // Rediriger vers le dashboard
            window.location.href = 'dashboard.html';
        }
    });

    // Gestion du formulaire de connexion
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        // Masquer les messages précédents
        hideMessages();
        
        // Afficher l'état de chargement
        setLoadingState(true);
        
        // Authentification Firebase
        auth.signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                showSuccess('Connexion réussie ! Redirection...');
                
                // Redirection après 1 seconde
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1000);
            })
            .catch((error) => {
                setLoadingState(false);
                
                let errorMessage = 'Une erreur s\'est produite lors de la connexion.';
                
                switch (error.code) {
                    case 'auth/user-not-found':
                        errorMessage = 'Aucun compte trouvé avec cet email.';
                        break;
                    case 'auth/wrong-password':
                        errorMessage = 'Mot de passe incorrect.';
                        break;
                    case 'auth/invalid-email':
                        errorMessage = 'Adresse email invalide.';
                        break;
                    case 'auth/user-disabled':
                        errorMessage = 'Ce compte a été désactivé.';
                        break;
                    case 'auth/too-many-requests':
                        errorMessage = 'Trop de tentatives. Réessayez plus tard.';
                        break;
                }
                
                showError(errorMessage);
            });
    });

    // Fonctions utilitaires
    function setLoadingState(loading) {
        if (loading) {
            btnText.style.display = 'none';
            loadingSpinner.style.display = 'inline-block';
            loginBtn.disabled = true;
        } else {
            btnText.style.display = 'inline-block';
            loadingSpinner.style.display = 'none';
            loginBtn.disabled = false;
        }
    }

    function showError(message) {
        errorText.textContent = message;
        errorMessage.style.display = 'block';
        errorMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    function showSuccess(message) {
        successText.textContent = message;
        successMessage.style.display = 'block';
    }

    function hideMessages() {
        errorMessage.style.display = 'none';
        successMessage.style.display = 'none';
    }
});
