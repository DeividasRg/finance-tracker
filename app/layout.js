import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./_components/Header";
import { Poppins } from "next/font/google";
import { auth } from "@/Auth";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import Main from "./_components/Main";
import QueryProvider from "./_services/QueryProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BurgerMenuProvider } from "./_context/BurgerMenuProvider";
import NavigationPanel from "./_components/NavigationPanel";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "Finance tracker",
  description: "Personal finance tracker",
};

export default async function RootLayout({ children }) {
  const session = await auth();

  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        <SessionProvider session={session}>
          <BurgerMenuProvider>
            <Header />
            <QueryProvider>
              <NavigationPanel />
              <Main>{children}</Main>
              <ReactQueryDevtools initialIsOpen={false} />
            </QueryProvider>
            <Toaster position="bottom-center" />
          </BurgerMenuProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
