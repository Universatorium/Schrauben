// Menge pro Schraubenart pro Monat: Zeigt die Menge für jede Schraubenart in einem ausgewählten Monat an.

function drawschraubenart(data) {
  new Chart(document.getElementById('schraubenart'), {
    type: 'bar',
    data: {
      labels: data.map(schraube => schraube._id),
      datasets: [{
        label: 'Anzahl verkaufter Schrauben',
        data: data.map(schraube => schraube.count),
        backgroundColor: [
          "rgba(255, 0, 0, 0.8)",
          "rgba(0, 0, 255, 0.8)",
          "rgba(255, 255, 0, 0.8)",
          "rgba(0, 128, 0, 0.8)",
          "rgba(128, 128, 128, 0.8)",
          "rgba(255, 0, 255, 0.8)",
          "rgba(255, 165, 0, 0.8)",
          "rgba(165, 42, 42, 0.8)"
        ],
        borderColor: [
          "rgb(255, 0, 0)",
          "rgb(0, 0, 255)",
          "rgb(255, 255, 0)",
          "rgb(0, 128, 0)",
          "rgb(128, 128, 128)",
          "rgb(255, 0, 255)",
          "rgb(255, 165, 0)",
          "rgb(165, 42, 42)"
        ],
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
          
          min:25000,
          beginAtZero:false
        }
      },
      animation:{
        duration:3000,
        easing:'easeInOutQuart'
      }
    }
   });
}
