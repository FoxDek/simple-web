'use client';
import Image from "next/image";
import Link from "next/link";

const data = [
  {
    _id: "6857bada97133c63181e1ca1",
    name: "Tema",
    surname: "Sorokin",
    photo:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200",
    age: 28,
    city: "Moscow",
  },
  {
    _id: "7892cdfa12345a67891b2cd3",
    name: "Anna",
    surname: "Ivanova",
    photo:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200",
    age: 24,
    city: "Saint Petersburg",
  },
  {
    _id: "4567efab98765b43210cde45",
    name: "Dmitry",
    surname: "Petrov",
    photo:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=200",
    age: 32,
    city: "Kazan",
  },
  {
    _id: "1234abcd5678efgh9012ijkl",
    name: "Elena",
    surname: "Sokolova",
    photo:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200",
    age: 29,
    city: "Novosibirsk",
  },
  {
    _id: "5678ghij1234klmn9012opqr",
    name: "Alexey",
    surname: "Volkov",
    photo:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200",
    age: 35,
    city: "Yekaterinburg",
  },
  {
    _id: "9012mnop3456qrst7890uvwx",
    name: "Olga",
    surname: "Kuznetsova",
    photo:
      "https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&w=200",
    age: 27,
  },
  {
    _id: "3456qrst7890uvwx1234abcd",
    name: "Igor",
    surname: "Lebedev",
    photo:
      "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=200",
    age: 31,
    city: "Sochi",
  },
  {
    _id: "7890uvwx1234abcd5678efgh",
    name: "Maria",
    surname: "Fedorova",
    photo:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200",
    city: "Vladivostok",
  },
  {
    _id: "1122mnop3344qrst5566uvwx",
    name: "Sergey",
    surname: "Nikolaev",
    photo:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200",
    age: 30,
    city: "Krasnodar",
  },
  {
    _id: "7788abcd9900efgh1122ijkl",
    name: "Natalia",
    surname: "Smirnova",
    photo:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200",
    age: 33,
    city: "Samara",
  },
];

// const data = []

export default function FriendsSearch() {
  const handleAddFriendClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("add friend");
  };

  return (
    <div className='h-full'>
      <h2 className='text-xl'>Возможно вы знакомы:</h2>

      <div
        className={`${
          data.length == 0
            ? "flex items-center justify-center h-full"
            : "grid grid-cols-2 sm:grid-cols-3 gap-2 mt-5"
        }`}
      >
        {data.length > 0 ? (
          data.map((user) => (
            <Link
              href={`/profile/${user._id}`}
              key={user._id}
              className='rounded-xl overflow-clip flex flex-col bg-[#f1f1f1]'
            >
              <div className='relative aspect-square w-full overflow-hidden'>
                <Image
                  src={user.photo}
                  alt='User photo'
                  fill
                  className='object-cover'
                />
              </div>
              <div className='px-3 py-2 text-sm flex flex-col'>
                <span className=''>
                  {user.name} {user.surname}
                </span>

                <div className="">
                  {user.age && <span className="opacity-50 text-xs">{user.age} лет</span>}
                  {user.age && user.city && <span className="opacity-50 text-xs">, </span>}
                  {user.city && <span className="opacity-50 text-xs">{user.city}</span>}
                </div>

                <button className="bg-white rounded-lg w-full p-2 mt-2 hover:bg-gray-200 transform duration-200 ease-in-out" onClick={(e) => {handleAddFriendClick(e)}}><span className=" text-xs font-bold">+ Добавить</span></button>

              </div>
            </Link>
          ))
        ) : (
          <p className='opacity-50'>Пользователей не найдено</p>
        )}
      </div>
    </div>
  );
}
