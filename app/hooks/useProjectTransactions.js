"use client";

import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { getProjectTransactions } from "../_services/apiProjects";

export function useProjectTransactions(id) {
  const { status } = useSession();
  const router = useRouter();

  if (status !== "authenticated") {
    router.push("/login");
  }

  const {
    isLoading,
    data: projectTransactions,
    error,
  } = useQuery({
    queryKey: ["AllProjectTransactions", id],
    queryFn: () => getProjectTransactions(id),
  });

  return { isLoading, error, projectTransactions };
}
