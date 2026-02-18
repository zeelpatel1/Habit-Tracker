"use client";
import React, { useEffect, useState } from "react"

const ActiveChallenge = [
  {
    title: "Detox with apple",
    category: "Health",
    days: 7,
    color: "green",
  },
  {
    title: "Read 10 Pages a Day",
    category: "Learn",
    days: 14,
    color: "yellow",
  },
  {
    title: "No Sugar for 5 days",
    category: "Health",
    days: 5,
    color: "pink",
  },
  {
    title: "Breath Exercise",
    category: "Health",
    days: 42,
    color: "pink",
  },
  {
    title: "Yoga Exercise",
    category: "Health",
    days: 42,
    color: "pink",
  },
]

const colorMap: Record<string, string> = {
  green: "bg-green-500",
  yellow: "bg-yellow-500",
  pink: "bg-pink-500",
}

type goalType={
  id:string,
  title:string,
  description:string,
  isCompleted:boolean,
  type:"YEARLY" | "MONTHLY" | "WEEKLY" | "DAILY",
}

const Tracker = () => {

  const [goals,setGoals]=useState<(goalType & {color:string})[]>([]);

  useEffect(()=>{

    const fetchGols=async()=>{
      const res=await fetch("http://localhost:3000/api/goals",{
        method:"GET"
      })
      const data=await res.json()
      const goalsWithColor=data.map((goal:goalType) => ({
        ...goal,
        color:ColorGenerator() 
      }))
      setGoals(goalsWithColor)
      // console.log(data)
    }
    fetchGols()
    
  },[])

  const handleDelete=async(id:string)=>{
    try {
      const res=await fetch('/api/goals',{
        method:"DELETE",
        body:JSON.stringify({id})
      })
      console.log(res)
      setGoals((prev)=>prev.filter((goal)=>goal.id !== id))
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <p className="text-lg font-medium text-foreground">
        You've completed 4/6 habits today
      </p>

      <div className="mt-5 bg-card border border-border p-4 mb-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-3 text-foreground">
          Active Challenges
        </h2>

        <div className="flex flex-wrap gap-3">
          {goals.map((item) => (
            <div
              key={item.title}
              className="bg-accent inline-flex items-center gap-4 p-3 rounded-lg"
            >
              {/* Logo */}
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center`}
                style={{backgroundColor:item.color}}
              >
                <span className="text-white font-bold text-lg">
                  {item.title[0]}
                </span>
              </div>

              {/* Info */}
              <div>
                <p className="font-semibold text-foreground">
                  {item.title}
                </p>
                <div className="flex gap-4 text-muted-foreground mt-1 text-sm">
                  <span>{item.type}</span>
                  <span>{item.isCompleted ? "Completed" : "Active"}</span>
                </div>
              </div>

              <button onClick={()=>handleDelete(item.id)} className="bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600 transition">Delete</button>

            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Tracker


function ColorGenerator() {
  const letters="0123456789ABCDEF"
  let color="#";

  for (let i=0;i<6;i++){
    color+=letters[Math.floor(Math.random()*16)];
  }

  return color;

}