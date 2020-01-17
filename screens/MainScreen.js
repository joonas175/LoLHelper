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

/**
 * Main screen of the app, which let's you select which summoner's match to look for.
 */
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

  // Get saved summoners from local storage.
  updateSummoners = async () => {
    this.setState({
      summoners: await Storage.getUsers()
    })
  }

  /**
   * Back handling. Set selected summoner to null, so render displays list of summoners instead of MatchInfo,
   * as render uses conditional rendering.
   */
  backToSelection = () => {
    this.setState({selectedSummoner: null})
  }

  

  /**
   * Render single user as UserElement.
   */
  renderSummonerSelection = ({item, index}) => {
    return (<UserElement key={item.id} user={item} onSelect={() => this.setState({selectedSummoner: item})}/>)
  }

  /**
   * Render header and flatlist, which shows all summoners saved to localstorage.
   */
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
