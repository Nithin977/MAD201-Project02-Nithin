// components/TransactionItem.js

import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function TransactionItem({ item, onDelete }) {
  const isIncome = item.type === "income";

  return (
    <View style={styles.row}>
      <View style={styles.info}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.meta}>
          {item.category || "General"} • {item.type.toUpperCase()}
        </Text>
      </View>
      <Text style={[styles.amount, isIncome ? styles.income : styles.expense]}>
        {isIncome ? "+" : "-"}${item.amount.toFixed(2)}
      </Text>
      <TouchableOpacity onPress={() => onDelete(item.id)} style={styles.delete}>
        <Text style={styles.deleteText}>X</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderColor: "#ddd",
    alignItems: "center",
  },
  info: {
    flex: 1,
  },
  title: {
    fontWeight: "bold",
  },
  meta: {
    fontSize: 12,
    color: "#666",
  },
  amount: {
    width: 80,
    textAlign: "right",
    fontWeight: "bold",
  },
  income: {
    color: "green",
  },
  expense: {
    color: "red",
  },
  delete: {
    marginLeft: 10,
    padding: 6,
    borderRadius: 6,
    backgroundColor: "#ff6666",
  },
  deleteText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },
});
