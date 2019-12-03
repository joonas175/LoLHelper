import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button } from 'react-native';
import TextInput from './component/TextInput';
import axios from 'axios'
import { apiKey } from '../GlobalConfig'
import UserElement from './component/UserElement';
import Storage from '../Storage';

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
          users: newArr
        })
      }
      Storage.saveUsers(newArr)
    }).catch((error) => {
      console.log(error)
    })
  }

  renderUsers = () => {
    console.log(this.state.users)
    return this.state.users.map((user) => (
      <UserElement key={user.id} user={user}/>
    ))
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={{textAlign: 'center'}}>Summoner name to look for</Text>
        <TextInput onChange={(value) => this.setState({userNameInput: value})}/>
        <Button title={"Lookup"} onPress={this.lookup}/>
        <Text style={{textAlign: 'center'}}>Summoners</Text>
        {this.renderUsers()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF',
  },
});
