"use client";
import React from 'react'
import {CircularProgressCard} from "@/components/circular-progress-card"
import { Calendar } from './ui/calendar';


export const Progress = ()=>{
    return (
        <div>
            {/* Example: Custom color passed as a prop */}
            <CircularProgressCard
                className='h-full min-h-[380px]'
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