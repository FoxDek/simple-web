'use client'
import { cva } from "class-variance-authority";
import Link from "next/link";
import { useRouter, usePathname } from 'next/navigation';

const asideMenu = cva("flex flex-col gap-2 text-sm");
const asideMenuItem = cva("whitespace-nowrap hover:bg-gray-200 p-2 rounded-md transform duration-200 ease-in-out", {
  variants: {
    active: {
      true: "bg-gray-200",
      false: "",
    },
}});

export default function AsideMenu() {
  const pathname = usePathname();
  
  return (
    <aside className={asideMenu()}>
      <Link href='/' className={asideMenuItem( { active: pathname === "/profile" } )}>Профиль (WIP)</Link>
      <Link href='/' className={asideMenuItem()}>Лента (WIP)</Link>
      <Link href='/' className={asideMenuItem()}>Сообщения (WIP)</Link>
      <Link href='/friends?section=all' className={asideMenuItem( { active: pathname === "/friends" } )}>Друзья (WIP)</Link>
      <Link href='/' className={asideMenuItem()}>Сообщества (WIP)</Link>
      <Link href='/' className={asideMenuItem()}>Фото (WIP)</Link>
      <Link href='/' className={asideMenuItem()}>Музыка (WIP)</Link>
      <Link href='/' className={asideMenuItem()}>Видео (WIP)</Link>
    </aside>
  );
}
