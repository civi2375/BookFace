import mongoose from "mongoose"

const LikeListSchema = new mongoose.Schema({
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post'
    },
    likeUserList:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
    ]
})

const LikeList = mongoose.models.LikeList || mongoose.model('LikeList',LikeListSchema)

export default LikeList