import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const INCOME_CATEGORIES = [
    { value: 'salary', label: 'Salary' },
    { value: 'freelancing', label: 'Freelancing' },
    { value: 'investments', label: 'Investments' },
    { value: 'stocks', label: 'Stocks' },
    { value: 'bitcoin', label: 'Bitcoin' },
    { value: 'bank', label: 'Bank Transfer' },
    { value: 'youtube', label: 'YouTube' },
    { value: 'other', label: 'Other' },
];

const EXPENSE_CATEGORIES = [
    { value: 'education', label: 'Education' },
    { value: 'groceries', label: 'Groceries' },
    { value: 'health', label: 'Health' },
    { value: 'subscriptions', label: 'Subscriptions' },
    { value: 'takeaways', label: 'Takeaways' },
    { value: 'clothing', label: 'Clothing' },
    { value: 'travelling', label: 'Travelling' },
    { value: 'investment', label: 'Investment' },
    { value: 'shopping', label: 'Shopping' },
    { value: 'entertainment', label: 'Entertainment' },
    { value: 'fuel', label: 'Fuel' },
    { value: 'rent', label: 'Rent' },
    { value: 'insurance', label: 'Insurance' },
    { value: 'other', label: 'Other' },
];

function EditModal({ item, type, onSave, onClose }) {
    const [formData, setFormData] = useState({
        title: '',
        amount: '',
        date: new Date(),
        category: '',
        description: '',
    });

    useEffect(() => {
        if (item) {
            setFormData({
                title: item.title || '',
                amount: item.amount || '',
                date: item.date ? new Date(item.date) : new Date(),
                category: item.category || '',
                description: item.description || '',
            });
        }
    }, [item]);

    const handleInput = (name) => (e) => {
        setFormData({ ...formData, [name]: e.target.value });
    };

    const handleDateChange = (date) => {
        setFormData({ ...formData, date });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(item._id, {
            ...formData,
            amount: parseFloat(formData.amount),
        });
    };

    const categories = type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

    return (
        <ModalOverlay onClick={onClose}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>
                        <i className="fa-solid fa-pen-to-square"></i>
                        Edit {type === 'income' ? 'Income' : 'Expense'}
                    </h2>
                    <button className="close-btn" onClick={onClose}>
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Title</label>
                        <input
                            type="text"
                            placeholder="Transaction title"
                            value={formData.title}
                            onChange={handleInput('title')}
                            required
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Amount (₹)</label>
                            <input
                                type="number"
                                placeholder="Amount"
                                value={formData.amount}
                                onChange={handleInput('amount')}
                                required
                                min="1"
                            />
                        </div>
                        <div className="form-group">
                            <label>Date</label>
                            <DatePicker
                                selected={formData.date}
                                onChange={handleDateChange}
                                dateFormat="dd/MM/yyyy"
                                maxDate={new Date()}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Category</label>
                        <div className="selects">
                            <select
                                value={formData.category}
                                onChange={handleInput('category')}
                                required
                            >
                                <option value="" disabled>Select Category</option>
                                {categories.map((cat) => (
                                    <option key={cat.value} value={cat.value}>
                                        {cat.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Description</label>
                        <textarea
                            placeholder="Add a description..."
                            value={formData.description}
                            onChange={handleInput('description')}
                            rows="3"
                            required
                        />
                    </div>

                    <div className="form-actions">
                        <button type="button" className="cancel-btn" onClick={onClose}>
                            Cancel
                        </button>
                        <button type="submit" className="save-btn">
                            <i className="fa-solid fa-check"></i>
                            Save Changes
                        </button>
                    </div>
                </form>
            </ModalContent>
        </ModalOverlay>
    );
}

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(6px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2000;
    padding: 1rem;
    animation: fadeIn 0.2s ease-out;

    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
`;

const ModalContent = styled.div`
    background: ${({ theme }) => theme.bgCard};
    border: 2px solid ${({ theme }) => theme.borderColor};
    border-radius: 24px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    width: 100%;
    max-width: 500px;
    max-height: 90vh;
    overflow-y: auto;
    padding: 2rem;
    animation: slideUp 0.3s ease-out;

    @keyframes slideUp {
        from { opacity: 0; transform: translateY(30px) scale(0.95); }
        to { opacity: 1; transform: translateY(0) scale(1); }
    }

    .modal-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 1.5rem;

        h2 {
            display: flex;
            align-items: center;
            gap: 0.6rem;
            font-size: 1.3rem;
            color: ${({ theme }) => theme.textPrimary};

            i {
                color: #6C63FF;
            }
        }

        .close-btn {
            width: 36px;
            height: 36px;
            border-radius: 10px;
            border: 2px solid ${({ theme }) => theme.borderColor};
            background: transparent;
            color: ${({ theme }) => theme.textSecondary};
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1rem;
            transition: all 0.2s;

            &:hover {
                border-color: var(--color-delete);
                color: var(--color-delete);
                background: rgba(231, 76, 60, 0.06);
            }
        }
    }

    form {
        display: flex;
        flex-direction: column;
        gap: 1.2rem;
    }

    .form-group {
        display: flex;
        flex-direction: column;
        gap: 0.4rem;

        label {
            font-size: 0.8rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            color: ${({ theme }) => theme.textSecondary};
        }

        input, textarea, select {
            font-family: inherit;
            font-size: 0.9rem;
            padding: 0.7rem 1rem;
            border-radius: 12px;
            border: 2px solid ${({ theme }) => theme.borderColor};
            background: transparent;
            color: ${({ theme }) => theme.textPrimary};
            outline: none;
            resize: none;
            transition: all 0.3s ease;
            width: 100%;

            &::placeholder {
                color: ${({ theme }) => theme.textPlaceholder};
            }

            &:focus {
                border-color: #6C63FF;
                background: ${({ theme }) => theme.bgInput};
            }
        }
    }

    .form-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
    }

    .selects {
        position: relative;

        select {
            appearance: none;
            cursor: pointer;
            width: 100%;
        }

        &::after {
            content: "▼";
            position: absolute;
            right: 1rem;
            top: 50%;
            transform: translateY(-50%);
            pointer-events: none;
            color: ${({ theme }) => theme.textSecondary};
            font-size: 0.7rem;
        }
    }

    .react-datepicker-wrapper {
        width: 100%;
    }

    .form-actions {
        display: flex;
        gap: 0.8rem;
        margin-top: 0.5rem;

        button {
            flex: 1;
            padding: 0.75rem 1.2rem;
            border-radius: 14px;
            font-family: inherit;
            font-size: 0.9rem;
            font-weight: 700;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            transition: all 0.3s ease;
        }

        .cancel-btn {
            background: transparent;
            border: 2px solid ${({ theme }) => theme.borderColor};
            color: ${({ theme }) => theme.textSecondary};

            &:hover {
                border-color: var(--color-delete);
                color: var(--color-delete);
            }
        }

        .save-btn {
            background: linear-gradient(135deg, #6C63FF, #5DADE2);
            border: none;
            color: #fff;
            box-shadow: 0 4px 15px rgba(108, 99, 255, 0.25);

            &:hover {
                transform: translateY(-2px);
                box-shadow: 0 6px 25px rgba(108, 99, 255, 0.4);
            }
        }
    }

    @media (max-width: 500px) {
        padding: 1.5rem;

        .form-row {
            grid-template-columns: 1fr;
        }

        .modal-header h2 {
            font-size: 1.1rem;
        }
    }
`;

export default EditModal;
