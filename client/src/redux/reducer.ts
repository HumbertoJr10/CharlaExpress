import { GET_ALL_MESSAGES_GLOBALCHAT, DELETE_MESSAGE_GLOBALCHAT } from "./action"
import { iState } from "../interface"

const initialState:iState = {
    GlobalChat: [],
    UserLoged: {}
}

const reducer = (state = initialState, { type, payload }:{type: any, payload:any}) => {
    switch (type) {

        case GET_ALL_MESSAGES_GLOBALCHAT:
            return {
                ...state,
                GlobalChat: payload
            }
        
        default:
            return {...state}
    }
}

export default reducer