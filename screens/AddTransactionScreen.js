import { useContext, useState } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";
import { AppContext } from "../context/AppContext";

export default function AddTransactionScreen({ navigation }) {
  const { addTransaction } = useContext(AppContext);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");

  const save = () => {
    addTransaction({
      id: Date.now().toString(),
      title,
      amount: parseFloat(amount),
      type
    });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Title" style={styles.input} onChangeText={setTitle} />
      <TextInput placeholder="Amount" style={styles.input} onChangeText={setAmount} keyboardType="numeric" />
      <TextInput placeholder="Type (income/expense)" style={styles.input} onChangeText={setType} />

      <Button title="Save" onPress={save} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: { borderWidth: 1, padding: 10, borderRadius: 8, marginVertical: 8 }
});
