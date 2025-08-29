import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginView({ navigation }: any) {
  const [role, setRole] = useState<string>("farmer");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const sendLoginRequest = async () => {
    if (!email || !password) {
      alert("Please enter email and password!");
      return;
    }
    try {
      // const response = await loginAPI({ role, email, password });
      // if (response.status === "success") { navigation.replace("CustomerDash"); }
      // console.log({ role, email, password, isChecked });
      // navigation.replace("CustomerDash");
    } catch (error) {
      console.error(error);
      alert("Login failed!");
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/green-tea-bud-leaves-green-tea-plantations-morning.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.mainWrapper}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            {/* Header */}
            <View style={styles.customeHeaderFlex}>
              <Image style={styles.backImage}
                source={require('../../assets/previous.png')} />
              <Text style={styles.firstHeaderCusText}>Welcome Back 👏</Text>
              <Text style={styles.seccondHeaderCusText}>
                This is #Govi Mithuru Mobile App
              </Text>
            </View>

            {/* Body */}
            <View style={styles.customeBodyFlex}>
              <Text>What is your Role?</Text>
              <View style={styles.pickerWrapper}>
                <Picker
                  selectedValue={role}
                  onValueChange={(itemValue: string) => setRole(itemValue)}
                  style={styles.picker}
                >
                  <Picker.Item label="Farmer" value="farmer" />
                  <Picker.Item label="Supplier" value="supplier" />
                  <Picker.Item label="Customer" value="customer" />
                </Picker>
              </View>

              <Text>Email Address</Text>
              <TextInput
                style={styles.customTextFiled}
                placeholder="Hello@email.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
              />

              <View
                style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }}
              >
                <Text>Password</Text>
                <Text>Forgot Password?</Text>
              </View>
              <TextInput
                style={styles.customTextFiled}
                placeholder="Enter your password"
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
              />

              <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}>
                <Switch
                  value={isChecked}
                  onValueChange={setIsChecked}
                  thumbColor={isChecked ? "green" : "grey"}
                  trackColor={{ false: "#ccc", true: "#a0ffa0" }}
                />
                <Text>Keep me signed in</Text>
              </View>

              {/* Login Button */}
              <TouchableOpacity
                style={styles.customButton}
                onPress={sendLoginRequest}
                disabled={!email || !password}
              >
                <Text style={styles.customLoginBtn}>Login</Text>
              </TouchableOpacity>

              {/* Social Login */}
              <View style={{ marginTop: 10, alignItems: "center" }}>
                <Text>Or Sign in with</Text>
              </View>

              <TouchableOpacity style={styles.customButton}
                onPress={() => navigation.navigate("CreateAccount")}
              >
                <View style={styles.customButtonSubWrapper}>
                  <Image
                    style={styles.iconImage}
                    source={require("../../assets/icon/farmer.png")}
                  />
                  <Text style={styles.customButtonText}>Sign in With Google</Text>
                </View>
              </TouchableOpacity>
            </View>

            {/* Footer */}
            <View style={styles.customeFooterFlex}>
              <Text style={styles.customFooterSologon}>
                <Text style={styles.customFooterColorChange}>Powered By Ruvindu Dulmina</Text> v_0.0.1
              </Text>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  mainWrapper: { flex: 1, padding: 10, justifyContent: "space-between" },
  firstHeaderCusText: { fontSize: 32, fontWeight: "bold", color: "black" },
  seccondHeaderCusText: { fontSize: 13, fontWeight: "bold", color: "grey" },
  iconImage: { width: 40, height: 40, resizeMode: "contain" },
  customButtonSubWrapper: { flexDirection: "row", justifyContent: "center", alignItems: "center", width: "60%", padding: 5 },
  customButton: { flexDirection: "row", justifyContent: "center", alignItems: "center", height: 60, borderRadius: 30, borderWidth: 2, borderColor: "grey", marginTop: 10 },
  customButtonText: { fontSize: 16, fontWeight: "bold", color: "grey", marginLeft: 10 },
  customLoginBtn: { fontSize: 19, fontWeight: "bold", color: "grey" },
  customeHeaderFlex: { flex: 0.15, justifyContent: "center" },
  customeBodyFlex: { flex: 0.7, justifyContent: "center" },
  customeFooterFlex: { flex: 0.15, justifyContent: "flex-end", alignItems: "center" },
  customTextFiled: { padding: 10, height: 55, borderRadius: 10, borderWidth: 2, borderColor: "grey", marginTop: 5, marginBottom: 10 },
  pickerWrapper: { borderWidth: 2, borderColor: "grey", borderRadius: 10, overflow: "hidden", marginBottom: 10 },
  picker: { height: 50, width: "100%" },
  customFooterSologon: { fontSize: 15, fontWeight: "bold", color: "grey", textAlign: "center" },
  customFooterColorChange: { color: "green" },
  background: { flex: 1 },
  backImage: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
});
