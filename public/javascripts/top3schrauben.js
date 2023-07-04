function drawTop3SchraubenChart(topSchraubenData) {
  new Chart(document.getElementById('top3schrauben'), {
    type: 'bar',
    data: {
      labels: topSchraubenData.map(schraube => schraube.Schraube),
      datasets: [{
        label: 'Top 3 Schrauben',
        data: topSchraubenData.map(schraube => schraube.VerkaufteMenge),
        backgroundColor: ['Magenta', 'Green', 'Orange'],
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
