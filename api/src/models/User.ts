import { prop, getModelForClass, Ref } from "@typegoose/typegoose";


export class User {
  @prop({ type: String, required: true })
  username: string;

  @prop({ type: String, required: true })
  password: string;

  @prop({ type: String, required: true })
  email: string;
}

const UserModel = getModelForClass(User);
export default UserModel;
