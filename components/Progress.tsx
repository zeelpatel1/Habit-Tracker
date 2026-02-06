"use client"
import { CircularProgressCard } from "./circular-progress-card"

export const Progress = () => {
  return (
    <div>
      <CircularProgressCard
        className="h-full min-h-[380px] bg-card text-card-foreground"
        title="Daily Progress"
        description="Tasks completed for the new feature launch."
        currentValue={128}
        goalValue={200}
        currency=""
        progressColor="hsl(142.1 76.2% 41.2%)"
      />
    </div>
  )
}
