import { cva } from "class-variance-authority";
import ProfileActionsButtons from "./ProfileActionsButtons";

const profileFriends = cva('profileFriends bg-white rounded-xl border border-gray-200 p-3 flex justify-between items-center')

export default function ProfileFriends() {
  return (
    <div className={profileFriends()}>
      <div>
        <p className='text-sm sm:text-base'>
          <span className='text-base sm:text-xl font-bold sm:ml-5'>675</span>{" "}
          подписчиков
        </p>
      </div>

      <ProfileActionsButtons />
    </div>
  );
}
