// screens/ReportsScreen.js

import { useContext, useMemo } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { AppContext } from "../context/AppContext";

export default function ReportsScreen() {
  const { transactions, currency } = useContext(AppContext);

  const summary = useMemo(() => {
    const result = {};
    transactions.forEach((tx) => {
      const cat = tx.category || "General";
      if (!result[cat]) {
        result[cat] = { income: 0, expense: 0 };
      }
      if (tx.type === "income") {
        result[cat].income += tx.amount;
      } else {
        result[cat].expense += tx.amount;
      }
    });
    return result;
  }, [transactions]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Reports & Summary</Text>

      {Object.keys(summary).length === 0 ? (
        <Text>No data available for reports.</Text>
      ) : (
        Object.entries(summary).map(([cat, values]) => (
          <View key={cat} style={styles.card}>
            <Text style={styles.category}>{cat}</Text>
            <Text>
              Income: {currency} {values.income.toFixed(2)}
            </Text>
            <Text>
              Expense: {currency} {values.expense.toFixed(2)}
            </Text>
            <Text>
              Net: {currency} {(values.income - values.expense).toFixed(2)}
            </Text>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: { fontSize: 20, fontWeight: "bold", marginBottom: 12 },
  card: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  category: { fontWeight: "bold", marginBottom: 4 },
});
