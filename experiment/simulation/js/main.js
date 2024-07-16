const materialProperties = {
    Si: { Eg0: 1.17, alpha: 4.73e-4, beta: 636, Nc300: 2.86e19, Nv300: 3.1e19, m_e: 1.08, m_h: 0.81 },
    Ge: { Eg0: 0.7437, alpha: 4.774e-4, beta: 235, Nc300: 1.04e19, Nv300: 6.0e18, m_e: 0.55, m_h: 0.37 },
    GaAs: { Eg0: 1.519, alpha: 5.405e-4, beta: 204, Nc300: 4.7e17, Nv300: 7.0e18, m_e: 0.067, m_h: 0.45 }
};

const k = 8.617333262e-5; // Boltzmann constant in eV/K

function calculateBandgap(material, T) {
    const { Eg0, alpha, beta } = materialProperties[material];
    return Eg0 - (alpha * T * T) / (T + beta);
}

function calculateEffectiveDOS(material, T) {
    const { Nc300, Nv300 } = materialProperties[material];
    const Nc = Nc300 * Math.pow(T / 300, 3/2);
    const Nv = Nv300 * Math.pow(T / 300, 3/2);
    return { Nc, Nv };
}

function calculateIntrinsicCarrierConcentration(material, T) {
    const Eg = calculateBandgap(material, T);
    const { Nc, Nv } = calculateEffectiveDOS(material, T);
    return Math.sqrt(Nc * Nv) * Math.exp(-Eg / (2 * k * T));
}

function calculateFermiLevel(material, T, doping, dopingType) {
    const Eg = calculateBandgap(material, T);
    const { Nc, Nv } = calculateEffectiveDOS(material, T);
    const ni = calculateIntrinsicCarrierConcentration(material, T);
    const Ei = Eg / 2 + (k * T / 2) * Math.log(Nv / Nc);
    
    if (dopingType === 'n') {
        return Ei + k * T * Math.log(doping / ni);
    } else {
        return Ei - k * T * Math.log(doping / ni);
    }
}

function calculateCarrierConcentration(material, T, doping, dopingType) {
    const Eg = calculateBandgap(material, T);
    const { Nc, Nv } = calculateEffectiveDOS(material, T);
    const ni = calculateIntrinsicCarrierConcentration(material, T);
    const EF = calculateFermiLevel(material, T, doping, dopingType);

    const n = Nc * Math.exp(-(Eg - EF) / (k * T));
    const p = Nv * Math.exp(-EF / (k * T));

    return { n, p };
}

let dosChart, fermiFunctionChart, carrierConcentrationChart;
function updatePlots() {
    const material = document.getElementById('material').value;
    const T = parseFloat(document.getElementById('temperature').value);
    const doping = parseFloat(document.getElementById('doping').value);
    const dopingType = document.getElementById('dopingType').value;

    const Eg = calculateBandgap(material, T);
    const energyValues = Array.from({ length: 1000 }, (_, i) => i * Eg / 500 - Eg/2);
    const temperatures = Array.from({ length: 300 }, (_, i) => 50 + i * 5); // 50K to 1550K

    // DOS vs E
    const dosValues = energyValues.map(E => {
        const { Nc, Nv } = calculateEffectiveDOS(material, T);
        return {
            dos_c: E >= 0 ? Nc * Math.sqrt(E) / (Eg / 2) : 0,
            dos_v: E <= 0 ? Nv * Math.sqrt(-E) / (Eg / 2) : 0
        };
    });

    // Fermi function vs E (at constant T)
    const EF = calculateFermiLevel(material, T, doping, dopingType);
    const fermiFunctionValues = energyValues.map(E => 1 / (1 + Math.exp((E - EF) / (k * T))));

    // Carrier concentration vs T
    const carrierConcentrations = temperatures.map(temp => 
        calculateCarrierConcentration(material, temp, doping, dopingType)
    );

    try {
        if (dosChart) dosChart.destroy();
        if (fermiFunctionChart) fermiFunctionChart.destroy();
        if (carrierConcentrationChart) carrierConcentrationChart.destroy();

        dosChart = new Chart(document.getElementById('dosPlot'), {
            type: 'line',
            data: {
                labels: energyValues,
                datasets: [
                    {
                        label: 'DOS (Conduction Band)',
                        data: dosValues.map(d => d.dos_c),
                        borderColor: 'blue',
                        fill: false
                    },
                    {
                        label: 'DOS (Valence Band)',
                        data: dosValues.map(d => d.dos_v),
                        borderColor: 'red',
                        fill: false
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Density of States vs Energy'
                    },
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Energy (eV)'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'DOS (cm^-3 eV^-1)'
                        },
                        type: 'logarithmic'
                    }
                }
            }
        });

        fermiFunctionChart = new Chart(document.getElementById('fermiFunctionPlot'), {
            type: 'line',
            data: {
                labels: energyValues,
                datasets: [{
                    label: 'Fermi Function',
                    data: fermiFunctionValues,
                    borderColor: 'green',
                    fill: false
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Fermi Function vs Energy'
                    },
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Energy (eV)'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'f(E)'
                        },
                        min: 0,
                        max: 1
                    }
                }
            }
        });

        carrierConcentrationChart = new Chart(document.getElementById('carrierConcentrationPlot'), {
            type: 'line',
            data: {
                labels: temperatures,
                datasets: [
                    {
                        label: 'Electrons',
                        data: carrierConcentrations.map(c => c.n),
                        borderColor: 'blue',
                        fill: false
                    },
                    {
                        label: 'Holes',
                        data: carrierConcentrations.map(c => c.p),
                        borderColor: 'red',
                        fill: false
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Carrier Concentration vs Temperature'
                    },
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Temperature (K)'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Carrier Concentration (cm^-3)'
                        },
                        type: 'logarithmic'
                    }
                }
            }
        });

    } catch (error) {
        document.getElementById('debug').textContent = 'Error: ' + error.message;
    }
}

document.getElementById('calculate').addEventListener('click', updatePlots);

document.addEventListener('DOMContentLoaded', (event) => {
    updatePlots();
});
