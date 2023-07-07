// Bester Verkaufstag insgesamt: Identifiziert und zeigt den Tag mit den höchsten Gesamtverkaufszahlen an.

function drawbestdayever(data) {
  new Chart(document.getElementById('bestdayever'), {
    type: 'bar',
    data: {
      labels: data.map(day => day.label),
      datasets: [{
        label: 'Top 3 Verkaufstage',
        data: data.map(day => day.totalSales),
        backgroundColor: [
          "rgba(54, 162, 235, 0.8)",
          "rgba(255, 99, 132, 0.8)",
          "rgba(255, 206, 86, 0.8)"
        ],
        borderColor: [
          "rgb(54, 162, 235)",
          "rgb(255, 99, 132)",
          "rgb(255, 206, 86)"
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          min:25000,
          beginAtZero: false
        }
      },
      animation: {
        duration: 2000,
        easing: 'easeOutBounce'
      },
    }
  });
}
