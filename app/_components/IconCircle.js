export default function IconCircle({ Icon, amount }) {
  return (
    <div
      className={`sm:w-10 sm:h-10  flex items-center justify-center rounded-full 
        ${amount > 0 ? "bg-sky-100 text-sky-700" : "bg-red-100 text-red-700 "}

        `}
    >
      <Icon className="w-[1.2rem] h-[1.2rem]" />
    </div>
  );
}
