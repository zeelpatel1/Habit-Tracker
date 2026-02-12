import {
    pgTable,
    text,
    timestamp,
    boolean,
    index,
  } from "drizzle-orm/pg-core";

  import { pgEnum } from "drizzle-orm/pg-core";
import { user } from "./auth-schema";

export const goalTypeEnum = pgEnum("goal_type", [
  "YEARLY",
  "MONTHLY",
  "WEEKLY",
  "DAILY",
]);

  
  export const goal = pgTable(
    "goal",
    {
      id: text("id").primaryKey(),
  
      userId: text("user_id")
        .notNull()
        .references(() => user.id, { onDelete: "cascade" }),
  
      title: text("title").notNull(),
  
      description: text("description"),
  
      type: goalTypeEnum("type").notNull(),
  
      startDate: timestamp("start_date").notNull(),
  
      endDate: timestamp("end_date"),
  
      isCompleted: boolean("is_completed").default(false).notNull(),
  
      createdAt: timestamp("created_at").defaultNow().notNull(),
  
      updatedAt: timestamp("updated_at")
        .defaultNow()
        .$onUpdate(() => new Date())
        .notNull(),
    },
    (table) => [
      index("goal_userId_idx").on(table.userId),
      index("goal_type_idx").on(table.type),
    ]
  );
  