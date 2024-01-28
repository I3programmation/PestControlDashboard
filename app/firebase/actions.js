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
        // console.log(lastVisible);
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
    const defaultImg = docSnap.data().userType === "admin" ? '/adminAvatar.png' : '/noavatar.png';

    if (docSnap && docSnap.exists()) {
        const imageRef = docSnap.data().image;
        const imageUrl = imageRef ? await getUserImageUrl(docId, imageRef) : defaultImg;
        const data = { id: docId, imageUrl, ...docSnap.data() };
        return data;
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

const getDataStats = async (userType) => {
    if (userType) {
        const totalUsersQuery = query(userRef, where("userType", "==", userType));
        const totalUsers = await getDocs(totalUsersQuery);
        const totalUsersChange = weekChangeAverage(totalUsers.docs);

        const activeUsersQuery = query(userRef, where("userType", "==", userType), where("isActive", "==", true));
        const activeUsers = await getDocs(activeUsersQuery);
        const activeUsersChange = weekChangeAverage(activeUsers.docs);

        const subscriptionsQuery = query(userRef, where("userType", "==", userType), where("subscription", "==", true));
        const subscriptions = await getDocs(subscriptionsQuery);
        const subscriptionsChange = weekChangeAverage(subscriptions.docs);

        return [
            {
                title: userType == "user" ? "Total Users" : "Total Exterminators",
                number: totalUsers.size,
                change: totalUsersChange,
            },
            {
                title: userType == "user" ? "Active Users" : "Active Exterminators",
                number: activeUsers.size,
                change: activeUsersChange,
            },
            {
                title: userType == "user" ? "Inactive Users" : "Inactive Exterminators",
                number: totalUsers.size - activeUsers.size,
                change: totalUsersChange - activeUsersChange,
            },
            {
                title: "Subscriptions",
                number: subscriptions.size,
                change: subscriptionsChange,
            },
        ]
    }

    const totalUsers = await getDocs(query(userRef, where("userType", "==", "user")));
    const totalUsersChange = weekChangeAverage(totalUsers.docs);

    const totalExterminators = await getDocs(query(userRef, where("userType", "==", "exterminator")));
    const totalExterminatorsChange = weekChangeAverage(totalExterminators.docs);

    const AllSubscriptions = await getDocs(query(userRef, where("subscription", "==", true)));
    const AllSubscriptionsChange = weekChangeAverage(AllSubscriptions.docs);
    return [
        {
            title: "Total Users",
            number: totalUsers.size,
            change: totalUsersChange,
        },
        {
            title: "Total Exterminators",
            number: totalExterminators.size,
            change: totalExterminatorsChange,
        },
        {
            title: "All Subscriptions",
            number: AllSubscriptions.size,
            change: AllSubscriptionsChange,
        },
    ]
};

const weekChangeAverage = (dataArray) => {
    const date = new Date();

    // Calculate the start of the current week
    const startOfThisWeek = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay());

    // Calculate the start of the last week
    const startOfLastWeek = new Date(startOfThisWeek);
    startOfLastWeek.setDate(startOfThisWeek.getDate() - 7);

    // Filter data for the current week
    const thisWeekData = dataArray.filter((snapshot) => {
        const created = snapshot.data().created;
        return created && created.toDate() >= startOfThisWeek;
    });

    // Filter data for the last week
    const lastWeekData = dataArray.filter((snapshot) => {
        const created = snapshot.data().created;
        return created && created.toDate() >= startOfLastWeek && created.toDate() < startOfThisWeek;
    });

    // Calculate the difference in the number of users
    const dataDifference = thisWeekData.length - lastWeekData.length;

    // Calculate the percentage change
    const average = (lastWeekData.length !== 0) ? (dataDifference / lastWeekData.length) * 100 : 0;

    return average;
};



export { getUsersByUserType, getUsersWithPagination, getDocumentById, getDataStats }

// Dummy data for Age Distribution
export const ageDistributionData = [
    {
        age: '18-24',
        male: 4000,
        female: 2400,
    },
    {
        age: '25-34',
        male: 3000,
        female: 1398,
    },
    {
        age: '35-44',
        male: 2000,
        female: 1800,
    },
    {
        age: '45-54',
        male: 3780,
        female: 2908,
    },
    {
        age: '55+',
        male: 1890,
        female: 800,
    },
];