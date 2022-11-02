import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { User } from "../../../model/User";
import { PersonalInfoSettings } from "../../../screens/main/Settings/PersonalInfoSettings";

const PersonalInfoSettingsController = (props) =>{

    const route = useRoute();

    const [isVisible, setIsVisible] = useState(false);
    const [isVisibleReq, setIsVisibleReq] = useState(false);

    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const changePassword = () =>{

        if(newPassword != ""){

            if(confirmNewPassword != ""){

                if(confirmNewPassword == newPassword){

                    setLoading(true);

                    User.changePassword(newPassword).then(result=>{

                        console.log(result)
                        if(result != undefined && result.toString().includes("auth/requires-recent-login")){

                            setLoading(false);
                            setIsVisible(false);
                            setIsVisibleReq(true);
                            setNewPassword("");
                            setConfirmNewPassword("");
                            setError("");
                            
                        }else{

                            setLoading(false);
                            setIsVisible(false);
                            setIsVisibleReq(false);
                            setNewPassword("");
                            setConfirmNewPassword("");
                            setError("");
                            setTimeout(()=>{

                                setSuccess(true)
                            }, 500);
                        }
                    }).catch(err=>{

                        setLoading(false);
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

    useEffect(()=>{


        if(success == true){

            setTimeout(()=>{

                setSuccess(false);
            }, 2000);
        }
    }, [success])

    return(

        <>
            {
                route.params.userData

                    ?
                        <PersonalInfoSettings 

                            userData={route.params.userData}
                            signOut={props.signOut}
        
                            isVisible={isVisible}
                            isVisibleReq={isVisibleReq}
                            error={error}
                            loading={loading}
                            success={success}

                            setIsVisible={setIsVisible}
                            setIsVisibleReq={setIsVisibleReq}
                            setNewPassword={setNewPassword}
                            setConfirmNewPassword={setConfirmNewPassword}
                            
                            newPassword={newPassword}
                            confirmNewPassword={confirmNewPassword}
                            
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