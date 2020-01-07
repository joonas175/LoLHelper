import React, { useState } from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'

export default function Header(props) {

    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                {props.text}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 50,
        backgroundColor: "#393e46",
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: "black",
        borderBottomWidth: 1,
        marginBottom: 5
    },
    text: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
        color: '#eeeeee'
    }
})