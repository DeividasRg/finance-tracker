"use client";

import { HiOutlineCash } from "react-icons/hi";
import Spinner from "./Spinner";
import { useTransactions } from "../hooks/useTransactions";
import formatCurrency from "../_helpers/formatCurrency";

function UserTotal({ user }) {
  const { transactions, isLoading } = useTransactions();

  if (isLoading) return <Spinner />;

  const data = transactions
    .filter((trans) => trans.user === user && trans.amount < 0)
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  return (
    <div className="flex items-center gap-8">
      <div className="bg-green-200 p-3 rounded-full">
        <HiOutlineCash className="w-[2.5rem] h-[2.5rem]" />
      </div>
      <p className="text-3xl font-bold">{formatCurrency(data)}</p>
    </div>
  );
}

export default UserTotal;
