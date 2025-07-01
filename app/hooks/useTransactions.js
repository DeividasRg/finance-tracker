"use client";

import { useQuery } from "@tanstack/react-query";
import { getTransactions } from "../_services/apiTransactions";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export function useTransactions() {
  const { status } = useSession();
  const router = useRouter();

  if (status !== "authenticated") {
    router.push("/login");
  }

  const {
    isLoading,
    data: transactions,
    error,
  } = useQuery({
    queryKey: ["transactions"],
    queryFn: getTransactions,
  });

  return { isLoading, error, transactions };
}
