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

type GoalItem = {
  title: string
  description: string
  startDate: string
  endDate: string
}

type GoalsState = Record<GoalType, GoalItem[]>

const emptyGoal: GoalItem = {
  title: "",
  description: "",
  startDate: "",
  endDate: "",
}

const CreateGoal = () => {
  const [activeGoal, setActiveGoal] = useState<GoalType>("yearly")

  const [goals, setGoals] = useState<GoalsState>({
    yearly: [{ ...emptyGoal }],
    monthly: [{ ...emptyGoal }],
    weekly: [{ ...emptyGoal }],
    daily: [{ ...emptyGoal }],
  })

  const addGoal = () => {
    setGoals((prev) => ({
      ...prev,
      [activeGoal]: [...prev[activeGoal], { ...emptyGoal }],
    }))
  }

  const removeGoal = (index: number) => {
    setGoals((prev) => ({
      ...prev,
      [activeGoal]: prev[activeGoal].filter((_, i) => i !== index),
    }))
  }

  const updateGoalField = (
    index: number,
    field: keyof GoalItem,
    value: string
  ) => {
    setGoals((prev) => ({
      ...prev,
      [activeGoal]: prev[activeGoal].map((goal, i) =>
        i === index ? { ...goal, [field]: value } : goal
      ),
    }))
  }

  const handleSave = async () => {
    // 1️⃣ Remove empty goals
    const cleaned = Object.entries(goals).flatMap(
      ([type, values]) =>
        values
          .filter(
            (g) =>
              g.title.trim() !== "" &&
              g.startDate !== "" &&
              g.endDate !== ""
          )
          .map((g) => ({
            ...g,
            type,
          }))
    )
  
    if (cleaned.length === 0) {
      alert("Please add at least one valid goal")
      return
    }
  
    try {
      const res = await fetch("/api/goals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cleaned),
      })
      
  
      if (!res.ok) {
        throw new Error("Failed to save goals")
      }
  
      const data = await res.json()
      console.log("Saved successfully:", data)
  
    } catch (error) {
      console.error("Error saving goals:", error)
    }
  }
  

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Create Goal</Button>
      </DialogTrigger>

      <DialogContent
        showCloseButton={false}
        className="w-full max-w-4xl max-h-[85vh] flex flex-col"
      >
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

        {/* Scrollable Goal List */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
          {goals[activeGoal].map((goal, index) => {
            const isLast =
              index === goals[activeGoal].length - 1

            return (
              <div
                key={index}
                className="flex items-end gap-3 flex-wrap border p-3 rounded-md"
              >
                {/* Title */}
                <div className="flex-1 min-w-[200px]">
                  <Input
                    value={goal.title}
                    placeholder={`${activeGoal} goal ${
                      index + 1
                    }`}
                    onChange={(e) =>
                      updateGoalField(
                        index,
                        "title",
                        e.target.value
                      )
                    }
                  />
                </div>

                {/* Description */}
                <div className="flex-1 min-w-[200px]">
                  <Input
                    value={goal.description}
                    placeholder="Description (optional)"
                    onChange={(e) =>
                      updateGoalField(
                        index,
                        "description",
                        e.target.value
                      )
                    }
                  />
                </div>

                {/* Start Date */}
                <div className="w-[160px] flex flex-col">
                  <span className="text-xs text-muted-foreground mb-1">
                    Start Date
                  </span>
                  <Input
                    type="date"
                    value={goal.startDate}
                    onChange={(e) =>
                      updateGoalField(
                        index,
                        "startDate",
                        e.target.value
                      )
                    }
                  />
                </div>

                {/* End Date */}
                <div className="w-[160px] flex flex-col">
                  <span className="text-xs text-muted-foreground mb-1">
                    End Date
                  </span>
                  <Input
                    type="date"
                    value={goal.endDate}
                    onChange={(e) =>
                      updateGoalField(
                        index,
                        "endDate",
                        e.target.value
                      )
                    }
                  />
                </div>

                {/* Buttons */}
                <div className="flex gap-2">
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
              </div>
            )
          })}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 pt-4 border-t">
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>

          <Button onClick={handleSave}>Save</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default CreateGoal
