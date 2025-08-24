import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

export default function Foods() {
    return (
        <>
            <View style={styles.mainWrapperFoods}>
                <View>
                    <Image style={{ width: 90, height: 90 }} source={require('../../../assets/foods/Tomato.jpeg')} />
                </View>
                <Text>Berries</Text>
                <Text>Rs.500(1KG)</Text>
            </View>
        </>
    )
}
const styles = StyleSheet.create({
    mainWrapperFoods: {
        marginTop:10,
        backgroundColor:'#dce6de',
        width:180,
        padding:20,
        height:240,
        borderRadius:15
    }
});
