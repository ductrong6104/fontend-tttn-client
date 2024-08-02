import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);
export default function PieChartComponent({data, labels, label}) {
    const pieData = {
        labels: labels,
        datasets: [
          {
            label: label,
            data: data.map(item => item.value),
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
            hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
          },
        ],
      };
    return(
        <div style={{ width: '100%'}}>
        <h3>Biểu đồ hình tròn</h3>
        <Pie data={pieData} />
      </div>
    )
}