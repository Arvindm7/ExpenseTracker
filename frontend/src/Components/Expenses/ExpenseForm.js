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
    })

    const { title, amount, date, category,description } = inputState;

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
                    <option value="other">Other</option>  
                </select>
            </div>
            <div className="input-control">
                <textarea name="description" value={description} placeholder='Add A Reference' id="description" cols="30" rows="4" onChange={handleInput('description')}></textarea>
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
    gap: 1.5rem;
    padding: 2rem;
    background: ${({ theme }) => theme.bgCard};
    border-radius: 20px;
    border: 2px solid ${({ theme }) => theme.borderColor};
    box-shadow: ${({ theme }) => theme.shadow};

    input, textarea, select{
        font-family: inherit;
        font-size: inherit;
        outline: none;
        border: none;
        padding: .8rem 1.2rem;
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
            right: 1.2rem;
            top: 50%;
            transform: translateY(-50%);
            pointer-events: none;
            color: ${({ theme }) => theme.textSecondary};
            font-size: 0.8rem;
        }
    }

    .submit-btn{
        button{
            width: 100%;
            justify-content: center;
            background: linear-gradient(135deg, #6C63FF, #5DADE2) !important;
            box-shadow: 0 4px 15px rgba(108, 99, 255, 0.25);
            border-radius: 14px !important;
            padding: 0.85rem 1.6rem !important;
            font-weight: 700;
            transition: all 0.3s ease;
            &:hover{
                transform: translateY(-2px);
                box-shadow: 0 6px 25px rgba(108, 99, 255, 0.4) !important;
            }
        }
    }
`;
export default ExpenseForm