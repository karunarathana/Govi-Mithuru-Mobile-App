import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

export default function Catagories(props: any) {
    return (
        <>
            <View style={styles.mainWrapperCategories}>
                <View style={styles.categoryImage}>
                    <Image style={styles.categoryImage} source={require('../../../assets/fruites.jpg')} />
                </View>
                <Text style={styles.categoryName}>{props.nameOfCategories}</Text>
            </View>
        </>
    )
}
const styles = StyleSheet.create({
    mainWrapperCategories: {
        marginTop:10,
        borderRadius:50,
        width: 150,
        height: 70,
        flexDirection:'row',
        gap:10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9bfaa8'
    },
    categoryImage: {
        width: 50,
        height: 50,
        borderWidth: 2,
        borderColor: "yellow",
        borderRadius: 1000,
        justifyContent: 'center',
        alignItems: 'center'
    },
    categoryName: {

    }
});


