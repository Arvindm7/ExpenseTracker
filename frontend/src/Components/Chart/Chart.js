import React from 'react';
import { Chart as ChartJs, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import styled, { useTheme } from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';

ChartJs.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function Chart() {
    const { incomes, expenses } = useGlobalContext();
    const theme = useTheme();

    const textColor = theme.textSecondary;
    const mutedColor = theme.textMuted;
    const gridColor = theme.gridColor;

    // Build a { "YYYY-MM": { income, expense } } map so every month is grouped once
    const monthlyTotals = {};

    const addToMonth = (item, type) => {
        const d = new Date(item.date);
        const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;

        if (!monthlyTotals[key]) {
            monthlyTotals[key] = { income: 0, expense: 0, year: d.getFullYear(), monthIndex: d.getMonth() };
        }
        monthlyTotals[key][type] += item.amount;
    };

    incomes.forEach(item => addToMonth(item, 'income'));
    expenses.forEach(item => addToMonth(item, 'expense'));

    // Sort months chronologically
    const sortedKeys = Object.keys(monthlyTotals).sort((a, b) => new Date(a) - new Date(b));

    const labels = sortedKeys.map(key => {
        const { monthIndex, year } = monthlyTotals[key];
        return `${MONTH_LABELS[monthIndex]} ${year}`;
    });

    const incomeData = sortedKeys.map(key => monthlyTotals[key].income);
    const expenseData = sortedKeys.map(key => monthlyTotals[key].expense);

    const data = {
        labels,
        datasets: [
            {
                label: 'Income',
                data: incomeData,
                backgroundColor: 'rgba(66, 173, 0, 0.85)',
                hoverBackgroundColor: '#42AD00',
                borderRadius: 6,
                borderSkipped: false,
                barPercentage: 0.7,
                categoryPercentage: 0.6,
            },
            {
                label: 'Expenses',
                data: expenseData,
                backgroundColor: 'rgba(231, 76, 60, 0.85)',
                hoverBackgroundColor: '#E74C3C',
                borderRadius: 6,
                borderSkipped: false,
                barPercentage: 0.7,
                categoryPercentage: 0.6,
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
                    label: function (context) {
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
                beginAtZero: true,
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
                    callback: function (value) {
                        return '₹' + value.toLocaleString('en-IN');
                    }
                }
            }
        }
    };

    return (
        <ChartStyled>
            <Bar data={data} options={options} />
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