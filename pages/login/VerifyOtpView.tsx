import { useRef, useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

export default function VerifyOtpView() {
    const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
    const inputRefs = useRef<Array<TextInput | null>>([]);

    // Handle OTP input
    const handleChange = (text: string, index: number) => {
        const newOtp = [...otp];
        newOtp[index] = text;
        setOtp(newOtp);

        // Auto focus next input
        if (text && index < otp.length - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleVerify = () => {
        const otpCode = otp.join("");
        console.log("Entered OTP:", otpCode);
        // 👉 Call your OTP verification API here
    };
    return (
        <SafeAreaView style={styles.mainWrapper}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={styles.customeHeaderFlex}>
                        <Text>Back</Text>
                        <Text style={styles.firstHeaderCusText}>OTP Verification👏</Text>
                        <Text style={styles.seccondHeaderCusText}>This is #Govi Mithuru Mobile App</Text>
                    </View>

                    <View style={styles.customeBodyFlex}>
                        <View style={{justifyContent:'center',alignItems:'center'}}>
                            <Image
                                resizeMode="cover"
                                style={{ width: '73%', height: '60%' }}
                                source={require('../../assets/Rating.png')}
                            />
                        </View>
                        <Text style={{marginTop:-20}}>One Time password (OTP) has been sent via Email to</Text>
                        <Text>SandeepaNiupun@Gmail.com</Text>
                        <Text>Enter the OTP Bellow to verify it.</Text>
                        <View style={styles.otpContainer}>
                            {otp.map((digit, index) => (
                                <TextInput
                                    key={index}
                                    ref={(ref) => {
                                        inputRefs.current[index] = ref;
                                    }}
                                    style={styles.otpInput}
                                    keyboardType="numeric"
                                    maxLength={1}
                                    value={digit}
                                    onChangeText={(text) => handleChange(text, index)}
                                />
                            ))}
                        </View>

                        <TouchableOpacity style={styles.customButton}>
                            <Text style={styles.customLoginBtn}>Verify</Text>
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <Text style={styles.resendText}>Resend Code</Text>
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

    //For Custome OTP CSS
    otpContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
        marginBottom: 30,
    },
    otpInput: {
        width: 50,
        height: 55,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        textAlign: "center",
        fontSize: 20,
        backgroundColor: "#fff",
        elevation: 2,
    },
    verifyText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "600",
    },
    resendText: {
        color: "blue",
        fontSize: 14,
        marginTop: 10,
    },
});
