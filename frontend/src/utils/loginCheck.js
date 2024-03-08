import { getCookie } from "./cookie"

export function loginCheck(){
    const username = getCookie("username")
    if(username.length==0){
        return false
    }else{
        return true
    }
}