"use server"

import { model } from "mongoose";
import LikeList from "../models/LikeList.model";
import Post from "../models/Post.models";
import User from "../models/User.models";
import { connectToDB } from "../mongoose";


//新增貼文
export async function createPost(context:string,author:string){
    try {
        connectToDB()
        const createPost = await Post.create({
            author,
            context
        })
        await User.findByIdAndUpdate(
            author,{$push:{posts:createPost._id}}
        )
        await LikeList.create({post:createPost._id})
    } catch (error:any) {
        throw new Error(`Error when createing Post ${error}`)
    }
}

//新增留言
export async function createComment(context:string,postId:string,userId:string){
    console.log(`正在為${postId}新增留言`);
    console.log(`正在為新增留言內容${context}`);
    try {
        connectToDB()
        //找到"被"留言的文章
        const FatherPost = await Post.findById(postId)
        if(!FatherPost){
            throw new Error(`FatherPost not found`)        
        }
        //新增一個留言用的文章
        const CommentPost = new Post({
            context:context,
            author:userId,
            parentId:postId,
        })
        //保存留言到資料庫
        const savedCommentPost= await CommentPost.save()
        FatherPost.children.push(savedCommentPost._id)
        await FatherPost.save()
        console.log('留言新增結束');
    } catch (error:any) {
        throw new Error(`Error when createing Comment ${error}`)
    }  
    
}

//刪除指定文章
export async function deletPostById(postId:string,userId:string) {
    console.log("準備刪除:"+postId);
    try {
        connectToDB()
        const Postresult = await Post.findByIdAndDelete(postId)
        const Userresult = await User.findByIdAndUpdate(userId,{$pull:{posts:postId}})
        await LikeList.findOneAndDelete({post:postId})
    } catch (error:any) {
        throw new Error(`Error when createing Post ${error}`)
    }  
}

//更新貼文
export async function UpdatePost(context:string,postId:string){
    try {
        connectToDB()
        await Post.findOneAndUpdate(
            { _id:postId },
            { 
                context:context
            },
            {upsert:true}
        )
    } catch (error:any) {
        throw new Error(`Error when createing Post ${error}`)
    }
}

//尋找首頁貼文
export async function fetchPagePost(startPage:number,pageInterval:number) {
    const skipcount = (startPage-1)*pageInterval
    try {
        // console.log('here is fetching Post Data')
        connectToDB()
        console.log('OK! Lets starting fetch Post Data')
        const postQuery = Post.find({parentId:{$in:[null,undefined]}})
            .sort({createAt:'desc'})
            .skip(skipcount)
            .limit(pageInterval)
            .populate({path:'author',model:User})
        const postlist = await postQuery.exec()
        const totalPostsCount = await Post.countDocuments({parentId:{$in:[null,undefined]}})
        const isNext = totalPostsCount>startPage*pageInterval

        return {postlist,isNext}
    } catch (error:any) {
        throw new Error(`Error when createing Post ${error}`)
    }   
}

//尋找指定id的文章
export async function findPostById(postId:string) {
    console.log("尋找文章ID:"+postId);
    try {
        connectToDB()
        const result = await Post.findById(postId)
        console.log(result);    
        return result
    } catch (error:any) {
        throw new Error(`Error when createing Post ${error}`)
    }  
}

//尋找指定文章id的留言
export async function fetchCommentByPostId(postId:string) {
    console.log(`尋找文章ID:${postId}跟他的留言:`);
    try {
        connectToDB()
        // const Result = await Post.findById  (postId)
        //     .populate({path:'author',model:User,select:'_id username name'})
        //     .populate({path:'children',populate:{path:'author',model:User,select:'_id username name'}})
        const Result = await Post.findById(postId).select('_id author context createAt children like')
            .populate({path:'author',model:User,select:'_id username '})
            .populate({path:'children',model:Post,populate:{path:'author',model:User,select:'_id username '}})

        return Result
    } catch (error:any) {
        throw new Error(`Error when createing Post ${error}`)
    }  
}





