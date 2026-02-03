"use client";
import React from 'react'
import {CircularProgressCard} from "@/components/circular-progress-card"

export const Progress = ()=>{
    return (
        <div className="flex min-h-[500px] w-full flex-wrap items-start justify-start gap-8 bg-background p-4">
            {/* Example: Custom color passed as a prop */}
            <CircularProgressCard
                title="Daily Progress"
                description="Tasks completed for the new feature launch."
                currentValue={128}
                goalValue={200}
                currency=""
                progressColor="hsl(142.1 76.2% 41.2%)" // Custom green color
            />
        </div>
    )
}