import {   
    ToastAndroid, 
    Dimensions
} from "react-native";

function showWithGravityAndOffset(msg){
    return ToastAndroid.showWithGravityAndOffset(
        msg,
        ToastAndroid.LONG,
        ToastAndroid.CENTER,
        Dimensions.get("window").height /4,
        Dimensions.get("window").width /16,
        
    );
};

export {
    showWithGravityAndOffset
}