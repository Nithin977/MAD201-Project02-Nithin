import { useContext } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import TransactionItem from "../components/TransactionItem";
import { AppContext } from "../context/AppContext";

export default function TransactionsScreen() {
  const { transactions, deleteTransaction } = useContext(AppContext);

  return (
    <View style={styles.container}>
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TransactionItem item={item} onDelete={deleteTransaction} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15 },
});
