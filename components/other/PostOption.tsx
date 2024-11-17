import React from 'react'
import { CircleX, EllipsisVertical, Pencil } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { deletPostById } from '@/lib/action/post.action'
import { useRouter } from 'next/navigation'

interface PostOptionProps {
    postId:string,
    userId:string
}

const PostOption = ({ postId,userId }: PostOptionProps) => {
    const router = useRouter()
    const deletePost = async()=>{
        if(confirm("確定刪除嗎?"))await deletPostById(postId,userId)   
        router.refresh()
    }
    
    return (
        <div className='z-10 hover:outline-slate-500  '>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <EllipsisVertical />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-40 bg-dark-2 border-light-3 rounded-xl">
                    <DropdownMenuLabel><span className='text-white'>options</span></DropdownMenuLabel>
                    <DropdownMenuSeparator color='white'/>
                    <DropdownMenuGroup>
                        <DropdownMenuItem>
                            <Pencil color="white" className="mr-2 h-4 w-4"/>
                            <a href={`/edit-post/${postId}`}>
                            <span className="text-white text-small-semibold">
                                Edit Post
                            </span>
                            </a>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                        <CircleX color="white" className="mr-2 h-4 w-4"/>
                        <button onClick={()=>deletePost()}>
                            <span className="text-white text-small-semibold">
                            Delete Post
                            </span>
                        </button>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>        
        </div>
  )
}

export default PostOption