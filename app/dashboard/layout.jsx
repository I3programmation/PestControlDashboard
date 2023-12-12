"use client";

import { useEffect, useState } from "react";
import Navbar from "../ui/dashboard/navbar/navbar";
import Sidebar from "../ui/dashboard/sidebar/sidebar";
import styles from "../ui/dashboard/dashboard.module.css";

import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

const Layout = ({ children }) => {
  const [expandSideBar, setExpandSidebar] = useState(false);

  const handleExpandClick = () => {
    setExpandSidebar(!expandSideBar);
  };

  // useEffect(() => {
  // }, []);

  return (
    <div className={styles.container}>
      <div className={expandSideBar ? styles.menu : styles.retractedSidebar}>
        <div className={styles.icontgglesidebar}>
          <p onClick={handleExpandClick}>
            {expandSideBar ? (
              <BsChevronLeft size={20} />
            ) : (
              <BsChevronRight size={20} />
            )}
          </p>
        </div>
        <Sidebar expandSideBar={expandSideBar} />
      </div>
      <div className={styles.content}>
        <Navbar />
        {children}
      </div>
    </div>
  );
};

export default Layout;
