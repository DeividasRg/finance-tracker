"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useCreateTransaction } from "../hooks/useCreateTransaction";
import Spinner from "./Spinner";
import { useAllTransactions } from "../hooks/useAllTransactions";

function InfoBox() {
  const { isCreating, createTransaction } = useCreateTransaction();
  const { transactions, isLoading } = useAllTransactions();
  const queryClient = useQueryClient();

  if (isLoading) return <Spinner />;
  const deividasTotals = transactions
    .filter((transaction) => transaction.user === "deividas")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const brigitaTotals = transactions
    .filter((transaction) => transaction.user === "brigita")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const diff = Number((deividasTotals - brigitaTotals).toFixed(2));

  function repay() {
    const newTransaction = {
      amount: Math.abs(diff),
      description: "Repayment",
      user: diff > 0 ? "brigita" : "deividas",
      proportion: "full",
    };

    createTransaction(newTransaction, {
      onSuccess: () => {
        queryClient.invalidateQueries({ active: true });
      },
      onError: () => {
        console.error("Failed to create transaction.");
      },
    });
  }

  return (
    <div className="flex items-center gap-4">
      {diff !== 0 ? (
        <button
          onClick={repay}
          className="cursor-pointer hover:bg-green-400 active:bg-green-600 bg-green-300 p-2 font-bold w-[8rem] rounded-2xl text-green-700"
        >
          Repay
        </button>
      ) : (
        ""
      )}
      <div className="border border-gray-200 rounded-lg p-2">
        {diff === 0 ? (
          <span>Nobody owes anything 😊</span>
        ) : diff > 0 ? (
          <span>
            Deividas <span className="text-red-700">owes</span> Brigita {diff} €
          </span>
        ) : (
          <span>
            Brigita <span className="text-red-700">owes</span> Deividas{" "}
            {Math.abs(diff)} €
          </span>
        )}
      </div>
    </div>
  );
}

export default InfoBox;
