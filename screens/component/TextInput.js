import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { TextInput as TextInputNative } from 'react-native-gesture-handler'

/**
 * Simple input component. Used mainly for consistent styling. 
 * All props are passed to React Natives default TextInput, styling is overrided
 * @param {*} props 
 */
export default function TextInput(props) {

    return (
        <TextInputNative 
            {...props}
            style={styles.input} 
        />
    )
}

const styles = StyleSheet.create({
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: '#eeeeee',
        margin: 4,
        borderRadius: 10,
        color: "black",
        fontSize: 14,
        paddingLeft: 10

    }
})