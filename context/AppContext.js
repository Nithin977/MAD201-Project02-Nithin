import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [theme, setTheme] = useState("light");
  const [currency, setCurrency] = useState("USD");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const saved = await AsyncStorage.getItem("transactions");
    if (saved) setTransactions(JSON.parse(saved));
  };

  const addTransaction = async (item) => {
    const updated = [...transactions, item];
    setTransactions(updated);
    await AsyncStorage.setItem("transactions", JSON.stringify(updated));
  };

  const deleteTransaction = async (id) => {
    const updated = transactions.filter((t) => t.id !== id);
    setTransactions(updated);
    await AsyncStorage.setItem("transactions", JSON.stringify(updated));
  };

  return (
    <AppContext.Provider
      value={{ transactions, addTransaction, deleteTransaction, theme, setTheme, currency, setCurrency }}
    >
      {children}
    </AppContext.Provider>
  );
};
