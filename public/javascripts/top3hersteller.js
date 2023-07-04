// Top 3 Hersteller: Präsentiert die drei Hersteller mit den höchsten Verkaufszahlen.

const bc = document.getElementById('top3hersteller');

new Chart(bc, {
  type: 'bar',
  data: {
    labels: ['Wuerth', 'HECO', 'SWG'],
    datasets: [{
      label: 'Top 3 Hersteller',
      data: [17, 14, 12],
      backgroundColor: [
        "Red", "Blue", "Yellow"
      ],
      borderWidth: 1

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