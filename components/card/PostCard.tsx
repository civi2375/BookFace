'use client'

import { UserRound } from "lucide-react"
import PostButtons from "../other/PostButtons"
import PostOption from "../other/PostOption"
import { useRouter } from "next/navigation"


interface prop{
  userId:string,
  authorName:string,
  authorImg:string 
  authorId:string 
  postId:string,
  context:string,
  createAt:Date,
  like:number,
  commentcount:number
  isliked:boolean,
  isauthor:boolean,
  classname:string|"",
}


const PostCard = ({
  userId,
  authorId,
  authorImg,
  authorName,
  postId,
  context,
  createAt,
  like,
  commentcount,
  isliked,
  isauthor,
  classname,
}:prop) => {
  const formattedTime = `${createAt.getFullYear().toString()}年${createAt.getMonth().toString()}月${createAt.getDay().toString()}日-${createAt.getHours().toString()}點${createAt.getMinutes().toString()}分發布`
  return (  
    <div className={`bg-dark-2 text-white flex flex-col items-start w-full mb-5 lg:max-w-4xl py-5 rounded-3xl cursor-pointer ${classname}`} >
      <div className="px-5 w-full">
        {/* 貼文作者 */}
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <UserRound className="bg-white mr-3 rounded-full" size={36} color="black"/>
            <div className="flex flex-col">
              <a href={`/profile/${authorId}`} className="text-heading3-bold cursor-pointer">{authorName}</a>
              <h1 className="text-small-regular text-light-4">{formattedTime}</h1>
            </div>
          </div>
          {isauthor?<><PostOption postId={postId} userId={userId}/></>:<></>}
        </div>
        {/* 貼文時間以及內容 */}
        <h1 className="break-words text-base-regular mt-5 mb-10 px-12">{context}</h1>
        {/* 貼文下方按鈕 */}
        <div>
          <PostButtons
            isliked={isliked}
            postId={postId}
            UserId={userId}
            like={like}
            commentcount={commentcount}
          />  
        </div>
      </div>
    </div>
  )
}

export default PostCard