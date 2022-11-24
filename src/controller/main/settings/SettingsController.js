import { doc, onSnapshot, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import Settings from "../../../screens/main/Settings/Settings";
import { db } from "../../../utils/firebase";

const SettingsController = (props) =>{

    const [userData, setUserData] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(()=>{

        setLoading(true);

        const userRef = query(doc(db, "users", props.meEmail));
        const settingsSnapshot = onSnapshot(userRef, (userData)=>{

            if(!userData.empty){

                setUserData(userData);
                setLoading(false);
            }
        });

        return ()=>{

            settingsSnapshot();
        }
    },[]);

    return(

        <>
            {
                userData
            
                ?
                    <Settings userData={userData} loading={loading}></Settings>

                :
                    null
            }
        </>

    );
}

export default SettingsController;