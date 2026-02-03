import { Sidebar } from '@/components/modern-side-bar'
import Tracker from '@/components/Tracker'
import { Searchbar } from '@/components/ui/Searchbar'
import { Username } from '@/components/ui/User'
import { Bell, User } from 'lucide-react'
import React from 'react'

export default async function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className='flex h-screen bg-gray-100 w-full overflow-hidden'>
            {/* Sidebar is now part of the flex flow */}
            <Sidebar />

            {/* Main content fills the rest of the screen */}
            <main className='flex-1 overflow-hidden relative'>
                <div className='flex items-center justify-between mb-5 bg-white p-1'>
                    <Searchbar />
                    <div className='flex items-center p-2 gap-2'>
                        <Username />
                        <User className="w-10 h-10 cursor-pointer text-gray-600 border p-2 rounded-md" />
                        <Bell className='w-10 h-10 cursor-pointer text-gray-600 border p-2 rounded-md' />
                    </div>
                </div>

                <div className='ml-5 '>
                <div className="flex items-center space-x-1 text-2xl font-semibold">
                    <span>Welcome back,</span>
                    <Username />
                </div>
                <Tracker/>
                </div>

                {children}
            </main>
        </div>
    )
}