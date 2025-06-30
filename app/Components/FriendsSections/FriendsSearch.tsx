'use client';
import {UserPreview} from "@/models/User";
import axios from "axios";
import { cva } from "class-variance-authority";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Loader from "../Loader";
import Pagination from '../Pagination';

const friendsSearch = cva('friendsSearch h-full')
const friendsSearchTitle = cva('friendsSearchTitle text-xl')
const friendCard = cva('friendCard rounded-xl overflow-clip flex flex-col bg-[#f1f1f1]')
const friendCardImage = cva('friendCardImage relative aspect-square w-full overflow-hidden')
const friendCardDetails = cva('friendCardDetails px-3 py-2 text-sm flex flex-col justify-between')
const friendCardDetailsAddItem = cva("friendCardDetailsAddItem opacity-50 text-xs")
const friendCardButton = cva("friendCardButton bg-white rounded-lg w-full p-2 hover:bg-gray-200 transform duration-200 ease-in-out")
const emptyMessage = cva('emptyMessage opacity-50')


export default function FriendsSearch({searchValue}: {searchValue: string}) {
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
    const getUsers = async function() {
      setIsLoading(true)
      try {
        const res = await axios.get(`/api/users`, {
          params: {
            search: searchValue,
            page,
            limit
          }
        }) // ?page=${page}&limit=${limit}
        setUsers(res.data.users)
        setTotalPages(res.data.total)

      } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
          console.error(err.response)
        } else {
          console.error('Ошибка при получении пользователей', err)
        }
      } finally {
        setIsLoading(false)
      }
    }
    
    getUsers();
  }, [page, searchValue]);

  useEffect(() => {
    setPage(1)
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
        { isLoading ? <Loader spinnerColor={'border-[#447bba]'} /> : users.length > 0 ? (
          users.map((user) => (
            <Link
              href={`/profile/${user._id}`}
              key={user._id}
              className={friendCard()}
            >
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
                  {user.age && <span className={friendCardDetailsAddItem()}>{user.age} лет</span>}
                  {user.age && user.city && <span className={friendCardDetailsAddItem()}>, </span>}
                  {user.city && <span className={friendCardDetailsAddItem()}>{user.city}</span>}
                </div>

                

              </div>

              <div className="mt-auto p-1"><button className={friendCardButton()} onClick={(e) => {handleAddFriendClick(e)}}><span className="text-xs font-bold">+ Добавить</span></button></div>
            </Link>
          ))
        ) : (
          <p className={emptyMessage()}>Пользователи не найдены</p>
        )}
      </div>

      {users.length > 0 && !isLoading && (
        <div className="flex items-center justify-center mt-3 select-none">
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
