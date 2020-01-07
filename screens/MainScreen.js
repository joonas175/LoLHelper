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

// https://colorhunt.co/palette/117601

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

  backToSelection = () => {
    this.setState({selectedSummoner: null})
  }

  

  renderSummonerSelection = ({item, index}) => {
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
        {this.state.selectedSummoner === null ? 
          this.renderFlatList() : 
          <MatchInfo summoner={this.state.selectedSummoner} onBackPress={() => this.backToSelection()} />
          }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    //alignItems: 'center',
    backgroundColor: '#232931',
  },
});
