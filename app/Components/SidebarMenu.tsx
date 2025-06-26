"use client";
import { cva } from "class-variance-authority";
import Link from "next/link";
import { usePathname } from "next/navigation";

const asideMenu = cva(
  "flex flex-col gap-2 text-sm bg-white lg:bg-transparent fixed lg:static top-0 left-0 h-full w-64 lg:w-auto p-4 lg:p-0 z-50 transition-transform duration-300 ease-in-out",
  {
    variants: {
      isOpen: {
        true: "translate-x-0",
        false: "-translate-x-full lg:translate-x-0",
      },
    },
  }
);

const asideMenuItem = cva(
  "whitespace-nowrap hover:bg-gray-200 p-2 rounded-md transform duration-200 ease-in-out block w-full text-left",
  {
    variants: {
      active: {
        true: "bg-gray-200",
        false: "",
      },
    },
  }
);

export default function SidebarMenu({
  isOpen,
  onMenuToggle,
}: {
  isOpen: boolean;
  onMenuToggle: () => void;
}) {
  const pathname = usePathname();

  return (
    <>
      {isOpen && (
        <div
          className='lg:hidden fixed inset-0 bg-black opacity-50 z-40'
          onClick={onMenuToggle}
        ></div>
      )}

      <aside className={asideMenu({ isOpen })}>
        <div className='flex items-center justify-between lg:hidden mb-4'>
          <h2 className='text-lg font-semibold'>Меню</h2>
          <button
            className='p-2 rounded-md hover:bg-gray-200'
            onClick={onMenuToggle}
            aria-label='Close menu'
          >
            <svg
              className='w-6 h-6'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </button>
        </div>
        <nav className='flex flex-col gap-2'>
          <Link
            href='/'
            className={asideMenuItem({ active: pathname === "/profile" })}
            onClick={onMenuToggle}
          >
            Профиль (WIP)
          </Link>
          <Link href='/' className={asideMenuItem()} onClick={onMenuToggle}>
            Лента (WIP)
          </Link>
          <Link href='/' className={asideMenuItem()} onClick={onMenuToggle}>
            Сообщения (WIP)
          </Link>
          <Link
            href='/friends?section=all'
            className={asideMenuItem({ active: pathname === "/friends" })}
            onClick={onMenuToggle}
          >
            Друзья (WIP)
          </Link>
          <Link href='/' className={asideMenuItem()} onClick={onMenuToggle}>
            Сообщества (WIP)
          </Link>
          <Link href='/' className={asideMenuItem()} onClick={onMenuToggle}>
            Фото (WIP)
          </Link>
          <Link href='/' className={asideMenuItem()} onClick={onMenuToggle}>
            Музыка (WIP)
          </Link>
          <Link href='/' className={asideMenuItem()} onClick={onMenuToggle}>
            Видео (WIP)
          </Link>
        </nav>
      </aside>
    </>
  );
}
