import { getModelForClass, prop } from "@typegoose/typegoose";
import { User } from "./User";
import { Message } from "./Message";
import moment from "moment";

export class PrivateChat {

    @prop({ref: "User"})
    participants: User[]

    @prop({ref: "Message", required: false})
    chat: Message[]
    _id: unknown;

}

const PrivateChatModel = getModelForClass(User)
export default PrivateChatModel;