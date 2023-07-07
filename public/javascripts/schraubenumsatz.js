// Umsatz pro Schraubenart pro Monat: Zeigt den Umsatz für jede Schraubenart in einem ausgewählten Monat an.

function drawschraubenumsatz(data) {
  new Chart(document.getElementById('schraubenumsatz'), {
    type: 'bar',
    data: {
      labels: data.map(schraube => schraube.schraubenart),
      datasets: [{
        label: 'Umsatz je Schraubentyp',
        data: data.map(schraube => schraube.gesamtumsatz),
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
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          min:30000,
          beginAtZero: false
        }
      }
    }
  });
}
  