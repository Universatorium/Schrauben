function drawdetails(data,hersteller) {
  new Chart(document.getElementById(hersteller), {
    type: 'radar',
    data: {
      labels: data.map(schraube => schraube.schraubenart),
      datasets: [{
        label: 'prozentualer Anteil an monatlichen Verkäufen',
        data: data.map(schraube => schraube.percentage),
        fill: true,
        backgroundColor: 'rgba(54, 162, 135, 0.2)',
        borderColor: 'rgb(54, 162, 235)',
        pointBackgroundColor: 'rgb(54, 162, 235)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(54, 162, 235)'
      }]
    },
    options: {
      animations: {
        tension: {
          duration: 1000,
          easing: 'linear',
          from: 1,
          to: 0,
          loop: false
        }
      },
      layout: {
        padding: {
            left: 50
        }
    },
      animation: {
        duration: 2000,
        easing: 'easeOutBounce'
      },
      scales: {
        r: {
          beginAtZero: true
        }
      }
    }
  });
}
