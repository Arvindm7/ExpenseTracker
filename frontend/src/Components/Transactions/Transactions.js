import React, { useEffect, useState, useMemo } from 'react';
import styled from 'styled-components';
import { InnerLayout } from '../../styles/Layouts';
import { useGlobalContext } from '../../context/globalContext';
import { dateFormat } from '../../utils/dateFormat';
import { rupees } from '../../utils/icons';
import { exportToCSV } from '../../utils/exportCSV';
import { useToast } from '../Toast/Toast';

function Transactions() {
    const { incomes, expenses, getIncomes, getExpenses, totalIncome, totalExpenses } = useGlobalContext();
    const toast = useToast();

    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('all'); // 'all' | 'income' | 'expense'
    const [sortBy, setSortBy] = useState('date'); // 'date' | 'amount' | 'title'
    const [sortOrder, setSortOrder] = useState('desc'); // 'asc' | 'desc'

    useEffect(() => {
        getIncomes();
        getExpenses();
    }, []);

    // Merge, filter, search, and sort all transactions
    const filteredTransactions = useMemo(() => {
        let all = [...incomes, ...expenses];

        // Filter by type
        if (filterType === 'income') {
            all = all.filter(item => item.type === 'income');
        } else if (filterType === 'expense') {
            all = all.filter(item => item.type === 'expense');
        }

        // Search by title or category
        if (searchTerm.trim()) {
            const term = searchTerm.toLowerCase();
            all = all.filter(item =>
                item.title.toLowerCase().includes(term) ||
                item.category.toLowerCase().includes(term) ||
                item.description.toLowerCase().includes(term)
            );
        }

        // Sort
        all.sort((a, b) => {
            let comparison = 0;
            if (sortBy === 'date') {
                comparison = new Date(b.createdAt) - new Date(a.createdAt);
            } else if (sortBy === 'amount') {
                comparison = b.amount - a.amount;
            } else if (sortBy === 'title') {
                comparison = a.title.localeCompare(b.title);
            }
            return sortOrder === 'asc' ? -comparison : comparison;
        });

        return all;
    }, [incomes, expenses, searchTerm, filterType, sortBy, sortOrder]);

    const toggleSortOrder = () => {
        setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    };

    const handleExport = () => {
        if (filteredTransactions.length === 0) {
            toast.warning('No transactions to export');
            return;
        }
        const filterLabel = filterType !== 'all' ? `_${filterType}` : '';
        exportToCSV(filteredTransactions, `expense_tracker${filterLabel}`);
        toast.success(`Exported ${filteredTransactions.length} transactions to CSV`);
    };

    return (
        <TransactionsStyled>
            <InnerLayout>
                <div className="page-header">
                    <h1>Transaction History</h1>
                    <button className="export-btn" onClick={handleExport}>
                        <i className="fa-solid fa-file-export"></i>
                        Export CSV
                    </button>
                </div>

                {/* Summary Cards */}
                <div className="summary-cards">
                    <div className="summary-card income-card">
                        <span className="label">Total Income</span>
                        <span className="value income-value">{rupees} {totalIncome().toLocaleString('en-IN')}</span>
                    </div>
                    <div className="summary-card expense-card">
                        <span className="label">Total Expenses</span>
                        <span className="value expense-value">{rupees} {totalExpenses().toLocaleString('en-IN')}</span>
                    </div>
                    <div className="summary-card count-card">
                        <span className="label">Transactions</span>
                        <span className="value">{filteredTransactions.length}</span>
                    </div>
                </div>

                {/* Controls Bar */}
                <div className="controls">
                    <div className="search-box">
                        <i className="fa-solid fa-magnifying-glass"></i>
                        <input
                            type="text"
                            placeholder="Search by title, category, or description..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        {searchTerm && (
                            <button className="clear-btn" onClick={() => setSearchTerm('')}>
                                <i className="fa-solid fa-xmark"></i>
                            </button>
                        )}
                    </div>
                    <div className="filter-controls">
                        <div className="filter-group">
                            <button
                                className={`filter-btn ${filterType === 'all' ? 'active' : ''}`}
                                onClick={() => setFilterType('all')}
                            >
                                All
                            </button>
                            <button
                                className={`filter-btn income-btn ${filterType === 'income' ? 'active' : ''}`}
                                onClick={() => setFilterType('income')}
                            >
                                Income
                            </button>
                            <button
                                className={`filter-btn expense-btn ${filterType === 'expense' ? 'active' : ''}`}
                                onClick={() => setFilterType('expense')}
                            >
                                Expenses
                            </button>
                        </div>
                        <div className="sort-group">
                            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                                <option value="date">Sort by Date</option>
                                <option value="amount">Sort by Amount</option>
                                <option value="title">Sort by Title</option>
                            </select>
                            <button className="sort-order-btn" onClick={toggleSortOrder} title={sortOrder === 'asc' ? 'Ascending' : 'Descending'}>
                                <i className={`fa-solid fa-arrow-${sortOrder === 'asc' ? 'up' : 'down'}-long`}></i>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Transactions List */}
                <div className="transactions-list">
                    {filteredTransactions.length === 0 ? (
                        <div className="empty-state">
                            <i className="fa-solid fa-receipt"></i>
                            <p>{searchTerm ? 'No transactions match your search.' : 'No transactions yet.'}</p>
                        </div>
                    ) : (
                        filteredTransactions.map((item) => {
                            const { _id, title, amount, date, category, type } = item;
                            const isExpense = type === 'expense';
                            return (
                                <div key={_id} className={`transaction-row ${isExpense ? 'expense' : 'income'}`}>
                                    <div className="type-indicator"></div>
                                    <div className="transaction-info">
                                        <div className="transaction-header">
                                            <h4>{title}</h4>
                                            <span className="category-badge">{category}</span>
                                        </div>
                                        <p className="transaction-date">
                                            <i className="fa-solid fa-calendar"></i>
                                            {dateFormat(date)}
                                        </p>
                                    </div>
                                    <div className={`transaction-amount ${isExpense ? 'expense-amount' : 'income-amount'}`}>
                                        <span>{isExpense ? '-' : '+'}</span>
                                        {rupees} {amount.toLocaleString('en-IN')}
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </InnerLayout>
        </TransactionsStyled>
    );
}

const TransactionsStyled = styled.div`
    display: flex;
    overflow: auto;

    .page-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        gap: 1rem;
    }

    .export-btn {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.6rem 1.2rem;
        background: linear-gradient(135deg, #6C63FF, #5DADE2);
        color: #fff;
        border: none;
        border-radius: 12px;
        font-family: inherit;
        font-size: 0.85rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 2px 10px rgba(108, 99, 255, 0.3);

        i {
            font-size: 0.9rem;
        }

        &:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 16px rgba(108, 99, 255, 0.4);
        }

        &:active {
            transform: translateY(0);
        }
    }

    .summary-cards {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1rem;
        margin: 1rem 0 1.5rem;
    }

    .summary-card {
        background: #FCF6F9;
        border: 2px solid #FFFFFF;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        border-radius: 16px;
        padding: 1rem 1.2rem;
        display: flex;
        flex-direction: column;
        gap: 0.3rem;
        transition: transform 0.2s ease;

        &:hover {
            transform: translateY(-2px);
        }

        .label {
            font-size: 0.85rem;
            color: rgba(34, 34, 96, 0.5);
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .value {
            font-size: 1.6rem;
            font-weight: 700;
            color: var(--primary-color);
            display: flex;
            align-items: center;
            gap: 0.3rem;
        }

        .income-value {
            color: var(--color-green);
        }

        .expense-value {
            color: var(--color-delete);
        }
    }

    .controls {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin-bottom: 1.5rem;
    }

    .search-box {
        display: flex;
        align-items: center;
        background: #FCF6F9;
        border: 2px solid #FFFFFF;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        border-radius: 12px;
        padding: 0.6rem 1rem;
        gap: 0.8rem;
        transition: border-color 0.3s ease;

        &:focus-within {
            border-color: var(--primary-color);
        }

        i {
            color: rgba(34, 34, 96, 0.4);
            font-size: 1rem;
        }

        input {
            flex: 1;
            border: none;
            outline: none;
            background: transparent;
            font-family: inherit;
            font-size: 0.95rem;
            color: var(--primary-color);

            &::placeholder {
                color: rgba(34, 34, 96, 0.35);
            }
        }

        .clear-btn {
            background: none;
            border: none;
            cursor: pointer;
            color: rgba(34, 34, 96, 0.4);
            font-size: 1rem;
            padding: 0.2rem;
            display: flex;
            align-items: center;
            transition: color 0.2s;

            &:hover {
                color: var(--color-delete);
            }
        }
    }

    .filter-controls {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
        flex-wrap: wrap;
    }

    .filter-group {
        display: flex;
        gap: 0.5rem;
    }

    .filter-btn {
        padding: 0.4rem 1rem;
        border: 2px solid rgba(34, 34, 96, 0.14);
        border-radius: 20px;
        background: transparent;
        cursor: pointer;
        font-family: inherit;
        font-size: 0.85rem;
        font-weight: 600;
        color: rgba(34, 34, 96, 0.6);
        transition: all 0.3s ease;

        &:hover {
            border-color: var(--primary-color);
            color: var(--primary-color);
        }

        &.active {
            background: var(--primary-color);
            color: #fff;
            border-color: var(--primary-color);
        }

        &.income-btn.active {
            background: var(--color-green);
            border-color: var(--color-green);
        }

        &.expense-btn.active {
            background: var(--color-delete);
            border-color: var(--color-delete);
        }
    }

    .sort-group {
        display: flex;
        align-items: center;
        gap: 0.5rem;

        select {
            padding: 0.4rem 0.8rem;
            border: 2px solid rgba(34, 34, 96, 0.14);
            border-radius: 10px;
            background: transparent;
            font-family: inherit;
            font-size: 0.85rem;
            color: rgba(34, 34, 96, 0.6);
            cursor: pointer;
            outline: none;

            &:focus {
                border-color: var(--primary-color);
            }
        }

        .sort-order-btn {
            width: 34px;
            height: 34px;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 2px solid rgba(34, 34, 96, 0.14);
            border-radius: 10px;
            background: transparent;
            cursor: pointer;
            color: rgba(34, 34, 96, 0.6);
            font-size: 1rem;
            transition: all 0.2s ease;

            &:hover {
                border-color: var(--primary-color);
                color: var(--primary-color);
            }
        }
    }

    .transactions-list {
        display: flex;
        flex-direction: column;
        gap: 0.6rem;
    }

    .transaction-row {
        display: flex;
        align-items: center;
        gap: 1rem;
        background: #FCF6F9;
        border: 2px solid #FFFFFF;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        border-radius: 14px;
        padding: 0.8rem 1.2rem;
        transition: all 0.2s ease;

        &:hover {
            transform: translateX(4px);
            box-shadow: 0px 2px 20px rgba(0, 0, 0, 0.1);
        }
    }

    .type-indicator {
        width: 4px;
        height: 40px;
        border-radius: 4px;
        flex-shrink: 0;
    }

    .transaction-row.income .type-indicator {
        background: var(--color-green);
    }

    .transaction-row.expense .type-indicator {
        background: var(--color-delete);
    }

    .transaction-info {
        flex: 1;

        .transaction-header {
            display: flex;
            align-items: center;
            gap: 0.6rem;
            margin-bottom: 0.2rem;

            h4 {
                font-size: 1rem;
                color: var(--primary-color);
                margin: 0;
            }
        }

        .category-badge {
            font-size: 0.7rem;
            padding: 0.15rem 0.5rem;
            border-radius: 10px;
            background: rgba(34, 34, 96, 0.08);
            color: rgba(34, 34, 96, 0.6);
            font-weight: 600;
            text-transform: capitalize;
        }

        .transaction-date {
            display: flex;
            align-items: center;
            gap: 0.4rem;
            font-size: 0.8rem;
            color: rgba(34, 34, 96, 0.4);

            i {
                font-size: 0.75rem;
            }
        }
    }

    .transaction-amount {
        font-size: 1.1rem;
        font-weight: 700;
        display: flex;
        align-items: center;
        gap: 0.2rem;
        white-space: nowrap;

        span {
            font-size: 1.2rem;
        }
    }

    .income-amount {
        color: var(--color-green);
    }

    .expense-amount {
        color: var(--color-delete);
    }

    .empty-state {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 3rem;
        color: rgba(34, 34, 96, 0.3);

        i {
            font-size: 3rem;
            margin-bottom: 1rem;
        }

        p {
            font-size: 1.1rem;
            font-weight: 500;
        }
    }

    @media (max-width: 900px) {
        .summary-cards {
            grid-template-columns: 1fr;
        }

        .summary-card .value {
            font-size: 1.3rem;
        }

        .filter-controls {
            flex-direction: column;
            align-items: stretch;
        }

        .filter-group {
            justify-content: center;
        }

        .sort-group {
            justify-content: center;
        }

        .transaction-row {
            &:hover {
                transform: none;
            }
        }
    }
`;

export default Transactions;
