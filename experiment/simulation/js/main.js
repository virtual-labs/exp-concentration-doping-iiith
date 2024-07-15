const materialProperties = {
    Si: { Eg: 1.12, Nc: 2.8e19, Nv: 1.04e19, m_e: 1.08, m_h: 0.56 },
    Ge: { Eg: 0.66, Nc: 1.04e19, Nv: 6.0e18, m_e: 0.55, m_h: 0.37 },
    GaAs: { Eg: 1.42, Nc: 4.7e17, Nv: 7.0e18, m_e: 0.067, m_h: 0.45 }
};

const k = 8.617e-5; // Boltzmann constant in eV/K
const h = 4.135667696e-15; // Planck's constant in eV*s
const m0 = 9.1093837e-31; // Electron rest mass in kg

function calculateDOS(material, E, type) {
    const { m_e, m_h, Eg } = materialProperties[material];
    const m = type === 'n' ? m_e : m_h;
    const m_eff = m * m0; // Effective mass
    const h_bar = h / (2 * Math.PI); // Reduced Planck's constant
    
    if (type === 'n') {
        return (1 / (2 * Math.PI * Math.PI)) * ((2 * m_eff) / (h_bar * h_bar)) ** (3/2) * Math.sqrt(E) * 1e-6; // for E > 0
    } else {
        return (1 / (2 * Math.PI * Math.PI)) * ((2 * m_eff) / (h_bar * h_bar)) ** (3/2) * Math.sqrt(Eg - E) * 1e-6; // for E < Eg
    }
}

function calculateFermiFunction(E, EF, T) {
    return 1 / (1 + Math.exp((E - EF) / (k * T)));
}

function calculateIntrinsicCarrierConcentration(material, T) {
    const { Eg, Nc, Nv } = materialProperties[material];
    return Math.sqrt(Nc * Nv) * Math.exp(-Eg / (2 * k * T));
}

function calculateFermiLevel(material, T, doping, dopingType) {
    const { Eg, Nc, Nv } = materialProperties[material];
    const ni = calculateIntrinsicCarrierConcentration(material, T);
    const Ei = -Eg / 2 + (k * T / 2) * Math.log(Nv / Nc);
    
    if (dopingType === 'n') {
        return Ei + k * T * Math.log(doping / ni);
    } else {
        return Ei - k * T * Math.log(doping / ni);
    }
}

function calculateCarrierConcentration(material, E, EF, T, type) {
    const dos = calculateDOS(material, E, type);
    const fermi = calculateFermiFunction(E, EF, T);
    return dos * fermi;
}

let dosChart, fermiFunctionChart, carrierConcentrationChart;

function updatePlots() {
    const material = document.getElementById('material').value;
    const T = parseFloat(document.getElementById('temperature').value);
    const doping = parseFloat(document.getElementById('doping').value);
    const dopingType = document.getElementById('dopingType').value;

    const { Eg } = materialProperties[material];
    const energyValues = Array.from({ length: 1000 }, (_, i) => i * Eg / 500);
    const temperatures = Array.from({ length: 100 }, (_, i) => 100 + i * 9);

    // DOS vs E
    const dosValuesN = energyValues.map(E => calculateDOS(material, E, 'n'));
    const dosValuesP = energyValues.map(E => calculateDOS(material, E, 'p'));

    // Fermi function vs T
    const EF = calculateFermiLevel(material, T, doping, dopingType);
    const fermiFunctionValues = temperatures.map(temp => calculateFermiFunction(Eg/2, EF, temp));

    // Carrier concentration vs T
    const carrierConcentrations = temperatures.map(temp => {
        const EF_temp = calculateFermiLevel(material, temp, doping, dopingType);
        const n = calculateCarrierConcentration(material, Eg/2, EF_temp, temp, 'n');
        const p = calculateCarrierConcentration(material, Eg/2, EF_temp, temp, 'p');
        return { n, p };
    });

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
                        data: dosValuesN,
                        borderColor: 'blue',
                        fill: false
                    },
                    {
                        label: 'DOS (Valence Band)',
                        data: dosValuesP,
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
                labels: temperatures,
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
                        text: 'Fermi Function vs Temperature'
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
                            text: 'f(E)'
                        }
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