import React, { Component, useState, useEffect } from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'
import axios from 'axios'
import summonerSpells from '../../data/summoner.json'
import {
    CachedImage,
    ImageCacheProvider
} from 'react-native-cached-image';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons  from 'react-native-vector-icons/Ionicons';

export default function BootsToggle(props){

    let { onToggle, disabled } = props

    let [toggle, setToggle] = useState(false)

    let iconProps = toggle? {
        name: "md-checkmark",
        color: "lightgreen"
    } : {
        name: "md-close",
        color: "red"
    }

    const toggleFunction = () => {
        let newVal = !toggle
        setToggle(newVal)
        onToggle(newVal)
    }

    return (
            <TouchableOpacity onPress={toggleFunction} disabled={disabled}>
                <View style={styles.container}>
                    <Image
                        style={styles.image}
                        source={require("../../assets/ionianboots.png")}
                    />
                    
                    <View style={styles.iconContainer}>
                        <Ionicons size={24} {...iconProps} />
                    </View>

                    
                </View>
            </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 70,
        marginLeft: 5,
        justifyContent: 'flex-end'
    },
    image: {
        width: 40,
        height: 40,
        borderRadius: 5
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white'
    },
    iconContainer: {
        position: 'absolute', 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: -5, 
        justifyContent: 'flex-end', 
        alignItems: 'flex-end'
    }
})