// Durchschnittlich beste Verkaufstag pro Woche: Ermittelt und visualisiert den Wochentag, 
// an dem im Durchschnitt die besten Verkaufszahlen erzielt werden.

function drawBestDayOfWeekChart(data) {
  new Chart(document.getElementById('bestDayOfWeek'), {
    type: 'line',
    data: {
      labels: ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'],
      datasets: [{
        label: 'Durchschnittlicher Verkauf pro Wochentag',
        data: data.map(day => day.averageSales),
        backgroundColor: 'rgba(0, 0, 255, 0.5)',
        borderWidth: 3,
        fill: 'start'
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