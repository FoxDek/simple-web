import { cva } from "class-variance-authority";
import TabButton from "../Components/TabButton";
import FriendsSectionsSwitcher from '../Components/FriendsSections/FriendsSectionsSwitcher';

const friendsLayout = cva("friendsLayout w-full flex flex-col gap-5 h-full lg:flex-row");
const rightAsideMenu = cva("rightAsideMenu bg-white rounded-xl border border-gray-200 p-2 min-w-1/3 h-fit order-1 lg:order-2");
const rightAsideMenuContainer = cva("rightAsideMenuContainer flex flex-col text-sm gap-1");


export default function FriendsLayout() {

  return (
    <section className={friendsLayout()}>

      <FriendsSectionsSwitcher />
      
      <aside className={rightAsideMenu()}>
        <div className={rightAsideMenuContainer()}>
          <TabButton label="Мои друзья" value='all' />
          <TabButton label="Заявки в друзья" value='requests' />
          <TabButton label="Поиск друзей" value='search' />
        </div>
      </aside>

    </section>
  );
}