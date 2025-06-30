"use client";
import axios from "axios";
import LogoutIcon from "@/public/logout-icon.svg";
import { cva } from "class-variance-authority";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

// Стили для header
const header = cva('bg-[#447bba] p-3');
const headerContainer = cva('mx-auto max-w-6xl px-4 sm:px-6 lg:px-8');
const headerContent = cva('flex items-center gap-5');
const headerLogo = cva('text-white text-xl');
const headerLink = cva('text-white hover:text-[#cfcfcf] transform duration-300 ease-in-out ml-auto');
const headerIcon = cva('w-6 h-6 fill-white hover:fill-[#cfcfcf] transform duration-300 ease-in-out');
const burgerMenu = cva('lg:hidden ml-auto');
const logoutButton = cva('hidden lg:block ml-auto');

export default function Header({ onMenuToggle, isOpen }: { onMenuToggle: () => void; isOpen: boolean }) {
  const [isAuth, setIsAuth] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/validate`)
      .then((res) => setIsAuth(res.data.authenticated))
      .catch((err) => {
        console.error("Ошибка проверки токена: ", err);
      });
  }, [pathname]);

  const handleLogout = () => {
    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`)
      .then((res) => {
        console.log(res.data.message);
        window.location.reload();
      })
      .catch((err) => console.error("Ошибка выхода: ", err));
  };

  const path = usePathname();

  return (
    <header className={header()}>
      <div className={headerContainer()}>
        <div className={headerContent()}>
          <Link href='/' className={headerLogo()}>
            Simple Web
          </Link>

          {isAuth ? (
            <>
              {!isOpen && <button onClick={onMenuToggle} className={burgerMenu()} aria-label="Toggle menu">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                  />
                </svg>
              </button>}

              <button onClick={handleLogout} className={logoutButton()} title="Log out">
                <div className="flex items-center gap-2">
                  <LogoutIcon className={headerIcon()} />
                </div>
              </button>
            </>
          ) : (
            <>
              {path === "/auth/login" && (
                <Link href={"/auth/register"} className={headerLink()}>
                  Sign up
                </Link>
              )}
              {path === "/auth/register" && (
                <Link href={"/auth/login"} className={headerLink()}>
                  Sign in
                </Link>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
}