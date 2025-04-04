import React from 'react'

const MessageSkeleton = () => {
  return (
    <div className="flex justify-between">
        <div className="pl-6 flex flex-col gap-16">
            <div className="flex gap-2 items-baseline">
               <div className="skeleton size-9 rounded-full "></div>
               <div >
                  <div className="skeleton h-2.5 w-16 mt-2 mb-1"></div>
                  <div className="skeleton h-12  w-48"></div>
                </div>
            </div>
            <div className="flex gap-2 items-baseline">
               <div className="skeleton size-9 rounded-full "></div>
               <div >
                  <div className="skeleton h-2.5 w-16 mt-2 mb-1"></div>
                  <div className="skeleton h-12  w-48"></div>
                </div>
            </div>
            <div className="flex gap-2 items-baseline">
               <div className="skeleton size-9 rounded-full "></div>
               <div >
                  <div className="skeleton h-2.5 w-16 mt-2 mb-1"></div>
                  <div className="skeleton h-12  w-48"></div>
                </div>
            </div>
        </div>

          

    
        <div className="pr-6 flex flex-col gap-16 mt-16">
            <div className="flex gap-2 items-baseline">
               <div >
                  <div className="skeleton h-2.5 w-16 mt-2 mb-1"></div>
                  <div className="skeleton h-12  w-48"></div>
                </div>
                <div className="skeleton size-9 rounded-full "></div>
            </div>
            <div className="flex gap-2 items-baseline">
               <div >
                  <div className="skeleton h-2.5 w-16 mt-2 mb-1"></div>
                  <div className="skeleton h-12  w-48"></div>
                </div>
                <div className="skeleton size-9 rounded-full "></div>
            </div>
            <div className="flex gap-2 items-baseline">
               <div >
                  <div className="skeleton h-2.5 w-16 mt-2 mb-1"></div>
                  <div className="skeleton h-12  w-48"></div>
                </div>
                <div className="skeleton size-9 rounded-full "></div>
            </div>
            
        </div>
        
    </div>
  )
}

export default MessageSkeleton