// Umsatz pro Schraubenart pro Hersteller pro Monat: 
// Zeigt den Umsatz für jede Schraubenart eines bestimmten Herstellers in einem ausgewählten Monat an.

function drawSchraubePerMonths(data) {
  new Chart(document.getElementById('SchraubePerMonths'), {
    type: 'line',
    data: {
      labels: data.map(day => day.datum),
      datasets: [{
        label: 'Umsatz von schraube fuer den Monat',
        data: data.map(day => day.umsatz),
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
          beginAtZero: false
        }
      }
    }
  });
}
