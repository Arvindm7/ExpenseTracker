import React from 'react';
import { Chart as ChartJs, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { Line } from 'react-chartjs-2';
import styled, { useTheme } from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
import { dateFormat } from '../../utils/dateFormat';

ChartJs.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

function Chart() {
    const { incomes, expenses } = useGlobalContext();
    const theme = useTheme();

    const textColor = theme.textSecondary;
    const mutedColor = theme.textMuted;
    const gridColor = theme.gridColor;

    const allTransactions = [...incomes, ...expenses].sort((a, b) => new Date(a.date) - new Date(b.date));
    const uniqueDates = [...new Set(allTransactions.map(item => dateFormat(item.date)))];

    const incomeData = uniqueDates.map(date => {
        return incomes
            .filter(item => dateFormat(item.date) === date)
            .reduce((sum, item) => sum + item.amount, 0);
    });

    const expenseData = uniqueDates.map(date => {
        return expenses
            .filter(item => dateFormat(item.date) === date)
            .reduce((sum, item) => sum + item.amount, 0);
    });

    const data = {
        labels: uniqueDates,
        datasets: [
            {
                label: 'Income',
                data: incomeData,
                borderColor: '#42AD00',
                backgroundColor: 'rgba(66, 173, 0, 0.08)',
                tension: 0.4,
                fill: true,
                pointBackgroundColor: '#42AD00',
                pointBorderColor: theme.bgCard,
                pointBorderWidth: 2,
                pointRadius: 4,
                pointHoverRadius: 6,
                borderWidth: 2.5,
            },
            {
                label: 'Expenses',
                data: expenseData,
                borderColor: '#E74C3C',
                backgroundColor: 'rgba(231, 76, 60, 0.08)',
                tension: 0.4,
                fill: true,
                pointBackgroundColor: '#E74C3C',
                pointBorderColor: theme.bgCard,
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
                    color: textColor,
                }
            },
            tooltip: {
                backgroundColor: theme.name === 'dark' ? 'rgba(22, 33, 62, 0.95)' : 'rgba(34, 34, 96, 0.9)',
                titleColor: '#fff',
                bodyColor: '#fff',
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
                    color: mutedColor,
                }
            },
            y: {
                grid: {
                    color: gridColor,
                    drawBorder: false,
                },
                ticks: {
                    font: {
                        family: "'Nunito', sans-serif",
                        size: 11,
                    },
                    color: mutedColor,
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
    background: ${({ theme }) => theme.bgCard};
    border: 2px solid ${({ theme }) => theme.borderColor};
    box-shadow: ${({ theme }) => theme.shadow};
    padding: 1rem;
    border-radius: 20px;
    height: 100%;
    transition: background 0.3s ease, border-color 0.3s ease;
`;

export default Chart;
