/**
 * Portfolio Template - Main JavaScript
 * Features: Dark mode, project filtering, contact form, animations, and more
 */

// ===== GLOBAL VARIABLES =====
let currentTheme = localStorage.getItem('theme') || 'light';
let isFormSubmitting = false;

// ===== PROJECTS DATA =====
const projects = [
    {
        id: 1,
        title: "E-commerce Platform",
        description: "Une plateforme e-commerce moderne avec gestion des produits, panier d'achat et système de paiement.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&crop=center",
        category: "web",
        tags: ["React", "Node.js", "MongoDB", "Stripe"],
        demoLink: "https://demo-ecommerce.com",
        codeLink: "https://github.com/alfredb/ecommerce",
        longDescription: "Plateforme e-commerce complète développée avec React pour le frontend et Node.js pour le backend. Intègre un système de gestion des produits, un panier d'achat, et un système de paiement sécurisé via Stripe. L'application utilise MongoDB pour la base de données et inclut des fonctionnalités d'authentification utilisateur."
    },
    {
        id: 2,
        title: "Application Mobile Fitness",
        description: "Application mobile pour le suivi des entraînements et de la nutrition avec interface intuitive.",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop&crop=center",
        category: "mobile",
        tags: ["Flutter", "Firebase", "Dart"],
        demoLink: "https://fitness-app-demo.com",
        codeLink: "https://github.com/alfredb/fitness-app",
        longDescription: "Application mobile cross-platform développée avec Flutter pour iOS et Android. Permet aux utilisateurs de suivre leurs entraînements, planifier leurs repas et monitorer leurs progrès. Intègre Firebase pour l'authentification et le stockage des données."
    },
    {
        id: 3,
        title: "Dashboard Analytics",
        description: "Tableau de bord analytique avec visualisations de données en temps réel et rapports personnalisés.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&crop=center",
        category: "web",
        tags: ["Vue.js", "D3.js", "Laravel", "MySQL"],
        demoLink: "https://analytics-dashboard.com",
        codeLink: "https://github.com/alfredb/analytics-dashboard",
        longDescription: "Dashboard analytique moderne développé avec Vue.js et D3.js pour les visualisations. Le backend utilise Laravel avec MySQL pour la gestion des données. Inclut des graphiques interactifs, des rapports personnalisables et des alertes en temps réel."
    },
    {
        id: 4,
        title: "Design System UI Kit",
        description: "Système de design complet avec composants réutilisables et documentation détaillée.",
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop&crop=center",
        category: "ui-ux",
        tags: ["Figma", "Storybook", "React", "TypeScript"],
        demoLink: "https://design-system-demo.com",
        codeLink: "https://github.com/alfredb/design-system",
        longDescription: "Système de design complet créé avec Figma et implémenté en React avec TypeScript. Inclut une bibliothèque de composants réutilisables, une documentation interactive avec Storybook, et des guidelines de design pour maintenir la cohérence visuelle."
    },
    {
        id: 5,
        title: "API RESTful",
        description: "API RESTful robuste avec authentification JWT, documentation Swagger et tests automatisés.",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop&crop=center",
        category: "autres",
        tags: ["Node.js", "Express", "JWT", "Swagger"],
        demoLink: "https://api-docs.com",
        codeLink: "https://github.com/alfredb/rest-api",
        longDescription: "API RESTful développée avec Node.js et Express, incluant l'authentification JWT, la validation des données, et une documentation complète avec Swagger. L'API est testée avec Jest et inclut des middlewares de sécurité."
    },
    {
        id: 6,
        title: "Application de Gestion",
        description: "Application web de gestion d'entreprise avec modules CRM, comptabilité et ressources humaines.",
        image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&h=400&fit=crop&crop=center",
        category: "web",
        tags: ["Angular", "Spring Boot", "PostgreSQL", "Docker"],
        demoLink: "https://erp-demo.com",
        codeLink: "https://github.com/alfredb/erp-system",
        longDescription: "Système de gestion d'entreprise complet développé avec Angular pour le frontend et Spring Boot pour le backend. Inclut des modules CRM, comptabilité et ressources humaines. Utilise PostgreSQL comme base de données et est conteneurisé avec Docker."
    },
    {
        id: 7,
        title: "Jeu Mobile",
        description: "Jeu mobile addictif avec graphismes 2D et système de progression par niveaux.",
        image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&h=400&fit=crop&crop=center",
        category: "mobile",
        tags: ["Unity", "C#", "Firebase"],
        demoLink: "https://mobile-game-demo.com",
        codeLink: "https://github.com/alfredb/mobile-game",
        longDescription: "Jeu mobile développé avec Unity et C#, incluant des graphismes 2D attrayants et un système de progression par niveaux. Intègre Firebase pour la sauvegarde des scores et les achievements. Le jeu est optimisé pour les performances mobiles."
    },
    {
        id: 8,
        title: "Site Vitrine Portfolio",
        description: "Site vitrine moderne avec animations fluides et design responsive pour artiste/photographe.",
        image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=600&h=400&fit=crop&crop=center",
        category: "ui-ux",
        tags: ["HTML5", "CSS3", "JavaScript", "GSAP"],
        demoLink: "https://portfolio-demo.com",
        codeLink: "https://github.com/alfredb/portfolio-site",
        longDescription: "Site vitrine moderne développé avec HTML5, CSS3 et JavaScript vanilla. Inclut des animations fluides avec GSAP, un design responsive et une galerie interactive. Optimisé pour les performances et l'accessibilité."
    },
    {
        id: 9,
        title: "Bot Discord",
        description: "Bot Discord multifonctionnel avec commandes personnalisées et intégration d'APIs externes.",
        image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop&crop=center",
        category: "autres",
        tags: ["Python", "Discord.py", "MongoDB", "APIs"],
        demoLink: "https://discord-bot-demo.com",
        codeLink: "https://github.com/alfredb/discord-bot",
        longDescription: "Bot Discord développé en Python avec discord.py, incluant des commandes personnalisées, des jeux intégrés, et des intégrations avec des APIs externes. Utilise MongoDB pour stocker les données utilisateur et les configurations."
    }
];

// ===== DOM CONTENT LOADED =====
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// ===== INITIALIZATION =====
function initializeApp() {
    // Initialize theme
    initializeTheme();
    
    // Initialize loader
    initializeLoader();
    
    // Initialize navigation
    initializeNavigation();
    
    // Initialize projects
    initializeProjects();
    
    // Initialize contact form
    initializeContactForm();
    
    // Initialize back to top button
    initializeBackToTop();
    
    // Initialize animations
    initializeAnimations();
    
    // Update current year
    updateCurrentYear();
    
    // Initialize lazy loading
    initializeLazyLoading();
}

// ===== THEME MANAGEMENT =====
function initializeTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Set initial theme
    setTheme(currentTheme);
    
    // Theme toggle event
    themeToggle.addEventListener('click', function() {
        currentTheme = currentTheme === 'light' ? 'dark' : 'light';
        setTheme(currentTheme);
        localStorage.setItem('theme', currentTheme);
    });
}

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    
    if (theme === 'dark') {
        themeIcon.className = 'bi bi-sun-fill';
        themeToggle.setAttribute('aria-label', 'Passer au mode clair');
    } else {
        themeIcon.className = 'bi bi-moon-fill';
        themeToggle.setAttribute('aria-label', 'Passer au mode sombre');
    }
}

// ===== LOADER =====
function initializeLoader() {
    const loader = document.getElementById('loader');
    
    // Hide loader after page load
    window.addEventListener('load', function() {
        setTimeout(() => {
            loader.classList.add('fade-out');
            setTimeout(() => {
                loader.style.display = 'none';
            }, 300);
        }, 1000);
    });
}

// ===== NAVIGATION =====
function initializeNavigation() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Active navigation link
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 200;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
    
    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== PROJECTS =====
function initializeProjects() {
    const projectsGrid = document.getElementById('projects-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    // Debug: vérifier que les éléments existent
    if (!projectsGrid) {
        console.error('Projects grid not found!');
        return;
    }
    
    if (filterButtons.length === 0) {
        console.error('Filter buttons not found!');
        return;
    }
    
    console.log(`Initializing projects: ${projects.length} projects found`);
    
    // Render all projects initially
    renderProjects(projects);
    
    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter projects
            let filteredProjects;
            if (filter === 'all') {
                filteredProjects = projects;
            } else {
                filteredProjects = projects.filter(project => project.category === filter);
            }
            
            console.log(`Filter: ${filter}, Projects found: ${filteredProjects.length}`);
            
            renderProjects(filteredProjects);
        });
    });
}

function renderProjects(projectsToRender) {
    const projectsGrid = document.getElementById('projects-grid');
    
    if (!projectsGrid) {
        console.error('Projects grid not found in renderProjects');
        return;
    }
    
    projectsGrid.innerHTML = '';
    
    if (projectsToRender.length === 0) {
        projectsGrid.innerHTML = `
            <div class="col-12 text-center">
                <div class="alert alert-info">
                    <i class="bi bi-info-circle me-2"></i>
                    Aucun projet trouvé pour cette catégorie.
                </div>
            </div>
        `;
        return;
    }
    
    projectsToRender.forEach(project => {
        const projectCard = createProjectCard(project);
        projectsGrid.appendChild(projectCard);
    });
    
    // Réinitialiser les animations AOS après le rendu
    if (typeof AOS !== 'undefined') {
        AOS.refresh();
    } else {
        // Fallback pour les animations personnalisées
        setTimeout(() => {
            const animatedElements = projectsGrid.querySelectorAll('[data-aos]');
            animatedElements.forEach(el => {
                el.classList.add('aos-animate');
            });
        }, 100);
    }
}

function createProjectCard(project) {
    const col = document.createElement('div');
    col.className = 'col-lg-4 col-md-6 mb-4';
    col.setAttribute('data-aos', 'fade-up');
    
    col.innerHTML = `
        <div class="project-card">
            <div class="project-image">
                <img src="${project.image}" alt="${project.title}" loading="lazy">
                <div class="project-overlay">
                    <button class="btn btn-primary" onclick="openProjectModal(${project.id})">
                        <i class="bi bi-eye me-2"></i>Voir détails
                    </button>
                </div>
            </div>
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tags">
                    ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
                </div>
                <div class="project-actions">
                    <button class="btn btn-outline-primary btn-sm" onclick="openProjectModal(${project.id})">
                        <i class="bi bi-info-circle me-2"></i>Détails
                    </button>
                </div>
            </div>
        </div>
    `;
    
    return col;
}

// ===== PROJECT MODAL =====
function openProjectModal(projectId) {
    const project = projects.find(p => p.id === projectId);
    if (!project) return;
    
    const modal = new bootstrap.Modal(document.getElementById('projectModal'));
    const modalContent = document.getElementById('projectModalContent');
    const modalTitle = document.getElementById('projectModalLabel');
    const demoLink = document.getElementById('projectDemoLink');
    const codeLink = document.getElementById('projectCodeLink');
    
    modalTitle.textContent = project.title;
    
    modalContent.innerHTML = `
        <div class="row">
            <div class="col-md-6 mb-3">
                <img src="${project.image}" alt="${project.title}" class="img-fluid rounded">
            </div>
            <div class="col-md-6">
                <h5>Description</h5>
                <p>${project.longDescription}</p>
                <h6>Technologies utilisées:</h6>
                <div class="mb-3">
                    ${project.tags.map(tag => `<span class="badge bg-primary me-1 mb-1">${tag}</span>`).join('')}
                </div>
            </div>
        </div>
    `;
    
    demoLink.href = project.demoLink;
    codeLink.href = project.codeLink;
    
    modal.show();
}

// ===== CONTACT FORM =====
function initializeContactForm() {
    const form = document.getElementById('contactForm');
    const submitButton = form.querySelector('button[type="submit"]');
    const btnText = submitButton.querySelector('.btn-text');
    const btnLoading = submitButton.querySelector('.btn-loading');
    const successMessage = document.getElementById('formSuccess');
    const errorMessage = document.getElementById('formError');
    
    // Configurer l'action du formulaire avec Formspree
    if (window.PORTFOLIO_CONFIG && window.PORTFOLIO_CONFIG.contact) {
        form.action = window.PORTFOLIO_CONFIG.contact.formspreeEndpoint;
    }
    
    form.addEventListener('submit', function(e) {
        if (isFormSubmitting) return;
        
        // Validate form
        if (!validateForm()) {
            e.preventDefault();
            return;
        }
        
        // Récupérer les données du formulaire
        const formData = new FormData(form);
        
        // Show loading state
        isFormSubmitting = true;
        btnText.classList.add('d-none');
        btnLoading.classList.remove('d-none');
        submitButton.disabled = true;
        
        // Hide previous messages
        successMessage.classList.add('d-none');
        errorMessage.classList.add('d-none');
        
        // Simuler l'envoi et sauvegarder dans Firebase
        setTimeout(async () => {
            try {
                // Ajouter le message à Firebase directement
                const success = await addMessageToFirebase(formData);
                if (success) {
                    showFormMessage('success', 'Votre message a été envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.');
                } else {
                    showFormMessage('error', 'Une erreur s\'est produite lors de l\'envoi. Veuillez réessayer.');
                }
            } catch (error) {
                console.error('Erreur lors de l\'envoi:', error);
                showFormMessage('error', 'Une erreur s\'est produite lors de l\'envoi. Veuillez réessayer.');
            }
            
            // Reset button state
            btnText.classList.remove('d-none');
            btnLoading.classList.add('d-none');
            submitButton.disabled = false;
            isFormSubmitting = false;
            
            // Reset form
            form.reset();
            
            // Rediriger vers le dashboard après 2 secondes
            setTimeout(() => {
                if (confirm('Voulez-vous voir tous vos messages dans le dashboard ?')) {
                    window.open('login.html', '_blank');
                }
            }, 2000);
            
        }, 2000);
        
        // Empêcher l'envoi réel pour la démo (tu peux retirer cette ligne pour l'envoi réel)
        e.preventDefault();
    });
    
    // Gérer la réponse de Formspree (pour l'envoi réel)
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('success') === 'true') {
        showFormMessage('success', 'Votre message a été envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.');
    } else if (urlParams.get('error')) {
        showFormMessage('error', 'Une erreur s\'est produite lors de l\'envoi. Veuillez réessayer ou nous contacter directement.');
    }
}

// Fonction pour ajouter un message à Firebase
async function addMessageToFirebase(formData) {
    try {
        // Vérifier si Firebase est disponible
        if (typeof firebase === 'undefined' || !firebase.firestore) {
            console.error('Firebase non disponible');
            return false;
        }
        
        const newMessage = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject') || 'Nouveau message',
            message: formData.get('message'),
            date: firebase.firestore.Timestamp.now(),
            status: 'new',
            read: false
        };
        
        // Ajouter à Firestore
        await firebase.firestore().collection('messages').add(newMessage);
        console.log('Message ajouté à Firebase avec succès');
        return true;
    } catch (error) {
        console.error('Erreur lors de l\'ajout du message à Firebase:', error);
        return false;
    }
}

// Fonction de fallback pour sauvegarder les messages
function saveMessageToLocalStorage(formData) {
    const savedMessages = localStorage.getItem('portfolio_messages');
    const messages = savedMessages ? JSON.parse(savedMessages) : [];
    
    const newMessage = {
        id: Date.now(),
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject') || 'Nouveau message',
        message: formData.get('message'),
        date: new Date().toISOString(),
        status: 'new',
        read: false
    };
    
    messages.unshift(newMessage);
    localStorage.setItem('portfolio_messages', JSON.stringify(messages));
}

function validateForm() {
    const form = document.getElementById('contactForm');
    const name = form.querySelector('#name');
    const email = form.querySelector('#email');
    const message = form.querySelector('#message');
    
    let isValid = true;
    
    // Reset validation states
    [name, email, message].forEach(field => {
        field.classList.remove('is-invalid');
    });
    
    // Validate name
    if (!name.value.trim()) {
        name.classList.add('is-invalid');
        isValid = false;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim() || !emailRegex.test(email.value)) {
        email.classList.add('is-invalid');
        isValid = false;
    }
    
    // Validate message
    if (!message.value.trim() || message.value.length < 10) {
        message.classList.add('is-invalid');
        isValid = false;
    }
    
    return isValid;
}

function showFormMessage(type, message) {
    const successMessage = document.getElementById('formSuccess');
    const errorMessage = document.getElementById('formError');
    
    if (type === 'success') {
        successMessage.textContent = message;
        successMessage.classList.remove('d-none');
        errorMessage.classList.add('d-none');
    } else {
        errorMessage.textContent = message;
        errorMessage.classList.remove('d-none');
        successMessage.classList.add('d-none');
    }
}

// ===== BACK TO TOP =====
function initializeBackToTop() {
    const backToTopButton = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });
    
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== ANIMATIONS =====
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, observerOptions);
    
    // Observe all elements with data-aos
    const animatedElements = document.querySelectorAll('[data-aos]');
    animatedElements.forEach(el => observer.observe(el));
}

// ===== UTILITY FUNCTIONS =====
function updateCurrentYear() {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

function initializeLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

// ===== PERFORMANCE OPTIMIZATIONS =====
// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(function() {
    // Scroll-based animations and effects
}, 16)); // ~60fps

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
});

// ===== ACCESSIBILITY ENHANCEMENTS =====
// Keyboard navigation for project cards
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
        const focusedElement = document.activeElement;
        if (focusedElement.classList.contains('project-card') || 
            focusedElement.closest('.project-card')) {
            e.preventDefault();
            const projectCard = focusedElement.closest('.project-card');
            const detailsButton = projectCard.querySelector('.btn');
            if (detailsButton) {
                detailsButton.click();
            }
        }
    }
});

// ===== SERVICE WORKER (OPTIONAL) =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('SW registered: ', registration);
            })
            .catch(function(registrationError) {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// ===== EXPORT FOR GLOBAL ACCESS =====
window.PortfolioApp = {
    setTheme,
    openProjectModal,
    validateForm,
    showFormMessage
};
