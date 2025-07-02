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

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"];

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

  console.log(transactions);

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
            <Tooltip formatter={(value) => `${value}€`} />

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
