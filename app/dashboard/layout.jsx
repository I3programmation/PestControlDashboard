"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Navbar from "../ui/dashboard/navbar/navbar";
import Sidebar from "../ui/dashboard/sidebar/sidebar";
import styles from "../ui/dashboard/dashboard.module.css";

import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import Footer from "../ui/dashboard/footer/footer";

const DashboardLayout = ({ children }) => {
  const [expandSideBar, setExpandSidebar] = useState(false);
  const pathname = usePathname();

  const handleExpandClick = () => {
    setExpandSidebar(!expandSideBar);
  };

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
      <div
        key={expandSideBar ? "expanded" : "retracted"}
        className={styles.content}
      >
        {pathname.split("/").pop() === "users" ||
        pathname.split("/").pop() === "exterminators" ? (
          ""
        ) : (
          <Navbar />
        )}
        {children}
        <Footer />
      </div>
    </div>
  );
};

export default DashboardLayout;
