// Gesamtumsatz pro Hersteller für einen Monat: 
// Präsentiert den Gesamtumsatz eines Herstellers für einen ausgewählten Monat.

function drawgsmth(data) {
  new Chart(document.getElementById('gsmth'), {
    type: 'bar',
    data: {
      labels: data.map(day => day.label),
      datasets: [{
        label: 'Gesamtumsatz pro Hersteller für einen Monat',
        data: data.map(day => day.totalSales),
        backgroundColor: [
          "Red", "Blue", "Yellow"
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
}
