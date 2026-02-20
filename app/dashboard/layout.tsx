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
import CreateGoal from '@/components/CreateGoal'
import ThemeToggle from '@/components/core/theme-toggle'

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-dvh w-full overflow-hidden bg-background text-foreground">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <main className="flex-1 overflow-x-hidden relative">
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-5 bg-background border-b border-border px-3 py-2">
          <Searchbar />

          <div className="flex items-center gap-2">
            <CreateGoal />
            <ThemeToggle />

            <User className="w-10 h-10 cursor-pointer text-muted-foreground border border-border p-2 rounded-md hover:bg-accent transition" />
            <Bell className="w-10 h-10 cursor-pointer text-muted-foreground border border-border p-2 rounded-md hover:bg-accent transition" />
          </div>
        </div>

        {/* Page Content */}
        <div className="px-5 space-y-4">
          <div className="flex items-center space-x-1 text-2xl font-semibold">
            <span>Welcome back,</span>
            <Username />
          </div>

          <Tracker />

          {/* Progress + Calendar */}
          {/* <div className="flex flex-wrap gap-8 rounded-lg bg-background border border-border p-4"> */}
            {/* <Progress /> */}

            <Calendar
              mode="single"
              disabled={{ before: new Date() }}
              className="shadow rounded-lg border border-border w-full max-w-sm min-h-[380px]"
            />
          {/* </div> */}

          {/* Charts */}
          <div className="items-center gap-8 w-full">
            {/* <div className="max-w-[600px] min-h-[320px]"> */}
              {/* <DottedLineChart /> */}
            {/* </div> */}

            {/* <div className="bg-background border border-border rounded-lg p-2">
              <MiniChart />
            </div> */}
          </div>
        </div>

        {children}
      </main>
    </div>
  )
}
