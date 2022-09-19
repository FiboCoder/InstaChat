import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import Settings from "../../screens/main/Settings/Settings";
import { auth, db } from "../../utils/firebase";

const SettingsController = () =>{

    const [userData, setUserData] = useState();

    useEffect(()=>{

        onAuthStateChanged(auth, (user)=>{

            const userRef = query(doc(db, "users", user.email));
            onSnapshot(userRef, (userData)=>{

                setUserData(userData);
            });
        });
    },[]);

    return(

        <>
            {
                userData
            
                ?
                    <Settings userData={userData}></Settings>

                :
                    null
            }
        </>

    );
}

export default SettingsController;