import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
const transformData = (data) => {
    // Nhóm dữ liệu theo năm
    const groupedData = data.reduce((acc, item) => {
        if (!acc[item.year]) {
            acc[item.year] = [];
        }
        acc[item.year].push({
            month: item.month,
            amount: item.amount
        });
        return acc;
    }, {});

    // Chuyển đổi dữ liệu nhóm thành định dạng Chart.js
    const years = Object.keys(groupedData).map(year => parseInt(year));
    const months = Array.from(new Set(data.map(item => item.month))).sort((a, b) => a - b); // Sắp xếp tháng

    const datasets = years.map(year => {
        return {
            label: `Năm ${year}`,
            data: months.map(month => {
                // Tìm số liệu cho tháng hiện tại và năm hiện tại
                const entry = groupedData[year].find(item => item.month === month);
                return entry ? entry.amount : 0; // Nếu không có số liệu, trả về 0
            }),
            borderColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: false,
            tension: 0.1,
        };
    });

    return {
        labels: months.map(month => `Tháng ${month}`),
        datasets,
    };
};

// Ví dụ sử dụng




const MultiLineChartComponent   = ({ data, label }) => {
    const chartData = transformData(data);
    // Prepare the data for Chart.js
    

    // Chart options
   

    return (
        <div>
            <Line data={chartData} />
        </div>
    );
};

export default MultiLineChartComponent;
