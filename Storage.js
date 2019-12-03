import { AsyncStorage } from 'react-native'

export default class Storage {

    static getUsers(){
        return AsyncStorage.getItem("users").then((value) => JSON.parse(value))
    }

    static saveUsers(users){
        return AsyncStorage.setItem("users", JSON.stringify(users))
    }
}