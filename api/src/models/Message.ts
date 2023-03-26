import { getModelForClass, prop } from "@typegoose/typegoose";
import { User } from "./User";
import moment from "moment";

export class Message {

    @prop({ ref: "User"})
    author: User

    @prop({type: String, require: true})
    message: string
  
    @prop({ type: Date, default: () => moment().toDate()})
    date: Date
}

const MessageModel = getModelForClass(Message)
export default MessageModel;