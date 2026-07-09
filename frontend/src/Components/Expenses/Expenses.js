import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext';
import { InnerLayout } from '../../styles/Layouts';
import IncomeItem from '../IncomeItem/IncomeItem';
import ExpenseForm from './ExpenseForm';
import { dateFormat } from '../../utils/dateFormat';

function Expenses() {
    const {expenses, getExpenses, deleteExpense, totalExpenses} = useGlobalContext()

    useEffect(() =>{
        getExpenses()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <ExpenseStyled>
            <InnerLayout>
                <div className="page-header">
                    <h1>Expenses</h1>
                    <div className="total-badge expense-badge">
                        <div className="badge-icon">
                            <i className="fa-solid fa-arrow-trend-down"></i>
                        </div>
                        <div className="badge-info">
                            <span className="badge-label">Total Expenses</span>
                            <span className="badge-value">₹{totalExpenses().toLocaleString('en-IN')}</span>
                        </div>
                    </div>
                </div>
                <div className="expense-content">
                    <div className="form-container">
                        <ExpenseForm />
                    </div>
                    <div className="expenses-list">
                        {expenses.length === 0 && (
                            <div className="empty-state">
                                <i className="fa-solid fa-receipt"></i>
                                <h3>No expenses recorded</h3>
                                <p>Add your first expense using the form</p>
                            </div>
                        )}
                        {expenses.map((expense) => {
                            const {_id, title, amount, date, category, description, type} = expense;
                            return <IncomeItem
                                key={_id}
                                id={_id} 
                                title={title} 
                                description={description} 
                                amount={amount} 
                                date={dateFormat(date)} 
                                type={type}
                                category={category} 
                                indicatorColor="#E74C3C"
                                deleteItem={deleteExpense}
                            />
                        })}
                    </div>
                </div>
            </InnerLayout>
        </ExpenseStyled>
    )
}

const ExpenseStyled = styled.div`
    display: flex;
    overflow: auto;

    .page-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 1rem;
        margin-bottom: 0.5rem;

        h1 {
            font-size: 1.8rem;
        }
    }

    .total-badge {
        display: flex;
        align-items: center;
        gap: 0.8rem;
        background: ${({ theme }) => theme.bgCard};
        border: 2px solid ${({ theme }) => theme.borderColor};
        box-shadow: ${({ theme }) => theme.shadow};
        border-radius: 16px;
        padding: 0.7rem 1.2rem;
        transition: all 0.3s ease;

        &:hover {
            transform: translateY(-2px);
            box-shadow: ${({ theme }) => theme.shadowHover};
        }
    }

    .badge-icon {
        width: 42px;
        height: 42px;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;

        i {
            font-size: 1.1rem;
            color: #fff;
        }
    }

    .expense-badge .badge-icon {
        background: linear-gradient(135deg, #E74C3C, #F56692);
    }

    .badge-info {
        display: flex;
        flex-direction: column;
    }

    .badge-label {
        font-size: 0.7rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        color: ${({ theme }) => theme.textMuted};
    }

    .badge-value {
        font-size: 1.4rem;
        font-weight: 800;
        color: #E74C3C;
    }

    .expense-content {
        display: flex;
        gap: 2rem;
        .expenses-list {
            flex: 1;
        }
    }

    .empty-state {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 3rem 1rem;
        text-align: center;
        color: ${({ theme }) => theme.textMuted};
        background: ${({ theme }) => theme.bgCard};
        border: 2px dashed ${({ theme }) => theme.borderColor};
        border-radius: 20px;

        i {
            font-size: 2.5rem;
            margin-bottom: 1rem;
            opacity: 0.4;
        }

        h3 {
            font-size: 1.1rem;
            color: ${({ theme }) => theme.textSecondary};
            margin-bottom: 0.3rem;
        }

        p {
            font-size: 0.85rem;
        }
    }

    @media (max-width: 900px) {
        .page-header {
            h1 { font-size: 1.4rem; }
        }
        .badge-value {
            font-size: 1.1rem;
        }
        .expense-content {
            flex-direction: column;
        }
    }
`;

export default Expenses