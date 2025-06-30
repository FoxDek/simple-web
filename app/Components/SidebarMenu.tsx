"use client";
import { cva } from "class-variance-authority";
import Link from "next/link";
import { usePathname } from "next/navigation";
import UserIcon from "@/public/user-menu-icon.svg";
import FeedIcon from "@/public/feed-menu-icon.svg";
import MessagesIcon from "@/public/message-menu-icon.svg";
import FriendsIcon from "@/public/friends-menu-icon.svg";
import GroupsIcon from "@/public/groups-menu-icon.svg";
import PhotosIcon from "@/public/photos-menu-icon.svg";
import MusicIcon from "@/public/music-menu-icon.svg";
import VideosIcon from "@/public/videos-menu-icon.svg";

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
  "whitespace-nowrap hover:bg-gray-200 p-2 rounded-md transform duration-200 ease-in-out w-full text-left flex items-center gap-2",
  {
    variants: {
      active: {
        true: "bg-gray-200",
        false: "",
      },
    },
  }
);

const asideMenuItemIcon = cva('w-4 h-auto fill-[#447bba]');

export default function SidebarMenu({
  isOpen,
  onMenuToggle,
  currentUserId,
}: {
  isOpen: boolean;
  onMenuToggle: () => void;
  currentUserId: string;
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
          <Link href={`/profile/${currentUserId}`} className={asideMenuItem({ active: pathname === `/profile/${currentUserId}` })} onClick={onMenuToggle}>
            <UserIcon className={asideMenuItemIcon()} />
            <span>Профиль (WIP)</span>
          </Link>
          <Link href='/' className={asideMenuItem()} onClick={onMenuToggle}>
            <FeedIcon className={asideMenuItemIcon()} />
            <span>Лента (WIP)</span>
          </Link>
          <Link href='/' className={asideMenuItem()} onClick={onMenuToggle}>
            <MessagesIcon className={asideMenuItemIcon()} />
            <span>Сообщения (WIP)</span>
          </Link>
          <Link href='/friends?section=all' className={asideMenuItem({ active: pathname === "/friends" })} onClick={onMenuToggle}>
            <FriendsIcon className={asideMenuItemIcon()} />
            <span>Друзья (WIP)</span>
          </Link>
          <Link href='/' className={asideMenuItem()} onClick={onMenuToggle}>
            <GroupsIcon className={asideMenuItemIcon()} />
            <span>Сообщества (WIP)</span>
          </Link>
          <Link href='/' className={asideMenuItem()} onClick={onMenuToggle}>
            <PhotosIcon className={asideMenuItemIcon()} />
            <span>Фото (WIP)</span>
          </Link>
          <Link href='/' className={asideMenuItem()} onClick={onMenuToggle}>
            <MusicIcon className={asideMenuItemIcon()} />
            <span>Музыка (WIP)</span>
          </Link>
          <Link href='/' className={asideMenuItem()} onClick={onMenuToggle}>
            <VideosIcon className={asideMenuItemIcon()} />
            <span>Видео (WIP)</span>
          </Link>
        </nav>
      </aside>
    </>
  );
}
