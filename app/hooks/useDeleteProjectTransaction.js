import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { deleteProjectTransaction as deleteProjectTransactionApi } from "../_services/apiProjects";

export function useDeleteProjectTransaction() {
  const { status } = useSession();
  const router = useRouter();

  if (status !== "authenticated") {
    router.push("/login");
  }

  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteProjectTransaction } =
    useMutation({
      mutationFn: deleteProjectTransactionApi,
      onSuccess: () => {
        queryClient.invalidateQueries({ active: true });
      },
    });

  return { isDeleting, deleteProjectTransaction };
}
