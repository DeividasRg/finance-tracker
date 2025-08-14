import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { deleteBuyCategory as deleteBuyCategoryApi } from "../_services/apiCategories";

export function useDeleteBuyCategory() {
  const { status } = useSession();
  const router = useRouter();

  if (status !== "authenticated") {
    router.push("/login");
  }

  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteBuyTransaction } = useMutation({
    mutationFn: deleteBuyCategoryApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ active: true });
    },
  });

  return { isDeleting, deleteBuyTransaction };
}
