import { useEffect, useReducer, useState } from "react";
import ChatsSettings from "../../screens/main/Settings/ChatsSettings";

import * as SecureStore from 'expo-secure-store';


const ChatsSettingsController = () =>{

    const [activeReadConfirmation, setActiveReadConfirmation] = useState(false);

    const [state, dispatch] = useReducer(
        (prevState, action) => {
          switch (action.type) {
            case 'READ_CONFIRMATION':
                SecureStore.setItemAsync("readConfirmation", action.readConfirmation);
              return {
                ...prevState,
                readConfirmation: action.readConfirmation
              };
          }
        }, {
    
          readConfirmation: false
        }
      );
    
      useEffect(() => {
        // Fetch the token from storage then navigate to our appropriate place
        const bootstrapAsync = async () => {
    
          let readConfirmation
    
          try {
            readConfirmation = await SecureStore.getItemAsync('readConfirmation');
          } catch (e) {
            // Restoring token failed
          }
    
          // After restoring token, we may need to validate it in production apps
    
          // This will switch to the App screen or Auth screen and this loading
          // screen will be unmounted and thrown away.

          console.log(readConfirmation)

          if(readConfirmation === "false"){

            setActiveReadConfirmation(false);

          }else{

            setActiveReadConfirmation(true);

          }
          dispatch({ type: 'READ_CONFIRMATION', readConfirmation: readConfirmation });
        };
    
        bootstrapAsync();
      }, []);

      const saveChanges = () =>{

        dispatch({type: 'READ_CONFIRMATION', readConfirmation: activeReadConfirmation.toString()});
        console.log(activeReadConfirmation)
      }

    return(

        <ChatsSettings 

            saveChanges={saveChanges}

            setActiveReadConfirmation={setActiveReadConfirmation}
            activeReadConfirmation={activeReadConfirmation}

        ></ChatsSettings>
    )


    
}

export default ChatsSettingsController;