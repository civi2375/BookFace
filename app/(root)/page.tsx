// page.tsx

import { fetchPagePost } from "@/lib/action/post.action";
import { fetchUserData } from "@/lib/action/user.action";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

// shadcn ui-Pagination
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
} from "@/components/ui/pagination"



const Page = async () => {

  const user = await currentUser();
  const userInfo = await fetchUserData(user?.id || "");
  if(!userInfo?.onboarded){
    console.log('使用者尚未登入或尚未設定個人資料，正在導向至onbarding');
    redirect('/onboarding')
  }else{
    console.log('使用者登入且設定完成，前往page1');
    redirect('/page/1'); 
  }
  // const result = await fetchPagePost(page,pageInterval)
  
  return (
    <>
      <h1>Error!</h1>
    </>
  )
}
export default Page;
