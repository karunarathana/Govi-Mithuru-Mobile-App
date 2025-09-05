import { Register } from '@/service/login/RegisterService';
import React, { useState } from 'react';
import { Alert, Image, ImageBackground, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";


export default function CreateAccView({ navigation }: any) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [isChecked, setIsChecked] = useState(false);

    const handleRegister = async () => {
        //TODO : Error Validation         
        const result = await Register(email, password, userName);
        if (result.responseMessage === "error") {
            console.error("Registration failed:", result.responseCode);
        } else {
            console.log("Registration success:", result.responseMessage);
            Alert.alert(
                "Success",
                "Successfully created user",
                [{ text: "OK", onPress: () => navigation.navigate("LoginView") }]
            );

        }
    }
    return (
        <ImageBackground
            source={require("../../assets/green-tea-bud-leaves-green-tea-plantations-morning.jpg")}
            style={styles.background}
            resizeMode="cover"
        >

            <SafeAreaView style={styles.mainWrapper}>
                <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                >
                    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                        <View style={styles.customeHeaderFlex}>
                            <Image style={styles.backImage}
                                source={require('../../assets/previous.png')} />
                            <Text style={styles.firstHeaderCusText}>Create an Account👏</Text>
                            <Text style={styles.seccondHeaderCusText}>This is #Govi Mithuru Mobile App</Text>
                        </View>

                        <View style={styles.customeBodyFlex}>

                            <Text style={{ color: 'white' }}>User Name</Text>
                            <TextInput onChangeText={setUserName} style={styles.customTextFiled} placeholder='Jhone Doe' placeholderTextColor="#FFFFFF" />

                            <Text style={{ color: 'white' }}>Email Address</Text>
                            <TextInput onChangeText={setEmail} style={styles.customTextFiled} placeholder='Hello@email.com' placeholderTextColor="#FFFFFF" />

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                                <Text style={{ color: 'white' }}>Password</Text>
                            </View>
                            <TextInput onChangeText={setPassword} style={styles.customTextFiled} placeholder='Enter your password' secureTextEntry={true} placeholderTextColor="#FFFFFF" />
                            <Text style={{ color: 'white' }}>Confirm Password</Text>
                            <TextInput onChangeText={setConfirmPassword} style={styles.customTextFiled} placeholder='Confirm password' secureTextEntry={true} placeholderTextColor="#FFFFFF" />

                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                                <Switch
                                    value={isChecked}
                                    onValueChange={setIsChecked}
                                    thumbColor={isChecked ? "green" : "white"}
                                />
                                <Text style={{ color: 'white' }}>Please correct all details terms of services</Text>
                            </View>

                            <TouchableOpacity style={styles.customButton}
                                onPress={() => { handleRegister() }}
                            >
                                <Text style={styles.customLoginBtn}>Create Account</Text>
                            </TouchableOpacity>

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


                            <TouchableOpacity style={styles.customButton}>
                                <View style={styles.customButtonSubWrapper}>
                                    <Image
                                        style={styles.iconImage}
                                        source={require('../../assets/icon/google.png')}
                                    />
                                    <Text style={styles.customButtonText}>Sign in With Google</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.customeFooterFlex}>
                            <Text style={styles.customFooterSologon}>
                                <Text style={styles.customFooterColorChange}>Powered By Ruvindu Dulmina</Text> _back to login
                            </Text>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </ImageBackground>
    );
}
const styles = StyleSheet.create({
    mainWrapper: {
        flex: 1,
        padding: 10,
        justifyContent: 'space-between',
    },
    firstHeaderCusText: {
        marginTop: 10,
        fontSize: 32,
        fontWeight: 'bold',
        color: 'white',
    },
    seccondHeaderCusText: {
        fontSize: 13,
        fontWeight: 'bold',
        color: 'white',
    },
    iconImage: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
    },
    customButtonSubWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '60%',
        padding: 5,
    },
    customButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        borderRadius: 30,
        borderWidth: 2,
        borderColor: "white",
        marginTop: 10
    },
    customButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        marginLeft: 10
    },
    customLoginBtn: {
        fontSize: 19,
        fontWeight: 'bold',
        color: 'white',
    },
    customeHeaderFlex: {
        flex: 0.15,
        justifyContent: 'center'
    },
    customeBodyFlex: {
        flex: 0.7,
        justifyContent: 'center'
    },
    customeFooterFlex: {
        flex: 0.15,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    customTextFiled: {
        padding: 10,
        height: 55,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "white",
        marginTop: 5,
        marginBottom: 10
    },
    pickerWrapper: {
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 10
    },
    picker: {
        height: 50,
        width: '100%',
    },
    customFooterSologon: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
    },
    customFooterColorChange: {
        color: 'black'
    },
    background: {
        flex: 1,
    },
    backImage: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
    },
});