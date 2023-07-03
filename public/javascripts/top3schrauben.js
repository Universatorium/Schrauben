function drawTop3SchraubenChart(topSchraubenData) {
  const top3schraubenChart = new Chart(document.getElementById('top3schrauben'), {
    type: 'bar',
    data: {
      labels: topSchraubenData.map(schraube => schraube.Schraube),
      datasets: [{
        label: 'Top 3 Schrauben',
        data: topSchraubenData.map(schraube => schraube.VerkaufteMenge),
        backgroundColor: ['Red', 'Blue', 'Yellow'],
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
