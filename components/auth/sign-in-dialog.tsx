"use client";

import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogTrigger
} from '@/components/ui/dialog'
import { Button } from '../ui/button'
import { GoogleLogoIcon } from "@phosphor-icons/react/dist/ssr"
import { XLogoIcon } from '@phosphor-icons/react/dist/ssr'
import { createAuthClient } from "better-auth/client";
import { router } from 'better-auth/api';
import { useRouter } from 'next/navigation';

const SignInDialog = ({ triggerLabel }: { triggerLabel: string }) => {

    const handleGoogleSignIn = async() => {
        const authClient = createAuthClient();
        const data=await authClient.signIn.social({
          provider:"google",
          callbackURL:"/dashboard"
        })
        // console.log(data.error)
    }

    return (
        <Dialog>
            <DialogTrigger>
                <Button variant={"default"}>{triggerLabel}</Button>
            </DialogTrigger>

            <DialogContent className='sm:max-w-lg rounded-none rounded-t-2xl md:rounded-2xl px-0 pb-4'>
                <DialogHeader className='px-6 pt-6 text-left'>
                    <DialogTitle>Sign In to Continue</DialogTitle>

                    <DialogDescription className='text-base text-muted-foreground'>
                        Access your account and create goal and track habits.
                    </DialogDescription>
                </DialogHeader>

                <div className='px-6 py-4'>
                    <div className='flex flex-col gap-4'>
                        <Button onClick={()=>handleGoogleSignIn()} variant={"outline"} className='w-full h-12 justify-center rounded-md border-2 text-base font-semibold'>
                            <GoogleLogoIcon weight="bold" className='size-4 mr-2' />
                            Continue with Google
                        </Button>

                        <Button variant={"outline"} className='w-full h-12 justify-center rounded-md border-2 text-base font-semibold'>
                            <XLogoIcon weight="bold" className='size-4 mr-2' />
                            Continue with X
                        </Button>

                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default SignInDialog