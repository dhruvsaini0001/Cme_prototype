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
    const density = document.getElementById('density');
    const temp = document.getElementById('temp');
    
    const baseSpeed = 400;
    const baseDensity = 5;
    const baseTemp = 1.0;
    
    const variation = Math.sin(Date.now() / 1000);
    const isCME = dataPoints[dataPoints.length - 1] > 600;
    
    const speedVal = isCME ? baseSpeed + 300 + Math.random() * 200 : baseSpeed + variation * 50;
    const densityVal = isCME ? baseDensity + 15 + Math.random() * 10 : baseDensity + variation * 2;
    const tempVal = isCME ? baseTemp + 0.8 + Math.random() * 0.5 : baseTemp + variation * 0.2;
    
    ionSpeed.textContent = Math.round(speedVal);
    density.textContent = densityVal.toFixed(1);
    temp.textContent = tempVal.toFixed(1) + 'M';
}

setInterval(animateStats, 500);