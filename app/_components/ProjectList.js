"use client";
import { useAllProjects } from "../hooks/useAllProjects";
import ProjectListItem from "./ProjectListItem";
import Spinner from "./Spinner";

function ProjectList() {
  const { projects, isLoading } = useAllProjects();

  if (isLoading) return <Spinner />;

  return (
    <div className="mt-10">
      <ul className="flex flex-col items-center gap-1">
        {projects.map((project) => (
          <ProjectListItem key={project.id} project={project} />
        ))}
      </ul>
    </div>
  );
}

export default ProjectList;
