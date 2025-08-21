"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useCreateProject } from "../hooks/useCreateProject";

function NewProjectForm() {
  const { createProject, isCreating } = useCreateProject();
  const queryClient = useQueryClient();

  function submit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { name } = Object.fromEntries(formData);

    const project = {
      name,
    };

    createProject(project, {
      onSuccess: () => {
        queryClient.invalidateQueries({ active: true });
        e.target.reset();
      },
      onError: () => {
        console.error("Failed to create project");
      },
    });
  }

  return (
    <form onSubmit={submit}>
      <div className="items-center border bg-gray-200 border-gray-300 w-full h-auto rounded-3xl px-7 py-4 gap-3 mt-10 sm:w-xl">
        <input
          className="w-full outline-0"
          type="text"
          name="name"
          placeholder="New Project..."
        />
      </div>
    </form>
  );
}

export default NewProjectForm;
