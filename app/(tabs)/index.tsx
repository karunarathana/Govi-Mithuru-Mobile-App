import AdminDashboard from "@/pages/admin/AdminDashboard";
import CustomerDash from "@/pages/customer/CustomerDash";
import CreateAccView from "@/pages/login/CreateAccView";
import LoginView from "@/pages/login/LoginView";
import OnboardingScreen from "@/pages/Sologon/OnboardingScreen";
import SelectRoleView from "@/pages/Sologon/SelectRoleView";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from 'react';

export default function HomeScreen() {
  const Stack = createNativeStackNavigator();
  return (
      <Stack.Navigator initialRouteName='Onboarding' screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="CustomerDash" component={CustomerDash} />
        <Stack.Screen name="LoginView" component={LoginView} />
        <Stack.Screen name="AdminView" component={AdminDashboard} />
        <Stack.Screen name="CreateAccount" component={CreateAccView} />
        <Stack.Screen name="SelectRoleView" component={SelectRoleView} />
      </Stack.Navigator>
  );
}
