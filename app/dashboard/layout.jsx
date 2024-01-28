"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocument } from "react-firebase-hooks/firestore";
import { auth } from "@/app/firebase/config";
import { signOut } from "firebase/auth";
import { getDocumentById } from "../firebase/actions";

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
  const uid = user && user.uid;
  const [userData, setUserData] = useState({});

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      const fetchUserData = async () => {
        const res = await getDocumentById("users", uid);
        setUserData(res);
      };
      fetchUserData();
    }
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, uid, router, loading]);

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
    <div className={styles.container}>
      {loading && (
        <div
          style={{
            marginRight: "auto",
            marginLeft: "auto",
          }}
        >
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        </div>
      )}
      {!loading && user && (
        <>
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
              userData={userData}
            />
          </div>
          <div
            key={expandSideBar ? "expanded" : "retracted"}
            className={styles.content}
          >
            {pathname.split("/").pop() === "dashboard" ||
            pathname.split("/").pop() === "users-statistics" ||
            pathname.split("/").pop() === "exterminators-statistics" ||
            pathname.split("/").pop() === "clicks-calculation" ||
            pathname.split("/").pop() === "settings" ? (
              <Navbar />
            ) : (
              ""
            )}
            {children}
            <Footer />
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardLayout;
