'use client'
//zod
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
//form
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from '../ui/textarea'
import { Button } from "../ui/button"
import { useState } from "react"
import { createComment } from "@/lib/action/post.action"
import { useRouter } from "next/navigation"


 
const formSchema = z.object({
    context: z.string()
})
   
interface props{
    IsCommentClick:boolean,
    postId:string,
    authorId:string,
}

const CommentForm = ({IsCommentClick,postId,authorId}:props) => {
    const router = useRouter()
    const [textareaValue, setTextareaValue] = useState('')
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            context: "",
        },
    })
    async function onSubmit(values: z.infer<typeof formSchema>) {
        if(textareaValue!=''){
            console.log(textareaValue)
            await createComment(textareaValue,postId,authorId)
            setTextareaValue('')
            router.refresh()
        }
    }
    return (
    <div className={`w-full transition-all duration-500 ${IsCommentClick?'h-60 opacity-1':'h-0 opacity-0'}`}>
        <hr className={`mt-2 mb-5 duration-300 ${IsCommentClick?'opacity-1 delay-200':'opacity-0'} `}/>    
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="pb-5 h-full flex flex-col ">
                <FormField
                control={form.control}
                name="context"
                render={({ field }) => (
                    <FormItem className="h-full">
                    <FormControl>
                        <Textarea className={`rounded-xl h-full bg-dark-2 ${IsCommentClick?'opacity-1 delay-200':'opacity-0'} duration-300`}  value={textareaValue} onChange={(e)=>setTextareaValue(e.target.value)}/>
                    </FormControl>
                    {/* <FormMessage /> */}
                    </FormItem>
                )}
            />
                <div className={`${IsCommentClick?'opacity-1 delay-200':'opacity-0'} duration-300 flex justify-between items-center mt-5 px-3`}>
                    <a href={`/post/${postId}`} className="opacity-50 underline">其他留言</a>
                    <button className="outline py-2 px-4 rounded-xl">送出</button>
                </div>
            </form>
        </Form>
    </div>
  )
}

export default CommentForm