// const materialProperties = {
//     si: { name: 'Silicon', Eg: 1.12, me: 1.08, mh: 0.56, Nc: 2.8e19, Nv: 1.04e19 },
//     ge: { name: 'Germanium', Eg: 0.66, me: 0.55, mh: 0.37, Nc: 1.04e19, Nv: 6.0e18 },
//     gaas: { name: 'Gallium Arsenide', Eg: 1.42, me: 0.067, mh: 0.45, Nc: 4.7e17, Nv: 7.0e18 }
// };

// const k = 8.617e-5; // Boltzmann constant in eV/K

// function calculateDOS(E, m, T) {
//     const h = 6.626e-34; // Planck's constant
//     const pi = Math.PI;
//     return (4 * pi * (2 * m * 9.109e-31) ** 1.5 * (E * 1.602e-19) ** 0.5) / (h ** 3);
// }

// function fermiFunction(E, Ef, T) {
//     return 1 / (1 + Math.exp((E - Ef) / (k * T)));
// }

// function calculateCarrierConcentration(material, T, doping) {
//     const Eg = materialProperties[material].Eg;
//     const Nc = materialProperties[material].Nc;
//     const Nv = materialProperties[material].Nv;
    
//     const ni = Math.sqrt(Nc * Nv) * Math.exp(-Eg / (2 * k * T));
//     const Ef = Eg / 2 + k * T * Math.log(doping / ni);
    
//     return ni * Math.exp((Ef - Eg / 2) / (k * T));
// }

// function updateResults() {
//     const material = document.getElementById('material').value;
//     const T = parseFloat(document.getElementById('temperature').value);
//     const doping = parseFloat(document.getElementById('doping').value);
//     const E = parseFloat(document.getElementById('energy').value);
    
//     const materialProps = materialProperties[material];
//     const Eg = materialProps.Eg;
//     const me = materialProps.me;
//     const mh = materialProps.mh;
    
//     // Calculate DOS
//     const dos = E <= Eg / 2 ? calculateDOS(Eg - E, mh, T) : calculateDOS(E, me, T);
//     document.getElementById('dos-result').value = dos.toExponential(4);
    
//     // Calculate Fermi Function
//     const Ef = Eg / 2 + k * T * Math.log(doping / Math.sqrt(materialProps.Nc * materialProps.Nv));
//     const fermi = fermiFunction(E, Ef, T);
//     document.getElementById('fermi-result').value = fermi.toExponential(4);
    
//     // Calculate Carrier Concentration
//     const carrierConcentration = calculateCarrierConcentration(material, T, doping);
//     document.getElementById('carrier-result').value = carrierConcentration.toExponential(4);
// }

// function plotGraphs() {
//     const material = document.getElementById('material').value;
//     const T = parseFloat(document.getElementById('temperature').value);
//     const doping = parseFloat(document.getElementById('doping').value);
    
//     const materialProps = materialProperties[material];
//     const Eg = materialProps.Eg;
//     const me = materialProps.me;
//     const mh = materialProps.mh;
    
//     // Density of States vs E
//     const E = Array.from({length: 100}, (_, i) => i * Eg / 50);
//     const DOSc = E.map(e => calculateDOS(e, me, T));
//     const DOSv = E.map(e => calculateDOS(Eg - e, mh, T));
    
//     Plotly.newPlot('dosPlot', [
//         {x: E, y: DOSc, name: 'Conduction Band'},
//         {x: E, y: DOSv, name: 'Valence Band'}
//     ], {
//         title: 'Density of States vs Energy',
//         xaxis: {title: 'Energy (eV)'},
//         yaxis: {title: 'Density of States (cm^-3 eV^-1)', type: 'log'}
//     });
    
//     // Fermi function vs E
//     const Ef = Eg / 2 + k * T * Math.log(doping / Math.sqrt(materialProps.Nc * materialProps.Nv));
//     const fermiFunctionValues = E.map(e => fermiFunction(e, Ef, T));
    
//     Plotly.newPlot('fermiFunctionPlot', [
//         {x: E, y: fermiFunctionValues}
//     ], {
//         title: 'Fermi Function vs Energy',
//         xaxis: {title: 'Energy (eV)'},
//         yaxis: {title: 'Fermi Function'}
//     });
    
//     // Carrier concentration vs T
//     const temperatures = Array.from({length: 100}, (_, i) => (i + 1) * 10);
//     const carrierConcentrations = temperatures.map(temp => calculateCarrierConcentration(material, temp, doping));
    
//     Plotly.newPlot('carrierConcentrationPlot', [
//         {x: temperatures, y: carrierConcentrations}
//     ], {
//         title: 'Carrier Concentration vs Temperature',
//         xaxis: {title: 'Temperature (K)'},
//         yaxis: {title: 'Carrier Concentration (cm^-3)', type: 'log'}
//     });
    
//     updateResults();
// }

// document.getElementById('calculate').addEventListener('click', plotGraphs);
// document.getElementById('material').addEventListener('change', plotGraphs);
// document.getElementById('temperature').addEventListener('input', updateResults);
// document.getElementById('doping').addEventListener('input', updateResults);
// document.getElementById('energy').addEventListener('input', updateResults);

// plotGraphs(); // Initial plot

// const materialProperties = {
//     Si: { Eg: 1.12, Nc: 2.8e19, Nv: 1.04e19 },
//     Ge: { Eg: 0.66, Nc: 1.04e19, Nv: 6.0e18 },
//     GaAs: { Eg: 1.42, Nc: 4.7e17, Nv: 7.0e18 }
// };

// const k = 8.617e-5; // Boltzmann constant in eV/K

// function calculateCarrierConcentration(material, T, doping, dopingType) {
//     const { Eg, Nc, Nv } = materialProperties[material];
//     const ni = Math.sqrt(Nc * Nv) * Math.exp(-Eg / (2 * k * T));
    
//     let n, p;
//     if (dopingType === 'n') {
//         n = (doping + Math.sqrt(doping * doping + 4 * ni * ni)) / 2;
//         p = ni * ni / n;
//     } else {
//         p = (doping + Math.sqrt(doping * doping + 4 * ni * ni)) / 2;
//         n = ni * ni / p;
//     }
    
//     return { n, p, ni };
// }

// function calculateFermiLevel(material, T, n, p) {
//     const { Eg, Nc, Nv } = materialProperties[material];
//     const ni = Math.sqrt(Nc * Nv) * Math.exp(-Eg / (2 * k * T));
//     const Ei = -Eg / 2 + (k * T / 2) * Math.log(Nv / Nc);
//     return Ei + k * T * Math.log(n / ni);
// }

// function updatePlots() {
//     const material = document.getElementById('material').value;
//     const T = parseFloat(document.getElementById('temperature').value);
//     const doping = parseFloat(document.getElementById('doping').value);
//     const dopingType = document.getElementById('dopingType').value;

//     const temperatures = Array.from({ length: 100 }, (_, i) => 100 + i * 9);
//     const carrierConcentrations = temperatures.map(temp => calculateCarrierConcentration(material, temp, doping, dopingType));
//     const fermiLevels = temperatures.map((temp, i) => calculateFermiLevel(material, temp, carrierConcentrations[i].n, carrierConcentrations[i].p));

//     try {
//         Plotly.newPlot('carrierPlot', [
//             { x: temperatures, y: carrierConcentrations.map(c => c.n), name: 'Electrons', type: 'scatter', mode: 'lines' },
//             { x: temperatures, y: carrierConcentrations.map(c => c.p), name: 'Holes', type: 'scatter', mode: 'lines' },
//             { x: temperatures, y: carrierConcentrations.map(c => c.ni), name: 'Intrinsic', type: 'scatter', mode: 'lines' }
//         ], {
//             title: 'Carrier Concentration vs Temperature',
//             xaxis: { title: 'Temperature (K)' },
//             yaxis: { title: 'Carrier Concentration (cm^-3)', type: 'log' }
//         });

//         Plotly.newPlot('fermiPlot', [
//             { x: temperatures, y: fermiLevels, type: 'scatter', mode: 'lines' }
//         ], {
//             title: 'Fermi Level vs Temperature',
//             xaxis: { title: 'Temperature (K)' },
//             yaxis: { title: 'Fermi Level (eV)' }
//         });

//         document.getElementById('debug').textContent = 'Plots updated successfully';
//     } catch (error) {
//         document.getElementById('debug').textContent = 'Error: ' + error.message;
//     }
// }

// document.getElementById('calculate').addEventListener('click', updatePlots);

// // Wait for the DOM to be fully loaded before initial plot
// document.addEventListener('DOMContentLoaded', (event) => {
//     updatePlots(); // Initial plot
// });

const materialProperties = {
    Si: { Eg: 1.12, Nc: 2.8e19, Nv: 1.04e19 },
    Ge: { Eg: 0.66, Nc: 1.04e19, Nv: 6.0e18 },
    GaAs: { Eg: 1.42, Nc: 4.7e17, Nv: 7.0e18 }
};

const k = 8.617e-5; // Boltzmann constant in eV/K

function calculateCarrierConcentration(material, T, doping, dopingType) {
    const { Eg, Nc, Nv } = materialProperties[material];
    const ni = Math.sqrt(Nc * Nv) * Math.exp(-Eg / (2 * k * T));
    
    let n, p;
    if (dopingType === 'n') {
        n = (doping + Math.sqrt(doping * doping + 4 * ni * ni)) / 2;
        p = ni * ni / n;
    } else {
        p = (doping + Math.sqrt(doping * doping + 4 * ni * ni)) / 2;
        n = ni * ni / p;
    }
    
    return { n, p, ni };
}

function calculateFermiLevel(material, T, n, p) {
    const { Eg, Nc, Nv } = materialProperties[material];
    const ni = Math.sqrt(Nc * Nv) * Math.exp(-Eg / (2 * k * T));
    const Ei = -Eg / 2 + (k * T / 2) * Math.log(Nv / Nc);
    return Ei + k * T * Math.log(n / ni);
}

let carrierChart, fermiChart;

function updatePlots() {
    const material = document.getElementById('material').value;
    const T = parseFloat(document.getElementById('temperature').value);
    const doping = parseFloat(document.getElementById('doping').value);
    const dopingType = document.getElementById('dopingType').value;

    const temperatures = Array.from({ length: 100 }, (_, i) => 100 + i * 9);
    const carrierConcentrations = temperatures.map(temp => calculateCarrierConcentration(material, temp, doping, dopingType));
    const fermiLevels = temperatures.map((temp, i) => calculateFermiLevel(material, temp, carrierConcentrations[i].n, carrierConcentrations[i].p));

    try {
        if (carrierChart) carrierChart.destroy();
        if (fermiChart) fermiChart.destroy();

        carrierChart = new Chart(document.getElementById('carrierPlot'), {
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
                    },
                    {
                        label: 'Intrinsic',
                        data: carrierConcentrations.map(c => c.ni),
                        borderColor: 'green',
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
                        type: 'logarithmic',
                        title: {
                            display: true,
                            text: 'Carrier Concentration (cm^-3)'
                        }
                    }
                }
            }
        });

        fermiChart = new Chart(document.getElementById('fermiPlot'), {
            type: 'line',
            data: {
                labels: temperatures,
                datasets: [{
                    label: 'Fermi Level',
                    data: fermiLevels,
                    borderColor: 'purple',
                    fill: false
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Fermi Level vs Temperature'
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
                            text: 'Fermi Level (eV)'
                        }
                    }
                }
            }
        });

    } catch (error) {
        document.getElementById('debug').textContent = 'Error: ' + error.message;
    }
}

document.getElementById('calculate').addEventListener('click', updatePlots);

// Wait for the DOM to be fully loaded before initial plot
document.addEventListener('DOMContentLoaded', (event) => {
    updatePlots(); // Initial plot
});