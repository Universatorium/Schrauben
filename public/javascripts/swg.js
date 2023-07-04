function drawswgdetails(data) {
    new Chart(document.getElementById('swgdetails'), {
      type: 'radar',
      data: {
        labels: data.map(day => day.label),
        datasets: [{
          label: 'SWG',
          data: data.map(day => day.totalSales),
          fill: true,
          backgroundColor: 'rgba(500, 100, 235, 0.2)',
          borderColor: 'rgb(500, 100, 235)',
          pointBackgroundColor: 'rgb(500, 100, 235)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(54, 100, 235)'
  
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
  