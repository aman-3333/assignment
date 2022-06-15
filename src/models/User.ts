import { Document, model, ObjectId, Schema } from "mongoose";


const userSchema = new Schema(
  {
  
 
    email: { type: String ,unique:true},


    password: { type: String, required: true },

   
    fullname: { type: String },
    contact: { type: Number, trim: true },
    country_code: { type: Number, trim: true },
    
    contact_verify: { type: Boolean, default: false },
   
    dob: { type: Date },
    gender: {
      type: String,
      defult: "Other",
      enum: ["Male", "Female", "Other"],
    },

   

 
    usertype: {
      type: String,
      defult: "customer",
      enum: [ "Admin","superAdmin"],
},
    Status:  { type: String },
    Details:  { type: String },
    isDeleted: { type: Boolean, default: false },

  },
  {
    timestamps: true,
  }
);

export interface IUser extends Document {
  email: string,
  fullname: string;
  firstname: string;
  lastname: string;
  contact: number;

  isVerified: Boolean;

  usertype: string;
  password: string;
  gender: string;

  username: string;
  Status: string; 
  Details: string,
  isDeleted:boolean
}
// user

export default model<IUser>("Users", userSchema);
