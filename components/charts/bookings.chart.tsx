"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface Booking {
  status: string;
}

const chartConfig = {
  confirmed: {
    label: "Confirmed",
    color: "hsl(var(--chart-1))",
  },
  pending: {
    label: "Pending",
    color: "hsl(var(--chart-2))",
  },
  cancelled: {
    label: "Cancelled",
    color: "hsl(var(--chart-3))",
  },
  default: {
    label: "Default",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;

export default function BookingsChart({ bookings }: { bookings: Booking[] }) {


  const chartData = React.useMemo(() => {
    const statusCount: { [key: string]: number } = {};

    bookings?.forEach((booking) => {
      statusCount[booking.status] = (statusCount[booking.status] || 0) + 1;
    });

    return Object.keys(statusCount).map((status) => ({
      category: status,
      count: statusCount[status],
      fill: getStatusColor(status),
    }));
  }, [bookings]);

  const totalBookings = chartData.reduce((acc, curr) => acc + curr.count, 0);

  return (
    <Card className="flex flex-col border-none rounded-2xl md:w-[400px] md:h-[350px]">
      <CardHeader className="items-center pb-0">
        <CardTitle>Total Bookings</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="category"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalBookings.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Bookings
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm hidden">
        <div className="flex items-center gap-2 font-medium leading-none">
          Rising by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total Booking for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}

function getStatusColor(status: string) {
  switch (status) {
    case "confirmed":
      return "var(--color-confirmed)";
    case "pending":
      return "var(--color-pending)";
    case "cancelled":
      return "var(--color-cancelled)";
    default:
      return "var(--color-default)";
  }
}
