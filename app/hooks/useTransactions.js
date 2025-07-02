"use client";

import { useQuery } from "@tanstack/react-query";
import { getTransactions } from "../_services/apiTransactions";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

export function useTransactions() {
  const { status } = useSession();
  const router = useRouter();

  if (status !== "authenticated") {
    router.push("/login");
  }

  const searchParams = useSearchParams();
  const filter = searchParams.get("last") ?? "7";

  const {
    isLoading,
    data: transactions,
    error,
  } = useQuery({
    queryKey: ["transactions", filter],
    queryFn: () => getTransactions(filter),
  });

  return { isLoading, error, transactions };
}
