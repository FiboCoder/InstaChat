import { ImageBackground, View } from "react-native";

const Splash = () =>{

    return(

        <View>
            <ImageBackground resizeMode="center" source={{uri: "../../../assets/images/backgroud.png"}}/>
        </View>
    );
}

export default Splash;