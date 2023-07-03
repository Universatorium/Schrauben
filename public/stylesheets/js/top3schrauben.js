// Top 3 Schrauben: Zeigt die drei Schraubenarten, die die höchsten Verkaufszahlen aufweisen.

const tops = document.getElementById('top3schrauben');

new Chart(tops, {
  type: 'bar',
  data: {
    labels: ['Sechskantschraube', 'Holzschraube', 'Maschinenschraube'],
    datasets: [{
      label: 'Top 3 Schrauben',
      data: [12, 19, 13],
      backgroundColor: [
        "Red", "Blue", "Yellow"
      ],
      borderWidth: 1

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
  