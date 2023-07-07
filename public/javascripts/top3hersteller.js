function drawTop3HerstellerChart(data) {
  new Chart(document.getElementById('top3Hersteller'), {
    type: 'bar',
    data: {
      labels: data.map(schraube => schraube.Hersteller),
      datasets: [{
        label: 'Top 3 Hersteller',
        data: data.map(schraube => schraube.VerkaufteMenge),
        backgroundColor: [
          "rgba(54, 162, 235, 0.8)",
          "rgba(255, 99, 132, 0.8)",
          "rgba(255, 206, 86, 0.8)"
        ],
        borderColor: [
          "rgb(54, 162, 235)",
          "rgb(255, 99, 132)",
          "rgb(255, 206, 86)"
        ],
        borderWidth: 1,
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: false
        }
      },
      animation: {
        duration: 2000,
        easing: 'easeOutBounce'
      }
    }
  });
}
