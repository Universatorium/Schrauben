// Umsatz pro Schraubenart pro Monat: Zeigt den Umsatz für jede Schraubenart in einem ausgewählten Monat an.

function drawschraubenumsatz(data) {
  new Chart(document.getElementById('schraubenumsatz'), {
    type: 'bar',
    data: {
      labels: data.map(schraube => schraube.schraubenart),
      datasets: [{
        label: 'Umsatz je Schraubentyp',
        data: data.map(schraube => schraube.gesamtumsatz),
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
  