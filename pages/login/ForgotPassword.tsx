import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

export default function ForgotPassword() {
    return (
        <SafeAreaView style={styles.mainWrapper}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={styles.customeHeaderFlex}>
                        <Text>Back</Text>
                        <Text style={styles.firstHeaderCusText}>Forgot Password👏</Text>
                        <Text style={styles.seccondHeaderCusText}>This is #Govi Mithuru Mobile App</Text>
                    </View>

                    <View style={styles.customeBodyFlex}>
                        <Text>Email Address</Text>
                        <TextInput style={styles.customTextFiled} placeholder='Hello@email.com' />
                        
                        
                        <TouchableOpacity style={styles.customButton}>
                            <Text style={styles.customLoginBtn}>Login</Text>
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
    )
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