import { DELETE_MESSAGE_GLOBALCHAT, USER_LOGIN, NEW_GLOBALCHAT, GET_USERS, GET_CHATS, SEND_MESSAGES_PRIVATECHAT, GET_GLOBAL_CHAT, FILTER_CHAT } from "./action"
import { iState } from "../interface";


const initialState:iState = {
    GlobalChat: [],
    UserLoged: { email: "", picture: "", username: "", chat: [], _id: "" },
    UsersList: [],
    chat: [],
    chatRespaldo: []
}

const reducer = (state = initialState, { type, payload }:{type: any, payload:any}) => {
    switch (type) {

        case GET_GLOBAL_CHAT:
            return {
                ...state,
                GlobalChat: payload
            }

        case NEW_GLOBALCHAT: 
            return {
                ...state,
                GlobalChat: [...state.GlobalChat, payload]
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
                chat: payload,
                chatRespaldo: payload
            }

        case FILTER_CHAT:

            if (payload.username) {
                return {
                    ...state,
                    chat: state.chatRespaldo.filter(e => e.participants[0].username.toUpperCase().includes(payload.username.toUpperCase()) && !e.participants[0].username.toUpperCase().includes(payload.exclude.toUpperCase()) || e.participants[1].username.toUpperCase().includes(payload.username.toUpperCase()) && !e.participants[1].username.toUpperCase().includes(payload.exclude.toUpperCase()) )
                } 
            }

            return {
                ...state,
                chat: state.chatRespaldo
            }
            
        default:
            return {...state}
    }
}

export default reducer