import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { NavigationEvents } from 'react-navigation';
import UserElement from './component/UserElement';
import Storage from '../Storage';
import { apiKey } from '../GlobalConfig'
import axios from 'axios'
import Header from './component/Header';
import MatchInfo from './component/MatchInfo';

export default class MainScreen extends Component {

  constructor(props){
    super(props)

    this.state = {
      inGame: false,
      summoners: [],
      selectedSummoner: null
    }
  }

  componentDidMount = () => {
    console.log("Main screen mounted")
  }

  updateSummoners = async () => {
    this.setState({
      summoners: await Storage.getUsers()
    })
  }

  summonerSelected = (summoner) => {
    console.log(summoner)
    axios.get(`https://${summoner.region}.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/${summoner.id}`, { 
      headers: {
        "X-Riot-Token": apiKey,
        withCredentials: true
      }}
    ).then((response) => {
      console.log(response)
    }).catch((error) => {
      if(error.response == null){
        console.log("no connection")
      } else {
        let { status } = error.response
        if(status === 404){
          console.log("match not found")
        }
      }
      //console.log(error)
    })
  }

  renderSummonerSelection = ({item, index}) => {
    console.log(item)
    return (<UserElement key={item.id} user={item} onSelect={() => this.setState({selectedSummoner: item})}/>)
  }

  renderFlatList = () => {
    return (
      <View style={{flex: 1}}>
        <Header text={"Find match"}/>
        <FlatList
            style={{flex: 1}}
            data={this.state.summoners}
            renderItem={this.renderSummonerSelection}
            keyExtractor={(item) => item.id}
          />
      </View>
    )
  } 
  
  render() {
    return (
      <View style={styles.container}>
        <NavigationEvents onWillFocus={this.updateSummoners}/>
        {this.state.selectedSummoner === null ? this.renderFlatList() : <MatchInfo forUser={this.state.user} />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    //alignItems: 'center',
    backgroundColor: '#311e3e',
  },
});
