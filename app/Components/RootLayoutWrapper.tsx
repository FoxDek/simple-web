// components/LayoutWrapper.tsx
"use client";

import { useState } from "react";
import Header from "./Header";
import SidebarMenu from "./SidebarMenu";

export default function RootLayoutWrapper({
  children,
  hasToken,
}: {
  children: React.ReactNode;
  hasToken: boolean;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <Header onMenuToggle={() => setIsMenuOpen(!isMenuOpen)} isOpen={isMenuOpen} />
      <main className={`flex-grow gap-5 mx-auto pb-5 max-w-6xl px-4 sm:px-6 lg:px-8 w-full ${
        hasToken ? "flex mt-5" : ""
      }`}>
        {hasToken && <SidebarMenu onMenuToggle={() => setIsMenuOpen(!isMenuOpen)} isOpen={isMenuOpen} />}
        <div className="w-full">{children}</div>
      </main>
    </>
  );
}