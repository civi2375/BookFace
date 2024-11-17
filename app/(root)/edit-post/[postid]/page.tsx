import { PostForm } from '@/components/form/PostForm'
import { findPostById } from '@/lib/action/post.action'
import React from 'react'

const page = async({params}:{params:{postid:string}}) => {
  console.log("123:"+params.postid);
  const postinfo = await findPostById(params.postid)
  return (
    <div className='main-container'>
        <PostForm userId='' postId={params.postid} Postcontext={postinfo.context||''} option='edit'/>
    </div>
  )
}

export default page