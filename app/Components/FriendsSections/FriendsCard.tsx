import { UserPreview } from "@/models/User";
import { cva } from "class-variance-authority";
import Image from "next/image";
import Link from "next/link";

const friendCard = cva(
  "friendCard rounded-xl overflow-clip flex flex-col bg-[#f1f1f1]"
);
const friendCardImage = cva(
  "friendCardImage relative aspect-square w-full overflow-hidden"
);
const friendCardDetails = cva(
  "friendCardDetails px-3 py-2 text-sm flex flex-col justify-between"
);
const friendCardDetailsAddItem = cva(
  "friendCardDetailsAddItem opacity-50 text-xs"
);
const friendCardButton = cva(
  "friendCardButton bg-white rounded-lg w-full p-2 hover:bg-gray-200 transform duration-200 ease-in-out"
);

export default function FriendsCard({
  user,
  handleFriendClick,
  subSection,
  currentSection,
}: {
  user: UserPreview;
  handleFriendClick: (e: React.MouseEvent) => void;
  subSection?: string;
  currentSection?: string;
}) {
  return (
    <Link href={`/profile/${user._id}`} className={friendCard()}>
      <div className={friendCardImage()}>
        <Image
          src={user.avatar || "/default-user-photo.png"}
          alt='User photo'
          fill
          className='object-cover'
        />
      </div>
      <div className={friendCardDetails()}>
        <span>
          {user.name} {user.surname}
        </span>

        <div>
          {user.age && (
            <span className={friendCardDetailsAddItem()}>{user.age} лет</span>
          )}
          {user.age && user.city && (
            <span className={friendCardDetailsAddItem()}>, </span>
          )}
          {user.city && (
            <span className={friendCardDetailsAddItem()}>{user.city}</span>
          )}
        </div>
      </div>

      <div className='mt-auto p-1 flex flex-col gap-1'>
        <button
          className={friendCardButton()}
          onClick={(e) => {
            handleFriendClick(e);
          }}
        >
          <span className='text-xs font-bold'>
            {subSection
              ? subSection === "inbound"
                ? "Добавить"
                : "Отозвать"
              : currentSection === 'all' ? 'Удалить' : 'Подружиться'}
          </span>
        </button>
        {subSection === "inbound" && (
          <button
          className={friendCardButton()}
          onClick={(e) => {
            handleFriendClick(e);
          }}
        >
          <span className='text-xs font-bold'>
            В подписчики
          </span>
        </button>
        )}
      </div>
    </Link>
  );
}
