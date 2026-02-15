import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { goal } from "@/schema";
import { NextRequest, NextResponse } from "next/server";
import {eq,desc} from 'drizzle-orm'

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