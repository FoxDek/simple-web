'use client'
import { useSearchParams } from 'next/navigation';
import FriendsList from './FriendsList';
import FriendsRequests from './FriendsRequests';
import FriendsSearch from './FriendsSearch';
import { cva } from 'class-variance-authority';
import { useEffect, useState } from 'react';
import FriendsSearchInput from './FriendsSearchInput';
import { useDebounce } from '@/hooks/useDebounce';

const friendsSectionsSwitcher = cva("friendsSectionsSwitcher bg-white border border-gray-200 w-full p-4 rounded-xl h-full")
const friendsSectionsSwitcherContainer = cva("friendsSectionsSwitcherContainer flex flex-col w-full gap-2 order-2 lg:order-1 h-full")

export default function FriendsSectionsSwitcher() {
  const searchParams = useSearchParams();
  const section = searchParams.get('section') || 'all';
  const subRequestsSection = searchParams.get('subSection') || 'inbound';
  const [searchValue, setSearchValue] = useState('')
  const debouncedSearchValue = useDebounce(searchValue, 500)

  useEffect(() => {
    setSearchValue('')
  }, [section, subRequestsSection]);
  
  return (
    <div className={friendsSectionsSwitcherContainer()}>
      
      {/* {section === 'search' && <FriendsSearchInput searchValue={searchValue} setSearchValue={setSearchValue} />} */}
      <FriendsSearchInput searchValue={searchValue} setSearchValue={setSearchValue} />

      <div className={friendsSectionsSwitcher()}>
        {section === 'all' && <FriendsList searchValue={debouncedSearchValue} currentSection={section} />}
        {section === 'requests' && <FriendsRequests searchValue={debouncedSearchValue} subSection={subRequestsSection} />}
        {section === 'search' && <FriendsSearch searchValue={debouncedSearchValue} currentSection={section} />}
      </div>
    </div>

  );
}