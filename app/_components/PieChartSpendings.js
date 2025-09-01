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
import formatString from "../_helpers/formatString";
import Spinner from "./Spinner";
import { useEffect, useState } from "react";
import { useTransactions } from "../hooks/useTransactions";
import formatCurrency from "../_helpers/formatCurrency";

const COLORS = [
  "#8884d8", // soft purple
  "#82ca9d", // mint green
  "#ffc658", // pastel yellow
  "#ff8042", // orange
  "#8dd1e1", // light blue
  "#a4de6c", // lime green
  "#d0ed57", // citrus yellow-green
  "#ffc0cb", // soft pink
  "#ffbb28", // amber
  "#ff6666", // coral red
  "#00c49f", // teal
  "#0088fe", // bright blue
  "#d888d8", // lavender pink
  "#b0e57c", // fresh spring green
];

export default function PieChartSpendings() {
  const { transactions, isLoading } = useTransactions();
  const [radius, setRadius] = useState({ inner: 70, outer: 100 });

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 640) {
        // Mobile screen
        setRadius({ inner: 20, outer: 40 });
      } else {
        // Desktop screen
        setRadius({ inner: 50, outer: 80 });
      }
    }

    handleResize(); // set initial size
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isLoading) return <Spinner />;

  const data = Object.values(
    transactions
      .filter((desc) => desc.description != "Repayment")
      .reduce((acc, trans) => {
        if (!acc[trans.description]) {
          acc[trans.description] = { description: trans.description, sum: 0 };
        }
        acc[trans.description].sum += Math.abs(trans.amount);
        return acc;
      }, {})
  ).map((sum) => {
    return {
      name: formatString(sum.description),
      value: Math.abs(sum.sum) * 2, //needs refactoring
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
              outerRadius={radius.outer}
              innerRadius={radius.inner}
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
            <Tooltip formatter={(value) => `${formatCurrency(value)}`} />

            <Legend
              verticalAlign="middle"
              align="right"
              width="50%"
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
