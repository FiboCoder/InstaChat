import { doc, onSnapshot, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import Settings from "../../../screens/main/Settings/Settings";
import { db } from "../../../utils/firebase";

const SettingsController = (props) =>{

    const [userData, setUserData] = useState();

    useEffect(()=>{

        const userRef = query(doc(db, "users", props.meEmail));
        const settingsSnapshot = onSnapshot(userRef, (userData)=>{

            if(!userData.empty){

                setUserData(userData);

            }
        });

        return ()=>{

            console.log("cleaning");
            settingsSnapshot();
            console.log("cleaned");
        }
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