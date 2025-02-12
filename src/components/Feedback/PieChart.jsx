// PieChart.js
import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

// Register required Chart.js components and plugins
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const PieChart = () => {
  // Data for the pie chart
  const data = {
    labels: [
      'Received a link from the Gas Safe Charity',
      'My employer shared it with me',
      'I was told about it by another organisation I work with',
      'Searched App Store/Play Store',
      'Search engine e.g. Google',
      'Social media',
      'Other',
    ],
    datasets: [
      {
        label: 'App discovery',
        data: [12, 19, 3, 5, 2, 3, 1],
        backgroundColor: [
          '#6200EE',
          '#26A69A',
          '#EE6002',
          '#FFC107',
          '#A4FF07',
          '#07B5FF',
          '#FF2007',
        ],
        borderColor: [
          '#6200EE',
          '#26A69A',
          '#EE6002',
          '#FFC107',
          '#A4FF07',
          '#07B5FF',
          '#FF2007',
        ],
        borderWidth: 1, // Increase this value to add space between segments
        hoverOffset: 10, // Adds space when hovering over a segment
      },
    ],
  };

  // Options for the pie chart
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      tooltip: {
        enabled: true,
      },
      datalabels: {
        color: '#fff',
        formatter: (value, ctx) => {
          let total = ctx.dataset.data.reduce((acc, val) => acc + val, 0);
          let percentage = ((value / total) * 100).toFixed(1) + '%';
          return percentage;
        },
        font: {
          weight: 'bold',
        },
      },
    },
  };

  return <Pie data={data} options={options} />;
};

export default PieChart;
