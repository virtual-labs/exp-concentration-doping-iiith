# Theory

## 1. Introduction to Semiconductors

Semiconductors are a unique class of materials that have electrical properties between those of conductors (like metals) and insulators (like rubber). Their ability to control and manipulate electrical current makes them the foundation of modern electronics.

- **Examples**: The most common semiconductors are silicon (Si) and germanium (Ge).
- **Importance**: They are used in various electronic devices, from simple diodes to complex integrated circuits in computers and smartphones.

## 2. Energy Bands

In semiconductors, electrons occupy specific energy levels. These levels are grouped into bands:

### Valence Band
- The lower energy band
- Electrons in this band are tightly bound to specific atoms in the crystal structure
- In a pure semiconductor at absolute zero temperature, this band is completely filled

### Conduction Band
- The higher energy band
- Electrons in this band can move freely through the material, contributing to electrical conduction
- In a pure semiconductor at absolute zero, this band is completely empty

### Band Gap
- The energy difference between the top of the valence band and the bottom of the conduction band
- Represents the minimum energy required for an electron to jump from the valence band to the conduction band
- The size of the band gap determines many of the material's electrical properties

## 3. Charge Carriers

There are two types of charge carriers in semiconductors:

### Electrons
- Negatively charged particles
- When in the conduction band, they can move freely and conduct electricity
- In n-type semiconductors, electrons are the majority carriers

### Holes
- Conceptual positively charged "particles"
- Represent the absence of an electron in the valence band
- Can also move and contribute to electrical conduction
- In p-type semiconductors, holes are the majority carriers

## 4. Intrinsic and Extrinsic Semiconductors

### Intrinsic Semiconductors
- Pure semiconductors with no intentionally added impurities
- Have equal numbers of electrons and holes
- The number of carriers is determined by the material's properties and temperature

### Extrinsic Semiconductors
- Semiconductors with intentionally added impurities (dopants)
- The addition of dopants modifies their electrical properties
- Can be either n-type (excess electrons) or p-type (excess holes)

## 5. Doping

Doping is the process of intentionally introducing impurities into a semiconductor to modify its electrical properties:

### N-type Doping
- Adding elements with extra valence electrons (e.g., phosphorus in silicon)
- Increases the concentration of free electrons
- The dopant atoms are called donors because they "donate" electrons to the conduction band

### P-type Doping
- Adding elements with fewer valence electrons (e.g., boron in silicon)
- Increases the concentration of holes
- The dopant atoms are called acceptors because they "accept" electrons from the valence band, creating holes

## 6. Carrier Concentration

Carrier concentration refers to the number of charge carriers (electrons or holes) per unit volume in a semiconductor.

- It's typically measured in carriers per cubic centimeter (cm^-3)
- In intrinsic semiconductors, electron concentration (n) equals hole concentration (p)
- In extrinsic semiconductors, the concentration of majority carriers is much higher than minority carriers

## 7. Density of States (DOS)

The density of states represents the number of available energy states per unit volume and energy in a semiconductor.

### Conduction Band DOS
$N_c = 2(\frac{2\pi m_e^* k T}{h^2})^{3/2}$

### Valence Band DOS
$N_v = 2(\frac{2\pi m_h^* k T}{h^2})^{3/2}$

Where:
- $m_e^*$ and $m_h^*$ are the effective masses of electrons and holes
- $k$ is the Boltzmann constant
- $T$ is the temperature in Kelvin
- $h$ is Planck's constant

The DOS is crucial for calculating carrier concentrations as it determines the number of states available for occupation by carriers.

## 8. Fermi-Dirac Distribution

The Fermi-Dirac distribution describes the probability of an electron occupying an energy state:

$f(E) = \frac{1}{1 + e^{(E-E_F)/kT}}$

Where:
- $E$ is the energy of the state
- $E_F$ is the Fermi level
- $k$ is the Boltzmann constant
- $T$ is the temperature in Kelvin

This function is fundamental in determining how electrons distribute themselves among the available energy states.

## 9. Fermi Level

The Fermi level is a crucial concept in semiconductor physics:

- It represents the energy level at which the probability of electron occupancy is exactly 0.5
- Its position relative to the conduction and valence bands determines many electrical properties of the semiconductor
- In intrinsic semiconductors, it lies near the middle of the band gap
- In n-type semiconductors, it moves closer to the conduction band
- In p-type semiconductors, it moves closer to the valence band

## 10. Carrier Concentration Equations

These equations relate the carrier concentrations to the density of states and the Fermi level:

### Electron Concentration
$n = N_c e^{-(E_c - E_F)/kT}$

### Hole Concentration
$p = N_v e^{-(E_F - E_v)/kT}$

Where:
- $E_c$ is the conduction band energy
- $E_v$ is the valence band energy

### Intrinsic Carrier Concentration
$n_i = \sqrt{N_c N_v} e^{-E_g/2kT}$

Where $E_g$ is the band gap energy.

These equations are fundamental for calculating carrier concentrations under various conditions.

## 11. Temperature Effects

Temperature significantly affects carrier concentrations in semiconductors:

- Higher temperatures increase intrinsic carrier concentration
- This is due to increased thermal energy allowing more electrons to jump from the valence to the conduction band
- The temperature dependence is exponential, as seen in the carrier concentration equations
- At high temperatures, intrinsic carriers can become significant even in doped semiconductors

## 12. Ionization of Dopants

Not all dopant atoms are ionized (active) at room temperature. The ionization depends on temperature and dopant energy levels:

### For n-type semiconductors
$N_D^+ = \frac{N_D}{1 + 2e^{(E_F - E_D)/kT}}$

### For p-type semiconductors
$N_A^- = \frac{N_A}{1 + 4e^{(E_A - E_F)/kT}}$

Where:
- $N_D^+$ is the concentration of ionized donors
- $N_A^-$ is the concentration of ionized acceptors
- $E_D$ and $E_A$ are the donor and acceptor energy levels

These equations show that dopant ionization increases with temperature and depends on the position of the Fermi level.

## 13. Degenerate Semiconductors

When doping levels are very high, semiconductors can enter a state called degeneracy:

- The Fermi level can enter the conduction band (for n-type) or valence band (for p-type)
- Classical statistics (Boltzmann approximation) no longer apply
- Quantum effects become important, and the full Fermi-Dirac statistics must be used
- Degenerate semiconductors behave more like metals in some respects

## 14. Carrier Concentration Dependence

Carrier concentration depends on several interrelated factors:

- **Doping type and concentration**: Determines the number of additional carriers
- **Temperature**: Affects intrinsic carrier concentration and dopant ionization
- **Material properties**: Band gap and effective masses influence the density of states
- **Applied electric fields or light**: Can create non-equilibrium carrier concentrations
