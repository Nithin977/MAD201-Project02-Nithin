import { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AppContext } from "../context/AppContext";

export default function HomeScreen({ navigation }) {
  const { transactions } = useContext(AppContext);

  const income = transactions.filter(t => t.type === "income")
                             .reduce((s, t) => s + t.amount, 0);

  const expenses = transactions.filter(t => t.type === "expense")
                               .reduce((s, t) => s + t.amount, 0);

  const balance = income - expenses;

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text>Total Income</Text>
        <Text style={{color: "green"}}>${income}</Text>
      </View>

      <View style={styles.card}>
        <Text>Total Expenses</Text>
        <Text style={{color: "red"}}>${expenses}</Text>
      </View>

      <View style={styles.card}>
        <Text>Balance</Text>
        <Text style={{fontWeight:"bold"}}>${balance}</Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("AddTransaction")}
      >
        <Text style={styles.buttonText}>Add Transaction</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  card: { padding: 20, borderWidth: 1, borderRadius: 8, marginBottom: 10 },
  button: { backgroundColor: "#2196F3", padding: 15, borderRadius: 8, marginTop: 20 },
  buttonText: { color: "#fff", fontWeight: "bold", textAlign: "center" }
});
