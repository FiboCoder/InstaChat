import { StyleSheet, Text, View } from "react-native";

const MessageBar = (props) =>{

    return(

        <View style={[styles.container, {backgroundColor: props.backgroundColor}]}>
            <Text style={styles.message}>{props.message}</Text>
        </View>
    )
}
const styles = StyleSheet.create({

    container:{

        position: "absolute",
        bottom: 0,
        width: "100%",
        paddingTop: 10,
        paddingBottom: 12,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 6
    },
    message:{

        fontSize: 16,
        fontWeight: "700",
        color: "white"
    }
});
export default MessageBar;