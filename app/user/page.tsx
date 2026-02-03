// "use client"
import React from 'react'
import { AuthClient } from 'better-auth/client'
import { authClient } from '@/lib/auth-client'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'

const page = async() => {

    // const {data:session,isPending,error}=authClient.useSession()
    // console.log(session)
    const session=await auth.api.getSession({
        headers:await headers()
    })

    // const {data:session}=await authClient.getSession()

  return (
    <div>
      {session?.user ? (
        <pre>{JSON.stringify(session.user, null, 2)}</pre>
      ) : (
        <span>No user session</span>
      )}
    </div>
  )
}

export default page