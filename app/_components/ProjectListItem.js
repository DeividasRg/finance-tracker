import { useRouter } from "next/navigation";
import formatDateV2 from "../_helpers/formatDateV2";
import { use } from "react";

function ProjectListItem({ project, sideMenu = false, activeId }) {
  const { name, created_at: date, total_amount, closed, id } = project;
  const router = useRouter();

  function goToProject() {
    if (closed) return;
    router.push(`/projects/${id}`);
  }

  return (
    <li>
      <button
        className={`flex justify-between items-center border
  ${
    closed
      ? "bg-gray-200"
      : sideMenu
      ? Number(activeId) === Number(id)
        ? "bg-gray-200 font-bold"
        : "bg-white"
      : "bg-gray-100"
  }
  border-gray-300 w-full h-auto rounded-3xl px-7 py-4 gap-3 mt-3
  hover:bg-gray-200
  ${!sideMenu && "sm:w-xl"}
  ${closed ? "line-through" : ""}
  cursor-pointer`}
        onClick={goToProject}
        disabled={closed}
      >
        <p>{name}</p>
        <p className="text-xs">{formatDateV2(date)}</p>
        <p>{total_amount} €</p>
      </button>
    </li>
  );
}

export default ProjectListItem;
