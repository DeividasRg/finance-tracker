"use client";
import { useAllProjectsView } from "../hooks/useAllProjectsView";
import ProjectListItem from "./ProjectListItem";
import Spinner from "./Spinner";

function ProjectList({ sideMenu = false, projectId }) {
  const { projects, isLoading } = useAllProjectsView();

  if (isLoading) return <Spinner />;

  const filteredProjects = sideMenu
    ? projects.filter((project) => !project.closed)
    : projects;

  return (
    <div className="mt-10">
      <ul className="flex flex-col gap-1">
        {filteredProjects.map((project) => (
          <ProjectListItem
            sideMenu={sideMenu}
            key={project.id}
            project={project}
            activeId={projectId}
          />
        ))}
      </ul>
    </div>
  );
}

export default ProjectList;
