"use client";
import { useAllProjectsView } from "../hooks/useAllProjectsView";
import ProjectListItem from "./ProjectListItem";
import Spinner from "./Spinner";

function ProjectList({ sideMenu = false, projectId }) {
  const { projects, isLoading } = useAllProjectsView();

  if (isLoading) return <Spinner />;

  if (projects.length === 0)
    return (
      <div className="mt-10 flex flex-col gap-2 text-center">
        <p>No projects</p>
        <p className="text-gray-500">Start by adding something 😊</p>
      </div>
    );

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
