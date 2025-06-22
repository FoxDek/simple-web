"use client";
import axios from "axios";
// import Logo from "@/assets/logo.svg";
// import LogIn from "@/assets/log_in.svg";
// import { cva } from "class-variance-authority";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

// const headerIcon = cva(
//   "w-full h-full max-w-10 fill-white hover:fill-emerald-400 transform duration-300 ease-in-out "
// );

export default function Header() {
  const [isAuth, setIsAuth] = useState([false]);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/validate`)
      .then((res) => setIsAuth(res.data.authenticated))
      .catch((err) => {
        console.error("Ошибка проверки токена: ", err);
      });
  }, []);

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
    <div className='bg-blue-500 p-3'>
      <div className='container mx-auto'>
        <div className='flex items-center gap-5'>
          {/* <Link href={"/"}>
            main
            <Logo className={headerIcon()} />
          </Link> */}
          {/* <span className='text-white text-xl '>Simple Web</span> */}

          <Link href='/' className='text-white text-xl '>
            Simple Web
          </Link>

          {/* состояние авторизации: {isAuth ? (
            <p className="text-green-500 font-bold">Auth</p>
          ): (<p className="text-red-500 font-bold">NotAuth</p>)} */}

          {isAuth ? (
            <button onClick={handleLogout} className='ml-auto text-white'>
              logout
              {/* <LogIn className={headerIcon()} /> */}
            </button>
          ) : (
            <>
              {path === "/login" && (
                <Link href={"/register"} className='ml-auto text-white'>
                  Sign up
                </Link>
              )}

              {path === "/register" && (
                <Link href={"/login"} className='ml-auto text-white'>
                  Sign in
                </Link>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
