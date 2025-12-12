// screens/SettingsScreen.js

import { useContext, useState } from "react";
import {
    ActivityIndicator,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { AppContext } from "../context/AppContext";

export default function SettingsScreen() {
  const { theme, setTheme, currency, setCurrency } = useContext(AppContext);
  const [rate, setRate] = useState(null);
  const [loading, setLoading] = useState(false);

  const isDark = theme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  const toggleCurrency = () => {
    setCurrency(currency === "USD" ? "CAD" : "USD");
  };

  const fetchRate = async () => {
    try {
      setLoading(true);
      const res = await fetch("https://api.exchangerate-api.com/v4/latest/USD");
      const data = await res.json();
      setRate(data.rates?.CAD || null);
    } catch (err) {
      console.log("Error fetching rate:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Settings</Text>

      <View style={styles.row}>
        <Text>Dark Theme</Text>
        <Switch value={isDark} onValueChange={toggleTheme} />
      </View>

      <View style={styles.row}>
        <Text>Currency: {currency}</Text>
        <TouchableOpacity style={styles.button} onPress={toggleCurrency}>
          <Text style={styles.buttonText}>Toggle USD / CAD</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.rowCol}>
        <Text style={{ marginBottom: 6 }}>Fetch USD → CAD Rate</Text>
        <TouchableOpacity style={styles.button} onPress={fetchRate}>
          <Text style={styles.buttonText}>Get Rate</Text>
        </TouchableOpacity>
        {loading && <ActivityIndicator style={{ marginTop: 8 }} />}
        {rate && (
          <Text style={{ marginTop: 8 }}>
            1 USD = {rate.toFixed(4)} CAD (via API)
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: { fontSize: 20, fontWeight: "bold", marginBottom: 16 },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  rowCol: { marginTop: 10 },
  button: {
    backgroundColor: "#2196F3",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    marginLeft: 10,
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
});
