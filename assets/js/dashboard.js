/**
 * Dashboard Messages - JavaScript avec Firebase
 * Gestion des messages reçus via le formulaire de contact
 */

// Variables globales
let allMessages = [];
let currentFilter = 'all';
let currentMessageId = null;
let currentUser = null;

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    const authLoading = document.getElementById('authLoading');
    const dashboardContent = document.getElementById('dashboardContent');
    
    // Vérifier que Firebase est initialisé
    if (typeof auth === 'undefined') {
        console.error('Firebase Auth non initialisé');
        window.location.href = 'login.html';
        return;
    }
    
    // Vérifier l'authentification
    auth.onAuthStateChanged(function(user) {
        if (user) {
            currentUser = user;
            
            // Masquer l'écran de chargement et afficher le contenu
            authLoading.style.display = 'none';
            dashboardContent.classList.add('authenticated');
            
            setupUserInfo();
            loadMessages();
        } else {
            // Rediriger vers la page de connexion
            console.log('Utilisateur non connecté, redirection vers login.html');
            window.location.href = 'login.html';
        }
    });
    
    // Vérification supplémentaire après un délai pour s'assurer que l'utilisateur n'est pas connecté
    setTimeout(() => {
        if (!currentUser) {
            console.log('Vérification de sécurité : utilisateur non connecté');
            window.location.href = 'login.html';
        }
    }, 2000);
});

// ===== FONCTIONS PRINCIPALES =====

function setupUserInfo() {
    const userEmail = document.getElementById('userEmail');
    const userAvatar = document.getElementById('userAvatar');
    
    if (currentUser) {
        userEmail.textContent = currentUser.email;
        
        if (currentUser.displayName) {
            userAvatar.textContent = currentUser.displayName.charAt(0).toUpperCase();
        } else {
            userAvatar.textContent = currentUser.email.charAt(0).toUpperCase();
        }
    }
}

function logout() {
    auth.signOut().then(() => {
        window.location.href = 'login.html';
    }).catch((error) => {
        console.error('Erreur lors de la déconnexion:', error);
    });
}

async function loadMessages() {
    showLoading(true);
    
    try {
        const messagesRef = db.collection('messages');
        const snapshot = await messagesRef.orderBy('date', 'desc').get();
        
        allMessages = [];
        snapshot.forEach(doc => {
            const message = {
                id: doc.id,
                ...doc.data()
            };
            allMessages.push(message);
        });
        
        displayMessages();
        updateStats();
    } catch (error) {
        console.error('Erreur lors du chargement des messages:', error);
        showNotification('Erreur lors du chargement des messages', 'error');
    } finally {
        showLoading(false);
    }
}

function displayMessages() {
    const container = document.getElementById('messagesContainer');
    const noMessages = document.getElementById('noMessages');
    
    // Filtrer les messages
    let filteredMessages = allMessages;
    if (currentFilter === 'new') {
        filteredMessages = allMessages.filter(msg => msg.status === 'new');
    } else if (currentFilter === 'replied') {
        filteredMessages = allMessages.filter(msg => msg.status === 'replied');
    }
    
    if (filteredMessages.length === 0) {
        container.innerHTML = '';
        noMessages.style.display = 'block';
        return;
    }
    
    noMessages.style.display = 'none';
    
    const messagesHTML = filteredMessages.map(message => createMessageCard(message)).join('');
    container.innerHTML = messagesHTML;
}

function createMessageCard(message) {
    const date = message.date ? new Date(message.date.toDate ? message.date.toDate() : message.date) : new Date();
    const formattedDate = date.toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    
    const timeAgo = getTimeAgo(date);
    
    let statusClass = 'status-new';
    let statusText = 'Nouveau';
    
    if (message.status === 'replied') {
        statusClass = 'status-replied';
        statusText = 'Répondu';
    } else if (!message.read) {
        statusClass = 'status-unread';
        statusText = 'Non lu';
    }
    
    return `
        <div class="message-card mb-3" onclick="openMessage('${message.id}')">
            <div class="message-header">
                <div class="flex-grow-1">
                    <div class="message-sender">${message.name || 'Anonyme'}</div>
                    <div class="message-subject">${message.subject || 'Aucun sujet'}</div>
                </div>
                <span class="status-badge ${statusClass}">${statusText}</span>
            </div>
            
            <div class="message-preview">
                ${message.message ? message.message.substring(0, 150) + (message.message.length > 150 ? '...' : '') : 'Aucun contenu'}
            </div>
            
            <div class="message-meta">
                <div class="message-email">
                    <i class="bi bi-envelope"></i>
                    ${message.email || 'Aucun email'}
                </div>
                <div class="message-date">
                    <i class="bi bi-clock"></i>
                    ${timeAgo}
                </div>
            </div>
        </div>
    `;
}

async function openMessage(messageId) {
    const message = allMessages.find(msg => msg.id === messageId);
    if (!message) return;
    
    currentMessageId = messageId;
    
    // Marquer comme lu si pas déjà lu
    if (!message.read) {
        try {
            await db.collection('messages').doc(messageId).update({
                read: true
            });
            message.read = true;
            displayMessages();
            updateStats();
        } catch (error) {
            console.error('Erreur lors de la mise à jour:', error);
        }
    }
    
    const modal = new bootstrap.Modal(document.getElementById('messageModal'));
    const modalContent = document.getElementById('messageModalContent');
    const replyLink = document.getElementById('replyEmailLink');
    
    const date = message.date ? new Date(message.date.toDate ? message.date.toDate() : message.date) : new Date();
    const formattedDate = date.toLocaleDateString('fr-FR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    
    modalContent.innerHTML = `
        <div class="row">
            <div class="col-12">
                <div class="mb-3">
                    <h6>De :</h6>
                    <p class="mb-1"><strong>${message.name || 'Anonyme'}</strong></p>
                    <p class="text-muted">${message.email || 'Aucun email'}</p>
                </div>
                
                <div class="mb-3">
                    <h6>Sujet :</h6>
                    <p>${message.subject || 'Aucun sujet'}</p>
                </div>
                
                <div class="mb-3">
                    <h6>Date :</h6>
                    <p class="text-muted">${formattedDate}</p>
                </div>
                
                <div class="mb-3">
                    <h6>Message :</h6>
                    <div class="border rounded p-3 bg-light">
                        ${message.message ? message.message.replace(/\n/g, '<br>') : 'Aucun contenu'}
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Configurer le lien de réponse
    const subject = encodeURIComponent(`Re: ${message.subject || 'Votre message'}`);
    const body = encodeURIComponent(`Bonjour ${message.name || 'Anonyme'},\n\nMerci pour votre message.\n\nCordialement,\nAlfred B.`);
    replyLink.href = `mailto:${message.email || ''}?subject=${subject}&body=${body}`;
    
    modal.show();
}

async function markAsReplied() {
    if (!currentMessageId) return;
    
    try {
        await db.collection('messages').doc(currentMessageId).update({
            status: 'replied',
            read: true
        });
        
        const message = allMessages.find(msg => msg.id === currentMessageId);
        if (message) {
            message.status = 'replied';
            message.read = true;
            displayMessages();
            updateStats();
        }
        
        // Fermer le modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('messageModal'));
        modal.hide();
        
        // Afficher une confirmation
        showNotification('Message marqué comme répondu !', 'success');
    } catch (error) {
        console.error('Erreur lors de la mise à jour:', error);
        showNotification('Erreur lors de la mise à jour', 'error');
    }
}

function filterMessages(filter) {
    currentFilter = filter;
    
    // Mettre à jour les boutons actifs
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    displayMessages();
}

function refreshMessages() {
    loadMessages();
    showNotification('Messages actualisés !', 'info');
}

// ===== FONCTIONS UTILITAIRES =====

function updateStats() {
    const total = allMessages.length;
    const newMessages = allMessages.filter(msg => msg.status === 'new').length;
    const replied = allMessages.filter(msg => msg.status === 'replied').length;
    
    // Messages de ce mois
    const thisMonth = new Date().getMonth();
    const thisYear = new Date().getFullYear();
    const thisMonthMessages = allMessages.filter(msg => {
        const msgDate = msg.date ? new Date(msg.date.toDate ? msg.date.toDate() : msg.date) : new Date();
        return msgDate.getMonth() === thisMonth && msgDate.getFullYear() === thisYear;
    }).length;
    
    document.getElementById('totalMessages').textContent = total;
    document.getElementById('newMessages').textContent = newMessages;
    document.getElementById('thisMonth').textContent = thisMonthMessages;
    document.getElementById('repliedMessages').textContent = replied;
}

function showLoading(show) {
    const loadingSpinner = document.getElementById('loadingSpinner');
    const messagesContainer = document.getElementById('messagesContainer');
    
    if (show) {
        loadingSpinner.style.display = 'flex';
        messagesContainer.style.display = 'none';
    } else {
        loadingSpinner.style.display = 'none';
        messagesContainer.style.display = 'block';
    }
}

function getTimeAgo(date) {
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) {
        return 'À l\'instant';
    } else if (diffInSeconds < 3600) {
        const minutes = Math.floor(diffInSeconds / 60);
        return `Il y a ${minutes} min`;
    } else if (diffInSeconds < 86400) {
        const hours = Math.floor(diffInSeconds / 3600);
        return `Il y a ${hours}h`;
    } else if (diffInSeconds < 2592000) {
        const days = Math.floor(diffInSeconds / 86400);
        return `Il y a ${days}j`;
    } else {
        return date.toLocaleDateString('fr-FR');
    }
}

function showNotification(message, type = 'info') {
    // Créer une notification temporaire
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(notification);
    
    // Supprimer automatiquement après 3 secondes
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 3000);
}

// ===== FONCTIONS POUR LE PORTFOLIO =====

// Fonction appelée depuis le formulaire de contact
async function addNewMessage(formData) {
    try {
        const newMessage = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject') || 'Nouveau message',
            message: formData.get('message'),
            date: firebase.firestore.Timestamp.now(),
            status: 'new',
            read: false
        };
        
        await db.collection('messages').add(newMessage);
        
        // Si on est sur le dashboard, actualiser l'affichage
        if (window.location.pathname.includes('dashboard.html')) {
            loadMessages();
        }
        
        return true;
    } catch (error) {
        console.error('Erreur lors de l\'ajout du message:', error);
        return false;
    }
}

// ===== EXPORT POUR UTILISATION GLOBALE =====
window.DashboardApp = {
    addNewMessage,
    loadMessages,
    refreshMessages
};
