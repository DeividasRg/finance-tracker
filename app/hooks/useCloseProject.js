import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { closeProject as closeProjectApi } from "../_services/apiCategories";

export function useCloseProject() {
  const { status } = useSession();
  const router = useRouter();

  if (status !== "authenticated") {
    router.push("/login");
  }

  const { mutate: closeProject, isLoading: isClosing } = useMutation({
    mutationFn: closeProjectApi,
  });

  return { closeProject, isClosing };
}
