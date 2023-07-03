// Durchschnittlich beste Verkaufstag pro Woche: Ermittelt und visualisiert den Wochentag, 
// an dem im Durchschnitt die besten Verkaufszahlen erzielt werden.

const bdow = document.getElementById('bestdayofweek');

new Chart(bdow, {
  type: 'line',
  data: {
    labels: ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstat', 'Freitag', 'Samstag', 'Sonntag'],
    datasets: [{
      label: 'Durchschnittlich beste Verkaufstag pro Woche',
      data: [12, 19, 13, 15, 20, 30, 10],
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