"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "../ui/textarea"
import { createPost, UpdatePost } from "@/lib/action/post.action"
import { useRouter } from "next/navigation"
import { useState } from "react"

interface Props{
  userId:string|"",
  postId:string|"",
  option:string|"",
  Postcontext:string|"",

}

const formSchema = z.object({
  context: z.string()
})


export function PostForm({userId,postId,Postcontext,option}:Props) {
    const router = useRouter()
    const [textareaValue, setTextareaValue] = useState(Postcontext)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            context: "",
        },
    })
    async function onSubmit(values: z.infer<typeof formSchema>) {
        if(option=='create'){
          await createPost(textareaValue,userId)
          setTimeout(()=>{},  500)
        }
        else if(option=='edit'){
          console.log(textareaValue); 
          await UpdatePost(textareaValue,postId)
        }
        router.push('/')
    }

    return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full px-5 lg:px-72">
        <FormField
          control={form.control}
          name="context"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">寫下你的想法 然後我們會幫你分享出去！</FormLabel>
              <FormControl>
                <Textarea placeholder="shadcn" {...field} className="text-black rounded-xl min-h-52" value={textareaValue} onChange={(e)=>setTextareaValue(e.target.value)}/>
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" className=" bg-white text-black rounded-xl">Submit</Button>
      </form>
    </Form>
  )
}
