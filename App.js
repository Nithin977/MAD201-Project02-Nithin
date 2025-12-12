// App.js
// Course: F2025 MAD201-01 Cross Platform MA
// Project 2 - Smart Budget Tracker Lite
// Student: Nithin Amin, A00194332

import { NavigationContainer } from "@react-navigation/native";
import { AppProvider } from "./context/AppContext";
import AppNavigator from "./navigation/AppNavigator";

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AppProvider>
  );
}
