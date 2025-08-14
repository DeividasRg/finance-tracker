"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getTransactions } from "../_services/apiTransactions";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { getBuyCategories } from "../_services/apiCategories";

export function useBuyCategories() {
  const { status } = useSession();
  const router = useRouter();

  if (status !== "authenticated") {
    router.push("/login");
  }

  const {
    isLoading,
    data: buyCategories,
    error,
  } = useQuery({
    queryKey: ["buyCategories"],
    queryFn: () => getBuyCategories(),
  });

  return { isLoading, error, buyCategories };
}
