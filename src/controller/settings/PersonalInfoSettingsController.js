import { useRoute } from "@react-navigation/native";

import { PersonalInfoSettings } from "../../screens/main/Settings/PersonalInfoSettings";

const PersonalInfoSettingsController = () =>{

    const route = useRoute();

    return(

        <>
            {
                route.params.userData

                    ?
                        <PersonalInfoSettings userData={userData}></PersonalInfoSettings>

                    :
                        null
            }
        </>

    );
}

export default PersonalInfoSettingsController;