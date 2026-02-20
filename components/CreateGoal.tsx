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
import { Input } from "./ui/input"

type GoalItem = {
  type: string
  title: string
  description: string
  startDate: string
}

const CreateGoal = () => {
  const goalTypes = ["Yearly", "Monthly", "Weekly", "Daily"]
  const [activeGoal, setActiveGoal] = useState("Yearly")

  const [loading,setLoading]=useState(false);

  const [goal, setGoal] = useState<GoalItem>({
    type: "Yearly",
    title: "",
    description: "",
    startDate: "",
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target
    setGoal((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      setLoading(true)
      const res = await fetch(`http://localhost:3000/api/goals`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...goal,
          type: goal.type.toUpperCase(),
        }),
      })

      const data = await res.json()

      // Reset form after success
      setGoal({
        type: "Yearly",
        title: "",
        description: "",
        startDate: "",
      })
      setActiveGoal("Yearly")
    } catch (error) {
      console.log(error)
    }finally{
      setLoading(false);
    }
  }

  // It runs everytime                                        ------> LIMITATION
  const currentDate=new Date().toISOString().split('T')[0]


  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Create Goals</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create a New Goal</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Goal Type Selection */}
          <div className="flex items-center gap-3 flex-wrap">
            {goalTypes.map((type) => (
              <Button
                key={type}
                type="button"
                variant="outline"
                onClick={() => {
                  setActiveGoal(type)
                  setGoal((prev) => ({ ...prev, type }))
                }}
                className={
                  activeGoal === type
                    ? "bg-primary text-primary-foreground hover:bg-primary"
                    : ""
                }
              >
                {type}
              </Button>
            ))}
          </div>

          {/* Title */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Title</label>
            <Input
              name="title"
              value={goal.title}
              onChange={handleChange}
              placeholder={`${activeGoal} goal`}
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <Input
              name="description"
              value={goal.description}
              onChange={handleChange}
              placeholder="Goal description"
              required
            />
          </div>

          {/* Start Date */}
          <div className="space-y-2 w-[200px]">
            <label className="text-sm font-medium">Start Date</label>
            <Input
              type="date"
              min={currentDate}
              name="startDate"
              value={goal.startDate}
              onChange={handleChange}
              required
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-4 border-t">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>

            <Button disabled={loading} type="submit">
              {loading ? "Creating Goal..." : "Create Goal"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default CreateGoal