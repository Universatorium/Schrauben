// Umsatz pro Schraubenart pro Hersteller pro Monat: 
// Zeigt den Umsatz für jede Schraubenart eines bestimmten Herstellers in einem ausgewählten Monat an.

const saph = document.getElementById('schraubenartprohersteller');

new Chart(saph, {
  type: 'radar',
  data: {
    labels: [
        'Sechskantschraube', 'Holzschraube', 'Maschinenschraube', 'Universalschraube', 'Senkkopfschraube',
        'Zylinderschraube', 'Betonschraube', 'Tellerkopfschraube' 
    ],
    datasets: [{
      label: 'Wuerth',
      data: [40, 30, 55, 48, 20, 48, 47, 50],
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
      data: [28, 48, 40, 25, 85, 27, 100,20],
      fill: true,
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgb(54, 162, 235)',
      pointBackgroundColor: 'rgb(54, 162, 235)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgb(54, 162, 235)'
    }, {

      label: 'SWG',
      data: [20, 50, 20, 19, 100, 20, 100, 30],
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
