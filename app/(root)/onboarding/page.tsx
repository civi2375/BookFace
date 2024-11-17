import { ProfileForm } from "@/components/form/ProfileForm"
import { fetchUserData } from "@/lib/action/user.action"
import { currentUser } from "@clerk/nextjs/server"


const page = async () => {
  const user = await currentUser()
  const userInfo = await fetchUserData(user?.id||"")
  const userData = {
    userId:user?.id||"",
    username:userInfo?.username||"",
    name:userInfo?.name||"",
    bio:userInfo?.bio||"",
  }
  return (
    <div className="main-container">
      <ProfileForm user={userData}/>
    </div>
  )
}

export default page