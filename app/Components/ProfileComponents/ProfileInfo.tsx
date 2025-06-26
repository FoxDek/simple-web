import Image from "next/image";
import { cva } from "class-variance-authority";

const profileInfoSubstrate = cva('profileInfoSubstrate bg-white rounded-xl border border-gray-200 p-3');
const profileInfoContainer = cva('profileInfoContainer flex flex-col items-center sm:flex-row gap-5 sm:gap-10 md:gap-25');
const profileInfoImage = cva('profileInfoImage relative aspect-square w-full max-w-[300px] sm:max-w-[200px] overflow-hidden rounded-xl');
const profileInfoDetails = cva('profileInfoDetails flex flex-col justify-center gap-3');
const profileInfoDetailsName = cva('profileInfoDetailsName text-xl sm:text-2xl font-bold');
const profileInfoDetailsDescription = cva('profileInfoDetailsDescription text-sm sm:text-base max-w-[500px] opacity-70');
const profileInfoDetailsAdd = cva('profileInfoDetailsAdd flex gap-3 items-center mt-3');
const profileInfoDetailsAddItem = cva('profileInfoDetailsAddItem text-sm opacity-50');

type user = {
  name: string;
  surname: string;
  photo: string;
  age: number;
  city: string;
};

export default function ProfileInfo({ userData }: { userData: user }) {
  return (
    <div className={profileInfoSubstrate()}>
      <div className={profileInfoContainer()}>
        <div className={profileInfoImage()}>
          <Image
            src={userData.photo}
            alt='User photo'
            fill
            className='object-cover'
          />
        </div>

        <div className={profileInfoDetails()}>
          <h2 className={profileInfoDetailsName()}>
            {userData.name} {userData.surname}
          </h2>
          <p className={profileInfoDetailsDescription()}>
            cultivate your hunger, before you idealize. motivate your anger to
            make them all realize
          </p>

          <div className={profileInfoDetailsAdd()}>
            {userData.age && (
              <p className={profileInfoDetailsAddItem()}>{userData.age} лет</p>
            )}
            {userData.city && (
              <p className={profileInfoDetailsAddItem()}>{userData.city}</p>
            )}
            <a href='#' className={profileInfoDetailsAddItem()}>
              Подробнее
            </a>
          </div>
        </div>


      </div>
    </div>
  );
}
