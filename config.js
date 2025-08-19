/**
 * Configuration du Portfolio
 * Modifiez ces valeurs pour personnaliser votre portfolio
 */

const PORTFOLIO_CONFIG = {
    // Informations personnelles
    personal: {
        name: "Alfred B.",
        title: "Développeur Web & Mobile",
        description: "Passionné par la création d'expériences numériques exceptionnelles. Je transforme vos idées en applications web et mobiles performantes.",
        email: "alfred.b@example.com",
        phone: "+33 6 XX XX XX XX",
        location: "France",
        cvFile: "assets/cv-alfred-b.pdf"
    },
    
    // Statistiques
    stats: [
        { number: "50+", label: "Projets réalisés" },
        { number: "3+", label: "Années d'expérience" },
        { number: "100%", label: "Clients satisfaits" },
        { number: "24/7", label: "Support disponible" }
    ],
    
    // Réseaux sociaux
    social: {
        linkedin: "https://linkedin.com/in/alfredb",
        github: "https://github.com/alfredb",
        twitter: "https://twitter.com/alfredb",
        instagram: "https://instagram.com/alfredb"
    },
    
    // Compétences
    skills: {
        frontend: [
            { name: "HTML5", level: 95 },
            { name: "CSS3", level: 90 },
            { name: "JavaScript", level: 85 },
            { name: "React", level: 80 },
            { name: "Vue.js", level: 75 },
            { name: "Bootstrap", level: 90 }
        ],
        backend: [
            { name: "Node.js", level: 85 },
            { name: "PHP", level: 80 },
            { name: "Python", level: 75 },
            { name: "MySQL", level: 85 },
            { name: "MongoDB", level: 80 },
            { name: "API REST", level: 90 }
        ]
    },
    
    // Services
    services: [
        {
            icon: "bi bi-code-slash",
            title: "Développement Web",
            description: "Création de sites web modernes et responsives avec les dernières technologies."
        },
        {
            icon: "bi bi-phone",
            title: "Applications Mobile",
            description: "Développement d'applications mobiles cross-platform avec Flutter et React Native."
        },
        {
            icon: "bi bi-palette",
            title: "Design UI/UX",
            description: "Conception d'interfaces utilisateur intuitives et d'expériences utilisateur optimisées."
        },
        {
            icon: "bi bi-gear",
            title: "Maintenance & Support",
            description: "Maintenance continue, mises à jour et support technique pour vos projets."
        }
    ],
    
    // Témoignages
    testimonials: [
        {
            name: "Marie Dubois",
            role: "CEO, TechStart",
            content: "Alfred a transformé notre vision en une application web exceptionnelle. Son expertise technique et sa créativité ont dépassé nos attentes.",
            avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
        },
        {
            name: "Jean Martin",
            role: "Fondateur, DigitalAgency",
            content: "Un développeur talentueux qui comprend parfaitement les besoins business. Livraison dans les délais et qualité irréprochable.",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
        },
        {
            name: "Sophie Bernard",
            role: "Product Manager, InnovCorp",
            content: "Collaboration excellente avec Alfred. Il a su adapter ses compétences à nos contraintes et livrer un produit parfait.",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
        }
    ],
    
    // Articles de blog
    blog: [
        {
            title: "Les tendances du développement web en 2024",
            excerpt: "Découvrez les technologies et frameworks qui vont dominer le développement web cette année.",
            date: "15 Jan 2024",
            category: "Développement Web",
            image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop&crop=center"
        },
        {
            title: "Flutter vs React Native : Comparaison 2024",
            excerpt: "Analyse approfondie des deux frameworks cross-platform les plus populaires du moment.",
            date: "10 Jan 2024",
            category: "Mobile",
            image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=250&fit=crop&crop=center"
        },
        {
            title: "Principes de design pour une meilleure UX",
            excerpt: "Les fondamentaux du design d'interface pour créer des expériences utilisateur exceptionnelles.",
            date: "05 Jan 2024",
            category: "UI/UX",
            image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop&crop=center"
        }
    ],
    
    // Configuration du thème
    theme: {
        primaryColor: "#6C5CE7",
        secondaryColor: "#00D1B2",
        lightBg: "#F8F9FB",
        darkBg: "#0B0B0C"
    },
    
    // Configuration du formulaire de contact
    contact: {
        // Endpoint Formspree configuré
        formspreeEndpoint: "https://formspree.io/f/mrgdekqv",
        // Email de réception (optionnel, configuré dans Formspree)
        email: "alfred.b@example.com"
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PORTFOLIO_CONFIG;
} else {
    window.PORTFOLIO_CONFIG = PORTFOLIO_CONFIG;
}
