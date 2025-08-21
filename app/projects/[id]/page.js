"use client";

import HighLowPaymentOverview from "@/app/_components/HighLowPaymentOverview";
import ProjectLogs from "@/app/_components/ProjectLogs";
import ProjectTransactionModule from "@/app/_components/ProjectTransactionModule";
import Spinner from "@/app/_components/Spinner";
import StatsBox from "@/app/_components/StatsBox";
import TitleComponent from "@/app/_components/TitleComponent";
import { getProject } from "@/app/_services/apiProjects";
import { useProjectTransactions } from "@/app/hooks/useProjectTransactions";
import { use, useEffect, useState } from "react";

export default function ProjectPage({ params }) {
  const { id } = use(params);
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const { projectTransactions, isLoading: isLoadingTransactions } =
    useProjectTransactions(id);

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

  return (
    <div>
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
    </div>
  );
}
