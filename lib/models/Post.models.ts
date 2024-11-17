import mongoose from "mongoose"

const postSchema = new mongoose.Schema({
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    context:{
        type:String,
        require:true
    },
    createAt:{
        type:Date,
        default:Date.now
    },
    parentId:{
        type:String
    },
    children:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Thread'
        }
    ],
    // like:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:'ListList'
    // },
    like:{
        type:Number,
        default:0
    }

})

const Post = mongoose.models.Post || mongoose.model('Post',postSchema)

export default Post