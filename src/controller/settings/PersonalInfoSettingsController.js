import { useRoute } from "@react-navigation/native";
import { useState } from "react";
import { User } from "../../model/User";

import { PersonalInfoSettings } from "../../screens/main/Settings/PersonalInfoSettings";

const PersonalInfoSettingsController = (props) =>{

    const route = useRoute();

    const [isVisible, setIsVisible] = useState(false);
    const [isVisibleReq, setIsVisibleReq] = useState(false);

    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");

    const [error, setError] = useState("");

    const updatePassword = () =>{

        setIsVisible(true);

    }

    const changePassword = () =>{

        if(newPassword != ""){

            if(confirmNewPassword != ""){

                if(confirmNewPassword == newPassword){

                    User.changePassword(newPassword).then(result=>{

                        if(result != undefined && result.includes("auth/requires-recent-login")){

                            setIsVisible(false);
                            setIsVisibleReq(true);
                            setNewPassword("");
                            setConfirmNewPassword("");
                            setError("");
                        }else{

                            setIsVisible(false);
                            setIsVisibleReq(false);
                            setNewPassword("");
                            setConfirmNewPassword("");
                            setError("");
                        }
                    });
                }else{

                    setError("As senhas digitas não correspondem.");
                }
            }else{

                setError("Confirme a nova senha.");
            }
        }else{

            setError("Digite a nova senha.");
        }
    }

    return(

        <>
            {
                route.params.userData

                    ?
                        <PersonalInfoSettings 

                            userData={route.params.userData}
                            updatePassword={updatePassword}
                            signOut={props.signOut}
        
                            isVisible={isVisible}
                            isVisibleReq={isVisibleReq}
                            error={error}

                            setIsVisible={setIsVisible}
                            setIsVisibleReq={setIsVisibleReq}
                            setNewPassword={setNewPassword}
                            setConfirmNewPassword={setConfirmNewPassword}
                            
                            newPassword={newPassword}
                            confirmNewPassqord={confirmNewPassword}
                            
                            changePassword={changePassword}
                            >


                        </PersonalInfoSettings>

                    :
                        null
            }
        </>

    );
}

export default PersonalInfoSettingsController;