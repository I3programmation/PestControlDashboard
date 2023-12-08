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
  MdAutoGraph,
  MdAdsClick,
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
        icon: <ExterminatorIcon size="15" fill="white" />,
      },
    ],
  },
  {
    title: "Analytics",
    list: [
      {
        title: "Users statistics",
        path: "/dashboard/users-statistics",
        icon: <MdAutoGraph />,
      },
      {
        title: "Exterminator statistics",
        path: "/dashboard/exterminators-statistics",
        icon: <MdAutoGraph />,
      },
      {
        title: "Clicks calculation",
        path: "/dashboard/clicks-calculation",
        icon: <MdAdsClick />,
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
    ],
  },
];

const Sidebar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <PestControlIcon size={65} fill="white" />
      </div>
      <div className={styles.separator}>
      </div>
      <div className={styles.user}>
        <Image className={styles.userImage} src="/noavatar.png" alt="" width="45" height="45" />
        <div className={styles.userDetail}>
          <span className={styles.username}>John Doe</span>
          <span className={styles.userTitle}>Administrator</span>
        </div>
      </div>

      {/* <ExterminatorIcon fill="white" />
        <AccountIcon fill="white" />
        <LogOutIcon fill="white" />
      <ParametersIcon fill="white" /> */}

      <ul className={styles.list}>
        {menuItems.map((cat, idx) => (
          <li key={cat.title}>
            {menuItems.length-1 !== idx && <span className={styles.cat}>{cat.title}</span>}

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
