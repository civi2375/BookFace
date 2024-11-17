import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    id:{type:String,require:true},
    username:{type:String,required:true,unique:true},
    name:{type:String,required:true},
    bio:{type:String},
    posts:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post'
    }],
    onboarded:{type:Boolean},
    likedpost:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post'
    }]

})


const User = mongoose.models.User||mongoose.model('User',userSchema)

export default User