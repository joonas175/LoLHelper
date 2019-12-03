import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { TextInput as TextInputNative } from 'react-native-gesture-handler'

export default function TextInput(props) {

    const [text, setText] = useState("")

    return (
        <TextInputNative 
            style={styles.input} 
            onChangeText={(value) => {
                setText(value)

                props.onChange(value)
            }}
        />
    )
}

const styles = StyleSheet.create({
    input: {
        height: 50,
        borderWidth: 2,
        borderColor: 'blue',
        margin: 4,
        borderRadius: 10
    }
})