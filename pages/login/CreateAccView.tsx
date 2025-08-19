import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";


export default function CreateAccView() {
    const [role, setRole] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    return (
        // <ImageBackground
        //     source={require("../../assets/green-tea-bud-leaves-green-tea-plantations-morning.jpg")}
        //     style={styles.background}
        //     resizeMode="cover"
        // >

            <SafeAreaView style={styles.mainWrapper}>
                <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                >
                    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                        <View style={styles.customeHeaderFlex}>
                            <Text>Back</Text>
                            <Text style={styles.firstHeaderCusText}>Create an Account👏</Text>
                            <Text style={styles.seccondHeaderCusText}>This is #Govi Mithuru Mobile App</Text>
                        </View>

                        <View style={styles.customeBodyFlex}>
                            <Text>What is your Role?</Text>
                            <View style={styles.pickerWrapper}>
                                <Picker
                                    selectedValue={role}
                                    onValueChange={(itemValue) => setRole(itemValue)}
                                    style={styles.picker}
                                >
                                    <Picker.Item label="Farmer" value="farmer" />
                                    <Picker.Item label="Supplier" value="supplier" />
                                    <Picker.Item label="Customer" value="customer" />
                                </Picker>
                            </View>

                            <Text>User Name</Text>
                            <TextInput style={styles.customTextFiled} placeholder='Hello@email.com' />

                            <Text>Email Address</Text>
                            <TextInput style={styles.customTextFiled} placeholder='Hello@email.com' />

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                                <Text>Password</Text>
                            </View>
                            <TextInput style={styles.customTextFiled} placeholder='Enter your password' secureTextEntry={true} />
                            <Text>Confirm Password</Text>
                            <TextInput style={styles.customTextFiled} placeholder='Enter your password' secureTextEntry={true} />

                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                                <Switch
                                    value={isChecked}
                                    onValueChange={setIsChecked}
                                    thumbColor={isChecked ? "green" : "grey"}
                                />
                                <Text>Please correct all details terms of services</Text>
                            </View>

                            <TouchableOpacity style={styles.customButton}>
                                <Text style={styles.customLoginBtn}>Create Account</Text>
                            </TouchableOpacity>

                            <View style={{ marginTop: 10, alignItems: 'center' }}>
                                <Text>Sign in or Login</Text>
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
                                <Text style={styles.customFooterColorChange}>Powered By Ruvindu Dulmina</Text> v_0.0.1
                            </Text>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        // </ImageBackground>
    );
}
const styles = StyleSheet.create({
    mainWrapper: {
        flex: 1,
        padding: 10,
        justifyContent: 'space-between',
    },
    firstHeaderCusText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: 'black',
    },
    seccondHeaderCusText: {
        fontSize: 13,
        fontWeight: 'bold',
        color: 'grey',
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
        borderColor: "grey",
        marginTop: 10
    },
    customButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'grey',
        marginLeft: 10
    },
    customLoginBtn: {
        fontSize: 19,
        fontWeight: 'bold',
        color: 'grey',
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
        borderColor: "grey",
        marginTop: 5,
        marginBottom: 10
    },
    pickerWrapper: {
        borderWidth: 2,
        borderColor: 'grey',
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
        color: 'grey',
        textAlign: 'center',
    },
    customFooterColorChange: {
        color: 'green'
    },
    background: {
        flex: 1,
    },
});