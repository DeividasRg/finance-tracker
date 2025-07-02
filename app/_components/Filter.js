import { usePathname, useRouter, useSearchParams } from "next/navigation";

const options = [
  { value: "7", label: "7 days" },
  { value: "30", label: "30 days" },
];

function Filter() {
  const searchParams = useSearchParams();
  const filterValue = searchParams.get("last") || options.at(0).value;
  const router = useRouter();
  const pathname = usePathname();

  function handleFilter(filter) {
    const params = new URLSearchParams(searchParams);
    params.set("last", filter);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="sm:flex sm:justify-end">
      <div className="my-7 h-10 flex items-center justify-between bg-gray-300 rounded-full sm:w-[30%]">
        {options.map((option) => (
          <button
            disabled={filterValue === option.value}
            onClick={() => handleFilter(option.value)}
            key={option.value}
            className={`h-full rounded-full flex-1 hover:cursor-pointer ${
              filterValue === option.value ? "bg-sky-200" : ""
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Filter;
