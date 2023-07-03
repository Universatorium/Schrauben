// Umsatz pro Schraubenart pro Monat: Zeigt den Umsatz für jede Schraubenart in einem ausgewählten Monat an.

const sa = document.getElementById('schraubenart');

new Chart(sa, {
  type: 'bar',
  data: {
    labels: [
        'Sechskantschraube', 'Holzschraube', 'Maschinenschraube', 'Universalschraube', 'Senkkopfschraube',
        'Zylinderschraube', 'Betonschraube', 'Tellerkopfschraube' 
    ],
    datasets: [{
      label: 'Monat XY',
      data: [12, 30, 55, 48, 16, 48, 47, 50],
      backgroundColor: [
        "Red", "Blue", "Yellow", "Green", "Grey", "Magenta", "Orange", "Brown"
      ],
      borderWidth: 1
    
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});
  