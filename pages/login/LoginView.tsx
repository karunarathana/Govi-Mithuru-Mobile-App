import { login } from "@/service/login/LoginService";
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
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const sendLoginRequest = async () => {
    console.log(email, password);

    if (!email || !password) {
      alert("Please enter email and password!");
      return;
    }
    try {
      const response = await login(email, password);
      console.log(response);
      
      if (response.message === "User credential is correct") {
        console.log(response.userRole);
        switch (response.userRole) {
          case "Admin":
            console.log("Correct");
            navigation.replace("AdminView");
            break;
          case "Farmer":
            navigation.replace("CustomerDash");
            break;
          default:
            break;
        }
      } else {
        alert(response.message);
      }
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
                This is #Agro Link Mobile App
              </Text>
            </View>

            {/* Body */}
            <View style={styles.customeBodyFlex}>

              <Text style={{ color: 'white' }}>Email Address</Text>
              <TextInput
                style={styles.customTextFiled}
                placeholder="Hello@email.com"
                placeholderTextColor="#FFFFFF"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
              />

              <View
                style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }}
              >
                <Text style={{ color: 'white' }}>Password</Text>
                <Text style={{ color: 'white' }}>Forgot Password?</Text>
              </View>
              <TextInput
                style={styles.customTextFiled}
                placeholder="Enter your password"
                placeholderTextColor="#FFFFFF"
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
              />

              <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}>
                <Switch
                  value={isChecked}
                  onValueChange={setIsChecked}
                  thumbColor={isChecked ? "green" : "white"}
                  trackColor={{ false: "#ccc", true: "#a0ffa0" }}
                />
                <Text style={{ color: 'white' }}>Keep me signed in</Text>
              </View>

              {/* Login Button */}
              <TouchableOpacity
                style={styles.customButton}
                onPress={() => { sendLoginRequest() }}
                disabled={!email || !password}
              >
                <Text style={styles.customLoginBtn}>Login</Text>
              </TouchableOpacity>

              {/* Social Login */}
              <View style={{
                marginTop: 10,
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'center'
              }}>
                <View style={{ flex: 1, height: 1, backgroundColor: 'white', marginHorizontal: 10 }} />
                <Text style={{ color: 'white', fontWeight: '600' }}>Sign in or Login</Text>
                <View style={{ flex: 1, height: 1, backgroundColor: 'white', marginHorizontal: 10 }} />
              </View>


              <TouchableOpacity style={styles.customButton}
                onPress={() => navigation.navigate("CreateAccount")}
              >
                <View style={styles.customButtonSubWrapper}>
                  <Image
                    style={styles.iconImage}
                    source={require("../../assets/icon/google.png")}
                  />
                  <Text style={styles.customButtonText}>Sign in With Google</Text>
                </View>
              </TouchableOpacity>
            </View>

            {/* Footer */}
            <View style={styles.customeFooterFlex}>
              <Text style={styles.customFooterSologon}
                onPress={() => { navigation.navigate("CreateAccount") }}
              >
                <Text style={styles.customFooterColorChange}>Powered By Ruvindu Dulmina</Text> _create An Account
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
  firstHeaderCusText: { fontSize: 32, fontWeight: "bold", color: "white" },
  seccondHeaderCusText: { fontSize: 13, fontWeight: "bold", color: "white" },
  iconImage: { width: 40, height: 40, resizeMode: "contain" },
  customButtonSubWrapper: { flexDirection: "row", justifyContent: "center", alignItems: "center", width: "60%", padding: 5 },
  customButton: { flexDirection: "row", justifyContent: "center", alignItems: "center", height: 60, borderRadius: 30, borderWidth: 2, borderColor: "white", marginTop: 10 },
  customButtonText: { fontSize: 16, fontWeight: "bold", color: "white", marginLeft: 10 },
  customLoginBtn: { fontSize: 19, fontWeight: "bold", color: "white" },
  customeHeaderFlex: { flex: 0.15, justifyContent: "center" },
  customeBodyFlex: { flex: 0.7, marginTop: 50 },
  customeFooterFlex: { flex: 0.15, justifyContent: "flex-end", alignItems: "center" },
  customTextFiled: { padding: 10, height: 55, borderRadius: 10, borderWidth: 2, borderColor: "white", marginTop: 5, marginBottom: 10 },
  pickerWrapper: { borderWidth: 2, borderColor: "white", borderRadius: 10, overflow: "hidden", marginBottom: 10 },
  picker: { height: 50, width: "100%" },
  customFooterSologon: { fontSize: 15, fontWeight: "bold", color: "white", textAlign: "center" },
  customFooterColorChange: { color: "black" },
  background: { flex: 1 },
  backImage: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
});
