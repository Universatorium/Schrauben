function drawwuerthdetails(data) {
    new Chart(document.getElementById('wuerthdetails'), {
      type: 'radar',
      data: {
        labels: data.map(day => day.label),
        datasets: [{
          label: 'Wuerth',
          data: data.map(day => day.totalSales),
          fill: true,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgb(255, 99, 132)',
          pointBackgroundColor: 'rgb(255, 99, 132)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(255, 99, 132)',
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
  