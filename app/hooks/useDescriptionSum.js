"use client";

import { useQuery } from "@tanstack/react-query";
import { getDescriptionSum } from "../_services/apiTransactions";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export function useDescriptionSum() {
  const { status } = useSession();
  const router = useRouter();

  if (status !== "authenticated") {
    router.push("/login");
  }

  const {
    isLoading,
    data: descriptionSum,
    error,
  } = useQuery({
    queryKey: ["descriptionSum"],
    queryFn: getDescriptionSum,
  });

  return { isLoading, error, descriptionSum };
}
