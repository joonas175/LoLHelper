import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Dimensions, Alert } from 'react-native';
import TextInput from './component/TextInput';
import axios from 'axios'
import { apiKey } from '../GlobalConfig'
import UserElement from './component/UserElement';
import Storage from '../Storage';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Header from './component/Header';

//https://coolors.co/f2d7ee-d3bcc0-a5668b-69306d-0e103d

export default class SettingsScreen extends Component {

  constructor(props){
    super(props)

    this.state = {
      userNameInput: "",
      region: "euw1",
      users: []
    }
  }

  componentDidMount = () => {
    Storage.getUsers().then((value) => this.setState({users: value}))
  }

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
      let newArr = [response.data, ...this.state.users]
      if(response.status === 200) {
        this.setState({
          users: newArr,
          userNameInput: ""
        })
      }
      Storage.saveUsers(newArr)
    }).catch((error) => {
        this.userNotFoundAlert();
    })
  }

  onRemovePress = (index) => {
    let newArr = [...this.state.users.splice(index, 1)]
    this.setState({
      users: newArr
    }, () => {
      Storage.saveUsers(newArr)
    })
  }

  renderUsers = () => {
    return this.state.users.map((user, index) => (
      <UserElement key={user.id} user={user} onRemovePress={() => this.onRemovePress(index)}/>
    ))
  }

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
        {this.renderUsers()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: '#0E103D',
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
  buttonText: {
    color: 'white'
  },
  addSummonerContainer: {
    paddingBottom: 20
  }
});
