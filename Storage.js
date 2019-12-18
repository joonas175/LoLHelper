//import { AsyncStorage } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';

export default class Storage {

    static getUsers(){
        return AsyncStorage.getItem("users").then((value) => {
            if(value === null || value === undefined || value === "") {
                return []
            } else { 
                return JSON.parse(value)
            }
            
        })
    }

    static saveUsers(users){
        return AsyncStorage.setItem("users", JSON.stringify(users))
    }
}