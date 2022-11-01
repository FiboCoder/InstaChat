import React from "react";
import AnimatedLottieView from "lottie-react-native"
import { StyleSheet, View } from "react-native";

const LoadingBar = () =>{

    return(

        <View style={[StyleSheet.absoluteFillObject, styles.container]}>
            <AnimatedLottieView autoPlay loop source={require("../../assets/animated/loading.json")}></AnimatedLottieView>
        </View>
    )
}

const styles = StyleSheet.create({

    container:{

        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.3)",
        zIndex: 1
    }
});
export default LoadingBar;