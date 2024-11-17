import { Skeleton } from "@/components/ui/skeleton"
import React from 'react'

const page = () => {
  return (
    <div className='main-container'>
        <div className="flex flex-col mb-10">
            <div className="flex items-center space-x-4 pb-3">
                <Skeleton className="h-12 w-12 rounded-full bg-white" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px] bg-white" />
                    <Skeleton className="h-4 w-[200px] bg-white" />
                </div>
            </div>
            <Skeleton className=" h-28 w-full bg-white"/>
        </div>
        <div className="flex flex-col mb-10">
            <div className="flex items-center space-x-4 pb-3">
                <Skeleton className="h-12 w-12 rounded-full bg-white" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px] bg-white" />
                    <Skeleton className="h-4 w-[200px] bg-white" />
                </div>
            </div>
            <Skeleton className=" h-28 w-full bg-white"/>
        </div>
        <div className="flex flex-col mb-10">
            <div className="flex items-center space-x-4 pb-3">
                <Skeleton className="h-12 w-12 rounded-full bg-white" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px] bg-white" />
                    <Skeleton className="h-4 w-[200px] bg-white" />
                </div>
            </div>
            <Skeleton className=" h-28 w-full bg-white"/>
        </div>

    </div>
  )
}

export default page
