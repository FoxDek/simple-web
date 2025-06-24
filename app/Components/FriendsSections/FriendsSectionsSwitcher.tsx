'use client'
import { useSearchParams } from 'next/navigation';
import FriendsList from './FriendsList';
import FriendsRequests from './FriendsRequests';
import FriendsSearch from './FriendsSearch';

export default function FriendsSectionsSwitcher() {
  const searchParams = useSearchParams();
  const section = searchParams.get('section') || 'all';
  
  return (
    <div className="bg-white rounded=xl border border-gray-200 w-full p-4 rounded-xl">
      {section === 'all' && <FriendsList />}
      {section === 'requests' && <FriendsRequests />}
      {section === 'search' && <FriendsSearch />}
    </div>
  );
}