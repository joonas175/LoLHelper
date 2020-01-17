import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Dimensions, Alert } from 'react-native';
import TextInput from './component/TextInput';
import axios from 'axios'
import { apiKey } from '../GlobalConfig'
import UserElement from './component/UserElement';
import Storage from '../Storage';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Header from './component/Header';
import DraggableFlatList from 'react-native-draggable-flatlist';

//https://coolors.co/f2d7ee-d3bcc0-a5668b-69306d-0e103d

/**
 * Settings screen to add summoners to the app.
 */
export default class SettingsScreen extends Component {

  constructor(props){
    super(props)

    this.state = {
      userNameInput: "",
      region: "euw1",
      users: []
    }
  }

  // Get users from local Storage
  componentDidMount = () => {
    Storage.getUsers().then((value) => this.setState({users: value}))
  }

  /**
   * Lookup summoner by given username. Username is used only for display purposes, and all 
   * other API calls need the encrypted summonerId, which makes this lookup necessary for 
   * other functioning.
   */
  lookup = () => {

    let { region, userNameInput } = this.state

    console.log(region)
    console.log(userNameInput)

    axios.get(`https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${userNameInput}`, { 
      headers: {
        "X-Riot-Token": apiKey,
        withCredentials: true
      }}
    ).then((response) => {
      if(response.status === 200) {
        let summoner = response.data
        // Save summoners region. This is needed when multiple regions come available in this app.
        summoner.region = region
        let newArr = [summoner, ...this.state.users]
        this.setState({
          users: newArr,
          userNameInput: ""
        })
        // Save users to Storage.
        Storage.saveUsers(newArr)
      }
      
    }).catch((error) => {
      console.log(error)
        this.userNotFoundAlert();
    })
  }

  /**
   * Remove single summoner from the list and save new list to Storage.
   * Index can't be passed from DraggableFlatList (bug), so that's why 
   * findIndex is used to find the correct summoner.
   */
  onRemovePress = (item) => {
    let index = this.state.users.findIndex((value) => value === item)
    console.log(index)
    let newArr
    if(this.state.users.length > 1) {
      this.state.users.splice(index, 1)
      newArr = [...this.state.users]
    } else {
      newArr = []
    }
    console.log(newArr)
    this.setState({
      users: newArr
    }, () => {
      Storage.saveUsers(newArr)
    })
  }

  /**
   * Handles saving new order of summoners to state and Storage.
   */
  onDragEnd = ({data}) => {
    this.setState({ users: data })
    Storage.saveUsers(data)
  }

  // Render single Summoner
  renderUser = ({item, index, drag, isActive}) => {
    return (<UserElement user={item} onDrag={drag} onRemovePress={() => this.onRemovePress(item)}/>)
  }

  // Show an alert, if user is not found with given username.
  userNotFoundAlert = () => {
    Alert.alert(
      'User not found!',
      'Try again with a different summoner name',
      [
        {text: 'OK', onPress: () => this.setState({userNameInput: ""})},
      ],
      { cancelable: false },
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.addSummonerContainer}>
          <Header text={"Summoner name to look for"}/>
          <TextInput onChangeText={(value) => this.setState({userNameInput: value})} value={this.state.userNameInput} placeholder="Summoner name"/>
          <TouchableOpacity style={styles.button} onPress={this.lookup}>
            <Text style={styles.buttonText}>LOOKUP</Text>
          </TouchableOpacity>
        </View>
        <Header text={"Summoners"}/>
        <DraggableFlatList
          data={this.state.users}
          renderItem={this.renderUser}
          keyExtractor={(item, index) => `draggable-item-${item.id}`}
          onDragEnd={this.onDragEnd}
        />
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: '#232931',
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
  buttonText: {
    color: '#eeeeee',
    fontWeight: 'bold'
  },
  addSummonerContainer: {
    paddingBottom: 20
  }
});
