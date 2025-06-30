'use client'
import { useSearchParams } from 'next/navigation';
import FriendsList from './FriendsList';
import FriendsRequests from './FriendsRequests';
import FriendsSearch from './FriendsSearch';
import { cva } from 'class-variance-authority';
import { useState } from 'react';
import FriendsSearchInput from './FriendsSearchInput';
import { useDebounce } from '@/hooks/useDebounce';

const friendsSectionsSwitcher = cva("friendsSectionsSwitcher bg-white border border-gray-200 w-full p-4 rounded-xl h-full")
const friendsSectionsSwitcherContainer = cva("friendsSectionsSwitcherContainer flex flex-col w-full gap-2 order-2 lg:order-1 h-full")

export default function FriendsSectionsSwitcher() {
  const searchParams = useSearchParams();
  const section = searchParams.get('section') || 'all';
  const [searchValue, setSearchValue] = useState('')
  const debouncedSearchValue = useDebounce(searchValue, 500)
  
  return (
    <div className={friendsSectionsSwitcherContainer()}>
      
      {section === 'search' && <FriendsSearchInput searchValue={searchValue} setSearchValue={setSearchValue} />}

      <div className={friendsSectionsSwitcher()}>
        {section === 'all' && <FriendsList />}
        {section === 'requests' && <FriendsRequests />}
        {section === 'search' && <FriendsSearch searchValue={debouncedSearchValue} />}
      </div>
    </div>

  );
}