import React, { useEffect } from "react";
import styled from "styled-components";
import { InnerLayout } from "../../styles/Layouts";
import { useGlobalContext } from "../../context/globalContext";
import Form from "../Form/Form";
import IncomeItem from "../IncomeItem/IncomeItem";
import { dateFormat } from "../../utils/dateFormat";

function Income(){

    const {incomes,getIncomes,deleteIncome,totalIncome}=useGlobalContext();

    useEffect(()=>{
        getIncomes();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
        <IncomeStyled>
            <InnerLayout>
                <div className="page-header">
                    <div className="header-left">
                        <h1>Incomes</h1>
                        <p className="page-subtitle">Track and manage your income sources</p>
                    </div>
                    <div className="total-badge income-badge">
                        <div className="badge-icon">
                            <i className="fa-solid fa-arrow-trend-up"></i>
                        </div>
                        <div className="badge-info">
                            <span className="badge-label">Total Income</span>
                            <span className="badge-value">₹{totalIncome().toLocaleString('en-IN')}</span>
                        </div>
                    </div>
                </div>
                <div className="income-content">
                    <div className="form-container">
                        <div className="section-header">
                            <div className="section-icon">
                                <i className="fa-solid fa-plus"></i>
                            </div>
                            <h3>Add New Income</h3>
                        </div>
                        <Form />
                    </div>
                    <div className="list-container">
                        <div className="section-header">
                            <div className="section-icon list-icon">
                                <i className="fa-solid fa-list"></i>
                            </div>
                            <h3>Recent Incomes</h3>
                            <span className="item-count">{incomes.length} entries</span>
                        </div>
                        <div className="incomes">
                            {incomes.length === 0 && (
                                <div className="empty-state">
                                    <div className="empty-icon-wrapper">
                                        <i className="fa-solid fa-coins"></i>
                                    </div>
                                    <h3>No income entries yet</h3>
                                    <p>Add your first income using the form</p>
                                </div>
                            )}
                            {incomes.map((income)=>{
                                const {_id, title, amount , date, category, description,type} = income;
                                return <IncomeItem
                                    key={_id}
                                    id={_id}
                                    title={title}
                                    description={description}
                                    amount={amount}
                                    date={dateFormat(date)}
                                    type={type}
                                    category={category}
                                    indicatorColor="var(--color-green)"
                                    deleteItem={deleteIncome}
                                />
                            })}
                        </div>
                    </div>
                </div>
            </InnerLayout>
        </IncomeStyled>
    )
}

const IncomeStyled=styled.div`
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
        display: flex;
        flex-direction: column;
        gap: 0.2rem;

        h1 {
            font-size: 1.8rem;
            font-weight: 800;
        }
    }

    .page-subtitle {
        font-size: 0.85rem;
        color: ${({ theme }) => theme.textMuted};
        font-weight: 500;
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

    .income-badge .badge-icon {
        background: linear-gradient(135deg, #42AD00, #2ED8A3);
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
        color: #42AD00;
    }

    .income-content {
        display: grid;
        grid-template-columns: 380px 1fr;
        gap: 1.5rem;
        flex: 1;
        min-height: 0;
    }

    .form-container {
        display: flex;
        flex-direction: column;
        gap: 0;
        align-self: flex-start;
        position: sticky;
        top: 0;
    }

    .section-header {
        display: flex;
        align-items: center;
        gap: 0.6rem;
        margin-bottom: 1rem;

        h3 {
            font-size: 1rem;
            font-weight: 700;
            color: ${({ theme }) => theme.textPrimary};
        }
    }

    .section-icon {
        width: 32px;
        height: 32px;
        border-radius: 10px;
        background: linear-gradient(135deg, #42AD00, #2ED8A3);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;

        i {
            font-size: 0.8rem;
            color: #fff;
        }
    }

    .list-icon {
        background: linear-gradient(135deg, #6C63FF, #5DADE2);
    }

    .item-count {
        margin-left: auto;
        font-size: 0.75rem;
        font-weight: 700;
        color: ${({ theme }) => theme.textMuted};
        background: ${({ theme }) => theme.navActiveBg};
        padding: 0.2rem 0.7rem;
        border-radius: 20px;
        letter-spacing: 0.3px;
    }

    .list-container {
        display: flex;
        flex-direction: column;
        min-height: 0;
    }

    .incomes {
        display: flex;
        flex-direction: column;
        gap: 0;
        flex: 1;
        min-height: 0;
    }

    .empty-state {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 3rem 1.5rem;
        text-align: center;
        color: ${({ theme }) => theme.textMuted};
        background: ${({ theme }) => theme.bgCard};
        border: 2px dashed ${({ theme }) => theme.borderColor};
        border-radius: 20px;

        .empty-icon-wrapper {
            width: 64px;
            height: 64px;
            border-radius: 50%;
            background: ${({ theme }) => theme.navActiveBg};
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 1.2rem;
        }

        i {
            font-size: 1.8rem;
            opacity: 0.5;
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

    @media (max-width: 1100px) {
        .income-content {
            grid-template-columns: 340px 1fr;
        }
    }

    @media (max-width: 900px) {
        .page-header {
            flex-direction: column;
            align-items: center;
            text-align: center;
            h1 { font-size: 1.4rem; }
        }
        .header-left {
            align-items: center;
        }
        .badge-value {
            font-size: 1.1rem;
        }
        .income-content {
            grid-template-columns: 1fr;
        }
        .form-container {
            position: static;
        }
    }
`;

export default Income