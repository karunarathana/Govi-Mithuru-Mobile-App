import CustomerDash from "@/pages/customer/CustomerDash";
import LoginView from "@/pages/login/LoginView";
import OnboardingScreen from "@/pages/Sologon/OnboardingScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from 'react';

export default function HomeScreen() {
  const Stack = createNativeStackNavigator();
  return (
      <Stack.Navigator initialRouteName='Onboarding' screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="CustomerDash" component={CustomerDash} />
        <Stack.Screen name="LoginView" component={LoginView} />
      </Stack.Navigator>
  );
}
