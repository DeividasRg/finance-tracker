"use client";

import HeaderStats from "./HeaderStats";
import { HiOutlineArrowDown } from "react-icons/hi";
import IconCircle from "./IconCircle";
import Log from "./Log";
import { useTransactions } from "../hooks/useTransactions";
import Spinner from "./Spinner";

function Logs() {
  const { transactions, isLoading } = useTransactions();

  if (isLoading) return <Spinner />;

  return (
    <>
      <HeaderStats>Transactions</HeaderStats>
      <div className="w-full h-[200px] border-gray-300 border-2 rounded-2xl bg-[#f9fafb] mt-4 p-5 overflow-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {transactions.length > 0 ? (
          transactions.map((transaction) => (
            <Log key={transaction.id} transaction={transaction} />
          ))
        ) : (
          <div className="text-center pt-15 flex flex-col gap-4">
            <p>No logs</p>
            <p className="text-gray-500">Start by adding something 😉</p>
          </div>
        )}
      </div>
    </>
  );
}

export default Logs;
