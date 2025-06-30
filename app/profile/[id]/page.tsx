import { cva } from "class-variance-authority";
import ProfileInfo from "../../Components/ProfileComponents/ProfileInfo";
import ProfileFriends from "../../Components/ProfileComponents/profileFriends";
import ProfileWall from "../../Components/ProfileComponents/ProfileWall";
import { getCurrentUser } from "@/lib/auth";
import axios from "axios";
import { IUser } from "@/models/User";

const profile = cva("profile flex flex-col gap-1");

export default async function Profile({ params }: { params: { id: string } }) {
  const { id } = await params;
  const payload = await getCurrentUser();
  let userData: IUser | null = null;

  if (!payload) {
    return (
      <section className={profile()}>
        <h1>Пользователь не найден</h1>
      </section>
    );
  }

  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/user`, {
      params: { userId: id },
    });
    userData = res.data;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      console.error(err.response);
    } else {
      console.error("Ошибка при получении данных пользователя", err);
    }
  }

  if (!userData) {
    return (
      <section className={profile()}>
        <h1>Ошибка загрузки профиля</h1>
      </section>
    );
  }

  return (
    <section className={profile()}>
      {id === payload.userId && (
        <div className='absolute top-15 right-5 bg-green-400 rounded-lg p-1'>
          edit
        </div>
      )}
      <ProfileInfo userData={userData} />
      <ProfileFriends 
        friends={userData.friends.map(id => id.toString())}
        subscribers={userData.subscribers.map(id => id.toString())}
      />
      <ProfileWall />
    </section>
  );
}
