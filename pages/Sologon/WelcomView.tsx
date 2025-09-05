import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function WelcomView({ navigation }: any) {
  return (
    <>
      <SafeAreaView style={styles.mainWrapper}>
        <View style={{ flex: 1, justifyContent: 'space-between' }}>
          <View style={styles.imageCenter}>
            <Image style={{ width: '80%', height: '70%' }} source={require('../../assets/Govi Mithuro.png')} />
            <Text style={styles.customText}>Your trusted friend for
              market prices & forecasts.</Text>
          </View>
          <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <TouchableOpacity style={styles.customButton}
              onPress={() => navigation.navigate("Onboarding")}
            >
              <Text style={styles.textStyle}>Let's Go</Text>
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.customFooterSologon}><Text style={styles.customFooterColorChange}>Powerd By Ruvindu Dulmina</Text> v_0.0.1</Text>
          </View>
        </View>
      </SafeAreaView>
    </>
  )
}
const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    backgroundColor: 'white'

  },
  imageCenter: {
    marginTop: 90,
    justifyContent: 'center',
    alignItems: 'center'
  },
  customButton: {
    width: "50%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 60,
    borderRadius: 30,
    backgroundColor: 'green',
    // borderWidth: 2, 
    // borderColor: "grey", 
    marginTop: 10
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold'
  },
  customText: {
    padding: 5,
    marginTop: -90,
    fontSize: 22,
    fontWeight: 'bold',
    color: 'grey',
    textAlign: 'center',
  },
  customFooterSologon: {
    marginTop: 90,
    fontSize: 15,
    fontWeight: 'bold',
    color: 'grey',
    textAlign: 'center',
    // borderWidth: 2,
    // borderColor: "blue",
  },
  customFooterColorChange: {
    color: 'green'
  }
});