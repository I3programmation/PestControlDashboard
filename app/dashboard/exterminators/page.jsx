import Navbar from "@/app/ui/dashboard/navbar/navbar";
import { IconButton, Pagination } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { MdCreate, MdDelete } from "react-icons/md";
import styles from "@/app/ui/dashboard/exterminators/exterminators.module.css"
import { getUsersByUserType } from "@/app/lib/firebase/firebase";

const ExterminatorsPage = async () => {
  const exterminators = await getUsersByUserType("exterminator");
  exterminators.forEach(ext => {
    console.log(ext.imgUrl);
  })
  return (
    <>
      <Navbar search={true} searchPh="Search for an exterminator..."/>
      <div className={styles.container}>
        {/* <div className={styles.top}>
        <Search placeholder="Search for a exterminator..." />
        <Link href="/dashboard/exterminators/add">
          <button className={styles.addButton}>Add new</button>
        </Link>
      </div> */}
        <table className={styles.table} rules="none">
          <thead>
            <tr>
              <td>Name</td>
              <td>Email</td>
              <td>Member since</td>
              <td>City</td>
              <td>province</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {exterminators.map((exterminator) => (
              <>
                <tr className={styles.spacer}></tr>
                <tr key={exterminator.id} className={styles.exterminatorRow}>
                  <td>
                    <div className={styles.exterminator}>
                      <Image
                        src="/noavatar.png"
                        alt=""
                        width={40}
                        height={40}
                        className={styles.exterminatorImage}
                      />
                      {exterminator.firstName + " " + exterminator.lastName}
                    </div>
                  </td>
                  <td>{exterminator.email}</td>
                  <td>{exterminator.memberSince}</td>
                  <td>{exterminator.city}</td>
                  <td>{exterminator.province}</td>
                  <td>
                    <div className={styles.buttons}>
                      <Link href={`/dashboard/exterminator/${exterminator.id}`}>
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

export default ExterminatorsPage;
