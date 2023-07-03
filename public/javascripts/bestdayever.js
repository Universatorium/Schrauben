// Bester Verkaufstag insgesamt: Identifiziert und zeigt den Tag mit den höchsten Gesamtverkaufszahlen an.

const bde = document.getElementById('bestdayever');

new Chart(bde, {
  type: 'line',
  data: {
    labels: ['Datum XY', 'Datum X', 'Datum Y', 'Datum XYz', 'Datum XYZ', 'Datum WXY', 'Datum XY',],
    datasets: [{
      label: 'Bester Verkaufstag insgesamt',
      data: [19,20,22,29,35,45,26],
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