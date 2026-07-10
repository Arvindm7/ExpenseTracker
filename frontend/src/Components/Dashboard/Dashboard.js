import React, { useEffect } from "react";
import styled from "styled-components";
import { InnerLayout } from "../../styles/Layouts";
import Chart from '../Chart/Chart';
import DoughnutChart from '../Chart/DoughnutChart';
import { rupees } from "../../utils/icons";
import { useGlobalContext } from "../../context/globalContext";
import History from '../History/History';

function Dashboard() {
    const { totalExpenses, incomes, expenses, totalIncome, totalBalance, getIncomes, getExpenses } = useGlobalContext();

    useEffect(() => {
        getIncomes();
        getExpenses();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const balance = totalBalance();

    return (
        <DashboardStyled>
            <InnerLayout>
                <h1>Dashboard</h1>

                {/* Stat Cards Row */}
                <div className="stat-cards">
                    <div className="stat-card">
                        <div className="stat-icon income-icon">
                            <i className="fa-solid fa-arrow-trend-up"></i>
                        </div>
                        <div className="stat-info">
                            <span className="stat-label">Total Income</span>
                            <span className="stat-value income-value">
                                {rupees}{totalIncome().toLocaleString('en-IN')}
                            </span>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon expense-icon">
                            <i className="fa-solid fa-arrow-trend-down"></i>
                        </div>
                        <div className="stat-info">
                            <span className="stat-label">Total Expenses</span>
                            <span className="stat-value expense-value">
                                {rupees}{totalExpenses().toLocaleString('en-IN')}
                            </span>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className={`stat-icon ${balance >= 0 ? 'balance-positive-icon' : 'balance-negative-icon'}`}>
                            <i className={`fa-solid fa-${balance >= 0 ? 'wallet' : 'triangle-exclamation'}`}></i>
                        </div>
                        <div className="stat-info">
                            <span className="stat-label">Total Balance</span>
                            <span className={`stat-value ${balance >= 0 ? 'balance-positive' : 'balance-negative'}`}>
                                {rupees}{Math.abs(balance).toLocaleString('en-IN')}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Charts + History Grid */}
                <div className="dashboard-grid">
                    {/* Left Column: Line Chart + Doughnut */}
                    <div className="charts-col">
                        <div className="line-chart-container">
                            <Chart />
                        </div>
                        <div className="bottom-row">
                            <div className="doughnut-container">
                                <DoughnutChart />
                            </div>
                            <div className="min-max-container">
                                <div className="min-max-card">
                                    <h3>Income Range</h3>
                                    <div className="range-row">
                                        <div className="range-item">
                                            <span className="range-label">Min</span>
                                            <span className="range-value">
                                                {rupees}{incomes.length > 0 ? Math.min(...incomes.map(item => item.amount)).toLocaleString('en-IN') : '0'}
                                            </span>
                                        </div>
                                        <div className="range-divider"></div>
                                        <div className="range-item">
                                            <span className="range-label">Max</span>
                                            <span className="range-value">
                                                {rupees}{incomes.length > 0 ? Math.max(...incomes.map(item => item.amount)).toLocaleString('en-IN') : '0'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="min-max-card">
                                    <h3>Expense Range</h3>
                                    <div className="range-row">
                                        <div className="range-item">
                                            <span className="range-label">Min</span>
                                            <span className="range-value expense-val">
                                                {rupees}{expenses.length > 0 ? Math.min(...expenses.map(item => item.amount)).toLocaleString('en-IN') : '0'}
                                            </span>
                                        </div>
                                        <div className="range-divider"></div>
                                        <div className="range-item">
                                            <span className="range-label">Max</span>
                                            <span className="range-value expense-val">
                                                {rupees}{expenses.length > 0 ? Math.max(...expenses.map(item => item.amount)).toLocaleString('en-IN') : '0'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: History */}
                    <div className="history-col">
                        <History />
                    </div>
                </div>
            </InnerLayout>
        </DashboardStyled>
    );
}

const DashboardStyled = styled.div`
    /* Stat Cards */
    .stat-cards {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1.2rem;
        margin: 1.2rem 0 1.5rem;
    }

    .stat-card {
        background: ${({ theme }) => theme.bgCard};
        border: 2px solid ${({ theme }) => theme.borderColor};
        box-shadow: ${({ theme }) => theme.shadow};
        border-radius: 20px;
        padding: 1.2rem;
        display: flex;
        align-items: center;
        gap: 1rem;
        transition: all 0.3s ease;

        &:hover {
            transform: translateY(-3px);
            box-shadow: ${({ theme }) => theme.shadowHover};
        }
    }

    .stat-icon {
        width: 52px;
        height: 52px;
        border-radius: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;

        i {
            font-size: 1.4rem;
            color: #fff;
        }
    }

    .income-icon {
        background: linear-gradient(135deg, #42AD00, #2ED8A3);
    }

    .expense-icon {
        background: linear-gradient(135deg, #E74C3C, #F56692);
    }

    .balance-positive-icon {
        background: linear-gradient(135deg, #6C63FF, #5DADE2);
    }

    .balance-negative-icon {
        background: linear-gradient(135deg, #E74C3C, #F2994A);
    }

    .stat-info {
        display: flex;
        flex-direction: column;
        gap: 0.15rem;
    }

    .stat-label {
        font-size: 0.8rem;
        color: ${({ theme }) => theme.textMuted};
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }

    .stat-value {
        font-size: 1.6rem;
        font-weight: 800;
        color: var(--primary-color);
        display: flex;
        align-items: center;
        gap: 0.15rem;
    }

    .income-value {
        color: var(--color-green);
    }

    .expense-value {
        color: #E74C3C;
    }

    .balance-positive {
        color: #6C63FF;
    }

    .balance-negative {
        color: #E74C3C;
    }

    /* Dashboard Grid */
    .dashboard-grid {
        display: grid;
        grid-template-columns: 1fr 320px;
        gap: 1.5rem;
    }

    .charts-col {
        display: flex;
        flex-direction: column;
        gap: 1.2rem;
    }

    .line-chart-container {
        height: 300px;
    }

    .bottom-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1.2rem;
    }

    .doughnut-container {
        min-height: 280px;
    }

    .min-max-container {
        display: flex;
        flex-direction: column;
        gap: 1.2rem;
    }

    .min-max-card {
        background: ${({ theme }) => theme.bgCard};
        border: 2px solid ${({ theme }) => theme.borderColor};
        box-shadow: ${({ theme }) => theme.shadow};
        border-radius: 20px;
        padding: 1.2rem;
        flex: 1;

        h3 {
            font-size: 0.95rem;
            color: var(--primary-color);
            margin-bottom: 0.8rem;
        }
    }

    .range-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 0.5rem;
    }

    .range-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.2rem;
        flex: 1;
    }

    .range-label {
        font-size: 0.7rem;
        color: ${({ theme }) => theme.textMuted};
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }

    .range-value {
        font-size: 1.2rem;
        font-weight: 700;
        color: var(--color-green);
        display: flex;
        align-items: center;
        gap: 0.1rem;
    }

    .expense-val {
        color: #E74C3C;
    }

    .range-divider {
        width: 1px;
        height: 30px;
        background: ${({ theme }) => theme.borderActive};
    }

    /* History Column */
    .history-col {
        background: ${({ theme }) => theme.bgCard};
        border: 2px solid ${({ theme }) => theme.borderColor};
        box-shadow: ${({ theme }) => theme.shadow};
        border-radius: 20px;
        padding: 1.2rem;
        overflow-y: auto;
        max-height: 620px;
    }

    /* Responsive */
    @media (max-width: 1200px) {
        .dashboard-grid {
            grid-template-columns: 1fr;
        }

        .history-col {
            max-height: 400px;
        }
    }

    @media (max-width: 900px) {
        h1 {
            text-align: center;
        }

        .stat-cards {
            grid-template-columns: 1fr;
            gap: 0.8rem;
        }

        .stat-value {
            font-size: 1.3rem;
        }

        .bottom-row {
            grid-template-columns: 1fr;
        }
    }
`;

export default Dashboard;