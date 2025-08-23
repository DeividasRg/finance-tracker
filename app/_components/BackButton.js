import { useRouter } from "next/navigation";
import { HiOutlineArrowLeft } from "react-icons/hi";

function BackButton({ href, sideMenu = false }) {
  const router = useRouter();

  function goBack() {
    router.push(href);
  }

  return (
    <button
      onClick={() => goBack()}
      className={`flex ${
        !sideMenu && "sm:hidden"
      } items-center gap-2 cursor-pointer hover:bg-gray-100 active:bg-gray-200 rounded-full p-2`}
    >
      <HiOutlineArrowLeft />
      <p>Go back</p>
    </button>
  );
}

export default BackButton;
