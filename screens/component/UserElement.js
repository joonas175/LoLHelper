import React, { useState } from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'

export default function UserElement(props) {

    let { user } = props

    let uri = `https://cdn.communitydragon.org/latest/profile-icon/${user.profileIconId}`

    return (
        <View style={styles.container}>
            <Image 
                style={styles.image}
                source={{uri: uri}}
            />
            <Text>{user.name}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 50,
        backgroundColor: "lightgray",
        borderColor: "black",
        borderWidth: 1,
        margin: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    image: {
        width: 50,
        height: 50
    },
    input: {
        height: 50,
        borderWidth: 2,
        borderColor: 'blue',
        margin: 4,
        borderRadius: 10
    }
})