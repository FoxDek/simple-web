"use client";

import { cva } from "class-variance-authority";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
const rightAsideMenuItem = cva(
  "whitespace-nowrap hover:bg-[#f5f6f8] py-2 px-4 rounded-md text-left transform duration-200 ease-in-out",
  {
    variants: {
      active: {
        true: "bg-gray-100",
        false: "",
      },
    },
  }
);

export default function TabButton({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const current = searchParams.get("section");

  const isActive = current === value;

  const handleClick = () => {
    const params = new URLSearchParams(searchParams);
    params.set("section", value);
    router.push(`?${params.toString()}`);
  };

  return (
    <button
      onClick={handleClick}
      className={rightAsideMenuItem({ active: isActive })}
    >
      {label}
    </button>
  );
}
