class UnitConverter {
    constructor() {
        this.conversionFactors = {
            longueur: {
                pouce: { millimetre: 25.4, centimetre: 2.54, metre: 0.0254, kilometre: 0.0000254 },
                pied: { millimetre: 304.8, centimetre: 30.48, metre: 0.3048, kilometre: 0.0003048 },
                yard: { millimetre: 914.4, centimetre: 91.44, metre: 0.9144, kilometre: 0.0009144 },
                mile: { millimetre: 1609344, centimetre: 160934.4, metre: 1609.344, kilometre: 1.609344 }
            },
            superficie: {
                'pouce²': { 'mm²': 645.16, 'cm²': 6.4516, 'm²': 0.00064516, 'km²': 6.4516e-10 },
                'pied²': { 'mm²': 92903.04, 'cm²': 929.0304, 'm²': 0.09290304, 'km²': 9.290304e-8 },
                'yard²': { 'mm²': 836127.36, 'cm²': 8361.2736, 'm²': 0.83612736, 'km²': 8.3612736e-7 },
                'mile²': { 'mm²': 2.58999e12, 'cm²': 2.58999e10, 'm²': 2589990, 'km²': 2.58999 }
            },
            volume: {
                'pouce³': { 'mm³': 16387.064, 'cm³': 16.387064, 'm³': 0.000016387064, 'L': 0.016387064 },
                'pied³': { 'mm³': 28316846.592, 'cm³': 28316.846592, 'm³': 0.028316846592, 'L': 28.316846592 },
                'yard³': { 'mm³': 764554857.984, 'cm³': 764554.857984, 'm³': 0.764554857984, 'L': 764.554857984 },
                'gallon': { 'mm³': 3785411.784, 'cm³': 3785.411784, 'm³': 0.003785411784, 'L': 3.785411784 }
            }
        };

        this.unitLabels = {
            longueur: {
                anglais: ['pouce', 'pied', 'yard', 'mile'],
                francais: ['millimetre', 'centimetre', 'metre', 'kilometre']
            },
            superficie: {
                anglais: ['pouce²', 'pied²', 'yard²', 'mile²'],
                francais: ['mm²', 'cm²', 'm²', 'km²']
            },
            volume: {
                anglais: ['pouce³', 'pied³', 'yard³', 'gallon'],
                francais: ['mm³', 'cm³', 'm³', 'L']
            }
        };

        this.initializeEventListeners();
        this.updateUnitOptions();
    }

    initializeEventListeners() {
        document.getElementById('category').addEventListener('change', () => {
            this.updateUnitOptions();
        });

        document.getElementById('convertBtn').addEventListener('click', () => {
            this.convert();
        });

        document.getElementById('value').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.convert();
            }
        });
    }

    updateUnitOptions() {
        const category = document.getElementById('category').value;
        const fromUnitSelect = document.getElementById('fromUnit');
        const toUnitSelect = document.getElementById('toUnit');

        fromUnitSelect.innerHTML = '';
        toUnitSelect.innerHTML = '';

        this.unitLabels[category].anglais.forEach(unit => {
            const option = document.createElement('option');
            option.value = unit;
            option.textContent = this.getUnitDisplayName(unit, 'anglais');
            fromUnitSelect.appendChild(option);
        });

        this.unitLabels[category].francais.forEach(unit => {
            const option = document.createElement('option');
            option.value = unit;
            option.textContent = this.getUnitDisplayName(unit, 'francais');
            toUnitSelect.appendChild(option);
        });
    }

    getUnitDisplayName(unit, type) {
        const displayNames = {
            'pouce': 'Pouce (inch)',
            'pied': 'Pied (foot)',
            'yard': 'Yard',
            'mile': 'Mile',
            'pouce²': 'Pouce carré (sq in)',
            'pied²': 'Pied carré (sq ft)',
            'yard²': 'Yard carré (sq yd)',
            'mile²': 'Mile carré (sq mi)',
            'pouce³': 'Pouce cube (cu in)',
            'pied³': 'Pied cube (cu ft)',
            'yard³': 'Yard cube (cu yd)',
            'gallon': 'Gallon US',
            'millimetre': 'Millimètre',
            'centimetre': 'Centimètre',
            'metre': 'Mètre',
            'kilometre': 'Kilomètre',
            'mm²': 'Millimètre carré',
            'cm²': 'Centimètre carré',
            'm²': 'Mètre carré',
            'km²': 'Kilomètre carré',
            'mm³': 'Millimètre cube',
            'cm³': 'Centimètre cube',
            'm³': 'Mètre cube',
            'L': 'Litre'
        };

        return displayNames[unit] || unit;
    }

    convert() {
        const category = document.getElementById('category').value;
        const fromUnit = document.getElementById('fromUnit').value;
        const toUnit = document.getElementById('toUnit').value;
        const value = parseFloat(document.getElementById('value').value);

        if (isNaN(value)) {
            this.showResult('Veuillez entrer une valeur valide');
            return;
        }

        if (this.conversionFactors[category] && 
            this.conversionFactors[category][fromUnit] && 
            this.conversionFactors[category][fromUnit][toUnit]) {
            
            const factor = this.conversionFactors[category][fromUnit][toUnit];
            const result = value * factor;
            
            this.showResult(`${value} ${this.getUnitDisplayName(fromUnit, 'anglais')} = ${result.toFixed(6)} ${this.getUnitDisplayName(toUnit, 'francais')}`);
        } else {
            this.showResult('Conversion non supportée');
        }
    }

    showResult(message) {
        document.getElementById('resultValue').textContent = message;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new UnitConverter();
});
