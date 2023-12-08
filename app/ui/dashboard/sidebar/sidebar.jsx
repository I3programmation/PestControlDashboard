import Image from "next/image";
import AccountIcon from "../../icons/AccountIcon";
import ExterminatorIcon from "../../icons/ExterminatorIcon";
import LogOutIcon from "../../icons/LogOutIcon";
import PestControlIcon from "../../icons/Logo_Pest_Control";
import ParametersIcon from "../../icons/Parameters";
import MenuLink from "./menuLink/menuLink";
import styles from "./sidebar.module.css";
import {
  MdDashboard,
  MdSupervisedUserCircle,
  MdShoppingBag,
  MdAttachMoney,
  MdWork,
  MdAnalytics,
  MdPeople,
  MdOutlineSettings,
  MdHelpCenter,
  MdLogout,
} from "react-icons/md";

const menuItems = [
  {
    title: "Pages",
    list: [
      {
        title: "Dashboard",
        path: "/dashboard",
        icon: <MdDashboard />,
      },
      {
        title: "Users",
        path: "/dashboard/users",
        icon: <MdSupervisedUserCircle />,
      },
      {
        title: "Exterminators",
        path: "/dashboard/exterminators",
        icon: <MdShoppingBag />,
      },
    ],
  },
  {
    title: "Analytics",
    list: [
      {
        title: "Users statistics",
        path: "/dashboard/user-statistics",
        icon: <MdWork />,
      },
      {
        title: "Exterminator statistics",
        path: "/dashboard/user-statistics",
        icon: <MdWork />,
      },
      {
        title: "Clicks calculation",
        path: "/dashboard/clicks-calculation",
        icon: <MdWork />,
      },
    ],
  },
  {
    title: "User",
    list: [
      {
        title: "Settings",
        path: "/dashboard/settings",
        icon: <MdOutlineSettings />,
      },
      {
        title: "Help",
        path: "/dashboard/help",
        icon: <MdHelpCenter />,
      },
    ],
  },
];

const Sidebar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <PestControlIcon size={60} fill="white" />
      </div>
      <div className={styles.user}>
        <Image className={styles.userImage} src="/noavatar.png" alt="" width="50" height="50" />
        <div className={styles.userDetail}>
          <span className={styles.username}>John Doe</span>
          <span className={styles.userTitle}>Administrator</span>
        </div>
      </div>
      {/* <ExterminatorIcon fill="white" />
        <AccountIcon fill="white" />
        <LogOutIcon fill="white" />
      <ParametersIcon fill="white" /> */}
      <ul>
        {menuItems.map((cat) => (
          <li key={cat.title}>
            <span className={styles.cat}>{cat.title}</span>
            {cat.list.map((item) => (
              <MenuLink item={item} key={item.title} />
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
