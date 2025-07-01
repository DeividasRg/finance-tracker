function StatBox({ children }) {
  return (
    <div className="bg-gray-100 border border-solid border-gray-300 px-7 py-5 rounded-3xl w-auto h-[8rem] items-center grid grid-rows-[1rem_1fr] gap-1 text-center">
      {children}
    </div>
  );
}

export default StatBox;
