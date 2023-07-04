function drawhecodetails(data) {
    new Chart(document.getElementById('hecodetails'), {
      type: 'radar',
      data: {
        labels: data.map(day => day.label),
        datasets: [{
          label: 'HECO',
          data: data.map(day => day.totalSales),
          fill: true,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgb(54, 162, 235)',
          pointBackgroundColor: 'rgb(54, 162, 235)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(54, 162, 235)'
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
  