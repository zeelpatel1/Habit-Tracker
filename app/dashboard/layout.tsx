import { Sidebar } from '@/components/modern-side-bar'
import { Progress } from '@/components/Progress'
import Tracker from '@/components/Tracker'
import { Searchbar } from '@/components/ui/Searchbar'
import { Username } from '@/components/ui/User'
import { Bell, User } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'

import React from 'react'
import DottedLineChart from '@/components/ChartConfig'
import { MiniChart } from '@/components/mini-chart'

export default async function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className='flex h-screen bg-[#F8F8F8] w-full overflow-hidden'>
            {/* Sidebar is now part of the flex flow */}
            <Sidebar />

            {/* Main content fills the rest of the screen */}
            <main className='flex-1 overflow-x-hidden relative'>
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
                    <Tracker />
                    <div className='flex mb-4 gap-8 max-w-250 rounded-lg min-h-[430px] w-full flex-wrap items-start  bg-background p-4'>
                        <Progress />
                        <Calendar mode='single' disabled={{ before: new Date() }} className='shadow rounded-lg border w-full max-w-sm h-full min-h-[380px]' />
                    </div>
                    <div className='flex items-center gap-8 w-full min-h-[300px]'>
                        <div className='max-w-150 min-h-[400px] max-h-[320px]'>
                        <DottedLineChart/>
                        </div>
                        <div className='bg-background rounded-lg'> 
                            <MiniChart/>
                        </div>
                    </div>
                </div>

                {children}
            </main>
        </div>
    )
}