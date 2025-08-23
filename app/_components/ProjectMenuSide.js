import BackButton from "./BackButton";
import ProjectList from "./ProjectList";

function ProjectMenuSide({ projectId }) {
  return (
    <div className="border-r w-[350px] pr-3 border-gray-100 hidden sm:block shadow-[4px_0_6px_-4px_rgba(0,0,0,0.3)] py-10">
      <BackButton href="/projects" sideMenu={true} />
      <h1 className="text-center font-bold text-xl mt-10">Projects</h1>
      <ProjectList sideMenu={true} projectId={projectId} />
    </div>
  );
}

export default ProjectMenuSide;
