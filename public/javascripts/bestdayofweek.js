// Durchschnittlich beste Verkaufstag pro Woche: Ermittelt und visualisiert den Wochentag, 
// an dem im Durchschnitt die besten Verkaufszahlen erzielt werden.

function drawBestDayOfWeekChart(data) {
  new Chart(document.getElementById('bestDayOfWeek'), {
    type: 'bar',
    data: {
      labels: ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'],
      datasets: [{
        label: 'Durchschnittlicher Verkauf pro Wochentag',
        data: data.map(day => day.averageSales),
        backgroundColor: 'Blue',
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