import React, { useContext, useState } from "react";
import axios from "axios";
import { useToast } from "../Components/Toast/Toast";

// Base URL for the API
const BASE_URL = "https://expensetracker-qc7c.onrender.com/api/v1/";

// Create a context for global state management
const globalContext = React.createContext();

// GlobalProvider component to provide global state to its children
export const GlobalProvider = ({ children }) => {
  // State to store incomes, expenses, error messages, and loading
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const toast = useToast();

  // Function to add a new income
  const addIncome = async (income) => {
    try {
      setLoading(true);
      await axios.post(`${BASE_URL}add-income`, income);
      await getIncomes();
      toast.success("Income added successfully!");
    } catch (err) {
      const message = err.response?.data?.message || "Failed to add income";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  // Function to get all incomes
  const getIncomes = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}get-incomes`);
      setIncomes(response.data);
    } catch (err) {
      toast.error("Failed to fetch incomes");
    } finally {
      setLoading(false);
    }
  };

  // Function to delete an income by ID
  const deleteIncome = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`${BASE_URL}delete-income/${id}`);
      await getIncomes();
      toast.success("Income deleted");
    } catch (err) {
      toast.error("Failed to delete income");
    } finally {
      setLoading(false);
    }
  };

  // Function to calculate total income
  const totalIncome = () => {
    let total = 0;
    incomes.forEach((income) => {
      total += income.amount;
    });
    return total;
  };

  // Function to add a new expense
  const addExpense = async (expense) => {
    try {
      setLoading(true);
      await axios.post(`${BASE_URL}add-expense`, expense);
      await getExpenses();
      toast.success("Expense added successfully!");
    } catch (err) {
      const message = err.response?.data?.message || "Failed to add expense";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  // Function to get all expenses
  const getExpenses = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}get-expenses`);
      setExpenses(response.data);
    } catch (err) {
      toast.error("Failed to fetch expenses");
    } finally {
      setLoading(false);
    }
  };

  // Function to delete an expense by ID
  const deleteExpense = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`${BASE_URL}delete-expense/${id}`);
      await getExpenses();
      toast.success("Expense deleted");
    } catch (err) {
      toast.error("Failed to delete expense");
    } finally {
      setLoading(false);
    }
  };

  // Function to calculate total expenses
  const totalExpenses = () => {
    let total = 0;
    expenses.forEach((expense) => {
      total += expense.amount;
    });
    return total;
  };

  // Function to get the transaction history, sorted by creation date
  const transactionHistory = () => {
    const history = [...incomes, ...expenses];
    history.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    return history.slice(0, 5);
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
        loading,
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
