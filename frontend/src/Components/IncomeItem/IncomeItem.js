import React from 'react'
import styled from 'styled-components'
import { comment, trash, calender, rupees, money, freelance, stocks, users, bitcoin, card, yt, piggy, book, food, medical, tv, takeaway, clothing, circle } from '../../utils/icons'
import Button from '../Button/Button'

function IncomeItem({
    id,
    title,
    amount,
    date,
    category,
    description,
    deleteItem,
    indicatorColor,
    type
}) {

    const categoryIcon = () =>{
        switch(category) {
            case 'salary':
                return money;
            case 'freelancing':
                return freelance
            case 'investments':
                return stocks;
            case 'stocks':
                return users;
            case 'bitcoin':
                return bitcoin;
            case 'bank':
                return card;
            case 'youtube':
                return yt;
            case 'other':
                return piggy;
            default:
                return ''
        }
    }

    const expenseCatIcon = () => {
        switch (category) {
            case 'education':
                return book;
            case 'groceries':
                return food;
            case 'health':
                return medical;
            case 'subscriptions':
                return tv;
            case 'takeaways':
                return takeaway;
            case 'clothing':
                return clothing;
            case 'travelling':
                return freelance;
            case 'other':
                return circle;
            default:
                return ''
        }
    }

  return (
    <IncomeItemStyled indicator={indicatorColor} itemType={type}>
        <div className="icon-wrapper">
            {type === 'expense' ? expenseCatIcon() : categoryIcon()}
        </div>
        <div className="content">
            <div className="title-row">
                <h5>{title}</h5>
                <span className="amount-badge">
                    {type === 'expense' ? '-' : '+'}₹{amount.toLocaleString('en-IN')}
                </span>
            </div>
            <div className="details-row">
                <div className="detail-chip">
                    {calender} <span>{date}</span>
                </div>
                <div className="detail-chip">
                    <span className="category-tag">{category}</span>
                </div>
                {description && (
                    <div className="detail-chip desc">
                        {comment} <span>{description}</span>
                    </div>
                )}
            </div>
        </div>
        <div className="delete-btn">
            <Button
                icon={trash}
                bPad={'0.7rem'}
                bRad={'12px'}
                bg={'var(--primary-color'}
                color={'#fff'}
                iColor={'#fff'}
                hColor={'var(--color-delete)'}
                onClick={() => deleteItem(id)}
            />
        </div>
    </IncomeItemStyled>
  )
}

const IncomeItemStyled = styled.div`
    background: ${({ theme }) => theme.bgCard};
    border: 2px solid ${({ theme }) => theme.borderColor};
    box-shadow: ${({ theme }) => theme.shadow};
    border-radius: 18px;
    padding: 1rem 1.2rem;
    margin-bottom: 0.8rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    width: 100%;
    color: ${({ theme }) => theme.textPrimary};
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-2px);
        box-shadow: ${({ theme }) => theme.shadowHover};
    }

    .icon-wrapper {
        width: 52px;
        height: 52px;
        border-radius: 14px;
        background: ${props => props.itemType === 'expense'
            ? 'linear-gradient(135deg, rgba(231,76,60,0.12), rgba(245,102,146,0.12))'
            : 'linear-gradient(135deg, rgba(66,173,0,0.12), rgba(46,216,163,0.12))'};
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        border: 1.5px solid ${props => props.itemType === 'expense'
            ? 'rgba(231,76,60,0.15)'
            : 'rgba(66,173,0,0.15)'};

        i {
            font-size: 1.5rem;
            color: ${props => props.itemType === 'expense' ? '#E74C3C' : '#42AD00'};
        }
    }

    .content {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 0.4rem;
        min-width: 0;
    }

    .title-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 0.8rem;

        h5 {
            font-size: 1.05rem;
            font-weight: 700;
            color: ${({ theme }) => theme.textPrimary};
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }

    .amount-badge {
        font-size: 1.1rem;
        font-weight: 800;
        flex-shrink: 0;
        color: ${props => props.itemType === 'expense' ? '#E74C3C' : '#42AD00'};
    }

    .details-row {
        display: flex;
        align-items: center;
        gap: 0.8rem;
        flex-wrap: wrap;
    }

    .detail-chip {
        display: flex;
        align-items: center;
        gap: 0.3rem;
        font-size: 0.78rem;
        color: ${({ theme }) => theme.textMuted};
        font-weight: 600;

        i {
            font-size: 0.8rem;
        }

        &.desc {
            max-width: 200px;
            span {
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }
    }

    .category-tag {
        text-transform: capitalize;
        background: ${({ theme }) => theme.navActiveBg};
        padding: 0.15rem 0.6rem;
        border-radius: 6px;
        font-size: 0.72rem;
        font-weight: 700;
        letter-spacing: 0.3px;
    }

    .delete-btn {
        flex-shrink: 0;

        button {
            background: transparent !important;
            border: 1.5px solid ${({ theme }) => theme.borderColor} !important;
            transition: all 0.25s ease !important;
            
            i {
                color: ${({ theme }) => theme.textMuted} !important;
                font-size: 1rem;
            }

            &:hover {
                border-color: var(--color-delete) !important;
                background: rgba(231, 76, 60, 0.08) !important;
                i {
                    color: var(--color-delete) !important;
                }
            }
        }
    }

    @media (max-width: 700px) {
        flex-direction: column;
        align-items: flex-start;

        .title-row {
            width: 100%;
        }

        .delete-btn {
            align-self: flex-end;
        }
    }
`;


export default IncomeItem
