"use client";

import HighLowPaymentOverview from "@/app/_components/HighLowPaymentOverview";
import ProjectLogs from "@/app/_components/ProjectLogs";
import ProjectTransactionModule from "@/app/_components/ProjectTransactionModule";
import Spinner from "@/app/_components/Spinner";
import StatsBox from "@/app/_components/StatsBox";
import TitleComponent from "@/app/_components/TitleComponent";
import { getProject } from "@/app/_services/apiProjects";
import { useCloseProject } from "@/app/hooks/useCloseProject";
import { useProjectTransactions } from "@/app/hooks/useProjectTransactions";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { HiOutlineArrowLeft } from "react-icons/hi";

export default function ProjectPage({ params }) {
  const router = useRouter();
  const { id } = use(params);
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const { projectTransactions, isLoading: isLoadingTransactions } =
    useProjectTransactions(id);
  const { closeProject: closeProjectMutation, isClosing } = useCloseProject();
  const queryClient = useQueryClient();

  useEffect(() => {
    async function getData() {
      try {
        const data = await getProject(id);
        setProject(data);
      } catch (error) {
        console.error("Failed to fetch project:", error);
      } finally {
        setLoading(false);
      }
    }

    getData();
  }, [id]);

  if (loading || isLoadingTransactions) return <Spinner />;
  if (!project) return <p>No project found</p>;

  function closeProject() {
    closeProjectMutation(id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ active: true });
        router.push("/projects");
        toast.success("Project closed", {
          duration: 3000,
          style: {
            fontSize: "1.25rem",
            padding: "16px 24px",
            borderRadius: "12px",
          },
        });
      },
      onError: () => {
        console.error("Failed to close project");
      },
    });
  }

  function goBack() {
    router.push("/projects");
  }

  return (
    <>
      <button
        onClick={() => goBack()}
        className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 active:bg-gray-200 rounded-full p-2"
      >
        <HiOutlineArrowLeft />
        <p>Go back</p>
      </button>
      <div className="sm:flex sm:flex-col sm:w-[30%] sm:mx-auto">
        <TitleComponent text={project.name.toUpperCase()} />
        <ProjectTransactionModule id={id} />
        <HighLowPaymentOverview
          id={id}
          projectTransactions={projectTransactions}
        />
        <div className="mt-5">
          <StatsBox>
            <ProjectLogs projectTransactions={projectTransactions} />
          </StatsBox>
        </div>
        <button
          className="text-center mt-5 bg-red-200 py-2 rounded-full cursor-pointer hover:bg-red-300 active:bg-red-400"
          onClick={closeProject}
        >
          Close Project
        </button>
      </div>
    </>
  );
}
