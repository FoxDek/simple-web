'use client'
import { useSearchParams } from 'next/navigation';
import FriendsList from './FriendsList';
import FriendsRequests from './FriendsRequests';
import FriendsSearch from './FriendsSearch';
import { cva } from 'class-variance-authority';

const friendsSectionsSwitcher = cva("friendsSectionsSwitcher bg-white rounded=xl border border-gray-200 w-full p-4 rounded-xl h-full order-2 lg:order-1")

export default function FriendsSectionsSwitcher() {
  const searchParams = useSearchParams();
  const section = searchParams.get('section') || 'all';
  
  return (
    <div className={friendsSectionsSwitcher()}>
      {section === 'all' && <FriendsList />}
      {section === 'requests' && <FriendsRequests />}
      {section === 'search' && <FriendsSearch />}
    </div>
  );
}