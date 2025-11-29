// Theme Toggle Logic
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;
const icon = themeToggle.querySelector('svg');

const moonIcon = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />';
const sunIcon = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657 l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />';

const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    htmlElement.setAttribute('data-theme', savedTheme);
    updateIcon(savedTheme);
} else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    htmlElement.setAttribute('data-theme', 'dark');
    updateIcon('dark');
}

themeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateIcon(newTheme);
});

function updateIcon(theme) {
    if (theme === 'dark') {
        icon.innerHTML = sunIcon;
    } else {
        icon.innerHTML = moonIcon;
    }
}

// Scroll Progress Bar
const scrollProgressBar = document.getElementById('scroll-progress');

window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercentage = (scrollTop / scrollHeight) * 100;
    scrollProgressBar.style.width = scrollPercentage + '%';

    highlightNavLinks();
});

// Active Nav Link Highlighting
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

function highlightNavLinks() {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
}

// Typing Effect
const taglineElement = document.querySelector('.tagline');
const taglineText = "Specializing in Development, Testing, Automation, Vibe Coding, and Gen AI Powered Systems.";
taglineElement.textContent = '';

let charIndex = 0;
function typeTagline() {
    if (charIndex < taglineText.length) {
        taglineElement.textContent += taglineText.charAt(charIndex);
        charIndex++;
        setTimeout(typeTagline, 30);
    }
}

setTimeout(typeTagline, 1000);

// Scroll Animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const animatedElements = document.querySelectorAll('.section h2, .about-content, .project-card, .skill-tag, .contact p, .contact .btn');
animatedElements.forEach((el) => {
    el.classList.add('hidden');
    observer.observe(el);
});

// ========== ENHANCED WORLD CIRCUIT MAP WITH LABELS ==========
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

const mouse = {
    x: null,
    y: null,
    radius: 200
};

window.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
});

// Detailed World Regions with Country Labels - Enhanced with more countries and borders
const worldRegions = [
    // NORTH AMERICA
    {
        name: 'CANADA',
        label: { x: 0.17, y: 0.15 },
        points: [
            { x: 0.08, y: 0.08 }, { x: 0.12, y: 0.06 }, { x: 0.16, y: 0.05 }, { x: 0.20, y: 0.06 },
            { x: 0.24, y: 0.08 }, { x: 0.27, y: 0.11 }, { x: 0.29, y: 0.15 }, { x: 0.28, y: 0.19 },
            { x: 0.25, y: 0.21 }, { x: 0.21, y: 0.22 }, { x: 0.17, y: 0.22 }, { x: 0.13, y: 0.20 },
            { x: 0.10, y: 0.17 }, { x: 0.08, y: 0.14 }, { x: 0.07, y: 0.11 }, { x: 0.08, y: 0.08 }
        ]
    },
    {
        name: 'USA',
        label: { x: 0.18, y: 0.30 },
        points: [
            { x: 0.08, y: 0.22 }, { x: 0.11, y: 0.23 }, { x: 0.14, y: 0.24 }, { x: 0.17, y: 0.24 },
            { x: 0.20, y: 0.24 }, { x: 0.23, y: 0.25 }, { x: 0.26, y: 0.27 }, { x: 0.29, y: 0.30 },
            { x: 0.30, y: 0.34 }, { x: 0.29, y: 0.38 }, { x: 0.26, y: 0.40 }, { x: 0.22, y: 0.41 },
            { x: 0.18, y: 0.40 }, { x: 0.14, y: 0.38 }, { x: 0.11, y: 0.35 }, { x: 0.09, y: 0.31 },
            { x: 0.08, y: 0.27 }, { x: 0.08, y: 0.22 }
        ]
    },
    {
        name: 'MEXICO',
        label: { x: 0.15, y: 0.44 },
        points: [
            { x: 0.10, y: 0.40 }, { x: 0.13, y: 0.41 }, { x: 0.16, y: 0.42 }, { x: 0.19, y: 0.43 },
            { x: 0.21, y: 0.46 }, { x: 0.21, y: 0.49 }, { x: 0.19, y: 0.51 }, { x: 0.16, y: 0.51 },
            { x: 0.13, y: 0.50 }, { x: 0.11, y: 0.47 }, { x: 0.10, y: 0.44 }, { x: 0.10, y: 0.40 }
        ]
    },
    // SOUTH AMERICA
    {
        name: 'BRAZIL',
        label: { x: 0.30, y: 0.60 },
        points: [
            { x: 0.24, y: 0.50 }, { x: 0.27, y: 0.51 }, { x: 0.30, y: 0.53 }, { x: 0.33, y: 0.56 },
            { x: 0.35, y: 0.60 }, { x: 0.36, y: 0.64 }, { x: 0.35, y: 0.68 }, { x: 0.33, y: 0.71 },
            { x: 0.30, y: 0.73 }, { x: 0.27, y: 0.74 }, { x: 0.24, y: 0.73 }, { x: 0.22, y: 0.70 },
            { x: 0.21, y: 0.66 }, { x: 0.21, y: 0.62 }, { x: 0.22, y: 0.57 }, { x: 0.23, y: 0.53 },
            { x: 0.24, y: 0.50 }
        ]
    },
    {
        name: 'ARGENTINA',
        label: { x: 0.27, y: 0.78 },
        points: [
            { x: 0.24, y: 0.72 }, { x: 0.26, y: 0.73 }, { x: 0.28, y: 0.75 }, { x: 0.29, y: 0.78 },
            { x: 0.29, y: 0.82 }, { x: 0.28, y: 0.86 }, { x: 0.26, y: 0.88 }, { x: 0.24, y: 0.87 },
            { x: 0.23, y: 0.84 }, { x: 0.23, y: 0.80 }, { x: 0.23, y: 0.76 }, { x: 0.24, y: 0.72 }
        ]
    },
    // EUROPE
    {
        name: 'UK',
        label: { x: 0.47, y: 0.20 },
        points: [
            { x: 0.45, y: 0.16 }, { x: 0.47, y: 0.17 }, { x: 0.49, y: 0.18 }, { x: 0.51, y: 0.20 },
            { x: 0.52, y: 0.23 }, { x: 0.51, y: 0.26 }, { x: 0.49, y: 0.28 }, { x: 0.47, y: 0.28 },
            { x: 0.45, y: 0.27 }, { x: 0.44, y: 0.24 }, { x: 0.44, y: 0.20 }, { x: 0.45, y: 0.16 }
        ]
    },
    {
        name: 'FRANCE',
        label: { x: 0.49, y: 0.30 },
        points: [
            { x: 0.46, y: 0.27 }, { x: 0.48, y: 0.28 }, { x: 0.50, y: 0.29 }, { x: 0.52, y: 0.31 },
            { x: 0.52, y: 0.34 }, { x: 0.51, y: 0.36 }, { x: 0.49, y: 0.37 }, { x: 0.47, y: 0.36 },
            { x: 0.46, y: 0.33 }, { x: 0.46, y: 0.30 }, { x: 0.46, y: 0.27 }
        ]
    },
    {
        name: 'SPAIN',
        label: { x: 0.45, y: 0.35 },
        points: [
            { x: 0.42, y: 0.32 }, { x: 0.44, y: 0.33 }, { x: 0.46, y: 0.34 }, { x: 0.48, y: 0.36 },
            { x: 0.48, y: 0.39 }, { x: 0.47, y: 0.41 }, { x: 0.45, y: 0.41 }, { x: 0.43, y: 0.40 },
            { x: 0.42, y: 0.37 }, { x: 0.42, y: 0.34 }, { x: 0.42, y: 0.32 }
        ]
    },
    {
        name: 'GERMANY',
        label: { x: 0.52, y: 0.24 },
        points: [
            { x: 0.50, y: 0.21 }, { x: 0.52, y: 0.22 }, { x: 0.54, y: 0.23 }, { x: 0.56, y: 0.25 },
            { x: 0.57, y: 0.27 }, { x: 0.56, y: 0.30 }, { x: 0.54, y: 0.31 }, { x: 0.52, y: 0.31 },
            { x: 0.50, y: 0.29 }, { x: 0.49, y: 0.26 }, { x: 0.50, y: 0.23 }, { x: 0.50, y: 0.21 }
        ]
    },
    {
        name: 'ITALY',
        label: { x: 0.52, y: 0.33 },
        points: [
            { x: 0.51, y: 0.28 }, { x: 0.52, y: 0.29 }, { x: 0.53, y: 0.31 }, { x: 0.53, y: 0.34 },
            { x: 0.53, y: 0.37 }, { x: 0.52, y: 0.40 }, { x: 0.51, y: 0.41 }, { x: 0.50, y: 0.40 },
            { x: 0.50, y: 0.37 }, { x: 0.50, y: 0.34 }, { x: 0.50, y: 0.31 }, { x: 0.51, y: 0.28 }
        ]
    },
    {
        name: 'POLAND',
        label: { x: 0.56, y: 0.23 },
        points: [
            { x: 0.54, y: 0.20 }, { x: 0.56, y: 0.21 }, { x: 0.58, y: 0.22 }, { x: 0.59, y: 0.24 },
            { x: 0.59, y: 0.27 }, { x: 0.58, y: 0.29 }, { x: 0.56, y: 0.29 }, { x: 0.54, y: 0.28 },
            { x: 0.54, y: 0.25 }, { x: 0.54, y: 0.22 }, { x: 0.54, y: 0.20 }
        ]
    },
    // AFRICA
    {
        name: 'EGYPT',
        label: { x: 0.54, y: 0.41 },
        points: [
            { x: 0.51, y: 0.37 }, { x: 0.53, y: 0.38 }, { x: 0.55, y: 0.39 }, { x: 0.57, y: 0.41 },
            { x: 0.57, y: 0.44 }, { x: 0.56, y: 0.47 }, { x: 0.54, y: 0.48 }, { x: 0.52, y: 0.47 },
            { x: 0.51, y: 0.44 }, { x: 0.51, y: 0.41 }, { x: 0.51, y: 0.37 }
        ]
    },
    {
        name: 'NIGERIA',
        label: { x: 0.49, y: 0.50 },
        points: [
            { x: 0.47, y: 0.47 }, { x: 0.49, y: 0.48 }, { x: 0.51, y: 0.49 }, { x: 0.52, y: 0.51 },
            { x: 0.52, y: 0.53 }, { x: 0.51, y: 0.55 }, { x: 0.49, y: 0.55 }, { x: 0.47, y: 0.54 },
            { x: 0.47, y: 0.51 }, { x: 0.47, y: 0.47 }
        ]
    },
    {
        name: 'KENYA',
        label: { x: 0.56, y: 0.54 },
        points: [
            { x: 0.54, y: 0.51 }, { x: 0.56, y: 0.52 }, { x: 0.58, y: 0.53 }, { x: 0.59, y: 0.55 },
            { x: 0.59, y: 0.57 }, { x: 0.58, y: 0.59 }, { x: 0.56, y: 0.59 }, { x: 0.54, y: 0.58 },
            { x: 0.54, y: 0.55 }, { x: 0.54, y: 0.51 }
        ]
    },
    {
        name: 'S.AFRICA',
        label: { x: 0.54, y: 0.70 },
        points: [
            { x: 0.50, y: 0.64 }, { x: 0.52, y: 0.65 }, { x: 0.54, y: 0.66 }, { x: 0.56, y: 0.68 },
            { x: 0.57, y: 0.71 }, { x: 0.56, y: 0.74 }, { x: 0.54, y: 0.75 }, { x: 0.52, y: 0.74 },
            { x: 0.50, y: 0.72 }, { x: 0.49, y: 0.69 }, { x: 0.50, y: 0.66 }, { x: 0.50, y: 0.64 }
        ]
    },
    // ASIA
    {
        name: 'RUSSIA',
        label: { x: 0.68, y: 0.18 },
        points: [
            { x: 0.57, y: 0.10 }, { x: 0.62, y: 0.11 }, { x: 0.67, y: 0.12 }, { x: 0.72, y: 0.14 },
            { x: 0.77, y: 0.16 }, { x: 0.82, y: 0.18 }, { x: 0.87, y: 0.21 }, { x: 0.90, y: 0.24 },
            { x: 0.90, y: 0.28 }, { x: 0.88, y: 0.31 }, { x: 0.84, y: 0.33 }, { x: 0.79, y: 0.34 },
            { x: 0.74, y: 0.34 }, { x: 0.69, y: 0.33 }, { x: 0.64, y: 0.31 }, { x: 0.60, y: 0.28 },
            { x: 0.58, y: 0.24 }, { x: 0.57, y: 0.20 }, { x: 0.57, y: 0.15 }, { x: 0.57, y: 0.10 }
        ]
    },
    {
        name: 'SAUDI',
        label: { x: 0.60, y: 0.42 },
        points: [
            { x: 0.57, y: 0.38 }, { x: 0.59, y: 0.39 }, { x: 0.61, y: 0.40 }, { x: 0.63, y: 0.42 },
            { x: 0.63, y: 0.45 }, { x: 0.62, y: 0.47 }, { x: 0.60, y: 0.48 }, { x: 0.58, y: 0.47 },
            { x: 0.57, y: 0.44 }, { x: 0.57, y: 0.41 }, { x: 0.57, y: 0.38 }
        ]
    },
    {
        name: 'INDIA',
        label: { x: 0.70, y: 0.42 },
        points: [
            { x: 0.66, y: 0.35 }, { x: 0.68, y: 0.36 }, { x: 0.70, y: 0.37 }, { x: 0.72, y: 0.39 },
            { x: 0.74, y: 0.42 }, { x: 0.74, y: 0.45 }, { x: 0.73, y: 0.48 }, { x: 0.71, y: 0.50 },
            { x: 0.69, y: 0.50 }, { x: 0.67, y: 0.49 }, { x: 0.66, y: 0.46 }, { x: 0.65, y: 0.43 },
            { x: 0.65, y: 0.40 }, { x: 0.66, y: 0.37 }, { x: 0.66, y: 0.35 }
        ]
    },
    {
        name: 'CHINA',
        label: { x: 0.78, y: 0.32 },
        points: [
            { x: 0.71, y: 0.24 }, { x: 0.74, y: 0.25 }, { x: 0.77, y: 0.27 }, { x: 0.80, y: 0.29 },
            { x: 0.83, y: 0.31 }, { x: 0.85, y: 0.34 }, { x: 0.86, y: 0.37 }, { x: 0.85, y: 0.40 },
            { x: 0.83, y: 0.42 }, { x: 0.80, y: 0.43 }, { x: 0.77, y: 0.43 }, { x: 0.74, y: 0.41 },
            { x: 0.72, y: 0.38 }, { x: 0.71, y: 0.35 }, { x: 0.70, y: 0.31 }, { x: 0.70, y: 0.28 },
            { x: 0.71, y: 0.24 }
        ]
    },
    {
        name: 'JAPAN',
        label: { x: 0.87, y: 0.34 },
        points: [
            { x: 0.85, y: 0.28 }, { x: 0.87, y: 0.29 }, { x: 0.89, y: 0.31 }, { x: 0.90, y: 0.34 },
            { x: 0.90, y: 0.37 }, { x: 0.89, y: 0.40 }, { x: 0.87, y: 0.41 }, { x: 0.85, y: 0.40 },
            { x: 0.84, y: 0.37 }, { x: 0.84, y: 0.34 }, { x: 0.85, y: 0.31 }, { x: 0.85, y: 0.28 }
        ]
    },
    {
        name: 'THAILAND',
        label: { x: 0.79, y: 0.47 },
        points: [
            { x: 0.77, y: 0.44 }, { x: 0.79, y: 0.45 }, { x: 0.81, y: 0.46 }, { x: 0.82, y: 0.48 },
            { x: 0.82, y: 0.50 }, { x: 0.81, y: 0.52 }, { x: 0.79, y: 0.52 }, { x: 0.77, y: 0.51 },
            { x: 0.77, y: 0.48 }, { x: 0.77, y: 0.44 }
        ]
    },
    {
        name: 'INDONESIA',
        label: { x: 0.82, y: 0.54 },
        points: [
            { x: 0.78, y: 0.51 }, { x: 0.80, y: 0.52 }, { x: 0.82, y: 0.53 }, { x: 0.84, y: 0.54 },
            { x: 0.86, y: 0.55 }, { x: 0.87, y: 0.57 }, { x: 0.86, y: 0.59 }, { x: 0.84, y: 0.59 },
            { x: 0.82, y: 0.58 }, { x: 0.80, y: 0.57 }, { x: 0.78, y: 0.55 }, { x: 0.78, y: 0.51 }
        ]
    },
    // OCEANIA
    {
        name: 'AUSTRALIA',
        label: { x: 0.84, y: 0.70 },
        points: [
            { x: 0.77, y: 0.62 }, { x: 0.80, y: 0.63 }, { x: 0.83, y: 0.64 }, { x: 0.86, y: 0.66 },
            { x: 0.89, y: 0.69 }, { x: 0.91, y: 0.72 }, { x: 0.91, y: 0.76 }, { x: 0.89, y: 0.78 },
            { x: 0.86, y: 0.79 }, { x: 0.83, y: 0.78 }, { x: 0.80, y: 0.76 }, { x: 0.78, y: 0.73 },
            { x: 0.76, y: 0.70 }, { x: 0.76, y: 0.66 }, { x: 0.77, y: 0.62 }
        ]
    },
    {
        name: 'N.ZEALAND',
        label: { x: 0.93, y: 0.78 },
        points: [
            { x: 0.91, y: 0.74 }, { x: 0.93, y: 0.75 }, { x: 0.95, y: 0.77 }, { x: 0.95, y: 0.80 },
            { x: 0.94, y: 0.82 }, { x: 0.92, y: 0.82 }, { x: 0.91, y: 0.80 }, { x: 0.91, y: 0.77 },
            { x: 0.91, y: 0.74 }
        ]
    }
];

// Enhanced AI/Coding Terms
const aiCodingTerms = [
    { text: 'NEURAL.NET', size: 16, color: '#60a5fa' },
    { text: 'TENSOR.FLOW', size: 14, color: '#d8b4fe' },
    { text: 'TRANSFORM()', size: 15, color: '#8b5cf6' },
    { text: 'async/await', size: 13, color: '#60a5fa' },
    { text: 'EMBEDDING[]', size: 14, color: '#d8b4fe' },
    { text: 'GRADIENT↓', size: 15, color: '#60a5fa' },
    { text: 'PIPELINE|>', size: 14, color: '#8b5cf6' },
    { text: '{INFERENCE}', size: 16, color: '#d8b4fe' },
    { text: 'CONTEXT...', size: 13, color: '#60a5fa' },
    { text: 'QUANTUM▲', size: 15, color: '#8b5cf6' },
    { text: 'DEPLOY>>>', size: 14, color: '#d8b4fe' },
    { text: 'COMPILE*', size: 13, color: '#60a5fa' },
    { text: 'OPTIMIZE+', size: 15, color: '#8b5cf6' },
    { text: '[ATTENTION]', size: 14, color: '#d8b4fe' },
    { text: 'LATENT~', size: 13, color: '#60a5fa' }
];

class CountryRegion {
    constructor(region) {
        this.name = region.name;
        this.label = region.label;
        this.points = region.points.map(p => ({
            relX: p.x,
            relY: p.y,
            x: p.x * canvas.width,
            y: p.y * canvas.height,
            baseX: p.x * canvas.width,
            baseY: p.y * canvas.height
        }));
        this.hovered = false;
    }

    update() {
        this.points.forEach(p => {
            p.baseX = p.relX * canvas.width;
            p.baseY = p.relY * canvas.height;

            let dx = mouse.x - p.x;
            let dy = mouse.y - p.y;
            let distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < mouse.radius) {
                let force = (mouse.radius - distance) / mouse.radius;
                p.x -= (dx / distance) * force * 20;
                p.y -= (dy / distance) * force * 20;
                this.hovered = true;
            } else {
                p.x += (p.baseX - p.x) * 0.1;
                p.y += (p.baseY - p.y) * 0.1;
            }
        });

        setTimeout(() => this.hovered = false, 50);
    }

    draw() {
        // Draw circuit-style country boundaries
        ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--circuit-color');
        ctx.lineWidth = this.hovered ? 3.5 : 2.5;
        ctx.shadowBlur = this.hovered ? 20 : 12;
        ctx.shadowColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color');

        ctx.beginPath();
        ctx.moveTo(this.points[0].x, this.points[0].y);

        for (let i = 1; i < this.points.length; i++) {
            ctx.lineTo(this.points[i].x, this.points[i].y);
        }

        ctx.closePath();
        ctx.stroke();

        // Draw circuit nodes at vertices
        this.points.forEach((p, i) => {
            ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--primary-color');
            ctx.shadowBlur = this.hovered ? 15 : 8;
            ctx.beginPath();
            ctx.arc(p.x, p.y, this.hovered ? 4 : 3, 0, Math.PI * 2);
            ctx.fill();
        });

        // Draw country label
        const labelX = this.label.x * canvas.width;
        const labelY = this.label.y * canvas.height;

        ctx.font = 'bold 14px Space Grotesk, sans-serif';
        ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--accent-color');
        ctx.shadowBlur = this.hovered ? 18 : 10;
        ctx.shadowColor = getComputedStyle(document.documentElement).getPropertyValue('--glow-color');
        ctx.textAlign = 'center';
        ctx.fillText(this.name, labelX, labelY);

        ctx.shadowBlur = 0;
        ctx.textAlign = 'start';
    }
}

class FloatingAIText {
    constructor() {
        const term = aiCodingTerms[Math.floor(Math.random() * aiCodingTerms.length)];
        this.text = term.text;
        this.size = term.size;
        this.color = term.color;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.targetX = Math.random() * canvas.width;
        this.targetY = Math.random() * canvas.height;
        this.opacity = 0;
        this.fadeIn = true;
        this.speed = Math.random() * 0.8 + 0.4;
    }

    update() {
        let dx = this.targetX - this.x;
        let dy = this.targetY - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 15) {
            this.targetX = Math.random() * canvas.width;
            this.targetY = Math.random() * canvas.height;
        } else {
            this.x += (dx / distance) * this.speed;
            this.y += (dy / distance) * this.speed;
        }

        if (this.fadeIn) {
            this.opacity += 0.015;
            if (this.opacity >= 0.7) this.fadeIn = false;
        } else {
            this.opacity -= 0.008;
            if (this.opacity <= 0) {
                const term = aiCodingTerms[Math.floor(Math.random() * aiCodingTerms.length)];
                this.text = term.text;
                this.size = term.size;
                this.color = term.color;
                this.fadeIn = true;
            }
        }
    }

    draw() {
        ctx.font = `bold ${this.size}px monospace`;
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.shadowBlur = 15;
        ctx.shadowColor = this.color;
        ctx.fillText(this.text, this.x, this.y);
        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;
    }
}

let countries = [];
let aiTexts = [];

function init() {
    countries = worldRegions.map(region => new CountryRegion(region));

    aiTexts = [];
    for (let i = 0; i < 30; i++) {
        aiTexts.push(new FloatingAIText());
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw countries
    countries.forEach(country => {
        country.update();
        country.draw();
    });

    // Draw intercontinental circuit connections
    drawCircuitConnections();

    // Draw AI text overlays
    aiTexts.forEach(text => {
        text.update();
        text.draw();
    });
}

function drawCircuitConnections() {
    const connections = [
        // Trans-Atlantic
        ['USA', 'UK'],
        ['USA', 'FRANCE'],
        ['CANADA', 'UK'],
        ['BRAZIL', 'SPAIN'],

        // European Network
        ['UK', 'FRANCE'],
        ['UK', 'GERMANY'],
        ['FRANCE', 'SPAIN'],
        ['FRANCE', 'ITALY'],
        ['GERMANY', 'POLAND'],
        ['GERMANY', 'RUSSIA'],

        // Trans-Pacific
        ['USA', 'JAPAN'],
        ['CANADA', 'CHINA'],
        ['USA', 'CHINA'],

        // Euro-Asia
        ['RUSSIA', 'CHINA'],
        ['POLAND', 'RUSSIA'],

        // Middle East - Asia
        ['SAUDI', 'INDIA'],
        ['EGYPT', 'SAUDI'],

        // Asia-Pacific
        ['CHINA', 'JAPAN'],
        ['CHINA', 'THAILAND'],
        ['CHINA', 'AUSTRALIA'],
        ['INDIA', 'THAILAND'],
        ['THAILAND', 'INDONESIA'],
        ['INDONESIA', 'AUSTRALIA'],
        ['AUSTRALIA', 'N.ZEALAND'],

        // Americas
        ['USA', 'MEXICO'],
        ['USA', 'BRAZIL'],
        ['MEXICO', 'BRAZIL'],
        ['BRAZIL', 'ARGENTINA'],

        // Africa connections
        ['UK', 'EGYPT'],
        ['EGYPT', 'KENYA'],
        ['EGYPT', 'S.AFRICA'],
        ['NIGERIA', 'S.AFRICA'],
        ['KENYA', 'S.AFRICA'],

        // Trans-Indian Ocean
        ['INDIA', 'KENYA'],
        ['INDIA', 'AUSTRALIA']
    ];

    connections.forEach(([from, to]) => {
        const fromCountry = countries.find(c => c.name === from);
        const toCountry = countries.find(c => c.name === to);

        if (fromCountry && toCountry) {
            const fromX = fromCountry.label.x * canvas.width;
            const fromY = fromCountry.label.y * canvas.height;
            const toX = toCountry.label.x * canvas.width;
            const toY = toCountry.label.y * canvas.height;

            ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--circuit-color');
            ctx.lineWidth = 2;
            ctx.setLineDash([8, 12]);
            ctx.globalAlpha = 0.4;
            ctx.shadowBlur = 8;
            ctx.shadowColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color');

            ctx.beginPath();
            ctx.moveTo(fromX, fromY);
            ctx.lineTo(toX, toY);
            ctx.stroke();

            ctx.setLineDash([]);
            ctx.globalAlpha = 1;
            ctx.shadowBlur = 0;
        }
    });
}

init();
animate();
