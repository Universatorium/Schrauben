// Durchschnittlich beste Verkaufstag pro Woche: Ermittelt und visualisiert den Wochentag, 
// an dem im Durchschnitt die besten Verkaufszahlen erzielt werden.

function drawbestdayofweek(data) {
  new Chart(document.getElementById('bestdayofweek'), {
    type: 'line',
    data: {
      labels: data.map(day => day.label),
      datasets: [{
        label: 'Durchschnittlich beste Verkaufstag pro Woche',
        data: data.map(day => day.totalSales),
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