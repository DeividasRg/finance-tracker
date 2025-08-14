import { useDeleteBuyCategory } from "../hooks/useDeleteBuyCategory";

function BuyCategory({ category }) {
  const { isDeleting, deleteBuyTransaction } = useDeleteBuyCategory();

  return (
    <div className="flex items-center justify-between">
      <p>{category.label}</p>
      <button
        disabled={isDeleting}
        onClick={() => deleteBuyTransaction(category.id)}
        className="bg-red-300 rounded-full sm:h-5 sm:w-5  w-4 h-4 sm:text-1xl text-xs text-center font-bold cursor-pointer text-red-50 hover:bg-red-400"
      >
        &mdash;
      </button>
    </div>
  );
}

export default BuyCategory;
