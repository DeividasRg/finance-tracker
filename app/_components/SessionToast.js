import { useSession } from "next-auth/react";
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";

export default function SessionToast() {
  const { data: session, status } = useSession();
  const hasShownToast = useRef(false);

  useEffect(() => {
    if (status === "authenticated" && session && !hasShownToast.current) {
      toast.success("Welcome 😊", {
        duration: 3000,
        style: {
          fontSize: "1.25rem",
          padding: "16px 24px",
          borderRadius: "12px",
        },
      });
      hasShownToast.current = true;
    }
  }, [status, session]);

  return null;
}
