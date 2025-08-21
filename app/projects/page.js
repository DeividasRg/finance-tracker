import NewProjectForm from "../_components/NewProjectForm";
import ProjectList from "../_components/ProjectList";
import TitleComponent from "../_components/TitleComponent";

function page() {
  return (
    <div className="flex flex-col sm:items-center">
      <TitleComponent text="PROJECTS" />
      <NewProjectForm />
      <ProjectList />
    </div>
  );
}

export default page;
