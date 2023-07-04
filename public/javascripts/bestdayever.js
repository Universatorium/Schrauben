// Bester Verkaufstag insgesamt: Identifiziert und zeigt den Tag mit den höchsten Gesamtverkaufszahlen an.

function drawTop3SchraubenChart(bestdayever) {
  new Chart(document.getElementById('bestdayever'), {
    type: 'line',
    data: {
      labels: bestdayeverData.map(schraube => schraube.Schraube),
      datasets: [{
        label: 'Bester Verkaufstag insgesamt',
        data: bestdayeverData.map(schraube => schraube.VerkaufteMenge),
        backgroundColor: [
          "Red", "Blue", "Yellow"
        ],
        borderWidth: 3

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