"use client";

import AllStats from "../_components/AllStats";
import MonthlyStats from "../_components/MonthlyStats";
import Spinner from "../_components/Spinner";
import StatSummary from "../_components/StatSummary";
import formatCurrency from "../_helpers/formatCurrency";
import { useAllTransactions } from "../hooks/useAllTransactions";

export default function Page() {
  const { transactions, isLoading } = useAllTransactions();

  if (isLoading) return <Spinner />;

  const deividas = transactions.filter((x) => x.user === "deividas");
  const brigita = transactions.filter((x) => x.user === "brigita");
  const amountGroupedByYearCategoryMonth = transactions
    .filter((x) => x.amount < 0)
    .reduce((acc, cur) => {
      const date = new Date(cur.created_at);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");

      if (!acc[year]) acc[year] = {};
      if (!acc[year][month]) acc[year][month] = {};
      if (!acc[year][month][cur.description])
        acc[year][month][cur.description] = 0;

      acc[year][month][cur.description] += cur.amount;

      return acc;
    }, {});

  return (
    <>
      <AllStats transactions={transactions} />
      <div className="sm:flex sm:justify-between mt-15 sm:mt-0">
        <div className="flex flex-col justify-center items-center gap-15 w-full sm:px-20">
          <StatSummary data={deividas} user="deividas" />
          <StatSummary data={brigita} user="brigita" />
        </div>
        <MonthlyStats data={amountGroupedByYearCategoryMonth} />
      </div>
    </>
  );
}
