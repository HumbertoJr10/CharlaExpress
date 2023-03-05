import { MESSAGES_GLOBALCHAT, DELETE_MESSAGE_GLOBALCHAT, SEND_MESSAGE_GLOBALCHAT } from "./action"
import { iState } from "../interface"

const initialState:iState = {
    GlobalChat: [],
    UserLoged: {}
}

const reducer = (state = initialState, { type, payload }:{type: any, payload:any}) => {
    switch (type) {

        case MESSAGES_GLOBALCHAT:
            return {
                ...state,
                GlobalChat: payload
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
        default:
            return {...state}
    }
}

export default reducer