'use server'
import { revalidatePath } from "next/cache"
import User from "../models/User.models"
import { connectToDB } from "../mongoose"
import Post from "../models/Post.models"
import { Search } from "lucide-react"
import LikeList from "../models/LikeList.model"


interface Params{
    userId:string,
    username:string,
    name:string,
    bio:string,
    path:string
}

//更新使用者資料
export async function updateUser({
    userId,
    username,
    name,
    bio,
    path
}:Params):Promise<void> {
    connectToDB()
    try {
        // console.log('updateUser:'+userId +" ")
        // console.log('username'+username)
        // console.log('bio'+bio)
        await User.findOneAndUpdate(
            { id:userId },
            { 
                username:username.toLowerCase(),
                name,
                bio,
                onboarded:true,
            },
            {upsert:true}
        )
        if(path==='/profile/edit'){
            revalidatePath(path)
        }    
        // console.log('update over')
    } catch (error:any) {
        throw Error(`Failed to create/update uesr:${error.message}`)
    }  
}

//尋找當前user資訊
export async function fetchUserData(userId:string){
    try {

        // console.log('here is fetching users Data')
        connectToDB()
        console.log('OK! Lets starting fetch User Data')
        return await User.findOne({id:userId})
    } catch (error:any) {
        throw Error(`Failed to create/update uesr:${error.message}`)
    }

    return null
}

//用指定Id去找尋指定User的Data(包含其post資訊)
export async function fetchUserDataByObjectId(userId:string){
    try {
        
        connectToDB()
        console.log('OK! Lets starting fetch User Data')
        return await User.findOne({_id:userId}).populate({path:'posts',model:"Post"})
    } catch (error:any) {
        throw Error(`Failed to create/update uesr:${error.message}`)
    }
}

//使用者按下指定文章的讚
export async function UserAddLikePost(authorId:string,postId:string,like:number){
    try {
        connectToDB()
        const PostRestult = await Post.findByIdAndUpdate(postId,{like:(like+1)})
        const LikeListResult = await LikeList.findOneAndUpdate({post:postId},{$push:{likeUserList:authorId}},{upsert:true,new:true})
        const UserRestult = await User.findByIdAndUpdate(authorId,{$push:{likedpost:postId}})
        console.log("我完成新增!!!");
        console.log(`現在是使用者${authorId}的按讚`);
        console.log(`現在文章${postId}的按讚數是:${PostRestult.like}`);
    } catch (error:any) {
        throw Error(`Failed to create/update uesr:${error.message}`)
    }
}
//使用者取消指定文章的讚
export async function UserRemoveLikePost(authorId:string,postId:string,like:number){
    try {
        connectToDB()
        const PostRestult = await Post.findByIdAndUpdate(postId,{like:(like-1)})
        const LikeListResult = await LikeList.findOneAndUpdate({post:postId},{$pull:{likeUserList:authorId}},{upsert:true,new:true})
        const UserRestult = await User.findByIdAndUpdate(authorId,{$pull:{likedpost:postId}})
        console.log("我完成刪除!!!");
        console.log(`現在文章${postId}的按讚數是:${PostRestult.like}`);
    } catch (error:any) {
        throw Error(`Failed to create/update uesr:${error.message}`)
    }
}
//用名字尋找User
export async function fetchUserBySearch(searchTerm:string) {
    try {
        connectToDB()
        const Result =await User.find({
            $or:[
                {username:{$regex:searchTerm,$options:'i'}},
                {name:{$regex:searchTerm,$options:'i'}}
            ]              
        }).select('username id name')
        if(Result){
            const translatedResult = Result.map((user)=>({
                _id:user._id.toString(),
                username:user.username,
                id:user.id,
                name:user.name,
            }))
            return translatedResult
        }
        return null
    } catch (error:any) {
        throw Error(`Failed to create/update uesr:${error.message}`)
    }
}  
