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

    static saveChampion(champion){
        return AsyncStorage.setItem(`champion-${champion.id}`)
    }

    static getChampion(id){
        return AsyncStorage.getItem(`champion-${id}`).then((value) => {
            if(value === null || value === undefined || value === "") {
                return null
            } else { 
                return JSON.parse(value)
            }
            
        })
    }
}