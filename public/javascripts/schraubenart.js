// Menge pro Schraubenart pro Monat: Zeigt die Menge für jede Schraubenart in einem ausgewählten Monat an.

function drawschraubenart(data) {
  new Chart(document.getElementById('schraubenart'), {
    type: 'bar',
    data: {
      labels: data.map(schraube => schraube._id),
      datasets: [{
        label: 'Anzahl verkaufter Schrauben',
        data: data.map(schraube => schraube.count),
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
  