import { prop, getModelForClass, Ref } from "@typegoose/typegoose";
import { User } from "./User";
import moment from "moment";

export class Message {
    @prop({ref: ()=> User})
    author: User

    @prop({type: String, required: true})
    content: string

    @prop({ type: Date, default: () => moment().toDate()})
    created: Date
}

const MessageModel = getModelForClass(Message)
export default MessageModel