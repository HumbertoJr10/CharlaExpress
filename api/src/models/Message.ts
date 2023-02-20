import { prop, getModelForClass, Ref } from "@typegoose/typegoose";
import { User } from "./User";

export class Message {
    @prop({ref: ()=> User})
    author: User["firstName"]

    @prop({type: String, required: true})
    content: string
}

const MessageModel = getModelForClass(Message)
export default MessageModel