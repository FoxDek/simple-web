import "./globals.css";
import { cookies } from "next/headers";
import { Poppins } from "next/font/google";
import { cva } from "class-variance-authority";
import RootLayoutWrapper from "./Components/RootLayoutWrapper";
import { getCurrentUser } from "@/lib/auth";

export const metadata = {
  title: "Simple Web",
  description: "study site on Next.js",
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

const body = cva("body bg-[#edeef0] flex flex-col min-h-screen");

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;
  const user = await getCurrentUser();
  const userId = (user as { userId: string })?.userId;

  return (
    <html lang="en" className={poppins.className}>
      <body className={body()}>
        <RootLayoutWrapper hasToken={!!token} currentUserId={userId}>{children}</RootLayoutWrapper>
      </body>
    </html>
  );
}