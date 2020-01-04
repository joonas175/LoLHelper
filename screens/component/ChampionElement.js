import React, { Component, useState } from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'
import axios from 'axios'
import summonerSpells from '../../data/summoner.json'
import {
    CachedImage,
    ImageCacheProvider
} from 'react-native-cached-image';
import SummonerSpell from './SummonerSpell'
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function ChampionElement(props){

    const [championName, setChampionName] = useState("")

    let { participant, onDrag } = props

    let imageUri = `https://cdn.communitydragon.org/latest/champion/${participant.championId}/square`

    let dataUri = `https://cdn.communitydragon.org/latest/champion/${participant.championId}/data`

    

    let spells = [participant.spell1Id, participant.spell2Id].map((key) => {
        for(let summonerSpell in summonerSpells.data){
            let sumSpel = summonerSpells.data[summonerSpell]
            
            if(sumSpel.key == key) return sumSpel
        }
    }).map((spell) => <SummonerSpell key={participant + spell.id} spell={spell}/> )

    
    //Lisää koko paskaan sqlite ja tallenna setit sinne, ettei tarvii kokoaika fetchata
    axios.get(dataUri).then((response) => {
        setChampionName(response.data.name)
    })


    return (
        <ImageCacheProvider>
            <TouchableOpacity delayPressIn={500} delayLongPress={500} onLongPress={onDrag} style={styles.container}>
                <CachedImage 
                    style={styles.image}
                    source={{uri: imageUri}}
                />
                <View>
                    <Text style={{...styles.text, fontSize: 16, fontWeight: 'bold'}}>{championName}</Text>
                    <Text style={styles.text}>{participant.summonerName}</Text>
                </View>
                <View style={styles.summonerSpellContainer}>
                    {spells}
                </View>
            </TouchableOpacity>
        </ImageCacheProvider>
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
    spellContainer: {

    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 5
    },
    summonerSpell: {
        width: 50,
        height: 50,
        borderRadius: 5
    },
    summonerSpellContainer: {
        height: 60,
        flexDirection: "row"
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