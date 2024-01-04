"use client";

import { useEffect, useState } from "react";
import Navbar from "@/app/ui/dashboard/navbar/navbar";
import { IconButton, Pagination } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { MdCreate, MdDelete } from "react-icons/md";
import styles from "@/app/ui/dashboard/exterminators/exterminators.module.css";
import { getUsersByUserType } from "@/app/lib/firebase/firebase";

const ExterminatorsPage = () => {
  const [exterminators, setExterminators] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const exterData = await getUsersByUserType("exterminator");
      setExterminators(exterData);
      setIsLoading(false);
    }
    fetchData();
  }, []);
  return (
    <>
      <Navbar search={true} searchPh="Search for an exterminator..." />
      <div className={styles.container}>
        {isLoading && (
          <div style={{ textAlign: "center" }}>
            <h2>Loading...</h2>
          </div>
        )}
        {!isLoading && exterminators.length > 0 && (
          <>
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
                  <tr key={exterminator.id} className={styles.exterminatorRow}>
                    <td>
                      <div className={styles.exterminator}>
                        {/* {console.log(exterminator)} */}
                        <Image
                          // src="/noavatar.png"
                          src={exterminator.imageUrl}
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
                        <Link
                          href={`/dashboard/exterminator/${exterminator.id}`}
                        >
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
        {!isLoading && exterminators.length === 0 && (
          <div style={{ textAlign: "center" }}>
            <h2>There are no exterminators yet.</h2>
          </div>
        )}
      </div>
    </>
  );
};

export default ExterminatorsPage;





// "use client";

// import { useEffect, useState } from "react";
// import Navbar from "@/app/ui/dashboard/navbar/navbar";
// import { IconButton, Pagination } from "@mui/material";
// import Image from "next/image";
// import Link from "next/link";
// import { MdCreate, MdDelete } from "react-icons/md";
// import styles from "@/app/ui/dashboard/exterminators/exterminators.module.css";
// import {
//   getUsersByUserType,
//   getUsersByUserTypePaginated,
// } from "@/app/lib/firebase/firebase";

// const ExterminatorsPage = () => {
//   const [exterminators, setExterminators] = useState({
//     data: [],
//     nextPage: null,
//   });
//   const [currentPage, setCurrentPage] = useState(1);
//   const [isLoading, setIsLoading] = useState(false);

//   const pageSize = 5;

//   const getUsers = async (page) => {
//     try {
//       setIsLoading(true);
//       const result = await getUsersByUserTypePaginated(
//         "exterminator",
//         pageSize,
//         page === 1 ? null : exterminators.nextPage
//       );
//       setExterminators(result);
//       setIsLoading(false);
//     } catch (error) {
//       // Handle error
//     }
//   };

//   useEffect(() => {
//     getUsers(currentPage);
//   }, [currentPage]);

//   const handlePageChange = (event, page) => {
//     setCurrentPage(page);
//   };

//   return (
//     <>
//       <Navbar search={true} searchPh="Search for an exterminator..." />
//       <div className={styles.container}>
//         {isLoading && (
//           <div style={{ textAlign: "center" }}>
//             <h2>Loading...</h2>
//           </div>
//         )}
//         {!isLoading && exterminators.data.length > 0 && (
//           <>
//             <table className={styles.table} rules="none">
//               <thead>
//                 <tr>
//                   <td>Name</td>
//                   <td>Email</td>
//                   <td>Member since</td>
//                   <td>City</td>
//                   <td>province</td>
//                   <td></td>
//                 </tr>
//               </thead>
//               <tbody>
//                 {exterminators.data.map((exterminator) => (
//                   <tr key={exterminator.id} className={styles.exterminatorRow}>
//                     <td>
//                       <div className={styles.exterminator}>
//                         {/* {console.log(exterminator)} */}
//                         <Image
//                           // src="/noavatar.png"
//                           src={exterminator.imageUrl}
//                           alt=""
//                           width={40}
//                           height={40}
//                           className={styles.exterminatorImage}
//                         />
//                         {exterminator.firstName + " " + exterminator.lastName}
//                       </div>
//                     </td>
//                     <td>{exterminator.email}</td>
//                     <td>{exterminator.memberSince}</td>
//                     <td>{exterminator.city}</td>
//                     <td>{exterminator.province}</td>
//                     <td>
//                       <div className={styles.buttons}>
//                         <Link
//                           href={`/dashboard/exterminator/${exterminator.id}`}
//                         >
//                           <IconButton
//                             className={`${styles.button} ${styles.view}`}
//                             aria-label="View"
//                           >
//                             <MdCreate />
//                           </IconButton>
//                         </Link>
//                         <IconButton
//                           className={`${styles.button} ${styles.delete}`}
//                           aria-label="Delete"
//                         >
//                           <MdDelete color="#dc143c" />
//                         </IconButton>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//             <div className={styles.pagination}>
//               <Pagination
//                 count={Math.ceil(exterminators.data.length / pageSize)}
//                 page={currentPage}
//                 onChange={handlePageChange}
//               />
//             </div>
//           </>
//         )}
//         {!isLoading && exterminators.data.length === 0 && (
//           <div style={{ textAlign: "center" }}>
//             <h2>There are no exterminators yet.</h2>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default ExterminatorsPage;
