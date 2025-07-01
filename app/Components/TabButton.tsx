"use client";

import { cva } from "class-variance-authority";
import { useSearchParams, useRouter } from "next/navigation";

const rightAsideMenuItem = cva(
  "whitespace-nowrap hover:bg-[#f5f6f8] py-2 px-4 rounded-md text-left transform duration-200 ease-in-out w-full",
  {
    variants: {
      active: {
        true: "bg-gray-100",
        false: "",
      },
    },
  }
);

const subMenuItem = cva(
  "whitespace-nowrap hover:bg-[#f5f6f8] py-1 px-6 rounded-md text-left transform duration-200 ease-in-out",
  {
    variants: {
      active: {
        true: "bg-gray-50",
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
  const currentSection = searchParams.get("section");
  const currentSubSection = searchParams.get("subSection");

  const isActive = currentSection === value;
  const isRequestsTab = value === "requests";

  const handleClick = () => {
    const params = new URLSearchParams(searchParams);
    params.set("section", value);

    if (isRequestsTab) {
      params.set("subSection", "inbound");
    } else {
      params.delete("subSection");
    }

    router.push(`?${params.toString()}`);
  };

  const handleSubClick = (subValue: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('section', value)
    params.set('subSection', subValue)
    router.push(`?${params.toString()}`)
  };

  return (
    <div>
      <button
        onClick={handleClick}
        className={rightAsideMenuItem({ active: isActive })}
      >
        {label}
      </button>
      {isActive && isRequestsTab && (
        <div className='ml-2 mt-1 flex flex-col gap-1'>
          <button
            className={subMenuItem({
              active: currentSubSection === "inbound" || !currentSubSection
            })}
            onClick={() => handleSubClick("inbound")}
          >
            Входящие заявки
          </button>

          <button
            className={subMenuItem({
              active: currentSubSection === "outbound"
            })}
            onClick={() => handleSubClick("outbound")}
          >
            Мои заявки
          </button>
        </div>
      )}
    </div>
  );
}
