function drawTop3SchraubenChart(data) {
  new Chart(document.getElementById('top3Schrauben'), {
    type: 'doughnut',
    data: {
      labels: data.map(schraube => schraube.Schraube),
      datasets: [{
        label: 'Top 3 Schrauben',
        data: data.map(schraube => schraube.VerkaufteMenge),
        backgroundColor: [
          "rgba(255, 0, 255, 0.8)",
          "rgba(0, 128, 0, 0.8)",
          "rgba(255, 165, 0, 0.8)"
        ],
        borderColor: [
          "rgb(255, 0, 255)",
          "rgb(0, 128, 0)",
          "rgb(255, 165, 0)"
        ],
        borderWidth: 1,
        hoverOffset: 40
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      },
      animation: {
        duration: 3000,
        easing: 'easeInOutCubic'
      }
    }
  });
}
