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
        borderWidth: 2
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