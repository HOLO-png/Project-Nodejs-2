import React, { useContext, useEffect, useState } from 'react';
import Moment from 'moment';
import firebase from '../Firebase/config';

export function useGetMessage(uid) {
    var db = firebase.firestore();
    const [messageArray, setMessageArray] = useState(null);

    useEffect(() => {
        const unsubscribe = db
            .collection('conversations')
            .onSnapshot((querySnapshot) => {
                const messageArray = [];
                querySnapshot.forEach((doc) => {
                    if (
                        doc.data().user_uid_2 === uid ||
                        doc.data().user_uid_1 === uid
                    ) {
                        messageArray.push(doc.data());
                    }
                });
                const sortedArray = messageArray.sort(
                    (a, b) =>
                        new Moment(a.created).format('YYYYMMDD HH:mm:ss') -
                        new Moment(b.created).format('YYYYMMDD HH:mm:ss'),
                );

                setMessageArray(sortedArray);
            });
        return unsubscribe;
    }, [db, uid]);

    return messageArray;
}
