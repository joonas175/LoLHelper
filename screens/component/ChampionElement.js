import React, { Component } from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'

export default function ChampionElement(props){


    let { participant } = props

    let uri = `https://cdn.communitydragon.org/latest/champion/${participant.championId}/square`

    return (
        <View style={styles.container}>
            <Image 
                style={styles.image}
                source={{uri: uri}}
            />
            <Text style={styles.text}>{participant.summonerName}</Text>
            {props.onRemovePress? (
                <TouchableOpacity style={styles.removeButton} onPress={props.onRemovePress}>
                    <Text>X</Text>
                </TouchableOpacity>
            ) : null }
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 60,
        backgroundColor: "#A5668B",
        borderColor: "black",
        borderWidth: 1,
        margin: 1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        borderRadius: 10,
        borderColor: "#69306D",
        borderWidth: 2,
        marginBottom: 5
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 5
    },
    text: {
        paddingLeft: 10,
        fontSize: 16,
        flex: 1
    },
    removeButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 10
    }
})