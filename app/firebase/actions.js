import { query, where, getDocs, getDoc, doc, startAfter, limit, endBefore, limitToLast, startAt, orderBy } from 'firebase/firestore';
import { ref, getDownloadURL } from 'firebase/storage';
import { userRef, storage, db } from '@/app/firebase/config'


const getUsersByUserType = async (userType) => {
    try {
        const q = query(userRef, where("userType", "==", userType));
        const querySnapshot = await getDocs(q);

        const users = [];
        await Promise.all(querySnapshot.docs.map(async (doc) => {
            const imageRef = doc.data().image;
            const imageUrl = await getUserImageUrl(doc.id, imageRef);
            users.push({ id: doc.id, imageUrl, ...doc.data() });
        }));
        return users;
    } catch (error) {
        console.error("Error getting users by user type:", error);
        throw error;
    }
};

const allDatabyUserType = async (userType) => {
    const baseQuery = query(userRef, where("userType", "==", userType));
    const allDocsCount = await getDocs(baseQuery);
    return {
        allDocs: allDocsCount,
        allDocsCount: allDocsCount.size,
    };
};

// const getUsersWithPagination = async (userType, page, pageSize, lastVisible) => {
//     try {
//         // const baseQuery = query(userRef, where("userType", "==", userType), orderBy("createdAt"));
//         const baseQuery = query(userRef, where("userType", "==", userType));

//         let querySnapshot;
//         let dataSize;
//         if (page === 1) {
//             querySnapshot = await getDocs(query(baseQuery));
//             dataSize = Math.ceil(querySnapshot.size / pageSize);
//         } else {
//             querySnapshot = await getDocs(query(baseQuery, startAfter(lastVisible), limit(pageSize)));
//         }

//         // const querySnapshot = await getDocs(query(baseQuery));

//         const users = [];
//         await Promise.all(querySnapshot.docs.map(async (doc) => {
//             const imageRef = doc.data().image;
//             const imageUrl = await getUserImageUrl(doc.id, imageRef);
//             users.push({ id: doc.id, imageUrl, ...doc.data() });
//         }));
//         // Update lastVisible for the next page
//         const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];

//         return {
//             data: users,
//             dataSize: dataSize || 0,
//             lastDoc: lastDoc,
//         };
//     } catch (error) {
//         console.error("Error getting paginated users by user type:", error);
//         throw error;
//     }
// };

const getUsersWithPagination = async (userType, page, pageSize, lastVisible) => {
    // Calculate the total number of pages based on the total number of documents.
    const data = await allDatabyUserType(userType);
    const pagesCount = Math.ceil(data.allDocsCount / pageSize);

    try {
        // const baseQuery = query(userRef, where("userType", "==", userType), orderBy("created_at"));
        const baseQuery = query(userRef, where("userType", "==", userType));

        let queryToFetch = baseQuery;

        // If not on the first or last page, use startAfter
        console.log(lastVisible);
        if (page > 1) {
            queryToFetch = query(baseQuery, startAfter(lastVisible), limit(pageSize));
        } else {
            queryToFetch = query(baseQuery, limit(pageSize));
        }

        const querySnapshot = await getDocs(queryToFetch);

        const users = [];
        await Promise.all(querySnapshot.docs.map(async (doc) => {
            const imageRef = doc.data().image;
            const imageUrl = await getUserImageUrl(doc.id, imageRef);
            users.push({ id: doc.id, imageUrl, ...doc.data() });
        }));

        // Update lastVisible for the next page9
        // const lastDoc = pagesCount === page ? data.allDocs[((page - 1) * pageSize) - 1] : querySnapshot.docs[querySnapshot.docs.length - 1];
        const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];

        return {
            data: users,
            lastDoc: lastDoc,
            pagesCount: pagesCount
        };
    } catch (error) {
        console.error("Error getting paginated users by user type:", error);
        throw error;
    }
};





const getDocumentById = async (collectionName, docId) => {
    const docSnap = await getDoc(doc(db, collectionName, docId));
    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        console.log("No such document!");
    }
}

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

export { getUsersByUserType, getUsersWithPagination,  getDocumentById }
export const cards = [
    {
        id: 1,
        title: "Total Truckers",
        number: 10.928,
        change: 12,
    },
    {
        id: 2,
        title: "Total Companies",
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