"use client";
import { useContextProvider } from "../_context/ContextProvider";
import TransactionPopUpView from "./TransactionPopUpView";

function PopUp() {
  const { isModuleOpen, closeModule, moduleData } = useContextProvider();
  if (!isModuleOpen) return;

  return (
    <div
      onClick={closeModule}
      className="fixed inset-0 flex items-center justify-center z-50 bg-black/30 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-gray-100 w-[90%] h-[90%] rounded-2xl shadow-xl overflow-x-auto"
      >
        {moduleData.name === "allTransactions" && (
          <TransactionPopUpView data={moduleData.data} />
        )}
      </div>
    </div>
  );
}

export default PopUp;
