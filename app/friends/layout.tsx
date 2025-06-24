import { cva } from "class-variance-authority";
import TabButton from "../Components/TabButton";
import FriendsSectionsSwitcher from '../Components/FriendsSections/FriendsSectionsSwitcher';

const rightAsideMenu = cva("bg-white rounded-xl border border-gray-200 p-2 min-w-1/3");
const rightAsideMenuContainer = cva("flex flex-col text-sm gap-1");


export default function FriendsLayout({children}: {children: React.ReactNode}) {

  return (
    <section className="w-full flex gap-5">

      <FriendsSectionsSwitcher />
      
      <aside className={rightAsideMenu()}>
        <div className={rightAsideMenuContainer()}>
          <TabButton label="Мои друзья" value='all'>Мои друзья</TabButton>
          <TabButton label="Заявки в друзья" value='requests'>Заявки в друзья</TabButton>
          <TabButton label="Поиск друзей" value='search'>Поиск друзей</TabButton>
        </div>
      </aside>

    </section>
  );
}