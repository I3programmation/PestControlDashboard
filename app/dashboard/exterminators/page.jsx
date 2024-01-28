"use client";

import { useEffect, useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
import {
  getUsersWithPagination,
  // getUsersByUserType,
} from "@/app/firebase/actions";

// import { IconButton, Pagination } from "@mui/material";
// import { MdCreate, MdDelete } from "react-icons/md";
import Navbar from "@/app/ui/dashboard/navbar/navbar";

import styles from "@/app/ui/dashboard/exterminators/exterminators.module.css";
import ListeTable from "@/app/ui/dashboard/listTable/listeTable";

const ExterminatorsPage = () => {
  const PageSize = 8;
  const [data, setData] = useState([]);
  const [pagesCount, setPagesCount] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastVisible, setLastVisible] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const result = await getUsersWithPagination(
        "exterminator",
        currentPage,
        PageSize,
        lastVisible
      );
      setData(result.data);
      setLastVisible(result.lastDoc);
      setPagesCount(result.pagesCount);
      setIsLoading(false);
    };
    fetchData();
  }, [currentPage]);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };
  return (
    <>
      <Navbar search={true} searchPh="Search for an exterminator..." />
      <div className={styles.container}>
        {isLoading && (
          <div style={{ textAlign: "center" }}>
            <h2>Loading...</h2>
          </div>
        )}
        {!isLoading && data.length > 0 && (
          <ListeTable
          data={data}
          pagesCount={pagesCount}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
        />
          // <>
          //   <table className={styles.table} rules="none">
          //     <thead>
          //       <tr>
          //         <td>Name</td>
          //         <td>Email</td>
          //         <td>Member since</td>
          //         <td>City</td>
          //         <td>province</td>
          //         <td></td>
          //       </tr>
          //     </thead>
          //     <tbody>
          //       {data.map((exterminator) => (
          //         <tr key={exterminator.id} className={styles.exterminatorRow}>
          //           <td>
          //             <div className={styles.exterminator}>
          //               {/* {console.log(exterminator)} */}
          //               <Image
          //                 // src="/noavatar.png"
          //                 src={exterminator.imageUrl}
          //                 alt=""
          //                 width={40}
          //                 height={40}
          //                 className={styles.exterminatorImage}
          //               />
          //               {exterminator.firstName + " " + exterminator.lastName}
          //             </div>
          //           </td>
          //           <td>{exterminator.email}</td>
          //           <td>{exterminator.memberSince}</td>
          //           <td>{exterminator.city}</td>
          //           <td>{exterminator.province}</td>
          //           <td>
          //             <div className={styles.buttons}>
          //               <Link
          //                 href={`/dashboard/exterminator/${exterminator.id}`}
          //               >
          //                 <IconButton
          //                   className={`${styles.button} ${styles.view}`}
          //                   aria-label="View"
          //                 >
          //                   <MdCreate />
          //                 </IconButton>
          //               </Link>
          //               <IconButton
          //                 className={`${styles.button} ${styles.delete}`}
          //                 aria-label="Delete"
          //               >
          //                 <MdDelete color="#dc143c" />
          //               </IconButton>
          //             </div>
          //           </td>
          //         </tr>
          //       ))}
          //     </tbody>
          //   </table>
          //   <div className={styles.pagination}>
          //     <Pagination
          //       count={pagesCount}
          //       page={currentPage}
          //       onChange={handlePageChange}
          //       variant="outlined"
          //       shape="rounded"
          //     />
          //   </div>
          // </>
        )}
        {!isLoading && data.length === 0 && (
          <div style={{ textAlign: "center" }}>
            <h2>There are no exterminators yet.</h2>
          </div>
        )}
      </div>
    </>
  );
};

export default ExterminatorsPage;
