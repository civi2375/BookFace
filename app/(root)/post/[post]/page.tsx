'use server'
import PostCard from "@/components/card/PostCard";
import { fetchCommentByPostId } from "@/lib/action/post.action"
import { fetchUserData } from "@/lib/action/user.action";
import { currentUser } from "@clerk/nextjs/server";

const page = async({params}:{params:{post:string}}) => {
  const user = await currentUser();
  const [userInfo, Result] = await Promise.all([
    fetchUserData(user?.id || ""),
    fetchCommentByPostId(params.post)
  ]);
  // console.log(Result);
  const isPostliked = userInfo?.likedpost.includes(Result._id)
  const isPostAuthor = userInfo?._id.toString() == Result.author._id.toString()
  console.log(`POST is like:${isPostliked}`);
  console.log(`POST is author:${isPostAuthor}`);
  
  
  return (
    <div className='main-container'>
      {/* 貼文 */}
      <PostCard
        key={Result._id} // 添加唯一的key
        userId = {userInfo._id}
        authorId={Result.author._id.toString()}
        authorImg=''
        authorName={Result.author.username}
        postId={Result._id.toString()}
        context={Result.context}
        createAt={Result.createAt}
        like={Result.like}
        commentcount={Result.children.length}
        isliked={isPostliked}
        isauthor={isPostAuthor}
        classname={""} 
      />
      <h1 className="text-white text-heading2-semibold">其他人的回覆</h1>
      <hr className="my-3 h-5 w-full lg:max-w-4xl"/>
      {/* 留言 */}
      {
        Result.children.map((post:any)=>{
          const isCommentliked = userInfo?.likedpost.includes(post._id)
          const isCommentAuthor = userInfo?._id.toString() == post.author._id.toString()
          console.log(`comment is like:${isCommentliked}`);
          console.log(`comment is author:${isCommentAuthor}`);
          
          return(
            <PostCard
              key={post._id} // 添加唯一的key
              userId = {userInfo._id.toString()}
              authorId={post.author._id.toString()}
              authorImg=''
              authorName={post.author.username}
              postId={post._id.toString()}
              context={post.context}
              createAt={post.createAt}
              like={post.like}
              commentcount={post.children.length}
              isliked={isCommentliked}
              isauthor={isCommentAuthor}
              classname={""} 
            />
        )})

      }
    </div>
    
  )
}

export default page