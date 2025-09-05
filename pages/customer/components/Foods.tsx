import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

export default function Foods(props:any) {
    return (
        <>
            <View style={styles.mainWrapperFoods}>
                <View>
                    <Image style={{ width: 90, height: 90 }}  source={{ uri: `data:image/jpeg;base64,${props.productImage}` }} />
                </View>
                <Text>{props.productName}</Text>
                <Text>Rs.{props.productPrice}(1KG)</Text>
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
