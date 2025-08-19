"use client";

import HeaderStats from "./HeaderStats";
import { HiOutlineArrowDown } from "react-icons/hi";
import IconCircle from "./IconCircle";
import Log from "./Log";
import { useTransactions } from "../hooks/useTransactions";
import Spinner from "./Spinner";
import formatString from "../_helpers/formatString";
import { useState } from "react";

function Logs() {
  const { transactions = [], isLoading } = useTransactions();
  const [description, setDescription] = useState("");

  const uniqueCategories = new Set(
    transactions.map((trans) => trans.description)
  );

  const filteredTransactions =
    description !== ""
      ? transactions.filter((trans) => trans.description === description)
      : transactions;

  if (isLoading) return <Spinner />;

  return (
    <>
      <div className="flex flex-col gap-1 sm:flex-row sm:gap-5">
        <HeaderStats>Transactions</HeaderStats>
        <div className="mb-2 flex items-center gap-2 sm:gap-4">
          {[...uniqueCategories].map((cat) => (
            <button
              onClick={() =>
                cat === description ? setDescription("") : setDescription(cat)
              }
              className={`text-sm bg-blue-100 p-2 rounded-full cursor-pointer  ${
                description === cat ? "bg-blue-300" : "hover:bg-blue-200"
              }`}
              key={cat}
            >
              {formatString(cat)}
            </button>
          ))}
        </div>
      </div>
      <div className="w-full h-[200px] border-gray-300 border-2 rounded-2xl bg-[#f9fafb] mt-4 p-5 overflow-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {filteredTransactions.length > 0 ? (
          filteredTransactions.map((transaction) => (
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
