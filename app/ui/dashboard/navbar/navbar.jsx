"use client";

import { usePathname } from "next/navigation";
import styles from "./navbar.module.css";
import { MdSearch } from "react-icons/md";
import FilterIcon from "../../icons/FilterIcon";

const Navbar = ({ search = false }) => {
  const pathname = usePathname();
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        {pathname.split("/").pop().replace(/-/g, " ")}
      </div>
      {search && (
        <div className={styles.menu}>
          <FilterIcon size="40" />
          <div className={styles.search}>
            <MdSearch />
            <input
              type="text"
              placeholder="Search..."
              className={styles.input}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
