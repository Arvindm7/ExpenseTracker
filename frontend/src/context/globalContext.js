import React, { useContext, useState } from "react";
import axios from "axios";

// Base URL for the API
const BASE_URL = "https://expensetracker-qc7c.onrender.com/api/v1/";

// Create a context for global state management
const globalContext = React.createContext();

// GlobalProvider component to provide global state to its children
export const GlobalProvider = ({ children }) => {
  // State to store incomes, expenses, and error messages
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);

  // Function to add a new income
  const addIncome = async (income) => {
    try {
      const response = await axios.post(`${BASE_URL}add-income`, income);
      getIncomes(); 
    } catch (err) {
      setError(err.response.data.message);
    }
  };


  // Function to get all incomes
  const getIncomes = async () => {
    const response = await axios.get(`${BASE_URL}get-incomes`);
    setIncomes(response.data); 
    console.log(response.data);
  };

  // Function to delete an income by ID
  const deleteIncome = async (id) => {
    const res = await axios.delete(`${BASE_URL}delete-income/${id}`);
    getIncomes(); 
  };

  // Function to calculate total income
  const totalIncome = () => {
    let totalIncome = 0;
    incomes.forEach((income) => {
      totalIncome += income.amount;
    });
    return totalIncome;
  };

  // Function to add a new expense
  const addExpense = async (income) => {
    try {
      const response = await axios.post(`${BASE_URL}add-expense`, income);
      getExpenses(); 
    } catch (err) {
      setError(err.response.data.message); 
    }
  };

  // Function to get all expenses
  const getExpenses = async () => {
    const response = await axios.get(`${BASE_URL}get-expenses`);
    setExpenses(response.data); // Update expenses state with fetched data
    console.log(response.data);
  };

  // Function to delete an expense by ID
  const deleteExpense = async (id) => {
    const res = await axios.delete(`${BASE_URL}delete-expense/${id}`);
    getExpenses(); 
  };

  // Function to calculate total expenses
  const totalExpenses = () => {
    let totalIncome = 0;
    expenses.forEach((income) => {
      totalIncome += income.amount;
    });
    return totalIncome;
  };

  // Function to get the transaction history, sorted by creation date
  const transactionHistory = () => {
    const history = [...incomes, ...expenses];
    history.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }); 
    return history.slice(0, 5); // Return the latest 5 transactions
  };

  // Function to calculate total balance
  const totalBalance = () => {
    return totalIncome() - totalExpenses();
  };

  return (
    <globalContext.Provider
      value={{
        addIncome,
        getIncomes,
        incomes,
        deleteIncome,
        totalIncome,
        addExpense,
        getExpenses,
        deleteExpense,
        totalExpenses,
        expenses,
        totalBalance,
        transactionHistory,
        error,
        setError,
      }}
    >
      {children}
    </globalContext.Provider>
  );
};

// Custom hook to use the global context
export const useGlobalContext = () => {
  return useContext(globalContext);
};
