import { cva } from "class-variance-authority";
import ProfileInfo from "../../Components/ProfileComponents/ProfileInfo";
import ProfileFriends from "../../Components/ProfileComponents/profileFriends";
import ProfileWall from '../../Components/ProfileComponents/ProfileWall';

const userData = {
  _id: "7788abcd9900efgh1122ijkl",
  name: "Natalia",
  surname: "Smirnova",
  photo:
    "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200",
  age: 33,
  city: "Samara",
};

const profile = cva("profile flex flex-col gap-1");


export default function Profile() {
  return (
    <section className={profile()}>
      <ProfileInfo userData={userData} />
      <ProfileFriends />
      <ProfileWall />

    </section>
  );
}
