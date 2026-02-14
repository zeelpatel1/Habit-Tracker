import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { goal } from "@/schema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

    try {
        const session = await auth.api.getSession();

        if (!session?.user) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            )
        }
        const body = await req.json();
        console.log(body);

        const newGoal = await db.insert(goal).values({
            id: crypto.randomUUID(),
            userId: session.user.id,
            type: body.type,
            title: body.title,
            description: body.description,
            startDate: new Date(body.startDate),
            endDate: new Date(body.endDate),
        }).returning()

        return NextResponse.json(newGoal)


    } catch (error) {
        console.log(error)
    }
}