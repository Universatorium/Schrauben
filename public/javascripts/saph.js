// Umsatz pro Schraubenart pro Hersteller pro Monat: 
// Zeigt den Umsatz für jede Schraubenart eines bestimmten Herstellers in einem ausgewählten Monat an.

function drawbestdayever(data) {
  new Chart(document.getElementById('bestdayever'), {
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
      }, {

        label: 'HECO',
        data: data.map(day => day.totalSales),
        fill: true,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgb(54, 162, 235)',
        pointBackgroundColor: 'rgb(54, 162, 235)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(54, 162, 235)'
      }, {

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
