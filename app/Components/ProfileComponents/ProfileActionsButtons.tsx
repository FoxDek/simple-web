import Link from "next/link";
import MessageIcon from "@/public/message-icon.svg";
import UserIcon from "@/public/user-icon.svg";
import { cva } from "class-variance-authority";

const profileActions = cva('profileActions flex gap-3 items-end justify-center');
const profileActionsButton = cva('profileActionsButton flex items-center w-10 h-10 bg-[#447bba] text-white rounded-lg overflow-hidden transition-all duration-300 ease-in-out hover:bg-[#3a6ea5]')
const profileActionsButtonLabel = cva('profileActionsButtonLabel text-xs opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300 ease-in-out whitespace-nowrap min-w-max')
const iconContainer = cva('iconContainer flex items-center justify-center w-10 h-10 shrink-0')
const iconContainerimage = cva('iconContainerimage h-auto fill-white')
const profileActionsMenu = cva('profileActionsMenu absolute right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 ease-in-out')
const profileActionsMenuItem = cva('profileActionsMenuItem block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 whitespace-nowrap w-full')

export default function ProfileActionsButtons() {
  return (
    <div className={profileActions()}>
      <Link
        href='#'
        className={profileActionsButton({
          className: "sm:hover:w-32 group",
        })}
      >
        <span className={iconContainer()}>
          <MessageIcon className={iconContainerimage({ className: "w-5" })} />
        </span>
        <span className={profileActionsButtonLabel()}>Сообщение</span>
      </Link>

      <div className='relative group z-20'>
        <Link href='#' className={profileActionsButton()}>
          <div className={iconContainer()}>
            <UserIcon className={iconContainerimage({ className: "w-5" })} />
          </div>
        </Link>
        <div className={profileActionsMenu()}>
          <Link href='#' className={profileActionsMenuItem()}>
            Добавить в друзья
          </Link>
          <Link href='#' className={profileActionsMenuItem()}>
            Заблокировать
          </Link>
        </div>
      </div>
    </div>
  );
}
