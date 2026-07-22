import React, { useEffect, useState, useMemo } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
import { rupees } from '../../utils/icons';

const EXPENSE_CATEGORIES = [
    'education', 'groceries', 'health', 'subscriptions', 'takeaways',
    'clothing', 'travelling', 'investment', 'shopping', 'entertainment',
    'fuel', 'rent', 'insurance', 'other'
];

function BudgetTracker() {
    const { expenses, budgets, setBudgetLimit, getBudgets, deleteBudget } = useGlobalContext();

    const now = new Date();
    const [month] = useState(now.getMonth() + 1);
    const [year] = useState(now.getFullYear());
    const [showForm, setShowForm] = useState(false);
    const [formCategory, setFormCategory] = useState('');
    const [formLimit, setFormLimit] = useState('');

    useEffect(() => {
        getBudgets(month, year);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [month, year]);

    // Calculate spending per category for current month
    const categorySpending = useMemo(() => {
        const spending = {};
        expenses.forEach(expense => {
            const expDate = new Date(expense.date);
            if (expDate.getMonth() + 1 === month && expDate.getFullYear() === year) {
                spending[expense.category] = (spending[expense.category] || 0) + expense.amount;
            }
        });
        return spending;
    }, [expenses, month, year]);

    // Categories that already have a budget set
    const budgetedCategories = budgets.map(b => b.category);
    const availableCategories = EXPENSE_CATEGORIES.filter(c => !budgetedCategories.includes(c));

    const handleSetBudget = (e) => {
        e.preventDefault();
        if (!formCategory || !formLimit) return;
        setBudgetLimit({
            category: formCategory,
            limit: parseFloat(formLimit),
            month,
            year
        });
        setFormCategory('');
        setFormLimit('');
        setShowForm(false);
    };

    const getStatusColor = (percent) => {
        if (percent >= 100) return '#E74C3C';
        if (percent >= 80) return '#F2994A';
        return '#42AD00';
    };

    const getStatusLabel = (percent) => {
        if (percent >= 100) return 'Over Budget!';
        if (percent >= 80) return 'Almost There';
        if (percent >= 50) return 'On Track';
        return 'Under Budget';
    };

    const monthName = new Date(year, month - 1).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' });

    return (
        <BudgetTrackerStyled>
            <div className="budget-header">
                <div className="header-left">
                    <h3>
                        <i className="fa-solid fa-bullseye"></i>
                        Budget Tracker
                    </h3>
                    <span className="month-label">{monthName}</span>
                </div>
                <button
                    className="add-budget-btn"
                    onClick={() => setShowForm(!showForm)}
                    disabled={availableCategories.length === 0}
                >
                    <i className={`fa-solid fa-${showForm ? 'xmark' : 'plus'}`}></i>
                    {showForm ? 'Cancel' : 'Set Budget'}
                </button>
            </div>

            {showForm && (
                <form className="budget-form" onSubmit={handleSetBudget}>
                    <div className="selects">
                        <select
                            value={formCategory}
                            onChange={(e) => setFormCategory(e.target.value)}
                            required
                        >
                            <option value="" disabled>Select Category</option>
                            {availableCategories.map(cat => (
                                <option key={cat} value={cat}>
                                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="limit-input">
                        <span className="currency">₹</span>
                        <input
                            type="number"
                            placeholder="Monthly limit"
                            value={formLimit}
                            onChange={(e) => setFormLimit(e.target.value)}
                            min="1"
                            required
                        />
                    </div>
                    <button type="submit" className="submit-btn">
                        <i className="fa-solid fa-check"></i>
                        Set
                    </button>
                </form>
            )}

            {budgets.length === 0 ? (
                <div className="empty-state">
                    <i className="fa-solid fa-chart-simple"></i>
                    <p>No budgets set for {monthName}</p>
                    <span>Click "Set Budget" to add spending limits per category</span>
                </div>
            ) : (
                <div className="budget-list">
                    {budgets.map((budget) => {
                        const spent = categorySpending[budget.category] || 0;
                        const percent = Math.min(Math.round((spent / budget.limit) * 100), 150);
                        const barWidth = Math.min(percent, 100);
                        const statusColor = getStatusColor(percent);

                        return (
                            <div key={budget._id} className={`budget-item ${percent >= 100 ? 'over' : ''}`}>
                                <div className="budget-item-header">
                                    <div className="category-info">
                                        <span className="category-name">
                                            {budget.category.charAt(0).toUpperCase() + budget.category.slice(1)}
                                        </span>
                                        <span className="status-badge" style={{ color: statusColor }}>
                                            {getStatusLabel(percent)}
                                        </span>
                                    </div>
                                    <button
                                        className="remove-btn"
                                        onClick={() => deleteBudget(budget._id, month, year)}
                                        title="Remove budget"
                                    >
                                        <i className="fa-solid fa-xmark"></i>
                                    </button>
                                </div>
                                <div className="progress-bar-bg">
                                    <div
                                        className="progress-bar-fill"
                                        style={{
                                            width: `${barWidth}%`,
                                            background: statusColor
                                        }}
                                    />
                                </div>
                                <div className="budget-amounts">
                                    <span className="spent" style={{ color: statusColor }}>
                                        {rupees}{spent.toLocaleString('en-IN')} spent
                                    </span>
                                    <span className="limit">
                                        of {rupees}{budget.limit.toLocaleString('en-IN')}
                                    </span>
                                    <span className="percent" style={{ color: statusColor }}>
                                        {percent}%
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </BudgetTrackerStyled>
    );
}

const BudgetTrackerStyled = styled.div`
    background: ${({ theme }) => theme.bgCard};
    border: 2px solid ${({ theme }) => theme.borderColor};
    box-shadow: ${({ theme }) => theme.shadow};
    border-radius: 20px;
    padding: 1.5rem;

    .budget-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 1rem;

        .header-left {
            display: flex;
            align-items: center;
            gap: 0.8rem;

            h3 {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                font-size: 1.1rem;
                color: ${({ theme }) => theme.textPrimary};

                i {
                    color: #6C63FF;
                }
            }

            .month-label {
                font-size: 0.75rem;
                font-weight: 600;
                color: ${({ theme }) => theme.textMuted};
                background: ${({ theme }) => theme.navActiveBg};
                padding: 0.2rem 0.6rem;
                border-radius: 8px;
            }
        }
    }

    .add-budget-btn {
        display: flex;
        align-items: center;
        gap: 0.4rem;
        padding: 0.4rem 1rem;
        border: 2px solid ${({ theme }) => theme.borderColor};
        border-radius: 10px;
        background: transparent;
        color: ${({ theme }) => theme.textSecondary};
        font-family: inherit;
        font-size: 0.78rem;
        font-weight: 700;
        cursor: pointer;
        transition: all 0.25s ease;

        &:hover:not(:disabled) {
            border-color: #6C63FF;
            color: #6C63FF;
        }

        &:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }
    }

    .budget-form {
        display: flex;
        gap: 0.6rem;
        margin-bottom: 1.2rem;
        animation: slideDown 0.2s ease-out;

        @keyframes slideDown {
            from { opacity: 0; transform: translateY(-8px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .selects {
            flex: 1;
            position: relative;

            select {
                width: 100%;
                padding: 0.55rem 0.8rem;
                border: 2px solid ${({ theme }) => theme.borderColor};
                border-radius: 10px;
                background: transparent;
                color: ${({ theme }) => theme.textPrimary};
                font-family: inherit;
                font-size: 0.82rem;
                cursor: pointer;
                outline: none;
                appearance: none;

                &:focus {
                    border-color: #6C63FF;
                }
            }

            &::after {
                content: "▼";
                position: absolute;
                right: 0.8rem;
                top: 50%;
                transform: translateY(-50%);
                pointer-events: none;
                font-size: 0.6rem;
                color: ${({ theme }) => theme.textMuted};
            }
        }

        .limit-input {
            display: flex;
            align-items: center;
            border: 2px solid ${({ theme }) => theme.borderColor};
            border-radius: 10px;
            overflow: hidden;
            flex: 0.7;

            .currency {
                padding: 0 0.6rem;
                font-weight: 700;
                color: ${({ theme }) => theme.textMuted};
                font-size: 0.9rem;
            }

            input {
                border: none;
                padding: 0.55rem 0.5rem;
                background: transparent;
                color: ${({ theme }) => theme.textPrimary};
                font-family: inherit;
                font-size: 0.82rem;
                outline: none;
                width: 100%;
            }

            &:focus-within {
                border-color: #6C63FF;
            }
        }

        .submit-btn {
            display: flex;
            align-items: center;
            gap: 0.3rem;
            padding: 0.5rem 1rem;
            border: none;
            border-radius: 10px;
            background: linear-gradient(135deg, #6C63FF, #5DADE2);
            color: #fff;
            font-family: inherit;
            font-size: 0.8rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.25s;
            white-space: nowrap;

            &:hover {
                transform: translateY(-1px);
                box-shadow: 0 3px 12px rgba(108, 99, 255, 0.3);
            }
        }
    }

    .empty-state {
        text-align: center;
        padding: 2rem 1rem;
        color: ${({ theme }) => theme.textMuted};

        i {
            font-size: 2rem;
            margin-bottom: 0.6rem;
            opacity: 0.4;
        }

        p {
            font-weight: 600;
            color: ${({ theme }) => theme.textSecondary};
            margin-bottom: 0.3rem;
        }

        span {
            font-size: 0.8rem;
        }
    }

    .budget-list {
        display: flex;
        flex-direction: column;
        gap: 0.8rem;
    }

    .budget-item {
        padding: 0.9rem 1rem;
        border-radius: 14px;
        background: ${({ theme }) => theme.navActiveBg};
        border: 1.5px solid transparent;
        transition: all 0.3s ease;

        &.over {
            border-color: rgba(231, 76, 60, 0.25);
            background: ${({ theme }) => theme.name === 'dark'
                ? 'rgba(231, 76, 60, 0.06)'
                : 'rgba(231, 76, 60, 0.03)'};
        }
    }

    .budget-item-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 0.5rem;

        .category-info {
            display: flex;
            align-items: center;
            gap: 0.6rem;
        }

        .category-name {
            font-weight: 700;
            font-size: 0.9rem;
            color: ${({ theme }) => theme.textPrimary};
        }

        .status-badge {
            font-size: 0.68rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.3px;
        }

        .remove-btn {
            width: 24px;
            height: 24px;
            border-radius: 6px;
            border: none;
            background: transparent;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            color: ${({ theme }) => theme.textMuted};
            transition: all 0.2s;

            &:hover {
                background: rgba(231, 76, 60, 0.1);
                color: #E74C3C;
            }
        }
    }

    .progress-bar-bg {
        width: 100%;
        height: 8px;
        border-radius: 4px;
        background: ${({ theme }) => theme.borderColor};
        overflow: hidden;
        margin-bottom: 0.4rem;
    }

    .progress-bar-fill {
        height: 100%;
        border-radius: 4px;
        transition: width 0.5s ease, background 0.3s ease;
    }

    .budget-amounts {
        display: flex;
        align-items: center;
        gap: 0.4rem;
        font-size: 0.75rem;
        font-weight: 600;

        .spent {
            display: flex;
            align-items: center;
            gap: 0.15rem;
        }

        .limit {
            color: ${({ theme }) => theme.textMuted};
            display: flex;
            align-items: center;
            gap: 0.15rem;
        }

        .percent {
            margin-left: auto;
            font-weight: 800;
        }
    }

    @media (max-width: 700px) {
        .budget-form {
            flex-wrap: wrap;

            .selects, .limit-input {
                flex: 1 1 100%;
            }
        }

        .budget-header {
            flex-wrap: wrap;
            gap: 0.6rem;
        }
    }
`;

export default BudgetTracker;
