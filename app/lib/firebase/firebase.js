import { initializeApp, getApps, getApp } from "firebase/app";
import {
    getFirestore,
    collection,
    getDocs,
    getDoc,
    setDoc,
    updateDoc,
    doc,
    deleteDoc,
    query,
    where,
    addDoc,
    startAfter
} from "firebase/firestore";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendEmailVerification,
    sendPasswordResetEmail,
    deleteUser,
    GoogleAuthProvider,
    initializeAuth,
    getReactNativePersistence,
    signOut,
    verifyBeforeUpdateEmail,
    updatePassword,
    getAuth,
} from "firebase/auth";
// import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import {
    getStorage,
    ref,
    getDownloadURL,
    deleteObject,
} from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCvHXdyWX30YaqY0ssfQ28Pk8QFfx2ISGY",
    authDomain: "pestcontrol-9048b.firebaseapp.com",
    projectId: "pestcontrol-9048b",
    storageBucket: "pestcontrol-9048b.appspot.com",
    messagingSenderId: "363532359440",
    appId: "1:363532359440:web:730a9617773dd330cbb795",
};

// Initialize Firebase
let app, auth;

if (!getApps().length) {
    try {
        app = initializeApp(firebaseConfig);
        auth = getAuth(app);
    } catch (error) {
        console.log("Error initializing app: ", error);
    }
} else {
    app = getApp();
    auth = getAuth(app);
}

const db = getFirestore(app);
const storage = getStorage(app);

const userRef = collection(db, "users");
const commentRef = collection(db, "comments");
const provider = new GoogleAuthProvider();
auth.useDeviceLanguage();
provider.addScope("https://www.googleapis.com/auth/userinfo.profile");


const createNewUser = async (user, password) => {
    let success = await createUserWithEmailAndPassword(auth, user.email, password)
        .then((cred) => {
            // Signed up

            sendEmailVerification(auth.currentUser);

            if (createUserDB(user, cred.user.uid)) {
                return true;
            } else {
                return false;
            }
        })
        .catch((error) => {
            console.log(error.code);
        });

    return success;
};

const loginUser = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const userType = await getCurrentUserType()
        console.log(userType)
        return userCredential;
    } catch (error) {
        const errorCode = error.code;
        console.log(errorCode);
    }
};


// const loginUser = async (email, password) => {
//   let success = await signInWithEmailAndPassword(auth, email, password)

//   // const user = userCredential.user;
//   // const userDocRef = doc(db, "users", user.uid);
//   // const userDocSnapshot = await (async () => {
//   //   return await getDoc(userDocRef);
//   // })();

//   // if (userDocSnapshot.exists()) {
//   //   const userType = userDocSnapshot.data().userType;
//   //   console.log(userType);

//   // } else {
//   //   console.log("User document not found");
//   // }
//     .then((userCredential) => {
//     return true;
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     console.log(errorCode);
//   });

// return success;
// };

const logOutUser = () => {
    signOut(auth).catch((e) => console.log(e));
};

const loginUserGoogle = () => {
    //signInWithRedirect(auth, provider);
    // getRedirectResult(auth)
    //     .then((result) => {
    //         // This gives you a Google Access Token. You can use it to access Google APIs.
    //         const credential = provider.credentialFromResult(result);
    //         const token = credential.accessToken;
    //         // The signed-in user info.
    //         const user = result.user;
    //         // IdP data available using getAdditionalUserInfo(result)
    //         // ...
    //         console.log(result)
    //     }).catch((error) => {
    //         // Handle Errors here.
    //         const errorCode = error.code;
    //         const errorMessage = error.message;
    //         // The email of the user's account used.
    //         const email = error.customData.email;
    //         // The AuthCredential type that was used.
    //         const credential = provider.credentialFromError(error);
    //         // ...
    //     });
};

//Add user to the "users" collection in firestore db
const createUserDB = async (user, uid) => {
    try {
        await setDoc(doc(userRef, uid), user);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
};

const resetPassword = (email) => {
    sendPasswordResetEmail(auth, email)
        .then(() => {
            // Password reset email sent!
            // ..
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
        });
};

const changePassword = async (newPassword) => {
    return updatePassword(auth.currentUser, newPassword)
        .then(() => {
            // Update successful.
            return true;
        })
        .catch((error) => {
            // An error ocurred
            console.log(error);
            return false;
        });
};

const getUsers = async () => {
    const querySnapshot = await getDocs(userRef);
    let users = [];

    querySnapshot.forEach((doc) => {
        users.push(doc.data());
    });

    return users;
};

const updateUserDB = async (user, userId) => {
    let response = await updateDoc(doc(userRef, userId), user)
        .then(() => true)
        .catch((e) => console.log(e));

    return response;
};

const deleteUserDB = async (userId) => {
    try {
        await deleteDoc(doc(userRef, userId)).then(deleteUser(auth.currentUser));
    } catch (e) {
        console.log(e);
    }
};

const updateEmailDB = async (email) => {
    sendEmailVerification(auth.currentUser);

    let res = await verifyBeforeUpdateEmail(auth.currentUser, email, null)
        .then(() => {
            // Email updated!
            return true;
        })
        .catch((error) => {
            // An error occurred
            console.log(error);
            return false;
        });

    return res;
};

const updateImageDB = async (imageRef, userId) => {
    let response = await updateDoc(doc(userRef, userId), { image: imageRef })
        .then(() => true)
        .catch((e) => console.log(e));

    return response;
};

const getProfileImageUrl = async (refImage) => {
    const userId = auth.currentUser.uid;
    const parentRef = ref(storage, `user/${userId}/profileImage`);

    try {
        let imgUrl = await getDownloadURL(ref(parentRef, refImage))
            .then((url) => {
                if (url) return url;
                else return null;
            })
            .catch((e) => console.log("Errors while downloading => ", e));

        return imgUrl;
    } catch (e) {
        console.log(e);
    }
};

const getUserImageUrl = async (userId, refImage) => {
    const parentRef = ref(storage, `user/${userId}/profileImage`);
    // console.log("id " + userId);
    if (typeof refImage === "string" && refImage.length > 0) {
        const imageUrl = await getDownloadURL(ref(parentRef, refImage));
        return imageUrl;
    } else {
        return '/noavatar.png';
    }
};



const getExterminatorImage = async (email, refImage) => {
    const userId = await getUserIdByEmail(email);
    const parentRef = ref(storage, `user/${userId}/profileImage`);

    try {
        let imgUrl = await getDownloadURL(ref(parentRef, refImage))
            .then((url) => {
                if (url) return url;
                else return null;
            })
            .catch((e) => console.log("Errors while downloading => ", e));

        return imgUrl;
    } catch (e) {
        console.log(e);
    }
};

const getUserIdByEmail = async (email) => {
    const querySnapshot = await getDocs(
        query(userRef, where("email", "==", email))
    );

    let userId;

    querySnapshot.forEach((doc) => {
        userId = doc.id;
    });

    return userId;
};

const deleteProfileImage = (refImage) => {
    const userId = auth.currentUser.uid;
    const parentRef = ref(storage, `user/${userId}/profileImage`);

    // Delete the file
    deleteObject(ref(parentRef, refImage))
        .then(() => {
            // File deleted successfully
        })
        .catch((error) => {
            console.log(error);
        });
};

const getUsersByUserType = async (userType) => {
    try {
        const q = query(userRef, where("userType", "==", userType));
        const querySnapshot = await getDocs(q);

        const users = [];
        await Promise.all(querySnapshot.docs.map(async (doc) => {
            const imgRef = doc.data().image;
            const imageUrl = await getUserImageUrl(doc.id, imgRef);
            // console.log(imageUrl)
            users.push({ id: doc.id, imageUrl, ...doc.data() });
        }));
        return users;
    } catch (error) {
        console.error("Error getting users by user type:", error);
        throw error;
    }
};


// get users results
const getUsersByUserTypePaginated = async (userType, pageSize = 10, startAfterDoc = null) => {
    try {
        let baseQuery = query(userRef, where("userType", "==", userType));

        if (startAfterDoc) {
            baseQuery = query(userRef, where("userType", "==", userType), startAfter(startAfterDoc));
        }

        const querySnapshot = await getDocs(baseQuery.limit(pageSize));

        const users = [];
        await Promise.all(querySnapshot.forEach(async (doc) => {
            const imgRef = doc.data().image;
            const imageUrl = await getUserImageUrl(doc.id, imgRef);
            users.push({ id: doc.id, imageUrl, ...doc.data() });
        }));

        return {
            data: users,
            nextPage: querySnapshot.docs.length === pageSize
                ? querySnapshot.docs[querySnapshot.docs.length - 1]
                : null,
        };
    } catch (error) {
        console.error("Error getting users by user type:", error);
        throw error;
    }
};












const getUser = async () => {
    const docRef = doc(userRef, auth.currentUser.uid);
    const docSnap = await getDoc(docRef);
    let user;

    if (docSnap.exists()) {
        user = docSnap.data();
    } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
    }

    return user;
};

const getCurrentUserType = async () => {
    try {
        const currentUser = await getUser();
        if (currentUser) {
            return currentUser.userType;
        } else {
            console.log("User not found.");
            return null;
        }
    } catch (error) {
        console.error("Error getting current user type:", error);
        return null;
    }
};

//Add comment to the "comments" collection in firestore db
const createCommentDB = async (comment) => {
    try {
        const docRef = await addDoc(commentRef, comment);

        const response = await updateDoc(doc(commentRef, docRef.id), {
            id: docRef.id
        })
            .then(() => true)
            .catch((e) => console.log(e));

        return response;
    } catch (e) {
        console.error("Error adding document: ", e);
    }
};

const getCommentsByExterminatorEmail = async (exterminatorEmail) => {
    const querySnapshot = await getDocs(
        query(commentRef, where("exterminatorEmail", "==", exterminatorEmail))
    );

    let comments = [];

    querySnapshot.forEach((doc) => {
        comments.push(doc.data());
    });

    return comments;
};

const getDocumentById = async (collectionName, docId) => {
    const docSnap = await getDoc(doc(db, collectionName, docId));
    // const imageUrl = await getUserImageUrl(docId, docSnap.data().image);
    // console.log(docSnap.data().image);
    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        console.log("No such document!");
    }
}

const updateRating = async (userId, user, newRating) => {
    const comments = await getCommentsByExterminatorEmail(user?.email)
    let rating;

    if (comments.length > 0)
        rating = (user?.rating + newRating) / comments.length;
    else
        rating = newRating;

    const response = await updateDoc(doc(userRef, userId), { rating: parseFloat(rating.toFixed(1)) })
        .then(() => true)
        .catch((e) => console.log(e));

    return response;
}

export {
    getUsers,
    getUsersByUserType,
    getUsersByUserTypePaginated,
    updateUserDB,
    deleteUserDB,
    createNewUser,
    loginUser,
    resetPassword,
    auth,
    getUser,
    loginUserGoogle,
    storage,
    getProfileImageUrl,
    deleteProfileImage,
    updateEmailDB,
    updateImageDB,
    changePassword,
    logOutUser,
    getExterminatorImage,
    getCurrentUserType,
    getUserIdByEmail,
    createCommentDB,
    getCommentsByExterminatorEmail,
    getDocumentById,
    updateRating
};

// DUMMY DATA

export const cards = [
    {
        id: 1,
        title: "Total Users",
        number: 10.928,
        change: 12,
    },
    {
        id: 2,
        title: "Total Exterminators",
        number: 8.236,
        change: -2,
    },
    {
        id: 3,
        title: "Subscriptions",
        number: 6.642,
        change: 18,
    },
];