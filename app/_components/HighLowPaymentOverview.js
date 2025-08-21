"use client";
import { HiOutlineArrowDown, HiOutlineArrowUp } from "react-icons/hi";
import { AiOutlineMoneyCollect } from "react-icons/ai";
import StatBox from "./StatBox";
import formatCurrency from "../_helpers/formatCurrency";

function HighLowPaymentOverview({ id, projectTransactions }) {
  const hasTransactions = projectTransactions.length > 0;
  let max;
  let min;
  let sum;

  if (hasTransactions) {
    max = projectTransactions.reduce((prev, curr) =>
      curr.amount > prev.amount ? curr : prev
    );

    min = projectTransactions.reduce((prev, curr) =>
      curr.amount < prev.amount ? curr : prev
    );
    sum = projectTransactions.reduce((acc, curr) => (acc += curr.amount), 0);
  }

  return (
    <div className="mt-5">
      <StatBox dynamic={true}>
        {hasTransactions ? (
          <div className="flex items-center justify-between px-10 font-bold">
            <div className="flex items-center gap-3">
              <div className="bg-red-200 rounded-full p-1">
                <HiOutlineArrowUp className="w-5 h-5" />
              </div>
              <p>{formatCurrency(max.amount)}</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-green-200 rounded-full p-1">
                <AiOutlineMoneyCollect className="w-5 h-5" />
              </div>
              <p>{formatCurrency(sum)}</p>
            </div>
            <div className="flex items-center gap-3">
              <p>{formatCurrency(min.amount)}</p>
              <div className="bg-sky-200 rounded-full p-1">
                <HiOutlineArrowDown className="w-5 h-5" />
              </div>
            </div>
          </div>
        ) : (
          <p>No transactions</p>
        )}
      </StatBox>
    </div>
  );
}

export default HighLowPaymentOverview;
