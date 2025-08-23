import { useRouter } from "next/navigation";
import formatDateV2 from "../_helpers/formatDateV2";
import { use } from "react";
import { HiOutlineTrash } from "react-icons/hi";
import { useDeleteProject } from "../hooks/useDeleteProject";

function ProjectListItem({ project, sideMenu = false, activeId }) {
  const { name, created_at: date, total_amount, closed, id } = project;
  const router = useRouter();
  const { deleteProject, isDeleting } = useDeleteProject();

  function goToProject() {
    if (closed) return;
    router.push(`/projects/${id}`);
  }

  return (
    <li className="flex items-center gap-2 mt-3">
      <button
        className={`flex-1 flex justify-between items-center border
      ${
        closed
          ? "bg-gray-200 line-through"
          : sideMenu
          ? Number(activeId) === Number(id)
            ? "bg-gray-200 font-bold"
            : "bg-white"
          : "bg-gray-100"
      }
      border-gray-300 h-auto rounded-3xl px-7 py-4 gap-3
      hover:bg-gray-200
      ${!sideMenu && "sm:w-xl"}
      ${closed ? "cursor-default" : "cursor-pointer"}`}
        onClick={goToProject}
        disabled={closed}
      >
        <p>{name}</p>
        <p className="text-xs">{formatDateV2(date)}</p>
        <p>{total_amount} €</p>
      </button>

      {!sideMenu && closed && (
        <button
          className="bg-red-100 rounded-full p-2 cursor-pointer hover:bg-red-200"
          onClick={() => deleteProject(id)}
          disabled={isDeleting}
        >
          <HiOutlineTrash className="w-6 h-6" />
        </button>
      )}
    </li>
  );
}

export default ProjectListItem;
