"use client";

import Link from "next/link";
import { Tooltip } from "react-tooltip";
import styles from "./menuLink.module.css";
import { usePathname } from "next/navigation";

const MenuLink = ({ title = true, item }) => {
  const pathname = usePathname();

  return (
    <>
      <Link
        href={item.path}
        className={`${styles.container} ${
          pathname === item.path && styles.active
        }`}
        {...(title
          ? {}
          : {
              "data-tooltip-id": "my-tooltip",
              "data-tooltip-place": "right-start",
              "data-tooltip-content": item.title,
            })}
      >
        {item.icon}
        {title && item.title}
      </Link>
      <Tooltip
        style={{ padding: ".3rem .6rem", borderRadius: ".2rem", backgroundColor: "#123d04" }}
        id="my-tooltip"
      />
    </>
  );
};

export default MenuLink;
