"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import HeaderStats from "./HeaderStats";
import { useDescriptionSum } from "../hooks/useDescriptionSum";
import formatString from "../_helpers/formatString";
import Spinner from "./Spinner";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"];

export default function PieChartSpendings() {
  const { descriptionSum, isLoading } = useDescriptionSum();

  if (isLoading) return <Spinner />;

  const data = descriptionSum
    .filter((desc) => desc.description != "Repayment")
    .map((sum) => {
      return {
        name: formatString(sum.description),
        value: Math.abs(sum.sum) * 2,
      };
    });

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height={240}>
        <HeaderStats>Money spent on</HeaderStats>
        {data.length !== 0 ? (
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="40%"
              cy="50%"
              outerRadius={100}
              innerRadius={70}
              paddingAngle={3}
              fill="#8884d8"
              labelLine={false}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `${value}€`} />

            <Legend
              verticalAlign="middle"
              align="right"
              width="30%"
              iconSize={15}
              iconType="circle"
            />
          </PieChart>
        ) : (
          <div className="text-center pt-25">No transactions</div>
        )}
      </ResponsiveContainer>
    </div>
  );
}
