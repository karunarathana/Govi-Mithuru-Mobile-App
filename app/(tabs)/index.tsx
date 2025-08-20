import VerifyOtpView from "@/pages/login/VerifyOtpView";
import React from 'react';
import { View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={{ flex: 1 }}>
      <VerifyOtpView/>
    </View>
  );
}
