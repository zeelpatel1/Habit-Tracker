import React from 'react'
import { Button } from '../ui/button';
import SignInDialog from '../auth/sign-in-dialog';
import {auth} from '@/lib/auth'

const Login = async() => {

  // const session=await auth.api.getSession();
  // console.log(session);

    const signedIn=true;

    if(signedIn){
        return (
            <Button>
                Login
            </Button>
        )
    }

  return (
    <SignInDialog triggerLabel="Create Goal"/>
  )
}

export default Login