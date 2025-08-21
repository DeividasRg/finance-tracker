"use client";

import { HiOutlineArrowDown, HiOutlineArrowUp } from "react-icons/hi";
import IconCircle from "./IconCircle";
import formatString from "../_helpers/formatString";
import formatDate from "../_helpers/formatDate";
import { useDeleteTransaction } from "../hooks/useDeleteTransaction";

function Log({ transaction, isProject = false }) {
  const { amount, comment, description, created_at, user, id } = transaction;
  const { isDeleting, deleteTransaction } = useDeleteTransaction();

  const isRecent =
    (Date.now() - new Date(created_at).getTime()) / 1000 / 60 < 5;

  return (
    <div className="flex items-center justify-between mb-4 hover:bg-sky-100 hover:rounded-full px-1">
      {isProject ? (
        <div className="flex items-center gap-4">
          <span className="text-xs sm:text-base">
            {formatString(user)} paid
            <span className="font-bold"> {Math.abs(amount)} </span>€
          </span>
          <span className="text-sm text-gray-500">
            {" "}
            {formatString(description)}
          </span>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <IconCircle
            Icon={amount > 0 ? HiOutlineArrowDown : HiOutlineArrowUp}
            amount={amount}
          />
          <span className="text-xs sm:text-base">
            {formatString(user)} {amount > 0 ? "received" : "paid"}{" "}
            <span className="font-bold">{Math.abs(amount)} </span>€
          </span>
        </div>
      )}
      <div className="text-sm text-gray-500 gap-2 flex">
        <span className="sm:block hidden">{formatDate(created_at)}</span>

        {isRecent && !isProject ? (
          <button
            disabled={isDeleting}
            onClick={() => deleteTransaction(id)}
            className="bg-red-300 rounded-full sm:h-5 sm:w-5  w-4 h-4 sm:text-1xl text-xs text-center font-bold cursor-pointer text-red-50 hover:bg-red-400"
          >
            &mdash;
          </button>
        ) : (
          <p>{comment}</p>
        )}
      </div>
    </div>
  );
}

export default Log;
