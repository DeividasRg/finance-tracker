function Filter() {
  return (
    <div className="sm:flex sm:justify-end">
      <div className="my-7 h-10 flex items-center justify-between bg-gray-300 rounded-full sm:w-[30%]">
        <button className="bg-sky-200 h-full rounded-full flex-1 hover:cursor-pointer">
          7 days
        </button>
        <button className="flex-1 rounded-full h-full hover:cursor-pointer">
          30 days
        </button>
      </div>
    </div>
  );
}

export default Filter;
