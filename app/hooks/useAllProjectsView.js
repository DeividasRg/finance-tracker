"use client";

import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { getProjectsView } from "../_services/apiProjects";

export function useAllProjectsView() {
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
    queryKey: ["AllProjectsView"],
    queryFn: () => getProjectsView(),
  });

  return { isLoading, error, projects };
}
