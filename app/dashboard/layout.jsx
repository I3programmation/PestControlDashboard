"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { signOut } from "firebase/auth";

import Navbar from "../ui/dashboard/navbar/navbar";
import Sidebar from "../ui/dashboard/sidebar/sidebar";
import styles from "../ui/dashboard/dashboard.module.css";

import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Footer from "../ui/dashboard/footer/footer";

const DashboardLayout = ({ children }) => {
  const [expandSideBar, setExpandSidebar] = useState(false);
  const [user, loading] = useAuthState(auth);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, router, loading]);

  const handleExpandClick = () => {
    setExpandSidebar(!expandSideBar);
  };

  const handleSignOut = () => {
    // Sign out the user and remove user data
    signOut(auth);
    sessionStorage.removeItem("user");
    // Redirect to login page after sign-out
    router.push("/login");
  };

  return (
    <>
      {loading && (
        <div style={{ marginRight: "auto",  marginLeft: "auto"}}>
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        </div>
      )}
      {!loading && user && (
        <div className={styles.container}>
          <div
            className={expandSideBar ? styles.menu : styles.retractedSidebar}
          >
            <div className={styles.icontgglesidebar}>
              <p onClick={handleExpandClick}>
                {expandSideBar ? (
                  <BsChevronLeft size={20} />
                ) : (
                  <BsChevronRight size={20} />
                )}
              </p>
            </div>
            <Sidebar
              expandSideBar={expandSideBar}
              handleSignOut={handleSignOut}
            />
          </div>
          <div
            key={expandSideBar ? "expanded" : "retracted"}
            className={styles.content}
          >
            {pathname.split("/").pop() === "dashboard" || pathname.split("/").pop() === "users-statistics" || pathname.split("/").pop() === "exterminators-statistics" ? <Navbar /> : ""}
            {children}
            <Footer />
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardLayout;
