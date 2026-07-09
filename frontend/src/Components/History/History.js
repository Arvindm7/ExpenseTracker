import React from 'react'
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';

function History() {
    const {transactionHistory} = useGlobalContext()

    const [...history] = transactionHistory()
    return (
        <HistoryStyled>
            <h2>Recent History</h2>
            {history.length === 0 && (
                <div className="empty-state">
                    <i className="fa-solid fa-clock-rotate-left"></i>
                    <p>No transactions yet</p>
                </div>
            )}
            {history.map((item) =>{
                const {_id, title, amount, type} = item
                return (
                    <div key={_id} className={`history-item ${type}`}>
                        <div className="history-icon">
                            <i className={`fa-solid fa-${type === 'expense' ? 'arrow-trend-down' : 'arrow-trend-up'}`}></i>
                        </div>
                        <div className="history-info">
                            <span className="history-title">{title}</span>
                            <span className="history-type">{type === 'expense' ? 'Expense' : 'Income'}</span>
                        </div>
                        <span className={`history-amount ${type}`}>
                            {type === 'expense' ? '-' : '+'}₹{(amount <= 0 ? 0 : amount).toLocaleString('en-IN')}
                        </span>
                    </div>
                )
            })}
        </HistoryStyled>
    )
}

const HistoryStyled = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.8rem;

    h2 {
        font-size: 1.1rem;
        color: ${({ theme }) => theme.textPrimary};
        margin-bottom: 0.3rem;
    }

    .empty-state {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 2rem;
        color: ${({ theme }) => theme.textMuted};

        i {
            font-size: 2rem;
            margin-bottom: 0.6rem;
            opacity: 0.5;
        }

        p {
            font-size: 0.85rem;
            font-weight: 600;
        }
    }

    .history-item {
        background: ${({ theme }) => theme.bgMain};
        border: 1.5px solid ${({ theme }) => theme.borderColor};
        padding: 0.8rem 1rem;
        border-radius: 14px;
        display: flex;
        align-items: center;
        gap: 0.8rem;
        transition: all 0.25s ease;

        &:hover {
            transform: translateX(4px);
            box-shadow: ${({ theme }) => theme.shadow};
        }
    }

    .history-icon {
        width: 36px;
        height: 36px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;

        i {
            font-size: 0.85rem;
            color: #fff;
        }
    }

    .history-item.income .history-icon {
        background: linear-gradient(135deg, #42AD00, #2ED8A3);
    }

    .history-item.expense .history-icon {
        background: linear-gradient(135deg, #E74C3C, #F56692);
    }

    .history-info {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 0.1rem;
        min-width: 0;
    }

    .history-title {
        font-size: 0.9rem;
        font-weight: 700;
        color: ${({ theme }) => theme.textPrimary};
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .history-type {
        font-size: 0.7rem;
        font-weight: 600;
        color: ${({ theme }) => theme.textMuted};
        text-transform: uppercase;
        letter-spacing: 0.4px;
    }

    .history-amount {
        font-weight: 800;
        font-size: 0.95rem;
        flex-shrink: 0;

        &.income {
            color: #42AD00;
        }

        &.expense {
            color: #E74C3C;
        }
    }
`;

export default History
