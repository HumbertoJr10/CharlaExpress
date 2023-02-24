import { getModelForClass, prop } from "@typegoose/typegoose";
import { User } from "./User";
import moment from "moment";

export class GlobalChat {

    @prop({ ref: "User"})
    author: User

    @prop({type: String, require: true})
    message: string
  
    @prop({ type: Date, default: () => moment().toDate()})
    date: Date
}

const ChatModel = getModelForClass(GlobalChat)
export default ChatModel;