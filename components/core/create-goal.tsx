import React from 'react'
import { Button } from '../ui/button';
import SignInDialog from '../auth/sign-in-dialog';

const CreateGoal = () => {

    const signedIn=true;

    if(signedIn){
        return (
            <Button>
                Create Goal
            </Button>
        )
    }

  return (
    <SignInDialog triggerLabel="Create Goal"/>
  )
}

export default CreateGoal