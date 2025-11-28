// Create plasma particles
const solarSystem = document.getElementById('solarSystem');

function createPlasmaParticles() {
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.className = 'plasma-particle';
            
            const angle = Math.random() * Math.PI * 2;
            const distance = 150 + Math.random() * 200;
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;
            
            particle.style.setProperty('--x', x + 'px');
            particle.style.setProperty('--y', y + 'px');
            particle.style.animation = `plasma-eject ${2 + Math.random()}s ease-out forwards`;
            
            solarSystem.appendChild(particle);
            
            setTimeout(() => particle.remove(), 3000);
        }, i * 200);
    }
}

setInterval(createPlasmaParticles, 3000);
createPlasmaParticles();

// Animated Chart
const canvas = document.getElementById('dataChart');
const ctx = canvas.getContext('2d');

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

let dataPoints = [];
let time = 0;

function generateData() {
    time++;
    const normal = 400 + Math.random() * 50;
    const cmeSpike = time % 200 > 150 ? normal + Math.random() * 400 : normal;
    dataPoints.push(cmeSpike);
    if (dataPoints.length > 100) dataPoints.shift();
}

function drawChart() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;
    for (let i = 0; i < 5; i++) {
        const y = (canvas.height / 4) * i;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }
    
    // Data line
    ctx.strokeStyle = '#ff6b35';
    ctx.lineWidth = 2;
    ctx.beginPath();
    
    dataPoints.forEach((val, i) => {
        const x = (canvas.width / dataPoints.length) * i;
        const y = canvas.height - (val / 1000) * canvas.height;
        
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    });
    
    ctx.stroke();
    
    // CME Alert zone
    if (dataPoints[dataPoints.length - 1] > 600) {
        ctx.fillStyle = 'rgba(255, 107, 53, 0.2)';
        ctx.fillRect(canvas.width - 50, 0, 50, canvas.height);
        
        ctx.fillStyle = '#ff6b35';
        ctx.font = 'bold 14px Arial';
        ctx.fillText('CME!', canvas.width - 35, 30);
    }
    
    // Labels
    ctx.fillStyle = '#a0a0a0';
    ctx.font = '12px Arial';
    ctx.fillText('Ion Speed (km/s)', 10, 20);
    ctx.fillText('Time →', canvas.width - 60, canvas.height - 10);
}

function animate() {
    generateData();
    drawChart();
    requestAnimationFrame(animate);
}

animate();

// Animate stats
function animateStats() {
    const ionSpeed = document.getElementById('ionSpeed');
    const densityOld = document.getElementById('densityOld');
    const tempOld = document.getElementById('tempOld');
    
    if (ionSpeed && densityOld && tempOld) {
        const baseSpeed = 400;
        const baseDensity = 5;
        const baseTemp = 1.0;
        
        const variation = Math.sin(Date.now() / 1000);
        const isCME = dataPoints[dataPoints.length - 1] > 600;
        
        const speedVal = isCME ? baseSpeed + 300 + Math.random() * 200 : baseSpeed + variation * 50;
        const densityVal = isCME ? baseDensity + 15 + Math.random() * 10 : baseDensity + variation * 2;
        const tempVal = isCME ? baseTemp + 0.8 + Math.random() * 0.5 : baseTemp + variation * 0.2;
        
        ionSpeed.textContent = Math.round(speedVal);
        densityOld.textContent = densityVal.toFixed(1);
        tempOld.textContent = tempVal.toFixed(1) + 'M';
    }
}

setInterval(animateStats, 500);

// ===== CANVAS-BASED 3D SPACE VISUALIZATION =====

const spaceCanvas = document.getElementById('spaceCanvas');
if (spaceCanvas) {
    const spaceCtx = spaceCanvas.getContext('2d');
    
    spaceCanvas.width = spaceCanvas.offsetWidth;
    spaceCanvas.height = spaceCanvas.offsetHeight;
    
    let spaceTime = 0;
    let cmeActive = false;
    let cmeParticles = [];
    let stars = [];
    let cmeImpactTime = 0;
    let plasmaReachedEarth = false;
    
    // Create audio context for alert sounds
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    function playAlertSound() {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1);
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime + 0.2);
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.3);
    }
    
    function playWarningSound() {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.type = 'sawtooth';
        oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
        oscillator.frequency.setValueAtTime(200, audioContext.currentTime + 0.5);
        
        gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
    }
    
    function playImpactSound() {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(100, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(20, audioContext.currentTime + 1);
        
        gainNode.gain.setValueAtTime(0.4, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 1);
    }
    
    // Create starfield
    for (let i = 0; i < 300; i++) {
        stars.push({
            x: Math.random() * spaceCanvas.width,
            y: Math.random() * spaceCanvas.height,
            size: Math.random() * 2.5,
            opacity: Math.random(),
            twinkleSpeed: 0.02 + Math.random() * 0.03
        });
    }
    
    const sun = {
        x: 150,
        y: spaceCanvas.height / 2,
        radius: 60
    };
    
    const satellite = {
        x: spaceCanvas.width * 0.4,
        y: spaceCanvas.height / 2,
        width: 25,
        height: 25,
        panelWidth: 60,
        panelHeight: 10,
        rotation: 0
    };
    
    const earth = {
        x: spaceCanvas.width - 200,
        y: spaceCanvas.height / 2,
        radius: 40,
        rotation: 0
    };
    
    function drawStars() {
        stars.forEach(star => {
            spaceCtx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
            spaceCtx.beginPath();
            spaceCtx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            spaceCtx.fill();
            
            star.opacity += (Math.random() - 0.5) * star.twinkleSpeed;
            star.opacity = Math.max(0.2, Math.min(1, star.opacity));
        });
    }
    
    function drawSun() {
        const glowSize = 80 + Math.sin(spaceTime * 0.05) * 15;
        
        // Large outer corona
        const gradient1 = spaceCtx.createRadialGradient(sun.x, sun.y, sun.radius, sun.x, sun.y, glowSize);
        gradient1.addColorStop(0, 'rgba(255, 200, 100, 0.6)');
        gradient1.addColorStop(0.4, 'rgba(255, 140, 50, 0.3)');
        gradient1.addColorStop(1, 'rgba(255, 107, 53, 0)');
        spaceCtx.fillStyle = gradient1;
        spaceCtx.beginPath();
        spaceCtx.arc(sun.x, sun.y, glowSize, 0, Math.PI * 2);
        spaceCtx.fill();
        
        // Sun body
        const gradient2 = spaceCtx.createRadialGradient(
            sun.x - 20, sun.y - 20, 10,
            sun.x, sun.y, sun.radius
        );
        gradient2.addColorStop(0, '#fffacd');
        gradient2.addColorStop(0.2, '#ffd700');
        gradient2.addColorStop(0.5, '#ffa500');
        gradient2.addColorStop(0.8, '#ff8c00');
        gradient2.addColorStop(1, '#ff4500');
        
        spaceCtx.fillStyle = gradient2;
        spaceCtx.beginPath();
        spaceCtx.arc(sun.x, sun.y, sun.radius, 0, Math.PI * 2);
        spaceCtx.fill();
        
        // Corona streamers
        spaceCtx.strokeStyle = 'rgba(255, 165, 0, 0.4)';
        spaceCtx.lineWidth = 4;
        for (let i = 0; i < 12; i++) {
            const angle = (spaceTime * 0.01 + i * Math.PI / 6);
            const length = 85 + Math.sin(spaceTime * 0.1 + i) * 15;
            const startRadius = sun.radius + 5;
            
            spaceCtx.beginPath();
            spaceCtx.moveTo(
                sun.x + Math.cos(angle) * startRadius,
                sun.y + Math.sin(angle) * startRadius
            );
            spaceCtx.lineTo(
                sun.x + Math.cos(angle) * length,
                sun.y + Math.sin(angle) * length
            );
            spaceCtx.stroke();
        }
        
        // Surface detail
        for (let i = 0; i < 5; i++) {
            const angle = Math.sin(spaceTime * 0.05 + i) * Math.PI * 2;
            const distance = Math.random() * sun.radius * 0.6;
            const x = sun.x + Math.cos(angle) * distance;
            const y = sun.y + Math.sin(angle) * distance;
            
            spaceCtx.fillStyle = 'rgba(255, 100, 0, 0.3)';
            spaceCtx.beginPath();
            spaceCtx.arc(x, y, 5 + Math.random() * 5, 0, Math.PI * 2);
            spaceCtx.fill();
        }
    }
    
    function drawSatellite() {
        spaceCtx.save();
        spaceCtx.translate(satellite.x, satellite.y);
        spaceCtx.rotate(satellite.rotation);
        
        // Left solar panel with cells
        const panelGradient1 = spaceCtx.createLinearGradient(-satellite.panelWidth - 15, 0, -15, 0);
        panelGradient1.addColorStop(0, 'rgba(30, 60, 140, 0.8)');
        panelGradient1.addColorStop(0.5, '#1e5090');
        panelGradient1.addColorStop(1, '#2060b0');
        spaceCtx.fillStyle = panelGradient1;
        spaceCtx.fillRect(-satellite.panelWidth - 15, -satellite.panelHeight / 2, satellite.panelWidth, satellite.panelHeight);
        
        // Panel cells
        spaceCtx.strokeStyle = '#0a2040';
        spaceCtx.lineWidth = 1;
        for (let i = 0; i < 6; i++) {
            spaceCtx.strokeRect(-satellite.panelWidth - 15 + i * 10, -satellite.panelHeight / 2, 10, satellite.panelHeight);
        }
        
        // Right solar panel
        const panelGradient2 = spaceCtx.createLinearGradient(15, 0, satellite.panelWidth + 15, 0);
        panelGradient2.addColorStop(0, '#2060b0');
        panelGradient2.addColorStop(0.5, '#1e5090');
        panelGradient2.addColorStop(1, 'rgba(30, 60, 140, 0.8)');
        spaceCtx.fillStyle = panelGradient2;
        spaceCtx.fillRect(15, -satellite.panelHeight / 2, satellite.panelWidth, satellite.panelHeight);
        
        for (let i = 0; i < 6; i++) {
            spaceCtx.strokeRect(15 + i * 10, -satellite.panelHeight / 2, 10, satellite.panelHeight);
        }
        
        // Satellite main body
        spaceCtx.fillStyle = '#505050';
        spaceCtx.fillRect(-satellite.width / 2, -satellite.height / 2, satellite.width, satellite.height);
        
        // Body panels
        spaceCtx.fillStyle = '#707070';
        spaceCtx.fillRect(-satellite.width / 2, -satellite.height / 2, satellite.width, satellite.height / 3);
        
        spaceCtx.fillStyle = '#606060';
        spaceCtx.fillRect(-satellite.width / 2, satellite.height / 6, satellite.width, satellite.height / 3);
        
        // Highlight
        spaceCtx.fillStyle = 'rgba(200, 200, 200, 0.4)';
        spaceCtx.fillRect(-satellite.width / 2, -satellite.height / 2, satellite.width / 2, satellite.height / 4);
        
        // Antenna
        spaceCtx.strokeStyle = '#888';
        spaceCtx.lineWidth = 2;
        spaceCtx.beginPath();
        spaceCtx.moveTo(0, -satellite.height / 2);
        spaceCtx.lineTo(0, -satellite.height / 2 - 15);
        spaceCtx.stroke();
        
        spaceCtx.fillStyle = '#ff0000';
        spaceCtx.beginPath();
        spaceCtx.arc(0, -satellite.height / 2 - 18, 3, 0, Math.PI * 2);
        spaceCtx.fill();
        
        // Active sensor glow
        spaceCtx.shadowBlur = 25;
        spaceCtx.shadowColor = '#00ffff';
        spaceCtx.strokeStyle = '#00ffff';
        spaceCtx.lineWidth = 3;
        spaceCtx.strokeRect(-satellite.width / 2, -satellite.height / 2, satellite.width, satellite.height);
        spaceCtx.shadowBlur = 0;
        
        // Sensor instruments
        spaceCtx.fillStyle = '#00ffff';
        spaceCtx.fillRect(-8, 0, 4, 4);
        spaceCtx.fillRect(4, 0, 4, 4);
        
        spaceCtx.restore();
        
        // Floating animation
        satellite.y = spaceCanvas.height / 2 + Math.sin(spaceTime * 0.03) * 8;
        satellite.rotation = Math.sin(spaceTime * 0.02) * 0.05;
    }
    
    function drawEarth() {
        // Shadow under earth
        spaceCtx.fillStyle = 'rgba(0, 0, 0, 0.4)';
        spaceCtx.beginPath();
        spaceCtx.ellipse(earth.x, earth.y + 60, earth.radius * 0.9, earth.radius * 0.25, 0, 0, Math.PI * 2);
        spaceCtx.fill();
        
        // Magnetosphere (when plasma impacts)
        if (plasmaReachedEarth) {
            spaceCtx.strokeStyle = `rgba(0, 255, 100, ${0.5 + Math.sin(spaceTime * 0.1) * 0.3})`;
            spaceCtx.lineWidth = 3;
            spaceCtx.beginPath();
            spaceCtx.arc(earth.x, earth.y, earth.radius + 20, 0, Math.PI * 2);
            spaceCtx.stroke();
            
            spaceCtx.strokeStyle = `rgba(255, 100, 255, ${0.3 + Math.sin(spaceTime * 0.15) * 0.2})`;
            spaceCtx.lineWidth = 2;
            spaceCtx.beginPath();
            spaceCtx.arc(earth.x, earth.y, earth.radius + 30, 0, Math.PI * 2);
            spaceCtx.stroke();
        }
        
        // Atmosphere glow
        const atmGradient = spaceCtx.createRadialGradient(earth.x, earth.y, earth.radius, earth.x, earth.y, earth.radius + 20);
        atmGradient.addColorStop(0, 'rgba(100, 180, 255, 0)');
        atmGradient.addColorStop(0.7, 'rgba(100, 180, 255, 0.4)');
        atmGradient.addColorStop(1, 'rgba(100, 180, 255, 0)');
        spaceCtx.fillStyle = atmGradient;
        spaceCtx.beginPath();
        spaceCtx.arc(earth.x, earth.y, earth.radius + 20, 0, Math.PI * 2);
        spaceCtx.fill();
        
        // Earth body
        const earthGradient = spaceCtx.createRadialGradient(
            earth.x - 12, earth.y - 12, 8,
            earth.x, earth.y, earth.radius
        );
        earthGradient.addColorStop(0, '#87ceeb');
        earthGradient.addColorStop(0.3, '#4da6ff');
        earthGradient.addColorStop(0.7, '#0066cc');
        earthGradient.addColorStop(1, '#003d7a');
        
        spaceCtx.fillStyle = earthGradient;
        spaceCtx.beginPath();
        spaceCtx.arc(earth.x, earth.y, earth.radius, 0, Math.PI * 2);
        spaceCtx.fill();
        
        // Continents
        spaceCtx.save();
        spaceCtx.translate(earth.x, earth.y);
        spaceCtx.rotate(earth.rotation);
        
        spaceCtx.fillStyle = '#2d8f2d';
        
        // North America
        spaceCtx.beginPath();
        spaceCtx.ellipse(-10, -8, 12, 8, -0.3, 0, Math.PI * 2);
        spaceCtx.fill();
        
        // South America
        spaceCtx.beginPath();
        spaceCtx.ellipse(-8, 10, 6, 10, 0.2, 0, Math.PI * 2);
        spaceCtx.fill();
        
        // Africa/Europe
        spaceCtx.beginPath();
        spaceCtx.ellipse(8, -5, 8, 12, 0, 0, Math.PI * 2);
        spaceCtx.fill();
        
        // Asia
        spaceCtx.beginPath();
        spaceCtx.ellipse(15, -10, 10, 7, 0.5, 0, Math.PI * 2);
        spaceCtx.fill();
        
        spaceCtx.restore();
        
        earth.rotation += 0.003;
        
        // Cloud layer
        spaceCtx.fillStyle = 'rgba(255, 255, 255, 0.2)';
        spaceCtx.beginPath();
        spaceCtx.arc(earth.x - 15, earth.y - 10, 6, 0, Math.PI * 2);
        spaceCtx.fill();
        
        // Shine/reflection
        spaceCtx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        spaceCtx.beginPath();
        spaceCtx.arc(earth.x - 15, earth.y - 15, 10, 0, Math.PI * 2);
        spaceCtx.fill();
    }
    
    function drawCME() {
        if (cmeActive) {
            // Create plasma stream
            if (Math.random() < 0.5) {
                const angle = (Math.random() - 0.5) * 0.8;
                cmeParticles.push({
                    x: sun.x + sun.radius * Math.cos(angle),
                    y: sun.y + sun.radius * Math.sin(angle),
                    vx: 3 + Math.random() * 4,
                    vy: (Math.random() - 0.5) * 3,
                    size: 4 + Math.random() * 8,
                    life: 1,
                    opacity: 0.9,
                    color: Math.random() > 0.7 ? 'orange' : 'red'
                });
            }
        }
        
        // Update particles
        cmeParticles = cmeParticles.filter(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.life -= 0.008;
            p.opacity = p.life * 0.9;
            
            // Check if plasma reached Earth
            const distToEarth = Math.sqrt((p.x - earth.x) ** 2 + (p.y - earth.y) ** 2);
            if (distToEarth < earth.radius + 40 && !plasmaReachedEarth) {
                plasmaReachedEarth = true;
                playImpactSound();
                
                // Create impact particles
                for (let i = 0; i < 20; i++) {
                    const angle = Math.random() * Math.PI * 2;
                    cmeParticles.push({
                        x: earth.x,
                        y: earth.y,
                        vx: Math.cos(angle) * 2,
                        vy: Math.sin(angle) * 2,
                        size: 3,
                        life: 0.5,
                        opacity: 0.8,
                        color: 'cyan'
                    });
                }
            }
            
            if (p.life > 0) {
                const colorMap = {
                    'red': `rgba(255, 100, 50, ${p.opacity})`,
                    'orange': `rgba(255, 165, 50, ${p.opacity})`,
                    'cyan': `rgba(0, 255, 255, ${p.opacity})`
                };
                
                const gradient = spaceCtx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
                gradient.addColorStop(0, colorMap[p.color] || colorMap['red']);
                gradient.addColorStop(0.5, `rgba(255, 107, 53, ${p.opacity * 0.6})`);
                gradient.addColorStop(1, `rgba(255, 107, 53, 0)`);
                
                spaceCtx.fillStyle = gradient;
                spaceCtx.beginPath();
                spaceCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                spaceCtx.fill();
                
                // Glow effect
                spaceCtx.shadowBlur = 15;
                spaceCtx.shadowColor = colorMap[p.color] || colorMap['red'];
                spaceCtx.fill();
                spaceCtx.shadowBlur = 0;
                
                return true;
            }
            return false;
        });
    }
    
    function updateData() {
        const speedEl = document.getElementById('speed');
        const densityEl = document.getElementById('density');
        const tempEl = document.getElementById('temp');
        const statusEl = document.getElementById('status');
        
        const speedBox = document.getElementById('speedBox');
        const densityBox = document.getElementById('densityBox');
        const tempBox = document.getElementById('tempBox');
        const statusBox = document.getElementById('statusBox');
        
        if (cmeActive && cmeParticles.length > 50) {
            const cmeSpeed = Math.round(700 + Math.random() * 500);
            speedEl.textContent = cmeSpeed;
            speedEl.classList.add('danger');
            speedBox.classList.add('warning');
            
            densityEl.textContent = (15 + Math.random() * 20).toFixed(1);
            densityEl.classList.add('danger');
            densityBox.classList.add('warning');
            
            tempEl.textContent = (2.0 + Math.random() * 1.5).toFixed(1) + 'M';
            tempEl.classList.add('danger');
            tempBox.classList.add('warning');
            
            if (plasmaReachedEarth) {
                statusEl.textContent = '🔴 IMPACT!';
                statusEl.style.color = '#ff0000';
            } else {
                statusEl.textContent = '⚠️ CME ACTIVE';
                statusEl.style.color = '#ff6600';
            }
            statusBox.classList.add('warning');
        } else {
            speedEl.textContent = Math.round(400 + Math.random() * 100);
            speedEl.classList.remove('danger');
            speedBox.classList.remove('warning');
            
            densityEl.textContent = (5 + Math.random() * 3).toFixed(1);
            densityEl.classList.remove('danger');
            densityBox.classList.remove('warning');
            
            tempEl.textContent = (1.0 + Math.random() * 0.3).toFixed(1) + 'M';
            tempEl.classList.remove('danger');
            tempBox.classList.remove('warning');
            
            statusEl.textContent = '✅ Normal';
            statusEl.style.color = '#00ff66';
            statusBox.classList.remove('warning');
        }
    }
    
    function animateSpace() {
        spaceCtx.clearRect(0, 0, spaceCanvas.width, spaceCanvas.height);
        
        drawStars();
        drawSun();
        drawCME();
        drawSatellite();
        drawEarth();
        
        spaceTime++;
        
        if (spaceTime % 30 === 0) {
            updateData();
        }
        
        // Update ETA countdown
        if (cmeActive && !plasmaReachedEarth) {
            cmeImpactTime = Math.max(0, cmeImpactTime - 1);
            const minutes = Math.floor(cmeImpactTime / 60);
            const seconds = cmeImpactTime % 60;
            const etaEl = document.getElementById('etaTime');
            if (etaEl) {
                etaEl.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
            }
        }
        
        requestAnimationFrame(animateSpace);
    }
    
    window.triggerCME = function() {
        if (!cmeActive) {
            cmeActive = true;
            plasmaReachedEarth = false;
            cmeImpactTime = 900; // 15 minutes in frames (60fps)
            
            // Show alert panel
            const alertPanel = document.getElementById('alertPanel');
            if (alertPanel) {
                alertPanel.classList.add('active');
            }
            
            // Play alert sound
            playAlertSound();
            setTimeout(playWarningSound, 500);
            setTimeout(playAlertSound, 1000);
            
            // Hide alert after 8 seconds
            setTimeout(() => {
                if (alertPanel) {
                    alertPanel.classList.remove('active');
                }
            }, 8000);
            
            // Stop CME after duration
            setTimeout(() => {
                cmeActive = false;
                setTimeout(() => {
                    plasmaReachedEarth = false;
                }, 5000);
            }, 12000);
        }
    };
    
    window.resetView = function() {
        cmeActive = false;
        plasmaReachedEarth = false;
        cmeParticles = [];
        cmeImpactTime = 0;
        const alertPanel = document.getElementById('alertPanel');
        if (alertPanel) {
            alertPanel.classList.remove('active');
        }
        updateData();
    };
    
    window.addEventListener('resize', () => {
        spaceCanvas.width = spaceCanvas.offsetWidth;
        spaceCanvas.height = spaceCanvas.offsetHeight;
        
        // Reposition objects
        sun.y = spaceCanvas.height / 2;
        satellite.x = spaceCanvas.width * 0.4;
        satellite.y = spaceCanvas.height / 2;
        earth.x = spaceCanvas.width - 200;
        earth.y = spaceCanvas.height / 2;
    });
    
    // Initialize
    animateSpace();
    updateData();
}