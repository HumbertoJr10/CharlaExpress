//---------------------------------------------
import { iGlobalMessage, iSendMessage, iUser } from "../interface";

//-----------------------------------------------
export const GET_GLOBAL_CHAT = 'GET_GLOBAL_CHAT';
export const SEND_MESSAGES_PRIVATECHAT = 'SEND_MESSAGES_PRIVATECHAT';
export const DELETE_MESSAGE_GLOBALCHAT = 'DELETE_MESSAGE_GLOBALCHAT';
export const USER_LOGIN = 'USER_LOGIN';
export const NEW_GLOBALCHAT = 'NEW_GLOBALCHAT';
export const GET_USERS = 'GET_USERS' ;
export const GET_CHATS = 'GET_CHATS';
export const FILTER_CHAT = 'FILTER_CHAT'

export function filterChat (str: string, str2:string) {
    return {
        type: FILTER_CHAT,
        payload: {
            username: str,
            exclude: str2
        }
    }
}

export function getGlobalChat (allMessages: iGlobalMessage[]) {
    return {
        type: GET_GLOBAL_CHAT,
        payload: allMessages
    }
}

export function messages_globalChat ( msg: iGlobalMessage) {  
        return {
            type: NEW_GLOBALCHAT,
            payload: msg
        }
}

export function sendMessage_PrivateChat ( idChat:string, message:iGlobalMessage ) {

    const a = {
        idChat,
        message
    }

    return {
        type: SEND_MESSAGES_PRIVATECHAT,
        payload: a
    }
}

export async function DeleteMessage_globalChat (_id: string) {
    const deleted = await fetch(`http://localhost:4000/globalchat/${_id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
    })
    .then( res => res.json())
    .then( data => data)

    return {
        type: DELETE_MESSAGE_GLOBALCHAT,
        payload: deleted
    }
}

export async function userLogin (user: iUser) {
    const userLoged = await fetch(`http://localhost:4000/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      })
      .then( res => res.json())
      .then( data => data)

      return {
        type: USER_LOGIN,
        payload: userLoged
      }
}

export async function getAllUsers () {
    const allUsers = await fetch('http://localhost:4000/users')
    .then( res => res.json())
    .then( data => data)

    return {
        type: GET_USERS,
        payload: allUsers
    }
}

export async function getAllChat (id: string) {
    const allChat = await fetch(`http://localhost:4000/privatechat/${id}`)
    .then(res => res.json())
    .then( data => data)
    
    return {
        type: GET_CHATS,
        payload: allChat
    }
}