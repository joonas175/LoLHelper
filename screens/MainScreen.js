import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { NavigationEvents } from 'react-navigation';
import UserElement from './component/UserElement';
import Storage from '../Storage';
import { apiKey } from '../GlobalConfig'

export default class MainScreen extends Component {

  constructor(props){
    super(props)

    this.state = {
      inGame: false,
      summoners: []
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
    axios.get(`https://${summoner.region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${userNameInput}`, { 
      headers: {
        "X-Riot-Token": apiKey,
        withCredentials: true
      }}
    ).then((response) => {
      
    })
  }

  renderSummonerSelection = ({item, index}) => {
    console.log(item)
    return (<UserElement key={item.id} user={item} onSelect={() => this.summonerSelected(item)}/>)
  }
  

  render() {
    return (
      <View style={styles.container}>
        <NavigationEvents onWillFocus={this.updateSummoners}/>
        <FlatList
          style={{flex: 1}}
          data={this.state.summoners}
          renderItem={this.renderSummonerSelection}
          keyExtractor={(item) => item.id}
        />
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
