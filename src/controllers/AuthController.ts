import User,{IUser} from "../models/User"

export default class authManagement{

public async signUp(body:IUser){
    let userInfo: IUser;
    let checkEmail: IUser|null=await User.findOne({email:body.email,isDeleted:false})
if (!checkEmail){
 userInfo=await User.create(body)
}
else{
    return {
        Status: "Error",
        Details:
            "This email is already taken. Please try with a new email.",
    };  
}
    return userInfo

}



public async signIn(body:IUser){
    let userInfo: IUser | null = await User.findOne({ email: body.email, password: body.password})

    if (!userInfo){
        return {
            Status: "Error",
            Details:
                "wrong credentials.",
        };
    }

    else
    {
        return userInfo
    }




  


}
    public async resetPassword(body:IUser){
        let userInfo: IUser | null = await User.findOne({ email: body.email })

        if (!userInfo) {
            return {
                Status: "Error",
                Details:
                    "wrong email.",
            };
        }

        
            userInfo = await User.findOneAndUpdate({ _id: userInfo._id, isDeleted: false }, { $set: { password: body.password
}},{new:true})
        


        return userInfo

    }



}