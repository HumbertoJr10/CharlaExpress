//---------------------------------------------
import { iSendMessage, iUser } from "../interface";

//-----------------------------------------------
export const MESSAGES_GLOBALCHAT = 'MESSAGES_GLOBALCHAT';
export const DELETE_MESSAGE_GLOBALCHAT = 'DELETE_MESSAGE_GLOBALCHAT';
export const SEND_MESSAGE_GLOBALCHAT = 'SEND_MESSAGE_GLOBALCHAT';
export const USER_LOGIN = 'USER_LOGIN'

export async function messages_globalChat () {
        const data = await fetch(`http://localhost:4000/globalchat`)
        .then( res => res.json())
        .then( data => data)

        return {
            type: MESSAGES_GLOBALCHAT,
            payload: data
        }
}

export async function sendMessage_globalChat (email: string, message: iSendMessage) {
    const msg = await fetch(`http://localhost:4000/globalchat/${email}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(message),
    })
    .then( res => res.json())
    .then( data => data)

    return {
        type: SEND_MESSAGE_GLOBALCHAT,
        payload: msg
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