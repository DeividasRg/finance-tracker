import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { createBuyCategory as createBuyCategoryApi } from "../_services/apiCategories";

export function useCreateBuyCategory() {
  const { status } = useSession();
  const router = useRouter();

  if (status !== "authenticated") {
    router.push("/login");
  }

  const { mutate: createBuyCategory, isLoading: isCreating } = useMutation({
    mutationFn: createBuyCategoryApi,
  });

  return { createBuyCategory, isCreating };
}
