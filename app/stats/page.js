"use client";

import AllStats from "../_components/AllStats";
import Spinner from "../_components/Spinner";
import StatSummary from "../_components/StatSummary";
import { useAllTransactions } from "../hooks/useAllTransactions";

export default function Page() {
  const { transactions, isLoading } = useAllTransactions();

  if (isLoading) return <Spinner />;

  const deividas = transactions.filter((x) => x.user === "deividas");
  const brigita = transactions.filter((x) => x.user === "brigita");

  return (
    <div className="flex flex-col justify-center items-center gap-15 w-full sm:px-20 xl:px-120">
      <AllStats transactions={transactions} />
      <StatSummary data={deividas} user="deividas" />
      <StatSummary data={brigita} user="brigita" />
    </div>
  );
}
