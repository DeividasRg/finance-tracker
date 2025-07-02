"use client";

import { HiOutlineCollection } from "react-icons/hi";
import Spinner from "./Spinner";
import { useTransactions } from "../hooks/useTransactions";

function TotalTransactions() {
  const { transactions, isLoading } = useTransactions();

  if (isLoading) return <Spinner />;

  const data = transactions.filter(
    (desc) => desc.description !== "Repayment"
  ).length;

  return (
    <div className="flex items-center gap-8">
      <div className="bg-sky-200 p-3 rounded-full">
        <HiOutlineCollection className="w-[2.5rem] h-[2.5rem]" />
      </div>
      <p className="text-4xl font-bold">{data}</p>
    </div>
  );
}

export default TotalTransactions;
