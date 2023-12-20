// import { updateUser } from "@/app/lib/actions";
// import { fetchUser } from "@/app/lib/data";
import { getDocumentById } from "@/app/lib/firebase/firebase";
import styles from "@/app/ui/dashboard/users/singleUser/singleUser.module.css";
import { FormControl, TextField } from "@mui/material";
import Image from "next/image";

const SingleExterminatorPage = async ({ params }) => {
  const { id } = params;
    const user = await getDocumentById("users", id);

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image src={user.img || "/noavatar.png"} alt="" fill />
        </div>
        {user.firstName+" "+user.lastName}
      </div>
      <div className={styles.formContainer}>
        {/* <form action={updateUser} className={styles.form}> */}
        <form className={styles.form}>
          <input type="hidden" name="id" value={user.id} />
          <FormControl>
            <TextField
              id="firstName"
              label="First Name"
              defaultValue={user.firstName}
            />
          </FormControl>
          <FormControl>
            <TextField
              id="firstName"
              label="First Name"
              defaultValue={user.lastName}
            />
          </FormControl>
          <FormControl>
            <TextField
              id="username"
              label="Email"
              type="email"
              defaultValue={user.email}
            />
          </FormControl>
          <FormControl>
            <TextField
              id="password"
              label="Password"
              type="password"
              defaultValue=""
            />
          </FormControl>
          <FormControl>
            <TextField id="phone" label="Phone" defaultValue={user.phone} />
          </FormControl>
          <label>Password</label>
          <input type="password" name="password" />
          <label>Phone</label>
          <input type="text" name="phone" placeholder={user.phone} />
          <label>Address</label>
          <textarea type="text" name="address" placeholder={user.address} />
          <label>Is Admin?</label>
          <select name="isAdmin" id="isAdmin">
            <option value={true} selected={user.isAdmin}>
              Yes
            </option>
            <option value={false} selected={!user.isAdmin}>
              No
            </option>
          </select>
          <label>Is Active?</label>
          <select name="isActive" id="isActive">
            <option value={true} selected={user.isActive}>
              Yes
            </option>
            <option value={false} selected={!user.isActive}>
              No
            </option>
          </select>
          <button>Update</button>
        </form>
      </div>
    </div>
  );
};

export default SingleExterminatorPage;
