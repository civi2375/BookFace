// page.tsx
'use server'

import PostCard from "@/components/card/PostCard";
import { fetchPagePost,  } from "@/lib/action/post.action";
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
  PaginationPrevious,
} from "@/components/ui/pagination"



const Page = async ({params}:{params:{page:number}}) => {
  const pageInterval = 3
  const user = await currentUser();
  const [userInfo, result] = await Promise.all([
    fetchUserData(user?.id || ""),
    fetchPagePost(params.page, pageInterval)
  ]);
  if (!userInfo?.onboarded) redirect('/onboarding');
  
  return (
    <div className='main-container'>
      
      {result.postlist.map((post) => {
        const isliked = userInfo?.likedpost.includes(post._id)
        const isAuthor = userInfo?._id.toString() == post.author._id.toString()
        return (
          <PostCard
            key={post._id} // 添加唯一的key
            userId={userInfo._id.toString()}
            authorImg=""
            authorName={post.author.name}
            authorId={post.author._id.toString()}
            postId={post._id.toString()} 
            context={post.context}
            createAt={post.createAt}
            like={post.like}
            commentcount={post.children.length}
            isliked={isliked}
            isauthor={isAuthor}
            classname={""}
          />
        );
      })}
      <Pagination className="text-white z-10">
        <PaginationContent>
          {params.page>1&&
            <>
            <PaginationItem>
              <PaginationPrevious href={`/page/${Number(params.page)-1}`}/>
            </PaginationItem>
            </>
          }
          <PaginationItem>
            <PaginationLink href="#">{params.page}</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          {result.isNext&&
            <>
            <PaginationItem>
              <PaginationNext href={`/page/${Number(params.page)+1}`}/>
            </PaginationItem>
            </>
          }
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default Page;
