import React, { useContext, useState, useCallback } from "react";
import axios from "axios";
import { useToast } from "../Components/Toast/Toast";

// Base URL for the API
const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api/v1/";

// Create a context for global state management
const globalContext = React.createContext();

// GlobalProvider component to provide global state to its children
export const GlobalProvider = ({ children }) => {
  // State to store incomes, expenses, error messages, and loading
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const toast = useToast();

  // Helper: get auth headers from localStorage
  // (axios defaults are also set by authContext, but this is a safety net)
  const getAuthConfig = useCallback(() => {
    const token = localStorage.getItem('expense-tracker-token');
    return token
      ? { headers: { Authorization: `Bearer ${token}` } }
      : {};
  }, []);

  // Function to add a new income
  const addIncome = async (income) => {
    try {
      setLoading(true);
      await axios.post(`${BASE_URL}add-income`, income, getAuthConfig());
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
      const response = await axios.get(`${BASE_URL}get-incomes`, getAuthConfig());
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
      await axios.delete(`${BASE_URL}delete-income/${id}`, getAuthConfig());
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
      await axios.post(`${BASE_URL}add-expense`, expense, getAuthConfig());
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
      const response = await axios.get(`${BASE_URL}get-expenses`, getAuthConfig());
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
      await axios.delete(`${BASE_URL}delete-expense/${id}`, getAuthConfig());
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


  // Function to update an income
  const updateIncome = async (id, incomeData) => {
    try {
      setLoading(true);
      await axios.put(`${BASE_URL}update-income/${id}`, incomeData, getAuthConfig());
      await getIncomes();
      toast.success("Income updated successfully!");
    } catch (err) {
      const message = err.response?.data?.message || "Failed to update income";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  // Function to update an expense
  const updateExpense = async (id, expenseData) => {
    try {
      setLoading(true);
      await axios.put(`${BASE_URL}update-expense/${id}`, expenseData, getAuthConfig());
      await getExpenses();
      toast.success("Expense updated successfully!");
    } catch (err) {
      const message = err.response?.data?.message || "Failed to update expense";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  // ---- Budget Functions ----

  // Function to set or update a budget for a category
  const setBudgetLimit = async (budgetData) => {
    try {
      setLoading(true);
      await axios.post(`${BASE_URL}set-budget`, budgetData, getAuthConfig());
      await getBudgets(budgetData.month, budgetData.year);
      toast.success("Budget set successfully!");
    } catch (err) {
      const message = err.response?.data?.message || "Failed to set budget";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  // Function to get budgets for a specific month/year
  const getBudgets = async (month, year) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${BASE_URL}get-budgets?month=${month}&year=${year}`,
        getAuthConfig()
      );
      setBudgets(response.data);
    } catch (err) {
      toast.error("Failed to fetch budgets");
    } finally {
      setLoading(false);
    }
  };

  // Function to delete a budget
  const deleteBudget = async (id, month, year) => {
    try {
      setLoading(true);
      await axios.delete(`${BASE_URL}delete-budget/${id}`, getAuthConfig());
      await getBudgets(month, year);
      toast.success("Budget removed");
    } catch (err) {
      toast.error("Failed to delete budget");
    } finally {
      setLoading(false);
    }
  };

  // Function to clear all data on logout
  const clearData = () => {
    setIncomes([]);
    setExpenses([]);
    setBudgets([]);
    setError(null);
  };

  // Function to process recurring transactions for the current month
  const processRecurring = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`${BASE_URL}process-recurring`, {}, getAuthConfig());
      const { created, message } = response.data;
      if (created > 0) {
        await getIncomes();
        await getExpenses();
        toast.success(message);
      } else {
        toast.info(message);
      }
      return response.data;
    } catch (err) {
      toast.error("Failed to process recurring transactions");
    } finally {
      setLoading(false);
    }
  };

  return (
    <globalContext.Provider
      value={{
        addIncome,
        getIncomes,
        incomes,
        deleteIncome,
        updateIncome,
        totalIncome,
        addExpense,
        getExpenses,
        deleteExpense,
        updateExpense,
        totalExpenses,
        expenses,
        totalBalance,
        transactionHistory,
        error,
        setError,
        loading,
        clearData,
        budgets,
        setBudgetLimit,
        getBudgets,
        deleteBudget,
        processRecurring,
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
