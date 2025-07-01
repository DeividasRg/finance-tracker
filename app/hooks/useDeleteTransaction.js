import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTransaction as deleteTransactionApi } from "../_services/apiTransactions";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export function useDeleteTransaction() {
  const { status } = useSession();
  const router = useRouter();

  if (status !== "authenticated") {
    router.push("/login");
  }

  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteTransaction } = useMutation({
    mutationFn: deleteTransactionApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ active: true });
    },
  });

  return { isDeleting, deleteTransaction };
}
