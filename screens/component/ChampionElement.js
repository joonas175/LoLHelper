import React, { Component, useState } from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'
import axios from 'axios'
import summonerSpells from '../../data/summoner.json'
import {
    CachedImage,
    ImageCacheProvider
} from 'react-native-cached-image';
import SummonerSpell from './SummonerSpell'
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import BootsToggle from './BootsToggle.js';

export default function ChampionElement(props){

    const [championName, setChampionName] = useState("")

    const [boots, setBoots] = useState(false)

    let { participant, onDrag, disabled, gameMode } = props

    let imageUri = `https://cdn.communitydragon.org/latest/champion/${participant.championId}/square`

    let dataUri = `https://cdn.communitydragon.org/latest/champion/${participant.championId}/data`


    let cdr = 1 + (boots? -0.1 : 0) + (gameMode === "ARAM" ? -0.4 : 0)
    
    let spells = [participant.spell1Id, participant.spell2Id].map((key) => {
        for(let summonerSpell in summonerSpells.data){
            let sumSpel = summonerSpells.data[summonerSpell]
            
            if(sumSpel.key == key) return sumSpel
        }
    }).map((spell) => <SummonerSpell key={participant + spell.id} spell={spell} cdr={cdr} disabled={disabled}/> )

    
    //Lisää koko paskaan sqlite ja tallenna setit sinne, ettei tarvii kokoaika fetchata
    axios.get(dataUri).then((response) => {
        setChampionName(response.data.name)
    })


    return (
        <ImageCacheProvider>
            <TouchableWithoutFeedback onLongPress={onDrag} style={{...styles.container, opacity: (disabled ? 0.7 : 1)}}>
                <CachedImage 
                    style={styles.image}
                    source={{uri: imageUri}}
                />
                <View style={{alignSelf: 'stretch'}}>
                    <Text style={styles.championText}>{championName}</Text>
                    <Text style={styles.text}>{participant.summonerName}</Text>
                </View>
                <View style={styles.spellContainer}>
                    <BootsToggle onToggle={(newVal) => setBoots(newVal)}/>
                    {spells}
                </View>
            </TouchableWithoutFeedback>
        </ImageCacheProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 80,
        backgroundColor: "#393e46",
        borderWidth: 1,
        margin: 1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        borderRadius: 10,
        borderColor: "black",
        borderWidth: 2,
        marginBottom: 5
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 5
    },
    summonerSpell: {
        width: 50,
        height: 50,
        borderRadius: 5
    },
    spellContainer: {
        height: 80,
        flexDirection: "row",
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    championText: {
        paddingLeft: 10,
        fontSize: 12, 
        fontSize: 18, 
        fontWeight: 'bold',
        color: "#eeeeee"
    },
    text: {
        paddingLeft: 10,
        fontSize: 12,
        color: "#eeeeee"
    },
    removeButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 10
    }
})