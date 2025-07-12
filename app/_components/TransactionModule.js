"use client";

import { useQueryClient } from "@tanstack/react-query";
import Select from "react-select";
import { useCreateTransaction } from "../hooks/useCreateTransaction";
import HeaderStats from "./HeaderStats";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

function TransactionModule() {
  const { data } = useSession();
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      amount: "",
      description: "",
      user: data.user.name.split(" ").at(0).toLowerCase(),
      proportion: "half",
    },
  });
  const { createTransaction, isCreating } = useCreateTransaction();

  function onSubmit({ amount, description, user, proportion }) {
    const newTransaction = {
      amount:
        proportion === "half"
          ? Number(-amount / 2).toFixed(2)
          : Number(-amount).toFixed(2),
      description,
      user,
    };

    createTransaction(newTransaction, {
      onSuccess: () => {
        queryClient.invalidateQueries({ active: true });
        reset();
      },
      onError: () => {
        console.error("Failed to create transaction.");
      },
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="border bg-gray-100 border-gray-300 w-full h-auto rounded-3xl px-7 py-4 grid grid-rows-[4rem_auto_auto_auto] gap-3 mt-3">
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
          <p className="font-light">Did you pay full or half?</p>
          <select
            defaultValue="half"
            id="proportion"
            className="bg-gray-50 border rounded-lg border-gray-300 py-3 px-2 w-full mt-1  outline-0"
            required
            {...register("proportion", { required: true })}
          >
            <option value="" disabled hidden>
              -
            </option>
            <option value="half">Half</option>
            <option value="full">Full</option>
          </select>
        </div>
        <div>
          <p className="font-light">What did you buy?</p>
          <select
            defaultValue=""
            id="description"
            className="bg-gray-50 border rounded-lg border-gray-300 py-3 px-2 w-full mt-1  outline-0"
            required
            {...register("description", { required: true })}
          >
            <option value="" disabled hidden>
              -
            </option>
            <option value="groceries">Groceries</option>
            <option value="fuel">Fuel</option>
            <option value="other">Other</option>
          </select>
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

export default TransactionModule;
