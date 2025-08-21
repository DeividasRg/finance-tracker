"use client";

import HeaderStats from "./HeaderStats";
import Log from "./Log";

function ProjectLogs({ projectTransactions }) {
  return (
    <>
      <div className="flex flex-col gap-1 sm:flex-row sm:gap-5 items-center sm:justify-between">
        <HeaderStats>Transactions</HeaderStats>
      </div>
      <div className="w-full h-[200px] border-gray-300 border-2 rounded-2xl bg-[#f9fafb] mt-4 p-5 overflow-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {projectTransactions.length > 0 ? (
          projectTransactions.map((transaction) => (
            <Log
              isProject={true}
              key={transaction.id}
              transaction={transaction}
            />
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

export default ProjectLogs;
