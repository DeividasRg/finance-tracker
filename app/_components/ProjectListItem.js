import { useRouter } from "next/navigation";
import formatDateV2 from "../_helpers/formatDateV2";

function ProjectListItem({ project }) {
  const { name, created_at: date, total_amount, closed, id } = project;
  const router = useRouter();

  function goToProject() {
    router.push(`/projects/${id}`);
  }

  return (
    <li
      className={`flex justify-between items-center border ${
        closed ? "bg-gray-200" : "bg-gray-100"
      } border-gray-300 w-full h-auto rounded-3xl px-7 py-4 gap-3 mt-3 hover:bg-gray-200 sm:w-xl ${
        closed ? "line-through" : ""
      } cursor-pointer`}
      onClick={goToProject}
    >
      <p>{name}</p>
      <p className="text-xs">{formatDateV2(date)}</p>
      <p>{total_amount} €</p>
    </li>
  );
}

export default ProjectListItem;
