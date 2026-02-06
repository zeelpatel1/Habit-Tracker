"use client";

import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/line-chart";
import { Badge } from "@/components/ui/badge";
import { TrendingUp } from "lucide-react";

const chartData = [
    { month: "January", desktop: 186 },
    { month: "February", desktop: 305 },
    { month: "March", desktop: 237 },
    { month: "April", desktop: 173 },
    { month: "May", desktop: 209 },
    { month: "June", desktop: 214 },
    { month: "July", desktop: 198 },
    { month: "August", desktop: 245 },
    { month: "September", desktop: 221 },
    { month: "October", desktop: 267 },
    { month: "November", desktop: 289 },
    { month: "December", desktop: 310 },
  ];
  

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export default function DottedLineChart() {
    return (
      <Card className="h-full max-h-[450px]">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-base">
            Dotted Line Chart
            <Badge
              variant="outline"
              className="text-green-500 bg-green-500/10 border-none"
            >
              <TrendingUp className="h-4 w-4" />
              <span>5.2%</span>
            </Badge>
          </CardTitle>
          <CardDescription className="text-xs">
            January - June 2024
          </CardDescription>
        </CardHeader>
  
        <CardContent className="pt-0">
          <ChartContainer config={chartConfig} className="h-[300px]">
            <LineChart
              accessibilityLayer
              data={chartData}
              margin={{ left: 8, right: 8 }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={6}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Line
                dataKey="desktop"
                type="linear"
                stroke="var(--color-desktop)"
                dot={false}
                strokeDasharray="4 4"
                strokeWidth={2}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    );
  }
  
