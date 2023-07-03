// Prozentualer Anteil der Schraubenverkäufe von Hersteller X: 
// Berechnet und visualisiert den prozentualen Anteil der verkauften Schrauben,
// die von einem bestimmten Hersteller (Hersteller X) stammen.



const hs = document.getElementById('polarChart');

new Chart(hs, {
  type: 'doughnut',
  data: {
    labels: [
      'Sechskantschraube', 'Holzschraube', 'Maschinenschraube', 'Universalschraube', 'Senkkopfschraube',
      'Zylinderschraube', 'Betonschraube', 'Tellerkopfschraube' 
  ],
    datasets: [{
      label: 'Prozentualer Anteil', 
      data: [12, 19, 13, 15, 20, 18, 10, 14],
      borderWidth: 2
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