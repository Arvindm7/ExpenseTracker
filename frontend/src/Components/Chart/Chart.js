import React from 'react';
import { Chart as ChartJs, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { Line } from 'react-chartjs-2';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
import { dateFormat } from '../../utils/dateFormat';

ChartJs.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

function Chart() {
    const { incomes, expenses } = useGlobalContext();

    const data = {
        labels: incomes.map((inc) => {
            const { date } = inc;
            return dateFormat(date);
        }),
        datasets: [
            {
                label: 'Income',
                data: incomes.map((income) => income.amount),
                borderColor: '#42AD00',
                backgroundColor: 'rgba(66, 173, 0, 0.08)',
                tension: 0.4,
                fill: true,
                pointBackgroundColor: '#42AD00',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 4,
                pointHoverRadius: 6,
                borderWidth: 2.5,
            },
            {
                label: 'Expenses',
                data: expenses.map((expense) => expense.amount),
                borderColor: '#E74C3C',
                backgroundColor: 'rgba(231, 76, 60, 0.08)',
                tension: 0.4,
                fill: true,
                pointBackgroundColor: '#E74C3C',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 4,
                pointHoverRadius: 6,
                borderWidth: 2.5,
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                align: 'end',
                labels: {
                    usePointStyle: true,
                    pointStyle: 'circle',
                    padding: 16,
                    font: {
                        family: "'Nunito', sans-serif",
                        size: 12,
                        weight: 600,
                    },
                    color: 'rgba(34, 34, 96, 0.7)',
                }
            },
            tooltip: {
                backgroundColor: 'rgba(34, 34, 96, 0.9)',
                titleFont: {
                    family: "'Nunito', sans-serif",
                    size: 13,
                },
                bodyFont: {
                    family: "'Nunito', sans-serif",
                    size: 12,
                },
                padding: 12,
                cornerRadius: 10,
                callbacks: {
                    label: function(context) {
                        return ` ${context.dataset.label}: ₹${context.parsed.y.toLocaleString('en-IN')}`;
                    }
                }
            }
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    font: {
                        family: "'Nunito', sans-serif",
                        size: 11,
                    },
                    color: 'rgba(34, 34, 96, 0.4)',
                }
            },
            y: {
                grid: {
                    color: 'rgba(34, 34, 96, 0.06)',
                    drawBorder: false,
                },
                ticks: {
                    font: {
                        family: "'Nunito', sans-serif",
                        size: 11,
                    },
                    color: 'rgba(34, 34, 96, 0.4)',
                    callback: function(value) {
                        return '₹' + value.toLocaleString('en-IN');
                    }
                }
            }
        },
        interaction: {
            intersect: false,
            mode: 'index',
        }
    };

    return (
        <ChartStyled>
            <Line data={data} options={options} />
        </ChartStyled>
    );
}

const ChartStyled = styled.div`
    background: #FCF6F9;
    border: 2px solid #FFFFFF;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    padding: 1rem;
    border-radius: 20px;
    height: 100%;
`;

export default Chart;
