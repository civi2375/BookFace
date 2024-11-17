'use client'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { UserAddLikePost, UserRemoveLikePost } from '@/lib/action/user.action'
import { Heart, MessageCircle } from 'lucide-react'
import { Input } from '../ui/input'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '../ui/textarea'
import CommentForm from '../form/CommentForm'

interface prop{
  isliked:boolean
  postId:string
  UserId:string
  like:number,
  commentcount:number
}
const PostButtons = ({isliked,postId,UserId,like,commentcount}:prop) => {
  const [likeState, setlikeState] = useState(isliked)
  const [newLikeState, setNewLikeState] = useState(isliked)
  const [likeCount, setLikeCount] = useState(like) 
  const [IsCommentClick, setIsCommentClick] = useState(false) 
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);
  const  handleLikeClick =(event: React.MouseEvent) => {
    event.stopPropagation();
    console.log(`現在User是${!newLikeState?'喜歡':'不喜歡'}這文章`);
    setNewLikeState(!newLikeState)
    setLikeCount(!newLikeState?likeCount+1:likeCount-1)
    if (timerId) {
      clearTimeout(timerId);
    }
    // newLikeState?setlikeNumber(1):setlikeNumber(-1)
    const newTimerId = setTimeout(async() => {
      if(likeState!=!newLikeState&&!newLikeState==true){
        await UserAddLikePost(UserId,postId,like)
        setlikeState(!newLikeState)
      }
      if(likeState!=!newLikeState&&!newLikeState==false){
        await UserRemoveLikePost(UserId,postId,like)
        setlikeState(!newLikeState)
      }
    }, 1000)
    setTimerId(newTimerId)
  };
  const handleCommentClick=(event: React.MouseEvent)=>{
    event.stopPropagation();
    setIsCommentClick(!IsCommentClick)
  }
  return (
    <div>
        {/* 按鈕們 */}
        <div className='flex items-center'>
          {/* 喜歡按鈕 */}
          <div className='flex items-center hover:bg-[#3d3d42] max-w-24 rounded-full'>
            <Button onClick={handleLikeClick} className='w-full'>
              {newLikeState?<Heart color='red' size={24}/>:<Heart />}
              <span className='ml-3'>{likeCount}</span>
            </Button>
          </div>
          {/* 留言按鈕 */}
          <div className='ml-3 max-w-24 hover:bg-[#3d3d42] rounded-full'>
            <Button onClick={handleCommentClick} className='w-full'>
              <MessageCircle size={24}/>
              <span className='ml-3'>{commentcount}</span>
            </Button>
          </div>
        </div>
        {/* 留言input bar */}
        <CommentForm IsCommentClick={IsCommentClick} postId={postId} authorId={UserId}/>
    </div>
  )
}

export default PostButtons
