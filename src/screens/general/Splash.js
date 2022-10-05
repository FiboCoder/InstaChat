import { Image, ImageBackground, StyleSheet, View } from "react-native";

const Splash = () =>{

    return(

        <View style={styles.container}>
            <Image style={styles.image} width='100%' height='100%' resizeMode="cover" source={require('../../../assets/images/background.png')}/>
        </View>
    );
}

const styles = StyleSheet.create({

    container:{

        flex: 1
    },

    image:{

        width: '100%',
        height: '100%'
    }
});

export default Splash;