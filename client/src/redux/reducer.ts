import { MESSAGES_GLOBALCHAT, DELETE_MESSAGE_GLOBALCHAT, SEND_MESSAGE_GLOBALCHAT, USER_LOGIN, NEW_GLOBALCHAT } from "./action"
import { iState } from "../interface"

const initialState:iState = {
    GlobalChat: [],
    UserLoged: { email: "", picture: "", username: "" }
}

const reducer = (state = initialState, { type, payload }:{type: any, payload:any}) => {
    switch (type) {

        case MESSAGES_GLOBALCHAT:
            return {
                ...state,
                GlobalChat: payload
            }

        case NEW_GLOBALCHAT: 
            return {
                ...state,
                GlobalChat: [...state.GlobalChat, payload]
            }
        
        case SEND_MESSAGE_GLOBALCHAT:
            return {
                ...state,
                GlobalChat: [ ...state.GlobalChat, payload]
            }
        
        case DELETE_MESSAGE_GLOBALCHAT:
            return {
                ...state,
                GlobalChat: [...state.GlobalChat].filter( e => e._id != payload._id)
            }

        case USER_LOGIN:
            return {
                ...state,
                UserLoged: payload
            }
        default:
            return {...state}
    }
}

export default reducer