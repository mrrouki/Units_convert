import React, { useState } from 'react'
import { Ruler, Square, Cube, Calculator, ArrowRightLeft, Zap } from 'lucide-react'

const UnitConverter = () => {
  const [category, setCategory] = useState('longueur')
  const [fromUnit, setFromUnit] = useState('pouce')
  const [toUnit, setToUnit] = useState('metre')
  const [value, setValue] = useState('')
  const [result, setResult] = useState('')
  const [history, setHistory] = useState([])

  const conversionFactors = {
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
  }

  const unitLabels = {
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
  }

  const getUnitDisplayName = (unit) => {
    const displayNames = {
      'pouce': { name: 'Pouce', symbol: 'in', system: 'anglais' },
      'pied': { name: 'Pied', symbol: 'ft', system: 'anglais' },
      'yard': { name: 'Yard', symbol: 'yd', system: 'anglais' },
      'mile': { name: 'Mile', symbol: 'mi', system: 'anglais' },
      'pouce²': { name: 'Pouce carré', symbol: 'in²', system: 'anglais' },
      'pied²': { name: 'Pied carré', symbol: 'ft²', system: 'anglais' },
      'yard²': { name: 'Yard carré', symbol: 'yd²', system: 'anglais' },
      'mile²': { name: 'Mile carré', symbol: 'mi²', system: 'anglais' },
      'pouce³': { name: 'Pouce cube', symbol: 'in³', system: 'anglais' },
      'pied³': { name: 'Pied cube', symbol: 'ft³', system: 'anglais' },
      'yard³': { name: 'Yard cube', symbol: 'yd³', system: 'anglais' },
      'gallon': { name: 'Gallon US', symbol: 'gal', system: 'anglais' },
      'millimetre': { name: 'Millimètre', symbol: 'mm', system: 'francais' },
      'centimetre': { name: 'Centimètre', symbol: 'cm', system: 'francais' },
      'metre': { name: 'Mètre', symbol: 'm', system: 'francais' },
      'kilometre': { name: 'Kilomètre', symbol: 'km', system: 'francais' },
      'mm²': { name: 'Millimètre carré', symbol: 'mm²', system: 'francais' },
      'cm²': { name: 'Centimètre carré', symbol: 'cm²', system: 'francais' },
      'm²': { name: 'Mètre carré', symbol: 'm²', system: 'francais' },
      'km²': { name: 'Kilomètre carré', symbol: 'km²', system: 'francais' },
      'mm³': { name: 'Millimètre cube', symbol: 'mm³', system: 'francais' },
      'cm³': { name: 'Centimètre cube', symbol: 'cm³', system: 'francais' },
      'm³': { name: 'Mètre cube', symbol: 'm³', system: 'francais' },
      'L': { name: 'Litre', symbol: 'L', system: 'francais' }
    }
    return displayNames[unit] || { name: unit, symbol: unit, system: 'unknown' }
  }

  const convert = () => {
    const numValue = parseFloat(value)
    if (isNaN(numValue)) {
      setResult('Veuillez entrer une valeur valide')
      return
    }

    if (conversionFactors[category] && 
        conversionFactors[category][fromUnit] && 
        conversionFactors[category][fromUnit][toUnit]) {
      
      const factor = conversionFactors[category][fromUnit][toUnit]
      const convertedValue = numValue * factor
      
      const fromUnitInfo = getUnitDisplayName(fromUnit)
      const toUnitInfo = getUnitDisplayName(toUnit)
      
      const resultText = `${numValue} ${fromUnitInfo.symbol} = ${convertedValue.toLocaleString('fr-FR', { maximumFractionDigits: 6 })} ${toUnitInfo.symbol}`
      setResult(resultText)
      
      // Add to history
      const newHistory = [
        {
          from: `${numValue} ${fromUnitInfo.symbol}`,
          to: `${convertedValue.toLocaleString('fr-FR', { maximumFractionDigits: 6 })} ${toUnitInfo.symbol}`,
          category: category,
          timestamp: new Date().toLocaleTimeString('fr-FR')
        },
        ...history.slice(0, 4)
      ]
      setHistory(newHistory)
    } else {
      setResult('Conversion non supportée')
    }
  }

  const swapUnits = () => {
    setFromUnit(toUnit)
    setToUnit(fromUnit)
  }

  const clearAll = () => {
    setValue('')
    setResult('')
  }

  const categories = [
    { id: 'longueur', name: 'Longueur', icon: React.createElement(Ruler, { className: "w-5 h-5" }) },
    { id: 'superficie', name: 'Superficie', icon: React.createElement(Square, { className: "w-5 h-5" }) },
    { id: 'volume', name: 'Volume', icon: React.createElement(Cube, { className: "w-5 h-5" }) }
  ]

  return React.createElement('div', { className: "min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4" },
    React.createElement('div', { className: "max-w-6xl mx-auto" },
      // Header
      React.createElement('div', { className: "text-center mb-12" },
        React.createElement('div', { className: "flex items-center justify-center gap-3 mb-4" },
          React.createElement('div', { className: "p-3 bg-white rounded-2xl shadow-lg" },
            React.createElement(Zap, { className: "w-8 h-8 text-indigo-600" })
          ),
          React.createElement('h1', { className: "text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent" }, "UnitéPro")
        ),
        React.createElement('p', { className: "text-gray-600 text-lg max-w-2xl mx-auto" }, 
          "Convertisseur professionnel d'unités entre les systèmes de mesure anglais et français"
        )
      ),

      React.createElement('div', { className: "grid lg:grid-cols-3 gap-8" },
        // Main Converter
        React.createElement('div', { className: "lg:col-span-2" },
          React.createElement('div', { className: "bg-white rounded-3xl shadow-xl p-8" },
            // Category Selector
            React.createElement('div', { className: "mb-8" },
              React.createElement('label', { className: "block text-sm font-semibold text-gray-700 mb-4" }, "Sélectionnez la catégorie"),
              React.createElement('div', { className: "grid grid-cols-3 gap-4" },
                categories.map((cat) => 
                  React.createElement('button', {
                    key: cat.id,
                    onClick: () => setCategory(cat.id),
                    className: `p-4 rounded-2xl border-2 transition-all duration-200 ${
                      category === cat.id
                        ? 'border-indigo-500 bg-indigo-50 text-indigo-700 shadow-md'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-600'
                    }`
                  },
                    React.createElement('div', { className: "flex items-center justify-center gap-2" },
                      cat.icon,
                      React.createElement('span', { className: "font-medium" }, cat.name)
                    )
                  )
                )
              )
            ),

            // Converter Form
            React.createElement('div', { className: "space-y-6" },
              React.createElement('div', { className: "grid md:grid-cols-2 gap-6" },
                React.createElement('div', null,
                  React.createElement('label', { className: "block text-sm font-semibold text-gray-700 mb-2" }, "Unité de départ"),
                  React.createElement('select', {
                    value: fromUnit,
                    onChange: (e) => setFromUnit(e.target.value),
                    className: "w-full p-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 bg-white"
                  },
                    unitLabels[category].anglais.map(unit => 
                      React.createElement('option', { key: unit, value: unit },
                        `${getUnitDisplayName(unit).name} (${getUnitDisplayName(unit).symbol})`
                      )
                    )
                  )
                ),

                React.createElement('div', null,
                  React.createElement('label', { className: "block text-sm font-semibold text-gray-700 mb-2" }, "Unité d'arrivée"),
                  React.createElement('select', {
                    value: toUnit,
                    onChange: (e) => setToUnit(e.target.value),
                    className: "w-full p-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 bg-white"
                  },
                    unitLabels[category].francais.map(unit => 
                      React.createElement('option', { key: unit, value: unit },
                        `${getUnitDisplayName(unit).name} (${getUnitDisplayName(unit).symbol})`
                      )
                    )
                  )
                )
              ),

              // Value Input
              React.createElement('div', null,
                React.createElement('label', { className: "block text-sm font-semibold text-gray-700 mb-2" }, "Valeur à convertir"),
                React.createElement('input', {
                  type: "number",
                  value: value,
                  onChange: (e) => setValue(e.target.value),
                  placeholder: "Entrez la valeur...",
                  className: "w-full p-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 bg-white text-lg"
                })
              ),

              // Action Buttons
              React.createElement('div', { className: "flex gap-4 pt-4" },
                React.createElement('button', {
                  onClick: convert,
                  className: "flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                }, "Convertir"),
                React.createElement('button', {
                  onClick: swapUnits,
                  className: "p-4 border-2 border-gray-200 rounded-xl hover:border-indigo-300 hover:bg-indigo-50 transition-all duration-200",
                  title: "Échanger les unités"
                }, React.createElement(ArrowRightLeft, { className: "w-6 h-6 text-gray-600" })),
                React.createElement('button', {
                  onClick: clearAll,
                  className: "p-4 border-2 border-gray-200 rounded-xl hover:border-red-300 hover:bg-red-50 transition-all duration-200"
                }, React.createElement('span', { className: "text-red-600 font-medium" }, "Effacer"))
              ),

              // Result
              result && React.createElement('div', { className: "mt-6 p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl" },
                React.createElement('div', { className: "flex items-center gap-3" },
                  React.createElement(Calculator, { className: "w-6 h-6 text-green-600" }),
                  React.createElement('h3', { className: "text-lg font-semibold text-gray-800" }, "Résultat")
                ),
                React.createElement('p', { className: "mt-2 text-2xl font-bold text-green-700" }, result)
              )
            )
          )
        ),

        // Sidebar
        React.createElement('div', { className: "space-y-8" },
          // History
          React.createElement('div', { className: "bg-white rounded-3xl shadow-xl p-6" },
            React.createElement('h3', { className: "text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2" },
              React.createElement('span', null, "Historique récent")
            ),
            React.createElement('div', { className: "space-y-3" },
              history.length === 0 ? 
                React.createElement('p', { className: "text-gray-500 text-center py-4" }, "Aucune conversion récente") :
                history.map((item, index) => 
                  React.createElement('div', { key: index, className: "p-3 bg-gray-50 rounded-xl border border-gray-200" },
                    React.createElement('div', { className: "flex justify-between items-start" },
                      React.createElement('div', null,
                        React.createElement('div', { className: "font-medium text-gray-800" }, item.from),
                        React.createElement('div', { className: "text-green-600 font-semibold" }, item.to)
                      ),
                      React.createElement('span', { className: "text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full" }, item.timestamp)
                    )
                  )
                )
            )
          ),

          // Quick Info
          React.createElement('div', { className: "bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl shadow-xl p-6 text-white" },
            React.createElement('h3', { className: "text-lg font-semibold mb-4" }, "À propos"),
            React.createElement('p', { className: "text-indigo-100 text-sm leading-relaxed" },
              "UnitéPro convertit précisément les unités de mesure entre les systèmes anglais (impérial) et français (métrique). Idéal pour les professionnels de l'ingénierie, de la construction et de l'éducation."
            ),
            React.createElement('div', { className: "mt-4 pt-4 border-t border-indigo-400" },
              React.createElement('div', { className: "flex items-center gap-2 text-indigo-100 text-sm" },
                React.createElement('span', null, "✅ Précision scientifique")
              ),
              React.createElement('div', { className: "flex items-center gap-2 text-indigo-100 text-sm mt-2" },
                React.createElement('span', null, "⚡ Conversion instantanée")
              )
            )
          )
        )
      )
    )
  )
}

export default UnitConverter
