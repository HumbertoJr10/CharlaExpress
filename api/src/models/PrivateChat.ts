import { getModelForClass, prop } from "@typegoose/typegoose";
import { User } from "./User";
import { GlobalChat } from "./GlobalChat";
import moment from "moment";

export class PrivateChat {

    @prop({ref: "User"})
    participants: User[]

    @prop({ref: "GlobalChat", required: false})
    chat: GlobalChat[]

}

const PrivateChatModel = getModelForClass(User)
export default PrivateChatModel;