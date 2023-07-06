// Bester Verkaufstag insgesamt: Identifiziert und zeigt den Tag mit den höchsten Gesamtverkaufszahlen an.

function drawbestdayever(data) {
  new Chart(document.getElementById('bestdayever'), {
    type: 'bar',
    data: {
      labels: data.map(day => day.label),
      datasets: [{
        label: 'Top 3 Verkaufstage',
        data: data.map(day => day.totalSales),
        backgroundColor: [
          "Red", "Blue", "Yellow"
        ],
        borderWidth: 3

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