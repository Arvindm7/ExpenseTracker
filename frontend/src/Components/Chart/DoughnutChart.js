import React from 'react';
import { Chart as ChartJs, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';

ChartJs.register(ArcElement, Tooltip, Legend);

function DoughnutChart() {
    const { expenses } = useGlobalContext();

    // Aggregate expenses by category
    const categoryTotals = {};
    expenses.forEach((expense) => {
        const cat = expense.category;
        if (categoryTotals[cat]) {
            categoryTotals[cat] += expense.amount;
        } else {
            categoryTotals[cat] = expense.amount;
        }
    });

    const categories = Object.keys(categoryTotals);
    const amounts = Object.values(categoryTotals);

    // Curated color palette for categories
    const colorPalette = [
        '#F56692',  // pink
        '#F2994A',  // orange
        '#6C63FF',  // purple
        '#2ED8A3',  // teal
        '#FFB347',  // light orange
        '#5DADE2',  // sky blue
        '#E74C3C',  // red
        '#1ABC9C',  // green
        '#9B59B6',  // violet
        '#34495E',  // dark blue
    ];

    const backgroundColors = categories.map((_, i) => colorPalette[i % colorPalette.length]);

    const data = {
        labels: categories.map(cat => cat.charAt(0).toUpperCase() + cat.slice(1)),
        datasets: [
            {
                data: amounts,
                backgroundColor: backgroundColors,
                borderColor: backgroundColors.map(c => c + '33'),
                borderWidth: 3,
                hoverBorderColor: '#fff',
                hoverBorderWidth: 3,
                hoverOffset: 8,
                borderRadius: 4,
                spacing: 2,
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '65%',
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    padding: 16,
                    usePointStyle: true,
                    pointStyle: 'circle',
                    font: {
                        family: "'Nunito', sans-serif",
                        size: 12,
                        weight: 600
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
                        const total = context.dataset.data.reduce((a, b) => a + b, 0);
                        const percentage = ((context.parsed / total) * 100).toFixed(1);
                        return ` ₹${context.parsed.toLocaleString('en-IN')} (${percentage}%)`;
                    }
                }
            }
        }
    };

    if (categories.length === 0) {
        return (
            <DoughnutStyled>
                <div className="empty-chart">
                    <i className="fa-solid fa-chart-pie"></i>
                    <p>No expense data yet</p>
                </div>
            </DoughnutStyled>
        );
    }

    return (
        <DoughnutStyled>
            <h3>Expense Breakdown</h3>
            <div className="chart-wrapper">
                <Doughnut data={data} options={options} />
                <div className="center-label">
                    <span className="total-label">Total</span>
                    <span className="total-amount">
                        ₹{amounts.reduce((a, b) => a + b, 0).toLocaleString('en-IN')}
                    </span>
                </div>
            </div>
        </DoughnutStyled>
    );
}

const DoughnutStyled = styled.div`
    background: #FCF6F9;
    border: 2px solid #FFFFFF;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    padding: 1.2rem;
    border-radius: 20px;
    height: 100%;
    display: flex;
    flex-direction: column;

    h3 {
        font-size: 1.1rem;
        color: var(--primary-color);
        margin-bottom: 0.8rem;
    }

    .chart-wrapper {
        flex: 1;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 200px;
    }

    .center-label {
        position: absolute;
        top: 42%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        pointer-events: none;

        .total-label {
            display: block;
            font-size: 0.75rem;
            color: rgba(34, 34, 96, 0.4);
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .total-amount {
            display: block;
            font-size: 1.2rem;
            font-weight: 800;
            color: var(--primary-color);
        }
    }

    .empty-chart {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: rgba(34, 34, 96, 0.25);

        i {
            font-size: 2.5rem;
            margin-bottom: 0.8rem;
        }

        p {
            font-size: 0.9rem;
            font-weight: 500;
        }
    }
`;

export default DoughnutChart;
