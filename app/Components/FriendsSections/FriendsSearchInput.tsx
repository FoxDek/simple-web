import SearchIcon from "@/public/search-icon.svg";
import { cva } from "class-variance-authority";

const searchInput = cva('bg-white border border-gray-200 rounded-xl p-4 flex gap-3 items-center')
const searchInputIcon = cva('w-5 h-auto fill-black opacity-50')
const searchInputInput = cva('w-full text-sm placeholder:text-xs outline-none')

export default function FriendsSearchInput({
  searchValue,
  setSearchValue,
}: {
  searchValue: string;
  setSearchValue: (value: string) => void;
}) {
  return (
    <div className={searchInput()}>
      <SearchIcon className={searchInputIcon()} />
      <input
        type='text'
        className={searchInputInput()}
        placeholder='Поиск друзей'
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
    </div>
  );
}
