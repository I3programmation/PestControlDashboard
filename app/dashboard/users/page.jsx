"use client";

import { useEffect, useState } from "react";
import { getUsersByUserType } from "@/app/lib/firebase/firebase";
import Navbar from "@/app/ui/dashboard/navbar/navbar";
import styles from "@/app/ui/dashboard/users/users.module.css";
import { IconButton, Pagination } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { MdCreate, MdDelete } from "react-icons/md";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const usersData = await getUsersByUserType("user");
      setUsers(usersData);
      setIsLoading(false);
    }
    fetchData();
  }, []);
  return (
    <>
      <Navbar search={true} searchPh="Search for a user..." />
      <div className={styles.container}>
        {isLoading && (
          <div style={{ textAlign: "center" }}>
            <h2>Loading...</h2>
          </div>
        )}
        {!isLoading && users.length > 0 &&(
          <>
            <table className={styles.table} rules="none">
              <thead>
                <tr>
                  <td>Name</td>
                  <td>Email</td>
                  <td>Country</td>
                  <td>Province</td>
                  <td>City</td>
                  <td></td>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className={styles.userRow}>
                    <td>
                      <div className={styles.user}>
                        <Image
                          // src="/noavatar.png"
                          src={user.imageUrl}
                          alt=""
                          width={40}
                          height={40}
                          className={styles.userImage}
                        />
                        {user.firstName + " " + user.lastName}
                      </div>
                    </td>
                    <td>{user.email}</td>
                    <td>{user.country}</td>
                    <td>{user.province}</td>
                    <td>{user.city}</td>
                    <td>
                      <div className={styles.buttons}>
                        <Link href={`/dashboard/users/${user.id}`}>
                          <IconButton
                            className={`${styles.button} ${styles.view}`}
                            aria-label="View"
                          >
                            <MdCreate />
                          </IconButton>
                        </Link>
                        <IconButton
                          className={`${styles.button} ${styles.delete}`}
                          aria-label="Delete"
                        >
                          <MdDelete color="#dc143c" />
                        </IconButton>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className={styles.pagination}>
              <Pagination count={4} variant="outlined" shape="rounded" />
            </div>
          </>
        )}
        {!isLoading && users.length === 0 && (
          <div style={{ textAlign: "center" }}>
            <h2>There are no users yet.</h2>
          </div>
        )}
      </div>
    </>
  );
};

export default UsersPage;
