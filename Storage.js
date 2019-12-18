import { AsyncStorage } from 'react-native'

export default class Storage {

    static getUsers(){
        return AsyncStorage.getItem("users").then((value) => {
            if(value === null) return []
            else JSON.parse(value)
        })
    }

    static saveUsers(users){
        return AsyncStorage.setItem("users", JSON.stringify(users))
    }
}