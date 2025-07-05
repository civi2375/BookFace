import { PostForm } from '@/components/form/PostForm'
import { fetchUserData } from '@/lib/action/user.action'
import { currentUser } from '@clerk/nextjs/server'
import React from 'react'

const page = async() => {
  const user = await currentUser()
  const userInfo = await fetchUserData(user?.id||"")
  return (
    <div className='main-container'>
      <PostForm userId={userInfo._id || ""} postId='' option='create' Postcontext={''}/>
    </div>
  )
}

export default page