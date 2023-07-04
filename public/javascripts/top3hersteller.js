// Top 3 Hersteller: Präsentiert die drei Hersteller mit den höchsten Verkaufszahlen.

function drawTop3HerstellerChart(topHerstellerData) {
  new Chart(document.getElementById('top3hersteller'), {
    type: 'bar',
    data: {
      labels: topSchraubenData.map(schraube => schraube.Schraube),
      datasets: [{
        label: 'Top 3 Hersteller',
        data: topHerstellerData.map(schraube => schraube.VerkaufteMenge),
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
}   