function drawTop3SchraubenChart(data) {
  new Chart(document.getElementById('top3Schrauben'), {
    type: 'doughnut',
    data: {
      labels: data.map(schraube => schraube.Schraube),
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
          beginAtZero: false
        }
      }
    }
  });
}
