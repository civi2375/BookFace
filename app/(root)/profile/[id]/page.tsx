import PostCard from '@/components/card/PostCard';
import {fetchUserData, fetchUserDataByObjectId } from '@/lib/action/user.action'
import { currentUser } from '@clerk/nextjs/server';
import { UserRound } from 'lucide-react';

import React from 'react'

const page = async ({params}:{params:{id:string}}) => {
  const user = await currentUser();
  // const userInfo = await fetchUserData(user?.id || "");
  // const searchUser = await fetchUserDataByObjectId(params.id)
  const [userInfo, searchUser] = await Promise.all([
    fetchUserData(user?.id || ""),
    fetchUserDataByObjectId(params.id)
  ]);
  console.log("searchUser:"+searchUser);
  console.log(userInfo._id.toString());
  
  return (
    <div className='main-container text-white'>
      <div className="bg-purple-600 text-white flex flex-col w-full px-3 mb-5 lg:max-w-4xl py-5 rounded-3xl">
        <div className='flex items-center mb-5'>
          <UserRound className="bg-white rounded-full mr-3" size={56} color="black"/>
          <div className='flex flex-col'>
            <h1 className='text-heading2-bold '>{searchUser?.username}'s Profile</h1>
            <h1 className='text-light-3 w-full'>@{searchUser?.name}</h1>
          </div>
        </div>

        <h1 className='w-full px-5 break-words mx-12'>{searchUser.bio}</h1>
      </div>
      {
        searchUser.posts.reverse().map((post:any)=>{
          const isauthor = userInfo?._id.toString() == post.author._id.toString()
          const isliked = userInfo?.likedpost.includes(post._id)
          return(
            <PostCard
              key={post._id} // 添加唯一的key
              userId = {userInfo._id.toString()}
              authorId={post.author._id.toString()}
              authorImg=''
              authorName={searchUser?.username}
              postId={post._id.toString()}
              context={post.context}
              createAt={post.createAt}
              like={post.like}
              commentcount={post.children.length}
              isliked={isliked}
              isauthor={isauthor}
              classname={""} 
            />
          )
        })
      }
    </div>
  )
}

export default page