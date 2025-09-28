document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const simulationArea = document.getElementById('simulationArea');
    const backgroundStars = document.getElementById('backgroundStars');
    const cosmicDust = document.getElementById('cosmicDust');
    const addParticlesBtn = document.getElementById('addParticles');
    const addNebulaBtn = document.getElementById('addNebula');
    const toggleLensingBtn = document.getElementById('toggleLensing');
    const resetBtn = document.getElementById('reset');
    const objectOptions = document.querySelectorAll('.object-option');
    const tabBtns = document.querySelectorAll('.tab-btn');
    
    // Stats elements
    const objectCountEl = document.getElementById('objectCount');
    const consumedCountEl = document.getElementById('consumedCount');
    const particleCountEl = document.getElementById('particleCount');
    const simTimeEl = document.getElementById('simTime');
    
    // Simulation state
    let objects = [];
    let particles = [];
    let dustParticles = [];
    let consumedCount = 0;
    let selectedObjectType = 'star';
    let simulationStartTime = Date.now();
    let lensingEnabled = true;
    
    // Initialize simulation
    function init() {
        createBackgroundStars();
        createCosmicDust();
        createInitialParticles();
        startSimulationTimer();
        setupEventListeners();
        updateStats();
    }
    
    // Create background stars
    function createBackgroundStars() {
        for (let i = 0; i < 300; i++) {
            const star = document.createElement('div');
            star.classList.add('star-bg');
            
            const size = Math.random() * 3;
            star.style.width = size + 'px';
            star.style.height = size + 'px';
            
            star.style.left = Math.random() * 100 + '%';
            star.style.top = Math.random() * 100 + '%';
            
            star.style.opacity = Math.random() * 0.8 + 0.2;
            
            // Add twinkling animation
            if (Math.random() > 0.7) {
                star.style.animation = `pulse ${2 + Math.random() * 3}s ease-in-out infinite`;
            }
            
            backgroundStars.appendChild(star);
        }
    }
    
    // Create cosmic dust particles
    function createCosmicDust() {
        for (let i = 0; i < 100; i++) {
            const dust = document.createElement('div');
            dust.classList.add('dust-particle');
            
            const size = Math.random() * 2;
            dust.style.width = size + 'px';
            dust.style.height = size + 'px';
            
            dust.style.left = Math.random() * 100 + '%';
            dust.style.top = Math.random() * 100 + '%';
            
            dust.style.opacity = Math.random() * 0.4 + 0.1;
            dust.style.backgroundColor = `hsl(${200 + Math.random() * 60}, 70%, 70%)`;
            
            // Slow drift animation
            const driftX = (Math.random() - 0.5) * 100;
            const driftY = (Math.random() - 0.5) * 100;
            dust.style.setProperty('--drift-x', driftX + 'px');
            dust.style.setProperty('--drift-y', driftY + 'px');
            dust.style.animation = `particle-drift ${30 + Math.random() * 30}s linear infinite`;
            
            cosmicDust.appendChild(dust);
            dustParticles.push(dust);
        }
    }
    
    // Object selection
    function setupObjectSelection() {
        objectOptions.forEach(option => {
            option.addEventListener('click', function() {
                objectOptions.forEach(opt => opt.classList.remove('selected'));
                this.classList.add('selected');
                selectedObjectType = this.getAttribute('data-type');
            });
        });
    }
    
    // Tab switching
    function setupTabs() {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const tabName = this.getAttribute('data-tab');
                
                // Update active tab button
                tabBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                // Show corresponding tab content
                document.querySelectorAll('.tab-content').forEach(content => {
                    content.classList.remove('active');
                });
                document.getElementById(`${tabName}-tab`).classList.add('active');
            });
        });
    }
    
    // Create a thrown object
    function createObject(type, x, y) {
        const obj = document.createElement('div');
        obj.classList.add('particle');
        obj.classList.add(type);
        
        // Set object properties based on type
        let size, mass, color;
        switch(type) {
            case 'star':
                size = 30;
                mass = 5;
                color = '#a0e0ff';
                break;
            case 'planet':
                size = 24;
                mass = 3;
                color = '#ffaa00';
                break;
            case 'spaceship':
                size = 18;
                mass = 1;
                color = '#6060ff';
                break;
            case 'asteroid':
                size = 15;
                mass = 2;
                color = '#888888';
                break;
            default:
                size = 20;
                mass = 1;
                color = '#ffffff';
        }
        
        obj.style.width = size + 'px';
        obj.style.height = size + 'px';
        obj.style.left = x + 'px';
        obj.style.top = y + 'px';
        
        // Calculate trajectory towards the black hole with physics
        const centerX = simulationArea.offsetWidth / 2;
        const centerY = simulationArea.offsetHeight / 2;
        
        // Add realistic gravitational effects based on mass
        const gravityFactor = 0.5 + (mass * 0.1);
        const randomFactor = 100 - (mass * 10);
        
        const randomOffsetX = (Math.random() - 0.5) * randomFactor;
        const randomOffsetY = (Math.random() - 0.5) * randomFactor;
        
        const targetX = centerX + randomOffsetX;
        const targetY = centerY + randomOffsetY;
        
        const deltaX = (targetX - x) * gravityFactor;
        const deltaY = (targetY - y) * gravityFactor;
        
        // Set CSS custom properties for animation
        obj.style.setProperty('--tx', deltaX + 'px');
        obj.style.setProperty('--ty', deltaY + 'px');
        
        // Animation duration based on mass
        const duration = 3 + (mass * 0.5) + Math.random() * 2;
        obj.style.animation = `particle-spiral ${duration}s ease-in forwards`;
        
        simulationArea.appendChild(obj);
        objects.push({
            element: obj, 
            type: type,
            mass: mass,
            x: x,
            y: y
        });
        
        updateStats();
        
        // Track object and check for event horizon collision
        const checkInterval = setInterval(() => {
            const objRect = obj.getBoundingClientRect();
            const areaRect = simulationArea.getBoundingClientRect();
            
            const objX = objRect.left + objRect.width/2 - areaRect.left;
            const objY = objRect.top + objRect.height/2 - areaRect.top;
            
            const centerX = areaRect.width / 2;
            const centerY = areaRect.height / 2;
            
            const distance = Math.sqrt((objX - centerX)**2 + (objY - centerY)**2);
            
            // If object reaches event horizon
            if (distance < 80) {
                createSpaghettification(objX, objY, type, mass);
                
                obj.remove();
                objects = objects.filter(o => o.element !== obj);
                consumedCount++;
                updateStats();
                clearInterval(checkInterval);
            }
        }, 50);
        
        // Remove after timeout as backup
        setTimeout(() => {
            if (obj.parentNode) {
                obj.remove();
                objects = objects.filter(o => o.element !== obj);
                updateStats();
            }
            clearInterval(checkInterval);
        }, duration * 1000);
    }
    
    // Create spaghettification effect
    function createSpaghettification(x, y, type, mass) {
        const particlesCount = 20 + (mass * 5);
        let color;
        
        switch(type) {
            case 'star':
                color = '#a0e0ff';
                break;
            case 'planet':
                color = '#ff5500';
                break;
            case 'spaceship':
                color = '#6060ff';
                break;
            case 'asteroid':
                color = '#888888';
                break;
            default:
                color = '#ffffff';
        }
        
        for (let i = 0; i < particlesCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            particle.style.width = '2px';
            particle.style.height = '2px';
            particle.style.backgroundColor = color;
            particle.style.boxShadow = `0 0 5px ${color}`;
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            
            // Create spaghettification effect (elongated away from center)
            const angle =
