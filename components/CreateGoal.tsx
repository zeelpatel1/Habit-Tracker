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
import { usePathname } from "next/navigation"

type GoalItem = {
  type:string,
  title: string
  description: string
  startDate: string
  // endDate: string
}

const CreateGoal = () => {

  const goalTypes = ["Yearly", "Monthly", "Weekly", "Daily"]
  const [activeGoal, setActiveGoal] = useState("Yearly");

  // for now I am taking only one yearly goal at a time as input
  const [goal, setGoal] = useState<GoalItem>({
    title: "",
    description: "",
    startDate: "",
    type: "Yearly"
  })

  const handleSave=async()=>{
    try {
      const res=await fetch(`http://localhost:3000/api/goals`,{
        method:"POST",
        body:JSON.stringify({
          ...goal,
          type:goal.type.toUpperCase()
        })
      })
      const data=await res.json()
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Dialog>
      <form action="">
        <DialogTrigger asChild>
          <Button variant="outline">Create Goals</Button>
        </DialogTrigger>
        <DialogContent showCloseButton={false} className="sm:max-w-md">
          <div className="flex items-center gap-8">
            {goalTypes.map((type) => (

              <Button key={type} type="button" variant="outline" onClick={() => {
                setActiveGoal(type)
                setGoal(prev=>({...prev,type}))
              }} className={`${activeGoal == type && "bg-primary text-primary-foreground hover:bg-primary"}`}>{type}</Button>
            ))}
          </div>
          <div className="no-scrollbar -mx-4 max-h-[50vh] overflow-y-auto px-4">

              <div className="space-y-4">
              <div className="flex items-center gap-5">
                <Input
                  value={goal.title}
                  onChange={(e) =>
                    setGoal({ ...goal, title: e.target.value })
                  }
                  placeholder={`${activeGoal} goal`}
                />
                <Input
                  value={goal.description}
                  onChange={(e) =>
                    setGoal({ ...goal, description: e.target.value })
                  }
                  placeholder="Description"
                />
              </div>
            
              <div className="w-[160px] flex flex-col">
                <span className="text-xs text-muted-foreground mb-1">
                  Start Date
                </span>
                <Input
                  type="date"
                  value={goal.startDate}
                  onChange={(e) =>
                    setGoal({ ...goal, startDate: e.target.value })
                  }
                />
              </div>
            </div>

          </div>
          <div className="flex justify-end gap-2 pt-4 border-t">
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>

          <Button onClick={handleSave}>Save</Button>
        </div>
        </DialogContent>
      </form>

    </Dialog>
  )

}

export default CreateGoal
