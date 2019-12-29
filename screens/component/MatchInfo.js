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
            matchInfo: null,
            retryTimer: null
        }
    }

    componentDidMount = () => {
        console.log("matchinfo mounted")
        console.log(this.props.summoner)
        this.lookForMatch(this.props.summoner)
    }

    componentWillUnmount = () => {
        console.log("matchinfo unmounted")
        if(this.timer) {
            clearTimeout(this.timer)
        }
    }

    onBackPress = () => {
        //remove timers
        //remove intervals
        //remove backhandler

        this.props.onBackPress()
    }

    retryTimer = () => {
        if(this.state.retryTimer === 0){
            this.lookForMatch()
        } else {
            this.timer = setTimeout(() => {
                this.setState({
                    retryTimer: (this.state.retryTimer - 1)
                }, this.retryTimer)
            }, 1000)
        }
        
    }

    lookForMatch = () => {
        this.setState({
            loading: true
        })
        let { summoner } = this.props
        
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
              this.setState({
                  retryTimer: 30
              }, this.retryTimer)
            }
          }
          this.setState({
              loading: false,
              matchInfo: null
          })

        })
    }

    renderMatchInfo = () => {
        if(this.state.matchInfo === null) {
            return (
                <View>
                    <Text style={styles.text}>Match not found :(</Text>
                    <Text style={styles.text}>{`Retry in ${this.state.retryTimer}`}</Text>
                </View>
            )
        } else {
            let { matchInfo } = this.state
            let ownTeam = matchInfo.participants.find((participant) => participant.summonerId === this.props.summoner.id).teamId

            return (<View style={{flex: 1, justifyContent: 'center'}}>
                {matchInfo.participants.filter((value) => value.teamId !== ownTeam).map((value) => (
                    <ChampionElement participant={value} key={value.summonerId}/>
                ))}
            </View>)
        }
    }

    render = () => {
        return (
            <View style={styles.container}>

                {this.state.loading === true ? (
                    <Text style={styles.text}>Loading!</Text>
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
    text: {
        textAlign: 'center',
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white'
    }
})