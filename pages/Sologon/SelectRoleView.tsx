import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
export default function SelectRoleView() {
    return (
        <SafeAreaView style={styles.mainWrapper}>
            <View style={styles.subWrapperRoleView}>
                <View style={styles.customeHeaderFlex}>
                    <Text>Back</Text>
                    <Text style={styles.firstHeaderCusText}>What is your Role ✌</Text>
                    <Text style={styles.seccondHeaderCusText}>This is #Govi Mithuru Mobile App</Text>
                </View>
                <View style={styles.customeBodyFlex}>
                    <View style={styles.customImageWrapper}>
                        <Image style={{ width: '100%', height: '100%' }} source={require('../../assets/4151160.jpg')} />
                    </View>
                    <View style={styles.customButtonWrapper}>
                        <TouchableOpacity style={styles.customButton}>
                            <View style={styles.customButtonSubWrapper}>
                                <Image style={styles.iconImage}
                                    source={require('../../assets/icon/farmer.png')} />
                                <Text style={styles.customButtonText}>Farmer</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.customButton}>
                            <View style={styles.customButtonSubWrapper}>
                                <Image style={styles.iconImage}
                                    source={require('../../assets/icon/employee.png')} />
                                <Text style={styles.customButtonText}>Economic Officer</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.customButton}>
                            <View style={styles.customButtonSubWrapper}>
                                <Image style={styles.iconImage}
                                    source={require('../../assets/icon/admin.png')} />
                                <Text style={styles.customButtonText}>Supper Admin</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.customeFooterFlex}>
                    <View>
                        <Text style={styles.customFooterSologon}><Text style={styles.customFooterColorChange}>Powerd By Ruvindu Dulmina</Text> v_0.0.1</Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    mainWrapper: {
        flex: 1,
        padding: 10,
        justifyContent: 'space-between'
    },
    firstHeaderCusText: {
        fontSize: 27,
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
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '60%',
        gap:10,
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
        gap: 10
    },
    customButtonText: {
        fontSize: 19,
        width:'80%',
        fontWeight: 'bold',
        color: 'grey',
        justifyContent: 'flex-start'
    },
    customImageWrapper: {
        height: "50%"
    },
    customButtonWrapper: {
        height: "30%",
        marginTop: 20,
        flexDirection: 'column',
        gap: '10',
        justifyContent: 'space-between'
    },
    subWrapperRoleView: {
        height: "100%",
    },
    customFooterSologon: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'grey',
        textAlign: 'center',
    },
    customeHeaderFlex: {
        height: "10%",
        // backgroundColor: 'orange'
    },
    customeBodyFlex: {
        height: "80%",
        alignContent: 'center',
        justifyContent: 'center',
        // borderWidth: 2,
        // borderColor: "blue",
    },
    customeFooterFlex: {
        height: "10%",
        justifyContent: 'flex-end',
    },
    customFooterColorChange: {
        color: 'green'
    }
});