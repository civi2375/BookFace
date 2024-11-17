"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { fetchUserBySearch } from '@/lib/action/user.action'
import { CircleUserRound } from 'lucide-react'
import React, { useEffect, useState } from 'react'

const page = () => {
  const [users,setUsers] = useState<Array<any>>([])
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);
  const searchChange = async (searchTerm:string) =>{
    if (timerId) {
      clearTimeout(timerId);
    }
    if(searchTerm==""){
      setUsers([])
    }else{
      const newTimerId = setTimeout(async() => {
        const result = await fetchUserBySearch(searchTerm)
        setUsers(result?result:[])
      }, 500)
      setTimerId(newTimerId)
    }
  }
  
  
  return (
    <div className='main-container'>
        <div className='bg-dark-2 text-white flex flex-col items-start w-full mb-5 lg:max-w-4xl py-5 rounded-3xl'>
          <div className="w-full px-5">
            <Input placeholder="type something to search you want!" className="bg-dark-2 border-none" onChange={(e)=>{searchChange(e.target.value)}}/>
          </div>
        </div>
        {users[0]?<>
          {users.map((user)=>(
            <div className='bg-dark-2 text-white flex w-full mb-5 lg:max-w-4xl py-5 rounded-3xl items-center justify-between px-5' key={user.id}>
              <div className='flex items-center'>
                <CircleUserRound color='white' size={48} className='mr-3'/>
                <div className='flex flex-col'>
                  <span className='text-heading3-bold'>{user.username}</span>
                  <span className='text-normal-regular text-light-4'>@{user.name}</span>
                </div>
              </div>
              <div>
                <a href={`/profile/${user._id}`} className='bg-dark-4 p-3 text-normal-bold rounded-2xl'>
                  Profile
                </a>
              </div>
            </div>
          ))}
        </>:<>
          <h1 className='text-white text-heading1-bold'>There is nothing .....</h1>
        </>}  
    </div>
  )
}


export default page