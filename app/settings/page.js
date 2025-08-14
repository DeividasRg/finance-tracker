"use client";
import { useForm } from "react-hook-form";
import Spinner from "../_components/Spinner";
import { useBuyCategories } from "../hooks/useBuyCategories";
import { useQueryClient } from "@tanstack/react-query";
import { useCreateBuyCategory } from "../hooks/useCreateBuyCategory";
import BuyCategory from "../_components/buyCategory";

export default function Page() {
  const { isLoading, buyCategories } = useBuyCategories();
  const { register, handleSubmit, reset } = useForm();
  const queryClient = useQueryClient();
  const { createBuyCategory, isCreating } = useCreateBuyCategory();

  if (isLoading) return <Spinner />;

  function onSubmit({ category }) {
    const newCategory = {
      label: category.charAt(0).toUpperCase() + category.slice(1).toLowerCase(),
      value: category.toLowerCase(),
    };

    createBuyCategory(newCategory, {
      onSuccess: () => {
        queryClient.invalidateQueries({ active: true });
        reset();
      },
      onError: () => {
        console.error("Failed to create buy category.");
      },
    });
  }

  return (
    <div>
      <div className="border bg-gray-100 border-gray-300 w-full h-auto rounded-3xl px-7 py-4 gap-3 mt-3 sm:w-xl">
        <p>Buy Categories</p>
        <div className="border bg-gray-200 border-gray-400 w-full h-auto rounded-3xl px-7 py-4 mt-3 flex flex-col gap-3">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex items-center justify-between">
              <input
                className="focus:border-b focus:border-b-gray-400 w-full outline-none p-1"
                type="text"
                placeholder="Treats"
                defaultValue=""
                id="category"
                {...register("category")}
              />
              <button
                type="submit"
                disabled={isCreating}
                className="bg-sky-50 hover:bg-sky-100 active:bg-sky-500 p-2 rounded-full cursor-pointer"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="border bg-gray-200 border-gray-400 w-full max-h-50 rounded-3xl px-7 py-4 mt-3 flex flex-col gap-3 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {buyCategories.map((category) => (
            <BuyCategory key={category.id} category={category} />
          ))}
        </div>
      </div>
    </div>
  );
}
