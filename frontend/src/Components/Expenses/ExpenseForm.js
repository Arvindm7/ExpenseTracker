import React, { useState } from 'react'
import styled from 'styled-components'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { useGlobalContext } from '../../context/globalContext';
import Button from '../Button/Button';
import { plus } from '../../utils/icons'


function ExpenseForm() {
    const {addExpense,error,setError} = useGlobalContext()
    const [inputState, setInputState] = useState({
        title: '',
        amount: '',
        date: '',
        category: '',
        description: '',
        isRecurring: false,
    })

    const { title, amount, date, category, description, isRecurring } = inputState;

    const handleInput = name => e => {
        setInputState({...inputState, [name]: e.target.value})
        setError('');
    }

    const handleSubmit = e => {
        e.preventDefault()
        addExpense(inputState)
        setInputState({
            title: '',
            amount: '',
            date: '',
            category: '',
            description: '',
            isRecurring: false,
        })
    }

    return (
        <ExpenseFormStyled onSubmit={handleSubmit}>

            {error && <p className='error'>{error}</p>}
            <div className="input-control">
                <input 
                    type="text" 
                    value={title}
                    name={'title'} 
                    placeholder="Expense Title"
                    onChange={handleInput('title')}
                />
            </div>
            <div className="input-control">
                <input value={amount}  
                    type="text" 
                    name={'amount'} 
                    placeholder={'Expense Amount'}
                    onChange={handleInput('amount')} 
                />
            </div>
            <div className="input-control">
                <DatePicker 
                    id='date'
                    placeholderText='Enter A Date'
                    selected={date}
                    dateFormat="dd/MM/yyyy"
                    onChange={(date) => {
                        setInputState({...inputState, date: date})
                    }}
                />
            </div>
            <div className="selects input-control">
                <select required value={category} name="category" id="category" onChange={handleInput('category')}>
                    <option value="" disabled >Select Category</option>
                    <option value="education">Education</option>
                    <option value="groceries">Groceries</option>
                    <option value="health">Health</option>
                    <option value="subscriptions">Subscriptions</option>
                    <option value="takeaways">Takeaways</option>
                    <option value="clothing">Clothing</option>  
                    <option value="travelling">Travelling</option>
                    <option value="investment">Investment</option>
                    <option value="shopping">Shopping</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="fuel">Fuel</option>
                    <option value="rent">Rent</option>
                    <option value="insurance">Insurance</option>
                    <option value="other">Other</option>  
                </select>
            </div>
            <div className="input-control">
                <textarea name="description" value={description} placeholder='Add A Reference' id="description" cols="30" rows="4" onChange={handleInput('description')}></textarea>
            </div>
            <div className="recurring-toggle">
                <label className="toggle-label">
                    <input
                        type="checkbox"
                        checked={isRecurring}
                        onChange={() => setInputState({...inputState, isRecurring: !isRecurring})}
                    />
                    <span className="toggle-slider"></span>
                    <span className="toggle-text">
                        <i className="fa-solid fa-rotate"></i>
                        Recurring Monthly
                    </span>
                </label>
            </div>
            <div className="submit-btn">
                <Button 
                    name={'Add Expense'}
                    icon={plus}
                    bPad={'.8rem 1.6rem'}
                    bRad={'30px'}
                    bg={'var(--color-accent'}
                    color={'#fff'}
                />
            </div>
        </ExpenseFormStyled>
    )
}


const ExpenseFormStyled = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    padding: 1.5rem;
    background: ${({ theme }) => theme.bgCard};
    border-radius: 20px;
    border: 2px solid ${({ theme }) => theme.borderColor};
    box-shadow: ${({ theme }) => theme.shadow};
    transition: all 0.3s ease;

    input, textarea, select{
        font-family: inherit;
        font-size: 0.9rem;
        outline: none;
        border: none;
        padding: .7rem 1rem;
        border-radius: 12px;
        border: 2px solid ${({ theme }) => theme.borderColor};
        background: transparent;
        resize: none;
        color: ${({ theme }) => theme.textPrimary};
        transition: all 0.3s ease;
        &::placeholder{
            color: ${({ theme }) => theme.textPlaceholder};
        }
        &:focus{
            border-color: var(--color-accent);
            background: ${({ theme }) => theme.bgInput};
        }
    }
    .input-control{
        input{
            width: 100%;
        }
    }

    .selects{
        display: flex;
        position: relative;
        select{
            width: 100%;
            appearance: none;
            cursor: pointer;
            color: ${({ theme }) => theme.textSecondary};
            &:focus, &:active{
                color: ${({ theme }) => theme.textPrimary};
            }
            option {
                background: ${({ theme }) => theme.bgCard};
                color: ${({ theme }) => theme.textPrimary};
            }
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

    .submit-btn{
        button{
            width: 100%;
            justify-content: center;
            background: linear-gradient(135deg, #6C63FF, #5DADE2) !important;
            box-shadow: 0 4px 15px rgba(108, 99, 255, 0.25);
            border-radius: 14px !important;
            padding: 0.8rem 1.6rem !important;
            font-weight: 700;
            font-size: 0.9rem;
            transition: all 0.3s ease;
            &:hover{
                transform: translateY(-2px);
                box-shadow: 0 6px 25px rgba(108, 99, 255, 0.4) !important;
            }
        }
    }

    .recurring-toggle {
        .toggle-label {
            display: flex;
            align-items: center;
            gap: 0.7rem;
            cursor: pointer;
            user-select: none;

            input {
                display: none;
            }

            .toggle-slider {
                width: 40px;
                height: 22px;
                border-radius: 11px;
                background: ${({ theme }) => theme.borderColor};
                position: relative;
                transition: all 0.3s ease;
                flex-shrink: 0;

                &::after {
                    content: '';
                    width: 16px;
                    height: 16px;
                    border-radius: 50%;
                    background: #fff;
                    position: absolute;
                    top: 3px;
                    left: 3px;
                    transition: all 0.3s ease;
                    box-shadow: 0 1px 4px rgba(0,0,0,0.15);
                }
            }

            input:checked + .toggle-slider {
                background: linear-gradient(135deg, #6C63FF, #5DADE2);

                &::after {
                    left: 21px;
                }
            }

            .toggle-text {
                display: flex;
                align-items: center;
                gap: 0.4rem;
                font-size: 0.82rem;
                font-weight: 600;
                color: ${({ theme }) => theme.textSecondary};

                i {
                    font-size: 0.8rem;
                    color: #6C63FF;
                }
            }
        }
    }
`;
export default ExpenseForm