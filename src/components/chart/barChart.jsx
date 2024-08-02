import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { Bar } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);
export default function BarChartComponent({data, labels, label}) {
  const chartData = {
    labels: data.map(item => `Tháng ${item.label}`), // X-axis labels
    datasets: [
        {
            label: label,
            data: data.map(item => item.value), // Data points
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
        },
    ],
};

// Chart options
// const options = {
//     responsive: true,
//     plugins: {
//         legend: {
//             position: 'top',
//         },
//         tooltip: {
//             callbacks: {
//                 label: function(context) {
//                     let label = context.dataset.label || '';
//                     if (label) {
//                         label += ': ';
//                     }
//                     if (context.parsed.y !== null) {
//                         label += context.parsed.y + ' kWh';
//                     }
//                     return label;
//                 }
//             }
//         }
//     },
//     scales: {
//         x: {
//             beginAtZero: true,
//         },
//         y: {
//             beginAtZero: true,
//         },
//     },
// };

return (
    <div>
        <Bar data={chartData} />
    </div>
);
}