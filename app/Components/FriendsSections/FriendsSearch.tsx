"use client";
import { UserPreview } from "@/models/User";
import { cva } from "class-variance-authority";
import { useEffect, useState } from "react";
import Loader from "../Loader";
import Pagination from "../Pagination";
import FriendsCard from "./FriendsCard";
import { fetchFriendsLists } from "@/utils/fetchFriendsLists.utils";

const friendsSearch = cva("friendsSearch h-full");
const friendsSearchTitle = cva("friendsSearchTitle text-xl");
const emptyMessage = cva("emptyMessage opacity-50");

export default function FriendsSearch({
  searchValue,
  currentSection,
}: {
  searchValue: string;
  currentSection: string;
}) {
  const [users, setUsers] = useState<UserPreview[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 12;

  const handleAddFriendClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("add friend");
  };

  useEffect(() => {
    fetchFriendsLists({
      endpoint: "/api/users",
      searchValue,
      page,
      limit,
      setUsers,
      setTotalPages,
      setIsLoading,
      responseUsersKey: "users",
      errorMessage: "Ошибка при получении пользователей",
      requiresUserId: false,
    });
  }, [page, searchValue]);

  useEffect(() => {
    setPage(1);
  }, [searchValue]);

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  return (
    <div className={friendsSearch()}>
      <h2 className={friendsSearchTitle()}>Возможно вы знакомы:</h2>

      <div
        className={`${
          users.length == 0 || isLoading
            ? "friendsSearchContainer flex items-center justify-center h-full"
            : "friendsSearchContainer grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 gap-2 mt-5"
        }`}
      >
        {isLoading ? (
          <Loader spinnerColor={"border-[#447bba]"} />
        ) : users.length > 0 ? (
          users.map((user) => (
            <FriendsCard
              key={user._id}
              user={user}
              handleFriendClick={handleAddFriendClick}
              currentSection={currentSection}
            />
          ))
        ) : (
          <p className={emptyMessage()}>Пользователи не найдены</p>
        )}
      </div>

      {users.length > 0 && !isLoading && (
        <div className='flex items-center justify-center mt-3 select-none'>
          <Pagination
            currentPage={page}
            pageSize={limit}
            total={totalPages}
            onChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
}
