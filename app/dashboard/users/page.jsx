import Navbar from "@/app/ui/dashboard/navbar/navbar";
import Search from "@/app/ui/dashboard/search/search";
import styles from "@/app/ui/dashboard/users/users.module.css";
import { IconButton, Pagination } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { MdCreate, MdDelete } from "react-icons/md";

const UsersPage = () => {
  const DATA = [
    {
      ID: 2134,
      Name: "David Corby",
      Email: "david.corby@gmail.com",
      CreatedAt: "23/01/2023",
      Role: "User",
      Status: "active",
    },
    {
      ID: 789,
      Name: "Alice Johnson",
      Email: "alice.johnson@example.com",
      CreatedAt: "15/02/2023",
      Role: "Admin",
      Status: "inactive",
    },
    {
      ID: 456,
      Name: "Bob Smith",
      Email: "bob.smith@example.com",
      CreatedAt: "10/03/2023",
      Role: "User",
      Status: "active",
    },
    {
      ID: 123,
      Name: "Eva Rodriguez",
      Email: "eva.rodriguez@example.com",
      CreatedAt: "05/04/2023",
      Role: "User",
      Status: "inactive",
    },
    {
      ID: 987,
      Name: "Sophia Lee",
      Email: "sophia.lee@example.com",
      CreatedAt: "18/05/2023",
      Role: "Admin",
      Status: "active",
    },
  ];

  return (
    <>
      <Navbar search={true} />
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
              <td>Created at</td>
              <td>Role</td>
              <td>Status</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {DATA.map((user) => (
              <>
                <tr className={styles.spacer}></tr>
                <tr key={user.ID} className={styles.userRow}>
                  <td>
                    <div className={styles.user}>
                      <Image
                        src="/noavatar.png"
                        alt=""
                        width={40}
                        height={40}
                        className={styles.userImage}
                      />
                      {user.Name}
                    </div>
                  </td>
                  <td>{user.Email}</td>
                  <td>{user.CreatedAt}</td>
                  <td>{user.Role}</td>
                  <td>{user.Status}</td>
                  <td>
                    <div className={styles.buttons}>
                      <Link href="">
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
