import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, Text } from 'react-native';
import axios from 'axios';
import { apiKey } from '../../GlobalConfig';
import ChampionElement from './ChampionElement';

export default class MatchInfo extends Component{

    constructor(props){
        super(props)

        this.state = {
            loading: true,
            matchInfo: null
        }
    }

    componentDidMount = () => {
        console.log("matchinfo mounted")
        console.log(this.props.summoner)
        this.lookForMatch(this.props.summoner)
    }

    componentWillUnmount = () => {
        console.log("matchinfo unmounted")
    }

    onBackPress = () => {
        //remove timers
        //remove intervals
        //remove backhandler

        this.props.onBackPress()
    }

    lookForMatch = (summoner) => {
        console.log(summoner)
        axios.get(`https://${summoner.region}.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/${summoner.id}`, { 
          headers: {
            "X-Riot-Token": apiKey,
            withCredentials: true
          }}
        ).then((response) => {
          console.log(response.data)
          this.setState({
              loading: false,
              matchInfo: response.data
          })
        }).catch((error) => {
          if(error.response == null){
            console.log("no connection")
          } else {
            let { status } = error.response
            if(status === 404){
              console.log("match not found")
            }
          }
          this.setState({
              loading: false,
              matchInfo: null
          })
          this.retryTimer = setTimeout(() => {

          }, 30000)
          //console.log(error)
        })
    }

    renderMatchInfo = () => {
        if(this.state.matchInfo === null) {
            return (
                <Text>Match not found :(</Text>
            )
        } else {
            return (<View style={{flex: 1, justifyContent: 'center'}}>
                {this.state.matchInfo.participants.map((value) => (
                    <ChampionElement participant={value} key={value.summonerId}/>
                ))}
            </View>)
        }
    }

    render = () => {
        return (
            <View style={styles.container}>

                {this.state.loading === true ? (
                    <Text>Loading!</Text>
                ) : (
                this.renderMatchInfo()
                )}

                <TouchableOpacity style={styles.button} onPress={() => this.onBackPress()}>
                    <Text>BACK</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }, 
    button : {
        height: 50,
        width: Dimensions.get("window").width / 2,
        margin: 4,
        alignSelf: 'center', 
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#69306D',
        borderRadius: 10
      },
})