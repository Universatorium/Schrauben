// Umsatz pro Schraubenart pro Monat: Zeigt den Umsatz für jede Schraubenart in einem ausgewählten Monat an.

function drawschraubenart(data) {
  new Chart(document.getElementById('schraubenart'), {
    type: 'bar',
    data: {
      labels: data.map(day => day.label),
      datasets: [{
        label: 'Monat XY',
        data: data.map(day => day.totalSales),
        backgroundColor: [
          "Red", "Blue", "Yellow", "Green", "Grey", "Magenta", "Orange", "Brown"
        ],
        borderWidth: 1
      
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: false
        }
      }
    }
  });
}
  