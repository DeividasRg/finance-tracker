import { useMutation } from "@tanstack/react-query";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { createProject as createProjectApi } from "../_services/apiProjects";

export function useCreateProject() {
  const { status } = useSession();
  const router = useRouter();

  if (status !== "authenticated") {
    router.push("/login");
  }

  const { mutate: createProject, isLoading: isCreating } = useMutation({
    mutationFn: createProjectApi,
  });

  return { createProject, isCreating };
}
