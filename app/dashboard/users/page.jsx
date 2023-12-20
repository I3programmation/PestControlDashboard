import { getUsersByUserType } from "@/app/lib/firebase/firebase";
import Navbar from "@/app/ui/dashboard/navbar/navbar";
import Search from "@/app/ui/dashboard/search/search";
import styles from "@/app/ui/dashboard/users/users.module.css";
import { IconButton, Pagination } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { MdCreate, MdDelete } from "react-icons/md";

const UsersPage = async ({ searchParams }) => {
// const q = searchParams?.q || "";
//   const page = searchParams?.page || 1;
  const users = await getUsersByUserType("user");

  return (
    <>
      <Navbar search={true} searchPh="Search for a user..."/>
      <div className={styles.container}>
        {/* <div className={styles.top}>
        <Search placeholder="Search for a user..." />
        <Link href="/dashboard/users/add">
          <button className={styles.addButton}>Add new</button>
        </Link>
      </div> */}
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
              <>
                <tr className={styles.spacer}></tr>
                <tr key={user.id} className={styles.userRow}>
                  <td>
                    <div className={styles.user}>
                      <Image
                        src="/noavatar.png"
                        alt=""
                        width={40}
                        height={40}
                        className={styles.userImage}
                      />
                      {user.firstName+" "+user.lastName}
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
                <tr className={styles.spacer}></tr>
              </>
            ))}
          </tbody>
        </table>
        <div className={styles.pagination}>
          <Pagination count={4} variant="outlined" shape="rounded" />
        </div>
      </div>
    </>
  );
};

export default UsersPage;
