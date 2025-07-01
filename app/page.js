"use client";

import HeaderStats from "./_components/HeaderStats";
import InfoBox from "./_components/InfoBox";
import Logs from "./_components/Logs";
import PieChartSpendings from "./_components/PieChartSpendings";
import StatBox from "./_components/StatBox";
import StatsBox from "./_components/StatsBox";
import TotalTransactions from "./_components/TotalTransactions";
import TransactionModule from "./_components/TransactionModule";
import QueryProvider from "./_services/QueryProvider";
import UserTotal from "./_components/UserTotal";
import { useSession } from "next-auth/react";

export default function Page() {
  const { data } = useSession();

  return (
    <>
      <QueryProvider>
        <div className="grid grid-cols-[20vw_1fr] gap-10">
          <TransactionModule />
          <div>
            <div className="flex items-center w-full justify-between pb-12 ">
              <div className="flex items-center gap-5 justify-start">
                <h1 className="font-normal text-3xl ">Home</h1>
                <h2 className="bg-gray-200 rounded-full p-2 text-xl">
                  {data?.user?.name?.split(" ").at(0) || ""}
                </h2>
              </div>
              <InfoBox />
            </div>
            <div className="grid grid-rows-[auto_1fr] gap-10">
              <div className="flex items-center justify-start gap-5">
                <StatBox>
                  <HeaderStats>Total</HeaderStats>
                  <TotalTransactions />
                </StatBox>
                <StatBox>
                  <HeaderStats>Brigita</HeaderStats>
                  <UserTotal user="brigita" />
                </StatBox>
                <StatBox>
                  <HeaderStats>Deividas</HeaderStats>
                  <UserTotal user="deividas" />
                </StatBox>
              </div>
              <div className="grid grid-cols-[30vw_1fr] gap-4">
                <StatsBox>
                  <PieChartSpendings />
                </StatsBox>
                <StatsBox>
                  <Logs />
                </StatsBox>
              </div>
            </div>
          </div>
        </div>
      </QueryProvider>
    </>
  );
}
