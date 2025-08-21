import { useMutation } from "@tanstack/react-query";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { createProjectTransaction as createProjectTransactionApi } from "../_services/apiProjects";

export function useCreateProjectTransaction() {
  const { status } = useSession();
  const router = useRouter();

  if (status !== "authenticated") {
    router.push("/login");
  }

  const { mutate: createProjectTransaction, isLoading: isCreating } =
    useMutation({
      mutationFn: createProjectTransactionApi,
    });

  return { createProjectTransaction, isCreating };
}
