import { TopbarIcon } from '@/constant'
import { SignedIn, SignedOut, SignInButton, SignOutButton } from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server'
import Image from 'next/image'
import Link from 'next/link'

import {
  CirclePlus,
  House,
  LogOut,
  Search,
  Settings,
  User,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,

  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { fetchUserData } from '@/lib/action/user.action'

const Topbar = async () => {
    const user = await currentUser()
    const userInfo = await fetchUserData(user?.id || "")
    return (
    <div className='w-full sticky flex justify-between items-center bg-dark-2 py-3 px-3 lg:px-16'>

      <Link href="/" className='transition-all duration-75 hover:outline outline-slate-500 p-3 rounded-2xl cursor-pointer'>
        <House size={36} color='white' className=''/>
      </Link>
      <Link href="/search" className='transition-all duration-75 hover:outline outline-slate-500 p-3 rounded-2xl cursor-pointer'>
        <Search size={36} color='white' className=''/>
      </Link>
      <Link href="/create-post" className='transition-all duration-75 hover:outline outline-slate-500 p-3 rounded-2xl cursor-pointer'>
        <CirclePlus size={36} color='white' className=''/>
      </Link>

      <SignedOut>
        <SignInButton>
            <div className='bg-white rounded-full cursor-pointer object-cover w-16 h-16 flex items-center justify-center'>
                <Image
                  src="/assets/login.png"
                  alt='login icon'
                  width={36}
                  height={36}
                  className=''
                />
            </div>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className='bg-white rounded-full cursor-pointer'>
              <Image
                src={user?.imageUrl||""}
                alt='login icon'
                width={54}
                height={54}
                className='rounded-full'
              />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-40 bg-dark-2 border-light-3 rounded-xl">
              <DropdownMenuLabel><span className='text-white'>My account</span></DropdownMenuLabel>
              <DropdownMenuSeparator color='white'/>
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4 cursor-pointer" color='white'/>
                  <a className='text-white' href={`/profile/${userInfo?._id}`}>Profile</a>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4 cursor-pointer" color='white'/>
                  <a className='text-white' href='/onboarding'>Settings</a>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4"color='white'/>
                    <SignOutButton>
                          <span className='text-white cursor-pointer'>Log out</span>
                    </SignOutButton>
                </DropdownMenuItem>
              </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>        
      </SignedIn>
    </div>
  )
}

export default Topbar