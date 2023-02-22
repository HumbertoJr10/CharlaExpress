import { prop, getModelForClass } from "@typegoose/typegoose";

export class User {
  @prop({ type: String, required: true })
  username: string;

  @prop({ type: String, required: true })
  password: string;

  @prop({ type: String, required: true })
  picture: string;

  @prop({ type: String, required: true })
  email: string;

  @prop({ type: Boolean, default: false, required: false })
  deleted: boolean;
}

const UserModel = getModelForClass(User);
export default UserModel;
