"use client"

import React, { useState } from "react"
import { Button } from "./ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { Input } from "./ui/input"
import { Plus, Trash } from "lucide-react"

type GoalType = "yearly" | "monthly" | "weekly" | "daily"

type GoalsState = Record<GoalType, string[]>

const CreateGoal = () => {
  const [activeGoal, setActiveGoal] = useState<GoalType>("yearly")

  const [goals, setGoals] = useState<GoalsState>({
    yearly: [""],
    monthly: [""],
    weekly: [""],
    daily: [""],
  })

  const addGoal = () => {
    setGoals((prev) => ({
      ...prev,
      [activeGoal]: [...prev[activeGoal], ""],
    }))
  }

  const updateGoal = (index: number, value: string) => {
    setGoals((prev) => ({
      ...prev,
      [activeGoal]: prev[activeGoal].map((g, i) =>
        i === index ? value : g
      ),
    }))
  }

  const removeGoal = (index: number) => {
    setGoals((prev) => ({
      ...prev,
      [activeGoal]: prev[activeGoal].filter((_, i) => i !== index),
    }))
  }

  const handleSave = () => {
    const cleaned = Object.fromEntries(
      Object.entries(goals).map(([key, values]) => [
        key,
        values.filter((v) => v.trim() !== ""),
      ])
    )

    console.log("Saved goals:", cleaned)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Create Goal</Button>
      </DialogTrigger>

      <DialogContent showCloseButton={false} className="space-y-4">
        <DialogHeader>
          <DialogTitle>Select Type of Goal</DialogTitle>
        </DialogHeader>

        {/* Goal Type Buttons */}
        <div className="flex gap-2">
          {(["yearly", "monthly", "weekly", "daily"] as GoalType[]).map(
            (goal) => (
              <Button
                key={goal}
                type="button"
                variant="outline"
                onClick={() => setActiveGoal(goal)}
                className={cn(
                  "flex-1 capitalize",
                  activeGoal === goal &&
                    "bg-primary text-primary-foreground hover:bg-primary"
                )}
              >
                {goal} Goal
              </Button>
            )
          )}
        </div>

        {/* Inputs */}
        <div className="space-y-2">
          {goals[activeGoal].map((goal, index) => {
            const isLast = index === goals[activeGoal].length - 1

            return (
              <div key={index} className="flex gap-2">
                <Input
                  value={goal}
                  placeholder={`${activeGoal} goal ${index + 1}`}
                  onChange={(e) =>
                    updateGoal(index, e.target.value)
                  }
                />

                {isLast && (
                  <Button
                    type="button"
                    size="icon"
                    variant="outline"
                    onClick={addGoal}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                )}

                {goals[activeGoal].length > 1 && (
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    onClick={() => removeGoal(index)}
                  >
                    <Trash className="h-4 w-4 text-destructive" />
                  </Button>
                )}
              </div>
            )
          })}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 pt-4 border-t border-border">
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>

          <Button onClick={handleSave}>
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default CreateGoal
