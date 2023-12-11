import Image from "next/image";
import styles from "./subscriptions.module.css";

const Subscriptions = () => {
  const USERS = [
    {
      name: "Hadi Fel",
      type: "exterminator",
      created: "09 Dec 2023",
      signedIn: "10 Dec 2023",
    },
    {
      name: "John Doe",
      type: "user",
      created: "01 Dec 2023",
      signedIn: "10 Dec 2023",
    },
    {
      name: "Zack Bass",
      type: "user",
      created: "01 Dec 2023",
      signedIn: "10 Dec 2023",
    },
    {
      name: "Nick Bell",
      type: "exterminator",
      created: "01 Dec 2023",
      signedIn: "10 Dec 2023",
    },
  ];
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Latest Subscriptions</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>User</td>
            <td>Type</td>
            <td>Created</td>
            <td>Signed in</td>
          </tr>
        </thead>
        <tbody>
          {USERS.map((item) => (
            <>
              <tr>
                <td>
                  <div className={styles.user}>
                    <Image
                      src="/noavatar.png"
                      alt=""
                      width={40}
                      height={40}
                      className={styles.userImage}
                    />
                    {item.name}
                  </div>
                </td>
                <td>
                  <span
                    className={`${styles.type} ${
                      item.type === "user"
                        ? styles.userType
                        : styles.exterminatorType
                    }`}
                  >
                    {item.type}
                  </span>
                </td>
                <td>{item.created}</td>
                <td>{item.signedIn}</td>
              </tr>
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Subscriptions;
