import { IconButton, Pagination } from "@mui/material"
import styles from "./listeTable.module.css"
import Link from "next/link"
import { MdCreate, MdDelete } from "react-icons/md"
import Image from "next/image"

const ListeTable = ({data, pagesCount, currentPage, handlePageChange}) => {
  return (
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
        {data.map((user) => (
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
      <Pagination
        count={pagesCount}
        page={currentPage}
        onChange={handlePageChange}
        variant="outlined"
        shape="rounded"
      />
    </div>
  </>
  )
}

export default ListeTable