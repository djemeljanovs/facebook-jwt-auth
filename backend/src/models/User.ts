import { Document, Schema, Model, model } from "mongoose";

export interface IUser extends Document {
    FacebookId: string;
    DisplayName: string;
    FamilyName: string,
    GivenName: string,
    Email?: string,
    ProfileImage?: string;
}

const UserSchema = new Schema({
    FacebookId: String,
    DisplayName: String,
    FamilyName: String,
    GivenName: String ,
    Email: String,
    ProfileImage: String,
});

export const User: Model<IUser> = model('User', UserSchema);