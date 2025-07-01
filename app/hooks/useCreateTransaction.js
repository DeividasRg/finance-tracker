import { useMutation } from "@tanstack/react-query";
import { createTransaction as createTransactionApi } from "../_services/apiTransactions";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export function useCreateTransaction() {
  const { status } = useSession();
  const router = useRouter();

  if (status !== "authenticated") {
    router.push("/login");
  }

  const { mutate: createTransaction, isLoading: isCreating } = useMutation({
    mutationFn: createTransactionApi,
  });

  return { createTransaction, isCreating };
}
