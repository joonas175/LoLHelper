import React, { useState } from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler'
import Ionicons  from 'react-native-vector-icons/Ionicons';

export default function UserElement(props) {

    let { user, onDrag, onSelect } = props

    let uri = `https://cdn.communitydragon.org/latest/profile-icon/${user.profileIconId}`

    return (
        <TouchableOpacity onPress={() => onSelect(user)} disabled={!onSelect}>
            <TouchableWithoutFeedback disabled={!onDrag} onLongPress={onDrag}>
                <View style={styles.container}>
                    <Image 
                        style={styles.image}
                        source={{uri: uri}}
                    />
                    <Text style={styles.text}>{user.name}</Text>
                    {props.onRemovePress? (
                        <TouchableOpacity style={styles.removeButton} onPress={props.onRemovePress}>
                            {
                                //<Text style={{color: "#eeeeee"}}>X</Text>
                            }
                            <Ionicons name={"md-close-circle-outline"} size={24} color={"red"}/>
                        </TouchableOpacity>
                    ) : null }
                    
                </View>
            </TouchableWithoutFeedback>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 60,
        backgroundColor: "#393e46",
        borderColor: "black",
        borderWidth: 1,
        margin: 1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        borderRadius: 10,
        //borderColor: "#69306D",
        //borderWidth: 2,
        marginBottom: 5,
        elevation: 1
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 5
    },
    text: {
        paddingLeft: 10,
        fontSize: 16,
        flex: 1,
        color: "#eeeeee"
    },
    removeButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 10
    }
})