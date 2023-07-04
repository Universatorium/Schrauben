function drawTop3HerstellerChart(data) {
  new Chart(document.getElementById('top3Hersteller'), {
    type: 'bar',
    data: {
      labels: data.map(schraube => schraube.Hersteller),
      datasets: [{
        label: 'Top 3 Hersteller',
        data: data.map(schraube => schraube.VerkaufteMenge),
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