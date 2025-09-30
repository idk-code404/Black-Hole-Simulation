[# Cosmic Black Hole Simulator

[An interactive, visually stunning black hole simulation built with HTML5, CSS3, and JavaScript. Experience the physics of spacetime curvature, gravitational lensing, and matter accretion in real-time.

## Features

- **Realistic Black Hole Visualization**
  - Multiple photon spheres
  - Dynamic accretion disk with different rotation speeds
  - Gravitational lensing effects
  - Event horizon with glowing boundary

- **Interactive Physics Simulation**
  - Throw stars, planets, spaceships, and asteroids into the black hole
  - Realistic gravitational trajectories
  - Spaghettification effects when objects cross the event horizon
  - Mass-based physics simulation

- **Immersive Cosmic Environment**
  - Animated background stars
  - Cosmic dust particles
  - Nebula generation
  - Responsive design for all devices

- **Educational Components**
  - Physics information panels
  - Real-time simulation statistics
  - Interactive controls and object selection

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- No additional installations required

### Installation

1. Clone the repository:

git clone https://github.com/yourusername/blackhole-simulator.git
Navigate to the project directory:

cd blackhole-simulator
Open index.html in your web browser:

open index.html
Or simply drag and drop the index.html file into your browser window.

How to Use
Select an Object Type: Choose from stars, planets, spaceships, or asteroids

Throw Objects: Click anywhere in the simulation area to throw the selected object

Drag to Create Multiple: Click and drag to continuously create objects

Modify Simulation: Use control buttons to add particles, create nebula effects, or reset

Learn Physics: Switch between info tabs to learn about black hole physics

Physics Simulation Details
The simulation implements several key concepts from general relativity:

Event Horizon: The point of no return where escape velocity exceeds light speed

Photon Sphere: Region where photons orbit the black hole in unstable paths

Accretion Disk: Superheated matter spiraling inward due to angular momentum conservation

Gravitational Lensing: Light bending around massive objects due to spacetime curvature

Spaghettification: Tidal forces stretching objects as they approach the singularity

Technical Implementation
Technologies Used
HTML5: Structure and semantic markup

CSS3: Advanced animations, gradients, and responsive design

JavaScript: Physics simulation and interactive elements

Canvas API: Particle system and visual effects

Key Features
60 FPS animation performance

Mobile-responsive design

Touch and mouse interaction support

GPU-accelerated CSS animations

Modular, maintainable code structure

File Structure
text
blackhole-simulator/
│
├── index.html          # Main HTML file
├── styles.css          # All styling and animations
├── script.js           # Physics simulation and interactivity
├── README.md           # Project documentation
└── assets/             # Additional resources (images, etc.)
Browser Compatibility
Chrome 70+

Firefox 65+

Safari 12+

Edge 79+

Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

Fork the project

Create your feature branch (git checkout -b feature/AmazingFeature)

Commit your changes (git commit -m 'Add some AmazingFeature')

Push to the branch (git push origin feature/AmazingFeature)

Open a Pull Request

Acknowledgments
Inspired by real astronomical observations and simulations

Physics concepts based on general relativity

Design inspired by NASA visualization and scientific simulations

Future Enhancements
WebGL implementation for improved performance

VR/AR compatibility

Multiple black hole systems

Customizable physics parameters

Sound effects and spatial audio](https://img.shields.io/badge/Visualization-WebGL%252FThree.js-blue
https://img.shields.io/badge/License-MIT-green
https://img.shields.io/badge/Accessibility-Offline%2520Capable-orange

An interactive educational black hole simulator featuring real-time 3D visualization with WebGL/Three.js and a robust 2D fallback system.

🌌 Features
Real-time 3D Visualization - WebGL-powered black hole with accretion disk, photon ring, and gravitational lensing

Robust Loading System - Multiple CDN fallbacks and graceful 2D degradation

Interactive Controls - Adjust mass, spin, particle count, and physics modes

Educational Focus - Detailed explanations of astrophysical phenomena

Responsive Design - Works on desktop and mobile devices

Offline Capable - Self-contained single HTML file

🚀 Quick Start
Simply open index.html in a modern web browser. No installation or build process required!

bash
# Clone or download the file, then:
open blackhole-simulator.html
# or
python -m http.server  # Serve locally
🎮 Controls & Parameters
Black Hole Properties
Mass (M☉): 1-100 solar masses (affects event horizon size)

Spin (a): 0-0.999 dimensionless angular momentum

Particles: 100-20,000 orbiting particles

Visualization Modes
Physics Mode:

Simplified: Better performance

Advanced: Relativistic effects (time dilation coloring)

Lens Effect: Toggle gravitational lensing

Stylized Mode: Enhanced visual effects for educational clarity

Interaction
Orbit Controls: Click and drag to rotate, scroll to zoom

Reset: Restore default parameters

Screenshot: Capture current visualization

📚 Educational Content
The simulator demonstrates:

Event Horizon: Boundary of no return

Accretion Disk: Hot plasma orbiting the black hole

Photon Ring: Light orbiting the black hole

Gravitational Lensing: Bending of light by gravity

Time Dilation: Relativistic time effects

Doppler Beaming: Frequency shifts in orbiting material

🛠️ Technical Details
Architecture
Primary Renderer: Three.js (WebGL)

Fallback System: Canvas 2D rendering

CDN Strategy: Multiple sources with graceful degradation

Shader-Based: Custom GLSL shaders for visual effects

Performance Optimization
Adaptive particle counts

Toggleable effects for low-end devices

Efficient instanced rendering for particles

Browser Compatibility
Modern Browsers: Full WebGL experience

Legacy Support: Automatic 2D fallback

Mobile: Touch-optimized controls

🎨 Visual Features
Dynamic accretion disk with Doppler shifting

Photon ring visualization

Gravitational lensing post-processing

Particle systems representing orbiting matter

Rim glow and atmospheric effects

Real-time parameter updates

🔧 Development
The entire application is contained in a single HTML file with:

Inline CSS for styling

Embedded JavaScript with modular structure

External library loading with fallbacks

Comprehensive error handling

Key Functions
runThreeJS(): Main WebGL renderer

runFallback2D(): Canvas 2D alternative

Robust loader with multiple CDN attempts

Runtime function exposure for UI interaction

🌟 Usage Tips
For Demos: Enable "Stylized Mode" for maximum visual impact

Performance: Reduce particles or disable lensing on low-end devices

Education: Switch to "Advanced" physics for relativistic effects

Screenshots: Use the screenshot button to capture visuals

📱 Mobile Support
Touch-optimized orbit controls

Responsive sidebar that overlays on mobile

Adaptive performance settings

🔬 Scientific Context
While simplified for educational purposes, the simulator incorporates concepts from:

General Relativity

Kerr metric (rotating black holes)

Accretion disk physics

Gravitational lensing theory

📄 License
MIT License - Feel free to use for educational and non-commercial purposes.

🤝 Contributing
This is an educational demonstration. Suggestions and improvements are welcome!

Built with Three.js • Works offline • Educational focus)

Export simulation data
](https://img.shields.io/badge/Visualization-WebGL%252FThree.js-blue
https://img.shields.io/badge/License-MIT-green
https://img.shields.io/badge/Accessibility-Offline%2520Capable-orange

An interactive educational black hole simulator featuring real-time 3D visualization with WebGL/Three.js and a robust 2D fallback system.

🌌 Features
Real-time 3D Visualization - WebGL-powered black hole with accretion disk, photon ring, and gravitational lensing

Robust Loading System - Multiple CDN fallbacks and graceful 2D degradation

Interactive Controls - Adjust mass, spin, particle count, and physics modes

Educational Focus - Detailed explanations of astrophysical phenomena

Responsive Design - Works on desktop and mobile devices

Offline Capable - Self-contained single HTML file

🚀 Quick Start
Simply open index.html in a modern web browser. No installation or build process required!

bash
# Clone or download the file, then:
open blackhole-simulator.html
# or
python -m http.server  # Serve locally
🎮 Controls & Parameters
Black Hole Properties
Mass (M☉): 1-100 solar masses (affects event horizon size)

Spin (a): 0-0.999 dimensionless angular momentum

Particles: 100-20,000 orbiting particles

Visualization Modes
Physics Mode:

Simplified: Better performance

Advanced: Relativistic effects (time dilation coloring)

Lens Effect: Toggle gravitational lensing

Stylized Mode: Enhanced visual effects for educational clarity

Interaction
Orbit Controls: Click and drag to rotate, scroll to zoom

Reset: Restore default parameters

Screenshot: Capture current visualization

📚 Educational Content
The simulator demonstrates:

Event Horizon: Boundary of no return

Accretion Disk: Hot plasma orbiting the black hole

Photon Ring: Light orbiting the black hole

Gravitational Lensing: Bending of light by gravity

Time Dilation: Relativistic time effects

Doppler Beaming: Frequency shifts in orbiting material

🛠️ Technical Details
Architecture
Primary Renderer: Three.js (WebGL)

Fallback System: Canvas 2D rendering

CDN Strategy: Multiple sources with graceful degradation

Shader-Based: Custom GLSL shaders for visual effects

Performance Optimization
Adaptive particle counts

Toggleable effects for low-end devices

Efficient instanced rendering for particles

Browser Compatibility
Modern Browsers: Full WebGL experience

Legacy Support: Automatic 2D fallback

Mobile: Touch-optimized controls

🎨 Visual Features
Dynamic accretion disk with Doppler shifting

Photon ring visualization

Gravitational lensing post-processing

Particle systems representing orbiting matter

Rim glow and atmospheric effects

Real-time parameter updates

🔧 Development
The entire application is contained in a single HTML file with:

Inline CSS for styling

Embedded JavaScript with modular structure

External library loading with fallbacks

Comprehensive error handling

Key Functions
runThreeJS(): Main WebGL renderer

runFallback2D(): Canvas 2D alternative

Robust loader with multiple CDN attempts

Runtime function exposure for UI interaction

🌟 Usage Tips
For Demos: Enable "Stylized Mode" for maximum visual impact

Performance: Reduce particles or disable lensing on low-end devices

Education: Switch to "Advanced" physics for relativistic effects

Screenshots: Use the screenshot button to capture visuals

📱 Mobile Support
Touch-optimized orbit controls

Responsive sidebar that overlays on mobile

Adaptive performance settings

🔬 Scientific Context
While simplified for educational purposes, the simulator incorporates concepts from:

General Relativity

Kerr metric (rotating black holes)

Accretion disk physics

Gravitational lensing theory

📄 License
MIT License - Feel free to use for educational and non-commercial purposes.

🤝 Contributing
This is an educational demonstration. Suggestions and improvements are welcome!

Built with Three.js • Works offline • Educational focus)
