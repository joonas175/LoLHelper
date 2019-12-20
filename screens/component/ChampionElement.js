import React, { Component, useState } from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'
import axios from 'axios'

export default function ChampionElement(props){

    const [championName, setChampionName] = useState("")

    let { participant } = props

    let imageUri = `https://cdn.communitydragon.org/latest/champion/${participant.championId}/square`

    let dataUri = `https://cdn.communitydragon.org/latest/champion/${participant.championId}/data`


    //Lisää koko paskaan sqlite ja tallenna setit sinne, ettei tarvii kokoaika fetchata
    axios.get(dataUri).then((response) => {
        setChampionName(response.data.name)
    })


    return (
        <View style={styles.container}>
            <Image 
                style={styles.image}
                source={{uri: imageUri}}
            />
            <View>
                <Text style={{...styles.text, fontSize: 16, fontWeight: 'bold'}}>{championName}</Text>
                <Text style={styles.text}>{participant.summonerName}</Text>
            </View>
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
        fontSize: 12,
        flex: 1
    },
    removeButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 10
    }
})