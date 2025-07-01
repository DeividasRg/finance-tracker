import { auth } from "@/Auth";

export const middleware = auth;

export const config = {
  matcher: ["/"],
};
