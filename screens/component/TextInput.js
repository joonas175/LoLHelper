import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { TextInput as TextInputNative } from 'react-native-gesture-handler'

export default function TextInput(props) {

    const [text, setText] = useState("")

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