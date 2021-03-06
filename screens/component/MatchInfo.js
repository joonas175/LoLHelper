import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, Text } from 'react-native';
import axios from 'axios';
import { apiKey } from '../../GlobalConfig';
import ChampionElement from './ChampionElement';
import DraggableFlatList from 'react-native-draggable-flatlist';

/**
 * React component to show match info. Handles fetching also.
 */
export default class MatchInfo extends Component{

    constructor(props){
        super(props)

        this.state = {
            loading: true,
            matchInfo: null,
            retryTimer: null,
            enemyTeam: null
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

    // Handle back press
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
        
        // Fetch match info by summonerId
        axios.get(`https://${summoner.region}.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/${summoner.id}`, { 
          headers: {
            "X-Riot-Token": apiKey,
            withCredentials: true
          }}
        ).then((response) => {
            console.log(response.data)

            // Filter data to include only enemy team
            let participants = response.data.participants
            let ownTeamId = participants.find((participant) => participant.summonerId === this.props.summoner.id).teamId
            let enemyTeam = participants.filter((value) => value.teamId !== ownTeamId)
            
            // Set filtered data to state and set loading to false
            this.setState({
                loading: false,
                matchInfo: response.data,
                enemyTeam: enemyTeam
            })
        }).catch((error) => {
          if(error.response == null){
            console.log("no connection")
          } else {
            let { status } = error.response
            if(status === 404){
                // 404 is thrown if match is not found. Set retry timer
                console.log("match not found")
                this.setState({
                    retryTimer: 30
                }, this.retryTimer)
            }
          }
          // On error, set loading to false and matchInfo to null
          this.setState({
              loading: false,
              matchInfo: null
          })

        })
    }

    /**
     * Function to render "Match not found" text or DraggableFlatList if matchInfo is set
     */
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
            

            return ( 
                    <DraggableFlatList
                        key={'champion-list'}
                        style={{flex: 1}}
                        data={this.state.enemyTeam}
                        renderItem={({item, index, drag, isActive}) => {
                            return (<ChampionElement participant={item} onDrag={drag} disabled={isActive} gameMode={matchInfo.gameMode}/>)
                        }}
                        keyExtractor={(item, index) => `draggable-item-${item.summonerId}`}
                        contentContainerStyle={{flex: 1, justifyContent: 'center'}}
                        onDragEnd={({data}) => this.setState({enemyTeam: data})}
                    />
            )
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
                    <Text style={styles.buttonText}>BACK</Text>
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
        backgroundColor: '#393e46',
        borderRadius: 10
    },
    text: {
        textAlign: 'center',
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white'
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#eeeeee'
    }
})