// Gesamtumsatz pro Hersteller für einen Monat: 
// Präsentiert den Gesamtumsatz eines Herstellers für einen ausgewählten Monat.

const gsmth = document.getElementById('gesammtprohersteller');

new Chart(gsmth, {
  type: 'bar',
  data: {
    labels: ['Wuerth', 'HECO', 'SWG'],
    datasets: [{
      label: 'Gesamtumsatz pro Hersteller für einen Monat',
      data: [12, 30, 55],
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
