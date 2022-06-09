import { useState, useEffect } from 'react';
import { 
    Text, 
    Pressable, 
    StyleSheet,
    View, 
} from "react-native";
import { Ionicons } from '@expo/vector-icons'
import { useSelector, useDispatch } from 'react-redux';

import { openModalQr } from '../../redux/placesVerifications'

import { GlobalStyles } from '../../constants/styles';


function ButtonQr ({ title }) { 
    const dispatch = useDispatch(); 
    
    const showModal =()=>{
        dispatch(openModalQr(true));
    } 

    return (  
        <View style={styles.buttonContainer}>
            <Pressable
                style={({ pressed }) => [styles.button, pressed && styles.pressed]}
                onPress={showModal}
            >
                <View style={{flexDirection: 'row', alignSelf: 'center', marginTop: 12, }}>
                    <Ionicons name="qr-code-outline" size={24} color={GlobalStyles.colors.primary2} />  
                    <Text style={styles.buttonText}>{title}</Text>
                </View>
            </Pressable>
        </View>  
    );
}


const styles = StyleSheet.create({
    buttonContainer:{
        height: 52, 
        borderStyle: "solid",
        borderColor: GlobalStyles.colors.primary2,
        borderWidth: 1,
        color: 'white',
        borderRadius: 15, 
        width: '80%'  
    },
    button: { 
        height: 52,
        borderRadius: 15,   
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    pressed: {
        opacity: 0.7,
        backgroundColor: GlobalStyles.colors.primary2
    },
    buttonText: { 
        marginLeft: 5, 
        textAlign: 'center',
        color: GlobalStyles.colors.primary2,
        fontSize: 16
    },
    iconContainer:{
        flex:1, 
        justifyContent: 'center', 
        alignContent: 'center', 
        alignItems: 'center'
    }
})

export default ButtonQr;