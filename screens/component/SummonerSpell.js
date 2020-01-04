import React, { Component, useState, useEffect } from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'
import axios from 'axios'
import summonerSpells from '../../data/summoner.json'
import {
    CachedImage,
    ImageCacheProvider
} from 'react-native-cached-image';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function SummonerSpell(props){

    let { spell, disabled } = props

    const [endTime, setEndTime] = useState(0)

    const [cooldown, setCooldown] = useState(0)

    useEffect(() => {
        let currentTime = Date.now()

        if(currentTime < endTime){
            setTimeout(() => {
                setCooldown((endTime - currentTime) / 1000)
            }, 1000)
        } else {
            setCooldown(0)
        }
        
    }, [endTime, cooldown])

    const startTimer = () => {
        setEndTime(Date.now() + (spell.cooldown[0] * 1000))
    }

    return (
        <ImageCacheProvider>
            <TouchableOpacity onPress={startTimer} disabled={disabled}>
                <View style={styles.container}>
                    <CachedImage
                        style={styles.image}
                        source={{uri: `http://ddragon.leagueoflegends.com/cdn/9.24.2/img/spell/${spell.id}.png`}}
                    />
                    {cooldown > 0 ? 
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>{Math.round(cooldown)}</Text>
                    </View>
                    : null}
                    
                </View>
            </TouchableOpacity>
        </ImageCacheProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 70,
        marginLeft: 5
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 5
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white'
    },
    textContainer: {
        position: 'absolute', 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0, 
        justifyContent: 'center', 
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor : '#00000077'
    }
})