"use client";

import Spinner from "../_components/Spinner";
import StatSummary from "../_components/StatSummary";
import { useAllTransactions } from "../hooks/useAllTransactions";

export default function Page() {
  const { transactions, isLoading } = useAllTransactions();

  if (isLoading) return <Spinner />;

  const deividas = transactions.filter((x) => x.user === "deividas");
  const brigita = transactions.filter((x) => x.user === "brigita");

  const totalSpent = Math.round(
    Math.abs(
      transactions
        .filter((x) => x.amount < 0)
        .reduce((acc, cur) => acc + cur.amount, 0) || 0
    )
  );

  return (
    <div className="flex flex-col justify-center items-center gap-15 w-full sm:px-20 xl:px-120">
      <div className="text-center w-full">
        <p>
          All time transaction count -{" "}
          <span className="text-gray-800 font-bold">{transactions.length}</span>
        </p>
        <p>
          All time spent -{" "}
          <span className="text-gray-800 font-bold">{totalSpent} €</span>
        </p>
      </div>
      <StatSummary data={deividas} user="deividas" />
      <StatSummary data={brigita} user="brigita" />
    </div>
  );
}
