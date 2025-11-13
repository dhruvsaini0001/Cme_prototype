# 🌞 Coronal Mass Ejection Detection System

A real-time visualization system for detecting and monitoring Coronal Mass Ejections (CMEs) using data from the Aditya-L1 spacecraft's SWIS (Solar Wind Ion Spectrometer) payload.

## 📋 Overview

This project provides an interactive web-based interface to visualize solar wind parameters, CME detection, and the impact of coronal mass ejections on Earth and space infrastructure. It combines real-time data from India's Aditya-L1 mission with AI-powered analysis to provide early warnings of dangerous solar events.

## 🎯 Key Features

- **Real-Time Solar Monitoring**: Live visualization of the Sun, Aditya-L1 satellite, and Earth positions with animated plasma clouds representing CMEs
- **Solar Wind Parameters Dashboard**: Interactive charts displaying ion speed, particle density, and temperature data from SWIS
- **Data Processing Pipeline**: Visual representation of how data flows from the satellite through telemetry, AI analysis, to alert systems
- **CME Composition Analysis**: Detailed breakdown of plasma composition including protons, electrons, alpha particles, and heavy ions
- **Earth Impact Visualization**: Interactive scene showing how CMEs interact with Earth's magnetosphere and generate auroras
- **Historical Events Database**: Documentation of major historical CME events with severity ratings
- **Impact Scenarios**: Visual demonstrations of CME effects on satellites, power grids, aviation, and communication systems

## 🚀 Getting Started

### Prerequisites

- Modern web browser with HTML5 Canvas support
- No external dependencies required (uses vanilla JavaScript and CSS)

### Installation

1. Clone or download this repository:
```bash
git clone https://github.com/dhruvsaini0001/Cme_prototype.git
cd Cme_prototype
```

2. Open `html/index.html` in your web browser

That's it! The visualization will start automatically.

## 📁 Project Structure

```
cme_prototype/
├── html/
│   └── index.html          # Main HTML interface
├── css/
│   └── styles.css          # Styling and animations
├── js/
│   └── main.js             # Animation logic and interactivity
└── README.md               # This file
```

## 🔬 Technical Details

### How CME Detection Works

1. **Data Collection**: Aditya-L1's SWIS payload measures solar wind parameters at the L1 point (~1.5 million km from Earth)
2. **Real-Time Processing**: Ion speed, particle density, and temperature are monitored continuously
3. **AI Analysis**: Machine learning algorithms detect anomalies indicating CME passage
4. **Alert Generation**: When a CME is detected, alerts are triggered with 15-60 minutes advance warning

### Key Parameters Monitored

| Parameter | Range | Significance |
|-----------|-------|--------------|
| **Ion Speed** | 250-3000 km/s | Velocity of solar wind particles |
| **Particle Density** | 1-50 n/cm³ | Number of particles per cubic centimeter |
| **Temperature** | 1-10 million K | Kinetic energy of plasma |
| **Magnetic Field** | Embedded & twisted | Indicates magnetized plasma cloud |

### CME Composition

- **95% Protons (H⁺)**: Positively charged hydrogen nuclei
- **95% Electrons (e⁻)**: Negatively charged particles balancing charge
- **4% Alpha Particles (He²⁺)**: Doubly ionized helium atoms
- **<1% Heavy Ions**: Carbon, oxygen, nitrogen, iron, and other elements

## 🌍 Impact on Earth

### Immediate Effects (Minutes)

- Magnetosphere compression
- Ionospheric disturbances
- HF radio blackouts

### Short-term Effects (Hours)

- Satellite electronics damage
- GPS accuracy degradation
- Communication disruptions

### Major Effects

- Power grid failures from Geomagnetically Induced Currents (GICs)
- Aviation route disruptions
- Space station crew safety concerns
- Global economic impact in billions of dollars

## 📚 Historical Events

### 1859 - Carrington Event
- Most powerful geomagnetic storm ever recorded
- Telegraph systems worldwide sparked and caught fire
- Auroras visible near the equator

### 1989 - Quebec Blackout
- 9-hour blackout affecting 6 million people
- Permanent transformer damage costing millions
- Severity: G4 (Severe)

### 2012 - Near Miss
- Carrington-class CME passed through Earth's orbit
- Missed Earth by just 9 days
- Estimated damage if hit: $2 trillion

### 2024 - May G5 Storm
- Strongest geomagnetic storm in 20+ years
- Widespread aurora displays globally
- Minor satellite disruptions and GPS anomalies

## 🛡️ Why Early Detection Matters

With Aditya-L1 positioned at the L1 point, we gain **15-60 minutes advance warning** before a CME reaches Earth. This critical time window enables:

- 🛰️ Satellites to enter safe mode
- ⚡ Power companies to stabilize grids
- ✈️ Airlines to reroute flights
- 🚀 Astronauts to seek shelter
- 🏥 Critical infrastructure activation

## 💻 Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Graphics**: HTML5 Canvas for real-time animations
- **Styling**: Modern CSS with gradients, animations, and glass-morphism effects
- **Responsive Design**: Mobile-friendly interface

## 🎨 Features in Detail

### Solar System Visualization
- Dynamic plasma particle ejections
- Pulsing Sun animation
- Orbiting celestial bodies (Earth, Aditya-L1)
- Real-time plasma cloud animations

### Data Chart
- Live ion speed measurements
- CME spike detection
- Real-time grid overlay
- Alert zone highlighting

### Impact Scenarios

1. **Satellite Failures**: Electronics damage and atmospheric drag
2. **Power Grid Collapse**: GIC-induced transformer failures
3. **Aurora Displays**: Beautiful but disruptive light shows
4. **Aviation Disruptions**: Radio blackouts and crew safety
5. **Communication Loss**: Global connectivity breakdown
6. **Space Station Danger**: Astronaut radiation exposure

## 📊 Dashboard Metrics

- **Distance to Earth**: 1.5 million km (L1 point)
- **Monitoring Status**: 24/7 Continuous
- **CME Speed**: Up to 3 million km/h
- **Ion Speed**: Real-time ranging from 250-3000 km/s
- **Particle Density**: Real-time ranging from 1-50 n/cm³
- **Temperature**: Real-time ranging from 1-10 million K

## 🔮 Future Enhancements

- Integration with real Aditya-L1 data feeds
- Advanced AI/ML models for CME classification
- Predictive algorithms for impact severity
- Multi-satellite data fusion
- Mobile app version
- API for third-party integrations
- Historical data playback

## 📖 References

- Aditya-L1 Mission: https://www.isro.gov.in/
- Solar Wind Ion Spectrometer (SWIS)
- Geomagnetic Storm Classification (NOAA)
- Space Weather Prediction Center

## 👨‍💼 Author

Created by **Dhruv Saini**

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to:
- Report bugs
- Suggest features
- Submit pull requests
- Improve documentation

## ⚠️ Disclaimer

This is a prototype visualization system for educational purposes. Real CME detection and space weather forecasting is conducted by professional space agencies and institutions like ISRO, NOAA, and NASA. Always refer to official space weather alerts for critical decisions.

## 📞 Contact & Support

For questions, issues, or suggestions, please open an issue on GitHub or contact the project maintainer.

Dhruv Saini

---

**Made with ❤️ for Space Weather Enthusiasts**

*"Understanding the Sun, protecting the Earth"* 🌞🌍
