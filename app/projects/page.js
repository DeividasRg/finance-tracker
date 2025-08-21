import NewProjectForm from "../_components/NewProjectForm";
import ProjectList from "../_components/ProjectList";
import TitleComponent from "../_components/TitleComponent";

function page() {
  return (
    <div className="flex items-center flex-col">
      <TitleComponent text="PROJECTS" />
      <NewProjectForm />
      <ProjectList />
    </div>
  );
}

export default page;
