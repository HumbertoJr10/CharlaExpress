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
    date: string
    _id: string
}

export interface iSendMessage {
    message: string
}