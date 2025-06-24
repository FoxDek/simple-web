import { cookies } from "next/headers";
import AsideMenu from "./Components/AsideMenu";
import Header from "./Components/Header";
import "./globals.css";
import { Poppins } from "next/font/google";

export const metadata = {
  title: "Simple Web",
  description: "study site on Next.js",
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  return (
    <html lang='en' className={poppins.className}>
      <body className='bg-[#edeef0] flex flex-col min-h-screen'>
        <Header />
        <main className={`flex-grow gap-5 mx-auto pb-5 max-w-6xl px-4 sm:px-6 lg:px-8 w-full ${token && "flex mt-5"}`}>
          {token && <AsideMenu />}
          <div className="w-full">{children}</div>
        </main>
      </body>
    </html>
  );
}
