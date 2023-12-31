// Umsatz pro Schraubenart pro Hersteller pro Monat: 
// Zeigt den Umsatz für jede Schraubenart eines bestimmten Herstellers in einem ausgewählten Monat an.

function drawSchraubePerMonths(data) {
  new Chart(document.getElementById('SchraubePerMonths'), {
    type: 'line',
    data: {
      labels: data.map(day => day.datum),
      datasets: [{
        label: 'Umsatz pro Tag',
        data: data.map(day => day.umsatz),
        fill: true,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgb(54, 162, 235)',
        pointBackgroundColor: 'rgb(54, 162, 235)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(54, 162, 235)',
        borderWidth:1
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
      scales: {
        y: {
          beginAtZero:false
        }
      },
      animation:{
        duration:3000,
        easing:'easeInOutQuint'
      }
    }
  });
}
