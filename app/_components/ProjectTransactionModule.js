"use client";

import { useQueryClient } from "@tanstack/react-query";
import HeaderStats from "./HeaderStats";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { useCreateProjectTransaction } from "../hooks/useCreateProjectTransaction";

function ProjectTransactionModule({ id }) {
  const { data } = useSession();
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      amount: "",
      user: data.user.name.split(" ").at(0).toLowerCase(),
    },
  });
  const { createProjectTransaction, isCreating } =
    useCreateProjectTransaction();

  function onSubmit({ amount, user, comment }) {
    const newTransaction = {
      amount,
      user,
      description: comment.slice(0, 100),
      projectId: id,
    };

    createProjectTransaction(newTransaction, {
      onSuccess: () => {
        queryClient.invalidateQueries({ active: true });
        reset();
      },
      onError: () => {
        console.error("Failed to create project transaction.");
      },
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="border bg-gray-100 border-gray-300 w-full h-auto rounded-3xl px-7 py-4 grid grid-rows-[4rem_auto_auto_auto] gap-3 mt-10">
        <HeaderStats>Make new transaction</HeaderStats>
        <div>
          <p className="font-light">How much did you pay ? (€)</p>
          <input
            className="bg-gray-50 border rounded-lg border-gray-300 py-3 w-full mt-1 p-2 outline-0"
            type="number"
            step="0.01"
            placeholder="10"
            defaultValue=""
            id="amount"
            required
            {...register("amount", { required: true })}
          />
        </div>
        <div>
          <p className="font-light">Comment</p>
          <input
            className="bg-gray-50 border rounded-lg border-gray-300 py-3 w-full mt-1 p-2 outline-0"
            type="text"
            placeholder="Cat food"
            defaultValue=""
            id="comment"
            required
            {...register("comment")}
          />
        </div>
        <input
          id="user"
          defaultValue={data.user.name.split(" ").at(0).toLowerCase()}
          hidden
          {...register("user", { required: true })}
        />
        <button
          disabled={isCreating}
          className="p-4 bg-sky-200 hover:bg-sky-300 active:bg-sky-700 text-2xl rounded-full cursor-pointer"
          type="submit"
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default ProjectTransactionModule;
