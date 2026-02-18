import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { goal } from "@/schema";
import { NextRequest, NextResponse } from "next/server";
import {eq,desc, and} from 'drizzle-orm'

export async function POST(req: NextRequest) {

    try {
        const session = await auth.api.getSession({
            headers: req.headers
        });

        if (!session?.user) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            )
        }
        const body = await req.json();
        

        const start = new Date(body.startDate);
        let endDate = new Date(start);

        const type = body.type.toUpperCase(); // ✅ important

        switch (type) {
            case "YEARLY":
                endDate.setFullYear(start.getFullYear() + 1);
                break;

            case "MONTHLY":
                endDate.setMonth(start.getMonth() + 1);
                break;

            case "WEEKLY":
                endDate.setDate(start.getDate() + 7);
                break;

            case "DAILY":
                endDate.setDate(start.getDate() + 1);
                break;
        }

        const newGoal = await db.insert(goal).values({
            id: crypto.randomUUID(),
            userId: session.user.id,
            type: type,
            title: body.title,
            description: body.description,
            startDate: start,
            endDate: endDate,
        }).returning();

        return NextResponse.json(newGoal);




    } catch (error) {
        console.log(error)
        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 }
        )
    }
}

export async function GET(req:NextRequest){
    try {
        const session = await auth.api.getSession({
            headers: req.headers,
          });
      
          if (!session?.user) {
            return NextResponse.json(
              { error: "Unauthorized" },
              { status: 401 }
            );
          }

          const goals = await db
            .select()
            .from(goal)
            .where(eq(goal.userId, session.user.id))
            .orderBy(desc(goal.createdAt))

        console.log(goals);

          return NextResponse.json(goals);

    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 }
        );
    }
}

export async function DELETE(req:NextRequest){
    try {
        const session = await auth.api.getSession({
            headers: req.headers,
          });
      
          if (!session?.user) {
            return NextResponse.json(
              { error: "Unauthorized" },
              { status: 401 }
            );
          }
          
        const {id}=await req.json()
        console.log(id)

        if(!id){
            return NextResponse.json({error:"Goal id is required"},{status:400})
        }

        const deletedGoal=await db.delete(goal).where(and(eq(goal.id,id),eq(goal.userId,session.user.id))).returning()
        console.log(deletedGoal)

        if(deletedGoal.length===0){
            return NextResponse.json({error:"Goal not found"},{status:404})
        }

        return NextResponse.json({success:true,deletedGoal})

    } catch (error) {
        console.log(error)
        return NextResponse.json({error:"Something went wrong"},{status:500})
    }
}