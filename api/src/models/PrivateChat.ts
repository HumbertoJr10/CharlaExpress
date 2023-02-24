import { getModelForClass, prop } from "@typegoose/typegoose";
import { User } from "./User";
import moment from "moment";

export class PrivateChat {

    @prop({ref: "User"})
    participants: User[]

    @prop({type: String, required: true})
    message: string;

    @prop({type: String, required: false})
    picture: string;

    @prop({ type: Date, default: () => moment().toDate()})
    date: Date
}

const PrivateChatModel = getModelForClass(User)
export default PrivateChatModel;