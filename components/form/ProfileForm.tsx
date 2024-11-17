"use client"

//zod import
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

//shadcn/ui
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

//use hook
import { usePathname, useRouter } from "next/navigation"
//js action
import { updateUser } from "@/lib/action/user.action"
import { Textarea } from "../ui/textarea"

//表格值的型態
const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  bio: z.string()
})

//參數型態規定
interface Props{
  user:{
    userId:string,
    username:string,
    name:string,
    bio:string,
  }
}

export function ProfileForm({user}:Props) {
  const pathname = usePathname()
  const router = useRouter()

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: user.username,
      name:user.name,
      bio:user.bio
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log('start submit...')
    await updateUser({
      userId:user.userId,
      username:values.username,
      name:values.name,
      bio:values.bio,
      path:pathname
     })
    router.push('/')
  }
  return (
    <div className="">
      
      <div className="bg-purple-700 p-12 rounded-2xl flex flex-col items-center">
        <h1 className="text-white mb-10 text-heading1-bold">Setting Your Profile</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Username</FormLabel>
                <FormControl>
                  <Input placeholder="please input your Username" {...field} className="rounded-2xl" />
                </FormControl>
                {/* <FormMessage /> */}
                </FormItem>
            )}/>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">name</FormLabel>
                <FormControl>
                  <Input placeholder="please input your name" {...field} className="rounded-2xl"/>
                </FormControl>
                {/* <FormMessage /> */}
              </FormItem>
            )}/>
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">bio</FormLabel>
                <FormControl>
                  <Textarea placeholder="please input your name" {...field} className="rounded-xl"/>
                </FormControl>
                {/* <FormMessage /> */}
              </FormItem>
            )}/>
          <Button type="submit" className="bg-white rounded-full w-full hover:bg-red-400 ">Submit</Button>
          </form>
        </Form> 
      </div>
    </div>
  )
}
