import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { deleteProject as deleteProjectApi } from "../_services/apiProjects";

export function useDeleteProject() {
  const { status } = useSession();
  const router = useRouter();

  if (status !== "authenticated") {
    router.push("/login");
  }

  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteProject } = useMutation({
    mutationFn: deleteProjectApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ active: true });
    },
  });

  return { isDeleting, deleteProject };
}
