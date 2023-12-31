const image = new Image();
image.src = 'https://www.chartjs.org/img/chartjs-logo.svg';

const plugin = {
  id: 'customCanvasBackgroundImage',
  beforeDraw: (chart) => {
    if (image.complete) {
      const ctx = chart.ctx;
      const {top, left, width, height} = chart.chartArea;
      const x = left + width / 2 - image.width / 2;
      const y = top + height / 2 - image.height / 2;
      ctx.drawImage(image, x, y);
    } else {
      image.onload = () => chart.draw();
    }
  }
};



function drawTop3SchraubenChart(data) {
  new Chart(document.getElementById('top3Schrauben'), {
    type: 'doughnut',
    data: {
      labels: data.map(schraube => schraube.Schraube),
      datasets: [{
        label: 'Top 3 Schrauben',
        data: data.map(schraube => schraube.VerkaufteMenge),
        backgroundColor: [
          "rgba(255, 0, 255, 0.8)",
          "rgba(0, 128, 0, 0.8)",
          "rgba(255, 165, 0, 0.8)"
        ],
        borderColor: [
          "rgb(255, 0, 255)",
          "rgb(0, 128, 0)",
          "rgb(255, 165, 0)"
        ],
        borderWidth: 1,
        hoverOffset: 40
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      },
      animation: {
        duration: 3000,
        easing: 'easeInOutCubic'
      }
    }
  });
}
