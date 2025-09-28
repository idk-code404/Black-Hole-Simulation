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
            const angle = Math.random() * Math.PI * 2;
            const distance = 30 + Math.random() * 70;
            
            const deltaX = Math.cos(angle) * distance;
            const deltaY = Math.sin(angle) * distance;
            
            particle.style.setProperty('--tx', deltaX + 'px');
            particle.style.setProperty('--ty', deltaY + 'px');
            
            particle.style.animation = `particle-spiral ${0.5 + Math.random()}s ease-out forwards`;
            
            simulationArea.appendChild(particle);
            particles.push(particle);
            updateStats();
            
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                    particles = particles.filter(p => p !== particle);
                    updateStats();
                }
            }, 1000);
        }
    }
    
    // Create random particles
    function createParticles(count) {
        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            // Random properties
            const size = 2 + Math.random() * 5;
            const hue = 180 + Math.random() * 60;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            particle.style.backgroundColor = `hsl(${hue}, 100%, 70%)`;
            particle.style.boxShadow = `0 0 5px hsl(${hue}, 100%, 70%)`;
            
            // Random starting position
            const side = Math.floor(Math.random() * 4);
            let startX, startY;
            
            switch(side) {
                case 0: // top
                    startX = Math.random() * simulationArea.offsetWidth;
                    startY = 0;
                    break;
                case 1: // right
                    startX = simulationArea.offsetWidth;
                    startY = Math.random() * simulationArea.offsetHeight;
                    break;
                case 2: // bottom
                    startX = Math.random() * simulationArea.offsetWidth;
                    startY = simulationArea.offsetHeight;
                    break;
                case 3: // left
                    startX = 0;
                    startY = Math.random() * simulationArea.offsetHeight;
                    break;
            }
            
            particle.style.left = startX + 'px';
            particle.style.top = startY + 'px';
            
            // Trajectory with spiral effect
            const centerX = simulationArea.offsetWidth / 2;
            const centerY = simulationArea.offsetHeight / 2;
            
            const randomOffsetX = (Math.random() - 0.5) * 120;
            const randomOffsetY = (Math.random() - 0.5) * 120;
            
            const targetX = centerX + randomOffsetX;
            const targetY = centerY + randomOffsetY;
            
            const deltaX = targetX - startX;
            const deltaY = targetY - startY;
            
            particle.style.setProperty('--tx', deltaX + 'px');
            particle.style.setProperty('--ty', deltaY + 'px');
            
            const duration = 2 + Math.random() * 5;
            particle.style.animation = `particle-spiral ${duration}s ease-in forwards`;
            
            simulationArea.appendChild(particle);
            particles.push(particle);
            updateStats();
            
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                    particles = particles.filter(p => p !== particle);
                    updateStats();
                }
            }, duration * 1000);
        }
    }
    
    // Create nebula effect
    function createNebula() {
        for (let i = 0; i < 10; i++) {
            const nebulaParticle = document.createElement('div');
            nebulaParticle.classList.add('particle');
            
            const size = 10 + Math.random() * 20;
            const hue = 250 + Math.random() * 60;
            nebulaParticle.style.width = size + 'px';
            nebulaParticle.style.height = size + 'px';
            nebulaParticle.style.backgroundColor = `hsl(${hue}, 70%, 60%)`;
            nebulaParticle.style.boxShadow = `0 0 20px hsl(${hue}, 100%, 70%)`;
            nebulaParticle.style.opacity = '0.7';
            nebulaParticle.style.filter = 'blur(5px)';
            
            // Start from a random edge
            const side = Math.floor(Math.random() * 4);
            let startX, startY;
            
            switch(side) {
                case 0: // top
                    startX = Math.random() * simulationArea.offsetWidth;
                    startY = 0;
                    break;
                case 1: // right
                    startX = simulationArea.offsetWidth;
                    startY = Math.random() * simulationArea.offsetHeight;
                    break;
                case 2: // bottom
                    startX = Math.random() * simulationArea.offsetWidth;
                    startY = simulationArea.offsetHeight;
                    break;
                case 3: // left
                    startX = 0;
                    startY = Math.random() * simulationArea.offsetHeight;
                    break;
            }
            
            nebulaParticle.style.left = startX + 'px';
            nebulaParticle.style.top = startY + 'px';
            
            // Slow, drifting trajectory
            const centerX = simulationArea.offsetWidth / 2;
            const centerY = simulationArea.offsetHeight / 2;
            
            const randomOffsetX = (Math.random() - 0.5) * 200;
            const randomOffsetY = (Math.random() - 0.5) * 200;
            
            const targetX = centerX + randomOffsetX;
            const targetY = centerY + randomOffsetY;
            
            const deltaX = targetX - startX;
            const deltaY = targetY - startY;
            
            nebulaParticle.style.setProperty('--tx', deltaX + 'px');
            nebulaParticle.style.setProperty('--ty', deltaY + 'px');
            
            const duration = 10 + Math.random() * 10;
            nebulaParticle.style.animation = `particle-spiral ${duration}s linear forwards`;
            
            simulationArea.appendChild(nebulaParticle);
            particles.push(nebulaParticle);
            updateStats();
            
            setTimeout(() => {
                if (nebulaParticle.parentNode) {
                    nebulaParticle.parentNode.removeChild(nebulaParticle);
                    particles = particles.filter(p => p !== nebulaParticle);
                    updateStats();
                }
            }, duration * 1000);
        }
    }
    
    // Create initial particles
    function createInitialParticles() {
        createParticles(25);
    }
    
    // Update statistics display
    function updateStats() {
        objectCountEl.textContent = objects.length;
        consumedCountEl.textContent = consumedCount;
        particleCountEl.textContent = particles.length;
    }
    
    // Start simulation timer
    function startSimulationTimer() {
        setInterval(() => {
            const elapsed = Date.now() - simulationStartTime;
            const minutes = Math.floor(elapsed / 60000);
            const seconds = Math.floor((elapsed % 60000) / 1000);
            simTimeEl.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }, 1000);
    }
    
    // Toggle gravitational lensing effect
    function toggleGravitationalLensing() {
        lensingEnabled = !lensingEnabled;
        const lensingElement = document.querySelector('.gravitational-lensing');
        
        if (lensingEnabled) {
            lensingElement.style.display = 'block';
            toggleLensingBtn.innerHTML = '<span class="btn-icon">🌀</span> TOGGLE LENSING';
        } else {
            lensingElement.style.display = 'none';
            toggleLensingBtn.innerHTML = '<span class="btn-icon">🌀</span> ENABLE LENSING';
        }
    }
    
    // Setup event listeners
    function setupEventListeners() {
        // Object selection
        setupObjectSelection();
        
        // Tab switching
        setupTabs();
        
        // Control buttons
        addParticlesBtn.addEventListener('click', function() {
            createParticles(30);
        });
        
        addNebulaBtn.addEventListener('click', function() {
            createNebula();
        });
        
        toggleLensingBtn.addEventListener('click', function() {
            toggleGravitationalLensing();
        });
        
        resetBtn.addEventListener('click', function() {
            // Remove all objects and particles
            objects.forEach(obj => {
                if (obj.element.parentNode) {
                    obj.element.parentNode.removeChild(obj.element);
                }
            });
            
            particles.forEach(particle => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            });
            
            objects = [];
            particles = [];
            consumedCount = 0;
            simulationStartTime = Date.now();
            updateStats();
            
            // Add some new particles
            createInitialParticles();
        });
        
        // Click to throw selected object
        simulationArea.addEventListener('click', function(e) {
            const rect = simulationArea.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            createObject(selectedObjectType, x, y);
        });
        
        // Drag to create multiple objects
        let isDragging = false;
        simulationArea.addEventListener('mousedown', function() {
            isDragging = true;
        });
        
        simulationArea.addEventListener('mouseup', function() {
            isDragging = false;
        });
        
        simulationArea.addEventListener('mouseleave', function() {
            isDragging = false;
        });
        
        simulationArea.addEventListener('mousemove', function(e) {
            if (isDragging) {
                const rect = simulationArea.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                // Only create objects occasionally while dragging
                if (Math.random() > 0.7) {
                    createObject(selectedObjectType, x, y);
                }
            }
        });
        
        // Touch support for mobile devices
        simulationArea.addEventListener('touchstart', function(e) {
            e.preventDefault();
            const touch = e.touches[0];
            const rect = simulationArea.getBoundingClientRect();
            const x = touch.clientX - rect.left;
            const y = touch.clientY - rect.top;
            
            createObject(selectedObjectType, x, y);
        });
    }
    
    // Add CSS for particle drift animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes particle-drift {
            0% { transform: translate(0, 0); }
            100% { transform: translate(var(--drift-x), var(--drift-y)); }
        }
    `;
    document.head.appendChild(style);
    
    // Initialize the simulation
    init();
});
