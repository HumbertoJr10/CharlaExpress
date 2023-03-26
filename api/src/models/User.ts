import { prop, getModelForClass, Ref } from "@typegoose/typegoose";
import { PrivateChat } from "./PrivateChat";



export class User {
  @prop({ type: String, required: true })
  username: string;

  @prop({ type: String, required: true })
  picture: string;

  @prop({ type: String, required: true })
  email: string;

  @prop({ type: Boolean, default: false, required: false })
  deleted: boolean;

  @prop({ref: "PrivateChat", required: false, default: []})
  chat: PrivateChat[]
    _id: any;
}

const UserModel = getModelForClass(User);
export default UserModel;
