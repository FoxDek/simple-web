import { cva } from "class-variance-authority";
import ProfileActionsButtons from "./ProfileActionsButtons";
import { getSubscribersWord } from "@/utils/getSubscribersWord";

const profileFriends = cva('profileFriends bg-white rounded-xl border border-gray-200 p-3 flex justify-between items-center')

interface ProfileFriendsProps {
  friends: string[];
  subscribers: string[];
}


export default function ProfileFriends({ friends = [], subscribers = [] }: ProfileFriendsProps) {
  const totalSubscribers = friends.length + subscribers.length;
  const subscribersWord = getSubscribersWord(totalSubscribers);

  return (
    <div className={profileFriends()}>
      <div>
        <p className='text-sm sm:text-base'>
          <span className='text-base sm:text-xl font-bold sm:ml-5'>{totalSubscribers}</span>{" "}
          {subscribersWord}
        </p>
      </div>

      <ProfileActionsButtons />
    </div>
  );
}
