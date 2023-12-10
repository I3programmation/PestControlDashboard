import Image from "next/image";
import { Tooltip } from "react-tooltip";
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
        icon: <MdDashboard size={23} />,
      },
      {
        title: "Users",
        path: "/dashboard/users",
        icon: <MdSupervisedUserCircle size={23} />,
      },
      {
        title: "Exterminators",
        path: "/dashboard/exterminators",
        icon: <ExterminatorIcon size={19} fill="white" />,
      },
    ],
  },
  {
    title: "Analytics",
    list: [
      {
        title: "Users statistics",
        path: "/dashboard/users-statistics",
        icon: <MdAutoGraph size={23} />,
      },
      {
        title: "Exterminator statistics",
        path: "/dashboard/exterminators-statistics",
        icon: <MdAutoGraph size={23} />,
      },
      {
        title: "Clicks calculation",
        path: "/dashboard/clicks-calculation",
        icon: <MdAdsClick size={23} />,
      },
    ],
  },
  {
    title: "User",
    list: [
      {
        title: "Settings",
        path: "/dashboard/settings",
        icon: <MdOutlineSettings size={25} />,
      },
    ],
  },
];

const Sidebar = ({ expandSideBar }) => {
  return (
    <div className={styles.container}>
      {expandSideBar ? (
        <>
          <div className={styles.header}>
            <PestControlIcon size={65} fill="white" />
          </div>
          <div className={styles.separator}></div>
          <div className={styles.user}>
            <Image
              className={styles.userImage}
              src="/noavatar.png"
              alt=""
              width="45"
              height="45"
            />
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
                {idx !== 0 && <div className={styles.separator}></div>}
                {/* {menuItems.length - 1 !== idx && (
              <span className={styles.cat}>{cat.title}</span>
            )}
            {menuItems.length - 1 === idx && (
              <div className={styles.separator}></div>
            )} */}
                {cat.list.map((item) => (
                  <MenuLink item={item} key={item.title} />
                ))}
              </li>
            ))}
          </ul>
          <button className={styles.logout}>
            <MdLogout size={23} />
            Logout
          </button>
        </>
      ) : (
        <>
          <div className={styles.header}>
            <PestControlIcon size={45} fill="white" />
          </div>
          <div className={styles.separator}></div>
          <div
            className={styles.user}
            data-tooltip-id="my-tooltip"
            data-tooltip-place="right-start"
            data-tooltip-content="John Doe - Admin"
          >
            <Image
              className={styles.userImage}
              src="/noavatar.png"
              alt=""
              width="32"
              height="32"
            />
          </div>
          <Tooltip
            style={{
              padding: ".3rem .6rem",
              borderRadius: ".2rem",
              backgroundColor: "#123d04",
            }}
            id="my-tooltip"
          />
          <ul className={styles.list}>
            {menuItems.map((cat, idx) => (
              <li key={cat.title}>
                {idx !== 0 && <div className={styles.separator}></div>}
                {cat.list.map((item) => (
                  <MenuLink title={false} item={item} key={item.title} />
                ))}
              </li>
            ))}
          </ul>
          <button
            className={styles.logout}
            data-tooltip-id="my-tooltip"
            data-tooltip-place="right-start"
            data-tooltip-content="Logout"
          >
            <MdLogout size={23} />
          </button>
          <Tooltip
            style={{
              padding: ".3rem .6rem",
              borderRadius: ".2rem",
              backgroundColor: "#123d04",
            }}
            id="my-tooltip"
          />
        </>
      )}
    </div>
  );
};

export default Sidebar;
