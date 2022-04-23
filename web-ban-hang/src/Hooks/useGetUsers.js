// import React, { useContext, useEffect, useState } from 'react';
// import { AuthContext } from '../Context/AuthProvider';
// import firebase from '../Firebase/config';

// export function useGetUsers() {
//     const data = useContext(AuthContext);
//     var db = firebase.firestore();
//     const [users, setUsers] = useState(null);
//     const { id } = data.user;

//     useEffect(() => {
//         const unsubscribe = db
//             .collection('users')
//             .onSnapshot((querySnapshot) => {
//                 const users = [];
//                 querySnapshot.forEach((doc) => {
//                     if (doc.data().id !== id) {
//                         users.push(doc.data());
//                     }
//                 });
//                 setUsers(users);
//             });

//         return unsubscribe;
//     }, [db, id]);

//     return users;
// }
