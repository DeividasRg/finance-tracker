import ProjectList from "../_components/ProjectList";
import TitleComponent from "../_components/TitleComponent";

function page() {
  return (
    <div>
      <TitleComponent text="PROJECTS" />
      <ProjectList />
    </div>
  );
}

export default page;
