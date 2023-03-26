import { MESSAGES_GLOBALCHAT, DELETE_MESSAGE_GLOBALCHAT, SEND_MESSAGE_GLOBALCHAT, USER_LOGIN, NEW_GLOBALCHAT, GET_USERS, GET_CHATS, SEND_MESSAGES_PRIVATECHAT } from "./action"
import { iState } from "../interface";


const initialState:iState = {
    GlobalChat: [],
    UserLoged: { email: "", picture: "", username: "", chat: [], _id: "" },
    UsersList: [],
    chat: [],
}

const reducer = (state = initialState, { type, payload }:{type: any, payload:any}) => {
    switch (type) {

        case MESSAGES_GLOBALCHAT:
            return {
                ...state,
                GlobalChat: payload
            }

        case SEND_MESSAGES_PRIVATECHAT:
            const newChat = [...state.chat]
            const busqueda = newChat.find(e => e._id === payload.idChat)
            if (!busqueda) {
                return {
                    ...state
                }
            }

            busqueda.chat.push(payload.message)
            return {
                ...state, 
                chat: newChat
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
        
        case GET_USERS:
            return {
                ...state,
                UsersList: payload
            }

        case GET_CHATS:
            return {
                ...state,
                chat: payload
            }
            
        default:
            return {...state}
    }
}

export default reducer