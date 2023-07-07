// Prozentualer Anteil der Schraubenverkäufe von Hersteller X: 
// Berechnet und visualisiert den prozentualen Anteil der verkauften Schrauben,
// die von einem bestimmten Hersteller (Hersteller X) stammen.


function drawHerstellerSchrauben(data) {
  new Chart(document.getElementById('HerstellerSchrauben'), {
    type: 'doughnut',
    data: {
      labels: data.map(day => day.label),
      datasets: [{
        label: 'Prozentualer Anteil', 
        data: data.map(day => day.totalSales),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
        borderWidth: 2,
        hoverOffset: 40
      }]
    },
    options: {
      animation: {
        animateRotate: true,
        animateScale: true
      },
      scales: {
        y: {
          beginAtZero: false
        }
      }
    }
  });
}
