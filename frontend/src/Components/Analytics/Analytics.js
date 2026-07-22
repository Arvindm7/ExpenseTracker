import React, { useEffect, useState, useMemo } from 'react';
import styled, { useTheme } from 'styled-components';
import {
    Chart as ChartJs,
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';
import { Doughnut, Bar, Line } from 'react-chartjs-2';
import { InnerLayout } from '../../styles/Layouts';
import { useGlobalContext } from '../../context/globalContext';
import { rupees } from '../../utils/icons';

ChartJs.register(
    ArcElement, CategoryScale, LinearScale,
    BarElement, LineElement, PointElement,
    Title, Tooltip, Legend, Filler
);

const COLOR_PALETTE = [
    '#6C63FF', '#F56692', '#2ED8A3', '#F2994A', '#5DADE2',
    '#E74C3C', '#FFB347', '#1ABC9C', '#9B59B6', '#34495E',
    '#FF6B6B', '#48C9B0', '#AF7AC5', '#F39C12', '#3498DB'
];

const MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function Analytics() {
    const { incomes, expenses, getIncomes, getExpenses } = useGlobalContext();
    const theme = useTheme();
    const [activeTab, setActiveTab] = useState('expenses');

    useEffect(() => {
        getIncomes();
        getExpenses();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const currentData = activeTab === 'expenses' ? expenses : incomes;

    // ---- Category Breakdown (Pie Chart) ----
    const categoryData = useMemo(() => {
        const totals = {};
        currentData.forEach(item => {
            totals[item.category] = (totals[item.category] || 0) + item.amount;
        });

        const sorted = Object.entries(totals).sort((a, b) => b[1] - a[1]);
        const categories = sorted.map(([cat]) => cat.charAt(0).toUpperCase() + cat.slice(1));
        const amounts = sorted.map(([, amt]) => amt);
        const total = amounts.reduce((s, a) => s + a, 0);

        return { categories, amounts, total, sorted };
    }, [currentData]);

    // ---- Monthly Comparison (Bar Chart) ----
    const monthlyData = useMemo(() => {
        const map = {};
        const addToMonth = (item, type) => {
            const d = new Date(item.date);
            const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
            if (!map[key]) map[key] = { income: 0, expense: 0, year: d.getFullYear(), monthIdx: d.getMonth() };
            map[key][type] += item.amount;
        };

        incomes.forEach(i => addToMonth(i, 'income'));
        expenses.forEach(e => addToMonth(e, 'expense'));

        const sortedKeys = Object.keys(map).sort();
        // Show last 6 months max
        const recent = sortedKeys.slice(-6);

        return {
            labels: recent.map(k => `${MONTH_LABELS[map[k].monthIdx]} ${map[k].year}`),
            incomeData: recent.map(k => map[k].income),
            expenseData: recent.map(k => map[k].expense),
            savingsData: recent.map(k => map[k].income - map[k].expense),
        };
    }, [incomes, expenses]);

    // ---- Spending Trend (Line Chart) ----
    const trendData = useMemo(() => {
        const map = {};
        expenses.forEach(e => {
            const d = new Date(e.date);
            const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
            map[key] = (map[key] || 0) + e.amount;
        });

        const sortedKeys = Object.keys(map).sort().slice(-6);
        return {
            labels: sortedKeys.map(k => {
                const [year, month] = k.split('-');
                return `${MONTH_LABELS[parseInt(month) - 1]} ${year}`;
            }),
            values: sortedKeys.map(k => map[k]),
        };
    }, [expenses]);

    // ---- Expense Prediction (Simple Avg) ----
    const prediction = useMemo(() => {
        if (trendData.values.length < 2) return null;
        const last3 = trendData.values.slice(-3);
        const avg = Math.round(last3.reduce((s, v) => s + v, 0) / last3.length);
        return avg;
    }, [trendData]);

    // ---- Chart Configs ----
    const doughnutData = {
        labels: categoryData.categories,
        datasets: [{
            data: categoryData.amounts,
            backgroundColor: categoryData.categories.map((_, i) => COLOR_PALETTE[i % COLOR_PALETTE.length]),
            borderColor: categoryData.categories.map((_, i) => COLOR_PALETTE[i % COLOR_PALETTE.length] + '33'),
            borderWidth: 3,
            hoverBorderColor: theme.bgCard,
            hoverOffset: 8,
            borderRadius: 4,
            spacing: 2,
        }]
    };

    const doughnutOptions = {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '62%',
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: theme.name === 'dark' ? 'rgba(22,33,62,0.95)' : 'rgba(34,34,96,0.9)',
                titleColor: '#fff', bodyColor: '#fff',
                padding: 12, cornerRadius: 10,
                titleFont: { family: "'Nunito', sans-serif", size: 13 },
                bodyFont: { family: "'Nunito', sans-serif", size: 12 },
                callbacks: {
                    label: (ctx) => {
                        const pct = ((ctx.parsed / categoryData.total) * 100).toFixed(1);
                        return ` ₹${ctx.parsed.toLocaleString('en-IN')} (${pct}%)`;
                    }
                }
            }
        }
    };

    const barData = {
        labels: monthlyData.labels,
        datasets: [
            {
                label: 'Income',
                data: monthlyData.incomeData,
                backgroundColor: 'rgba(66, 173, 0, 0.8)',
                borderRadius: 6, barPercentage: 0.6,
            },
            {
                label: 'Expenses',
                data: monthlyData.expenseData,
                backgroundColor: 'rgba(231, 76, 60, 0.8)',
                borderRadius: 6, barPercentage: 0.6,
            }
        ]
    };

    const barOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top', align: 'end',
                labels: {
                    usePointStyle: true, pointStyle: 'circle', padding: 14,
                    font: { family: "'Nunito', sans-serif", size: 11, weight: 600 },
                    color: theme.textSecondary,
                }
            },
            tooltip: {
                backgroundColor: theme.name === 'dark' ? 'rgba(22,33,62,0.95)' : 'rgba(34,34,96,0.9)',
                titleColor: '#fff', bodyColor: '#fff', padding: 12, cornerRadius: 10,
                callbacks: {
                    label: (ctx) => ` ${ctx.dataset.label}: ₹${ctx.parsed.y.toLocaleString('en-IN')}`
                }
            }
        },
        scales: {
            x: { grid: { display: false }, ticks: { color: theme.textMuted, font: { size: 11 } } },
            y: {
                beginAtZero: true,
                grid: { color: theme.gridColor, drawBorder: false },
                ticks: { color: theme.textMuted, font: { size: 11 }, callback: (v) => '₹' + v.toLocaleString('en-IN') }
            }
        }
    };

    const lineData = {
        labels: [...trendData.labels, ...(prediction ? ['Next Month'] : [])],
        datasets: [{
            label: 'Spending',
            data: [...trendData.values, ...(prediction ? [prediction] : [])],
            borderColor: '#6C63FF',
            backgroundColor: 'rgba(108, 99, 255, 0.08)',
            fill: true,
            tension: 0.4,
            pointBackgroundColor: [...trendData.values.map(() => '#6C63FF'), ...(prediction ? ['#F2994A'] : [])],
            pointBorderColor: [...trendData.values.map(() => '#fff'), ...(prediction ? ['#fff'] : [])],
            pointBorderWidth: 2,
            pointRadius: [...trendData.values.map(() => 5), ...(prediction ? [7] : [])],
            pointHoverRadius: 8,
            segment: prediction ? {
                borderDash: (ctx) => ctx.p1DataIndex === trendData.values.length - 1 ? [6, 3] : undefined,
            } : undefined,
        }]
    };

    const lineOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: theme.name === 'dark' ? 'rgba(22,33,62,0.95)' : 'rgba(34,34,96,0.9)',
                titleColor: '#fff', bodyColor: '#fff', padding: 12, cornerRadius: 10,
                callbacks: {
                    label: (ctx) => {
                        const isPrediction = prediction && ctx.dataIndex === trendData.values.length;
                        return ` ${isPrediction ? 'Predicted' : 'Spent'}: ₹${ctx.parsed.y.toLocaleString('en-IN')}`;
                    }
                }
            }
        },
        scales: {
            x: { grid: { display: false }, ticks: { color: theme.textMuted, font: { size: 11 } } },
            y: {
                beginAtZero: true,
                grid: { color: theme.gridColor, drawBorder: false },
                ticks: { color: theme.textMuted, font: { size: 11 }, callback: (v) => '₹' + v.toLocaleString('en-IN') }
            }
        }
    };

    return (
        <AnalyticsStyled>
            <InnerLayout>
                <div className="page-header">
                    <div className="header-left">
                        <h1>Analytics</h1>
                        <p className="page-subtitle">Deep insights into your finances</p>
                    </div>
                </div>

                {/* Top Row: Pie + Category Table */}
                <div className="analytics-top-row">
                    <div className="chart-card pie-card">
                        <div className="card-header">
                            <h3>
                                <i className="fa-solid fa-chart-pie"></i>
                                Category Breakdown
                            </h3>
                            <div className="tab-switch">
                                <button
                                    className={activeTab === 'expenses' ? 'active' : ''}
                                    onClick={() => setActiveTab('expenses')}
                                >Expenses</button>
                                <button
                                    className={activeTab === 'incomes' ? 'active' : ''}
                                    onClick={() => setActiveTab('incomes')}
                                >Income</button>
                            </div>
                        </div>
                        {categoryData.categories.length > 0 ? (
                            <div className="pie-container">
                                <div className="pie-wrapper">
                                    <Doughnut data={doughnutData} options={doughnutOptions} />
                                    <div className="center-label">
                                        <span className="center-total-label">Total</span>
                                        <span className="center-total-amount">
                                            ₹{categoryData.total.toLocaleString('en-IN')}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="empty-chart">
                                <i className="fa-solid fa-chart-pie"></i>
                                <p>No data yet</p>
                            </div>
                        )}
                    </div>

                    <div className="chart-card table-card">
                        <div className="card-header">
                            <h3>
                                <i className="fa-solid fa-table-list"></i>
                                {activeTab === 'expenses' ? 'Expense' : 'Income'} by Category
                            </h3>
                        </div>
                        {categoryData.sorted.length > 0 ? (
                            <div className="category-table">
                                {categoryData.sorted.map(([cat, amt], i) => {
                                    const pct = ((amt / categoryData.total) * 100).toFixed(1);
                                    return (
                                        <div key={cat} className="cat-row">
                                            <div className="cat-color" style={{ background: COLOR_PALETTE[i % COLOR_PALETTE.length] }} />
                                            <span className="cat-name">{cat.charAt(0).toUpperCase() + cat.slice(1)}</span>
                                            <div className="cat-bar-bg">
                                                <div
                                                    className="cat-bar-fill"
                                                    style={{
                                                        width: `${pct}%`,
                                                        background: COLOR_PALETTE[i % COLOR_PALETTE.length]
                                                    }}
                                                />
                                            </div>
                                            <span className="cat-amount">{rupees}{amt.toLocaleString('en-IN')}</span>
                                            <span className="cat-pct">{pct}%</span>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="empty-chart">
                                <i className="fa-solid fa-table-list"></i>
                                <p>No categories to display</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Middle Row: Monthly Comparison Bar Chart */}
                <div className="chart-card full-width-card">
                    <div className="card-header">
                        <h3>
                            <i className="fa-solid fa-chart-column"></i>
                            Monthly Income vs Expenses
                        </h3>
                    </div>
                    {monthlyData.labels.length > 0 ? (
                        <div className="bar-chart-wrapper">
                            <Bar data={barData} options={barOptions} />
                        </div>
                    ) : (
                        <div className="empty-chart">
                            <i className="fa-solid fa-chart-column"></i>
                            <p>No data available yet</p>
                        </div>
                    )}

                    {/* Monthly Savings Summary */}
                    {monthlyData.labels.length > 0 && (
                        <div className="savings-row">
                            {monthlyData.labels.map((label, i) => {
                                const savings = monthlyData.savingsData[i];
                                const isPositive = savings >= 0;
                                return (
                                    <div key={label} className={`savings-chip ${isPositive ? 'positive' : 'negative'}`}>
                                        <span className="savings-month">{label}</span>
                                        <span className="savings-amount">
                                            {isPositive ? '+' : ''}₹{Math.abs(savings).toLocaleString('en-IN')}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Bottom Row: Spending Trend + Prediction */}
                <div className="chart-card full-width-card">
                    <div className="card-header">
                        <h3>
                            <i className="fa-solid fa-chart-line"></i>
                            Spending Trend & Prediction
                        </h3>
                        {prediction && (
                            <div className="prediction-badge">
                                <i className="fa-solid fa-wand-magic-sparkles"></i>
                                Predicted: ₹{prediction.toLocaleString('en-IN')}
                            </div>
                        )}
                    </div>
                    {trendData.values.length > 0 ? (
                        <div className="line-chart-wrapper">
                            <Line data={lineData} options={lineOptions} />
                        </div>
                    ) : (
                        <div className="empty-chart">
                            <i className="fa-solid fa-chart-line"></i>
                            <p>Need at least 2 months of data for trends</p>
                        </div>
                    )}
                </div>
            </InnerLayout>
        </AnalyticsStyled>
    );
}

const AnalyticsStyled = styled.div`
    display: flex;
    flex: 1;

    .page-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 1rem;
        margin-bottom: 1.5rem;
    }

    .header-left {
        h1 {
            font-size: 1.6rem;
            color: ${({ theme }) => theme.textPrimary};
        }
        .page-subtitle {
            color: ${({ theme }) => theme.textMuted};
            font-size: 0.85rem;
            font-weight: 500;
            margin-top: 0.2rem;
        }
    }

    .chart-card {
        background: ${({ theme }) => theme.bgCard};
        border: 2px solid ${({ theme }) => theme.borderColor};
        box-shadow: ${({ theme }) => theme.shadow};
        border-radius: 20px;
        padding: 1.5rem;
        transition: all 0.3s ease;
    }

    .card-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 0.6rem;
        margin-bottom: 1rem;

        h3 {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-size: 1rem;
            color: ${({ theme }) => theme.textPrimary};

            i {
                color: #6C63FF;
                font-size: 0.95rem;
            }
        }
    }

    /* Tab Switch */
    .tab-switch {
        display: flex;
        background: ${({ theme }) => theme.navActiveBg};
        border-radius: 10px;
        overflow: hidden;
        border: 1.5px solid ${({ theme }) => theme.borderColor};

        button {
            padding: 0.3rem 0.8rem;
            border: none;
            background: transparent;
            font-family: inherit;
            font-size: 0.72rem;
            font-weight: 700;
            color: ${({ theme }) => theme.textMuted};
            cursor: pointer;
            transition: all 0.25s ease;

            &.active {
                background: linear-gradient(135deg, #6C63FF, #5DADE2);
                color: #fff;
            }
        }
    }

    /* Top Row: Pie + Table */
    .analytics-top-row {
        display: grid;
        grid-template-columns: 1fr 1.3fr;
        gap: 1.2rem;
        margin-bottom: 1.2rem;
    }

    .pie-container {
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
    }

    .pie-wrapper {
        position: relative;
        width: 100%;
        max-width: 280px;
        height: 280px;
    }

    .center-label {
        position: absolute;
        top: 45%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        pointer-events: none;

        .center-total-label {
            display: block;
            font-size: 0.7rem;
            color: ${({ theme }) => theme.textMuted};
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .center-total-amount {
            display: block;
            font-size: 1.15rem;
            font-weight: 800;
            color: ${({ theme }) => theme.textPrimary};
        }
    }

    /* Category Table */
    .category-table {
        display: flex;
        flex-direction: column;
        gap: 0.55rem;
        max-height: 320px;
        overflow-y: auto;
        padding-right: 0.3rem;

        &::-webkit-scrollbar {
            width: 4px;
        }
        &::-webkit-scrollbar-thumb {
            background: ${({ theme }) => theme.borderColor};
            border-radius: 4px;
        }
    }

    .cat-row {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 0.6rem;
        border-radius: 10px;
        background: ${({ theme }) => theme.navActiveBg};
        transition: all 0.2s ease;

        &:hover {
            transform: translateX(3px);
        }
    }

    .cat-color {
        width: 10px;
        height: 10px;
        border-radius: 3px;
        flex-shrink: 0;
    }

    .cat-name {
        font-size: 0.8rem;
        font-weight: 700;
        color: ${({ theme }) => theme.textPrimary};
        min-width: 80px;
    }

    .cat-bar-bg {
        flex: 1;
        height: 6px;
        border-radius: 3px;
        background: ${({ theme }) => theme.borderColor};
        overflow: hidden;
    }

    .cat-bar-fill {
        height: 100%;
        border-radius: 3px;
        transition: width 0.5s ease;
    }

    .cat-amount {
        font-size: 0.78rem;
        font-weight: 700;
        color: ${({ theme }) => theme.textPrimary};
        display: flex;
        align-items: center;
        gap: 0.1rem;
        min-width: 70px;
        text-align: right;
        justify-content: flex-end;
    }

    .cat-pct {
        font-size: 0.7rem;
        font-weight: 800;
        color: ${({ theme }) => theme.textMuted};
        min-width: 35px;
        text-align: right;
    }

    /* Full Width Cards */
    .full-width-card {
        margin-bottom: 1.2rem;
    }

    .bar-chart-wrapper, .line-chart-wrapper {
        height: 300px;
        position: relative;
    }

    /* Savings Row */
    .savings-row {
        display: flex;
        gap: 0.6rem;
        margin-top: 1rem;
        flex-wrap: wrap;
    }

    .savings-chip {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 0.5rem 0.8rem;
        border-radius: 10px;
        flex: 1;
        min-width: 80px;

        .savings-month {
            font-size: 0.65rem;
            font-weight: 600;
            color: ${({ theme }) => theme.textMuted};
            text-transform: uppercase;
            letter-spacing: 0.3px;
        }

        .savings-amount {
            font-size: 0.82rem;
            font-weight: 800;
        }

        &.positive {
            background: rgba(66, 173, 0, 0.08);
            .savings-amount { color: #42AD00; }
        }
        &.negative {
            background: rgba(231, 76, 60, 0.08);
            .savings-amount { color: #E74C3C; }
        }
    }

    /* Prediction Badge */
    .prediction-badge {
        display: flex;
        align-items: center;
        gap: 0.3rem;
        padding: 0.3rem 0.7rem;
        border-radius: 8px;
        background: linear-gradient(135deg, rgba(242, 153, 74, 0.12), rgba(108, 99, 255, 0.12));
        color: #F2994A;
        font-size: 0.72rem;
        font-weight: 700;

        i {
            font-size: 0.68rem;
        }
    }

    /* Empty State */
    .empty-chart {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 2.5rem 1rem;
        color: ${({ theme }) => theme.textMuted};

        i {
            font-size: 2rem;
            margin-bottom: 0.6rem;
            opacity: 0.4;
        }

        p {
            font-size: 0.85rem;
            font-weight: 500;
        }
    }

    /* Responsive */
    @media (max-width: 900px) {
        .analytics-top-row {
            grid-template-columns: 1fr;
        }

        .pie-wrapper {
            max-width: 240px;
            height: 240px;
        }

        .bar-chart-wrapper, .line-chart-wrapper {
            height: 250px;
        }

        .savings-row {
            gap: 0.4rem;
        }

        .savings-chip {
            min-width: 60px;
            padding: 0.4rem 0.5rem;

            .savings-month { font-size: 0.58rem; }
            .savings-amount { font-size: 0.72rem; }
        }
    }

    @media (max-width: 600px) {
        .cat-bar-bg {
            display: none;
        }

        .card-header {
            flex-direction: column;
            align-items: flex-start;
        }
    }
`;

export default Analytics;
