"use client";

import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { getProjects } from "../_services/apiProjects";

export function useAllProjects() {
  const { status } = useSession();
  const router = useRouter();

  if (status !== "authenticated") {
    router.push("/login");
  }

  const {
    isLoading,
    data: projects,
    error,
  } = useQuery({
    queryKey: ["AllProjects"],
    queryFn: () => getProjects(),
  });

  return { isLoading, error, projects };
}
