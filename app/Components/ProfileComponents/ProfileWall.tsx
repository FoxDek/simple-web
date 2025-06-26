"use client";
import { useState } from "react";
import { cva } from "class-variance-authority";
import Post from './Post';

const profileWallSettingsButton = cva(
  "profileWallSettingsButton border rounded-lg px-2 py-1 profileWallSettingsButtonText text-xs font-bold hover:bg-gray-100 cursor-pointer transform duration-200 ease-in-out",
  {
    variants: {
      active: {
        true: "text-[#447bba] border-gray-200 shadow-sm",
        false: "border-transparent opacity-50",
      },
    },
  }
);

export default function ProfileWall() {
  const [activeButton, setActiveButton] = useState("all"); // 'all' или 'user' для отслеживания активной кнопки

  const handleButtonClick = (button: string) => {
    setActiveButton(button);
  };

  return (
    <div className='profileWall flex flex-col bg-white rounded-xl border border-gray-200 p-3 justify-between items-center'>
      <div className='profileWallSettings border-b border-gray-200 w-full mb-3'>
        <div className='profileWallSettingsButtons flex pb-3 gap-2'>
          <a
            className={profileWallSettingsButton({
              active: activeButton === "all",
            })}
            onClick={() => handleButtonClick("all")}
          >
            Все посты
          </a>
          <a
            className={profileWallSettingsButton({
              active: activeButton === "user",
            })}
            onClick={() => handleButtonClick("user")}
          >
            Посты Юзера
          </a>
        </div>
      </div>

      <div className='profileWallPosts flex flex-col gap-2'>
        <Post />
        <Post />
      </div>
    </div>
  );
}
