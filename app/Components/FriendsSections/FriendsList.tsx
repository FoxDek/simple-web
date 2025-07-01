"use client";
import { UserPreview } from "@/models/User";
import { cva } from "class-variance-authority";
import { useEffect, useState } from "react";
import Loader from "../Loader";
import Pagination from "../Pagination";
import FriendsCard from "./FriendsCard";
import useGetUserId from "@/hooks/useGetUserId";
import { fetchFriendsLists } from "@/utils/fetchFriendsLists.utils";

const friendsList = cva("friendsList h-full");
const friendsListTitle = cva("friendsListTitle text-xl");
const emptyMessage = cva("emptyMessage opacity-50");

export default function FriendsList({
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

  const handleDeleteFriendClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("delete friend");
  };

  const userId = useGetUserId();

  useEffect(() => {
    fetchFriendsLists({
      endpoint: "/api/user/friends",
      userId,
      searchValue,
      page,
      limit,
      setUsers,
      setTotalPages,
      setIsLoading,
      responseUsersKey: "friends",
      errorMessage: "Ошибка при получении друзей",
    });
  }, [page, searchValue, userId]);

  useEffect(() => {
    setPage(1);
  }, [searchValue]);

  const handlePageChange = (page: number) => {
    setPage(page);
  };
  return (
    <div className={friendsList()}>
      <h2 className={friendsListTitle()}>
        Мои друзья: {users.length !== 0 ? users.length : null}
      </h2>

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
              handleFriendClick={handleDeleteFriendClick}
              currentSection={currentSection}
            />
          ))
        ) : (
          <p className={emptyMessage()}>Пока никого</p>
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
