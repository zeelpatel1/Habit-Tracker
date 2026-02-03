import { Sidebar } from '@/components/modern-side-bar'
import { getSession } from 'better-auth/api'
import React from 'react'

export default async function layout({children}:{children:React.ReactNode}) {

    // const session=await getSession()
    // console.log(session);

    return (
        <div className='flex h-screen w-screen'>
            {/* <Sidebar user={session?.user}/> */}
            {children}
        </div>
    )
}