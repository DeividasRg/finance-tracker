function ProjectList() {
  return (
    <div className="mt-10">
      <ul className="flex flex-col items-center gap-1">
        <li className="flex justify-between items-center border bg-gray-100 border-gray-300 w-full h-auto rounded-3xl px-7 py-4 gap-3 mt-3 hover:bg-gray-200 sm:w-xl">
          <p>Italy</p>
          <p className="text-xs">2025-08-10</p>
          <p>10 €</p>
        </li>
      </ul>
    </div>
  );
}

export default ProjectList;
