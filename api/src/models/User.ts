import { prop, getModelForClass } from "@typegoose/typegoose";

class User {
  @prop({ type: String })
  firstName: string;
}

const UserModel = getModelForClass(User);
export default UserModel;
