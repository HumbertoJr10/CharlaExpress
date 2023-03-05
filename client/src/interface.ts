export interface iState {
    GlobalChat: iGlobalMessage[]
    UserLoged: {}
}

export interface iAuthor {
    _id: string
    username: string
    picture: string
}

export interface iGlobalMessage {
    message: string
    author: iAuthor
    date: string | Date
    _id: string
}

export interface iSendMessage {
    message: string
}

export interface iUser {
    username: string,
    email: string,
    picture: string
}