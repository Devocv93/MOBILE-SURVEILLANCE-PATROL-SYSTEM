import { useState, useEffect } from 'react';
import { 
    Text, 
    View,
    StyleSheet,
    TextInput,
    Pressable,
    Alert 
} from "react-native";

import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
 
import { setUserData, clearUserData } from '../redux/auth';

import { GlobalStyles } from '../constants/styles';

function Profile(){
    const dispatch = useDispatch();
    const [user, setUser] = useState('')
    const autenticated = useSelector((state) => state.auth.userData );
    const { usuario: { email }  } = autenticated;
   

    const handleLogOut = async()=>{
        await AsyncStorage.removeItem('userData');
        dispatch(clearUserData())
    } 

    return (
        <View style={styles.mainContainer}>
                <Text style={styles.text}>{email}</Text>
                <Pressable
                    style={({ pressed }) => [styles.button, pressed && styles.pressed]}
                    onPress={handleLogOut}
                    >
                    <View>
                        <Text style={styles.buttonText}>Cerrar Sesion</Text>
                    </View>
                </Pressable>
            </View>
    )

}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center', 
    },
    text:{ 
        color: GlobalStyles.colors.primary1,
        fontSize:17,
        fontWeight: '700',
        marginVertical: 10
    },
    inputContainer:{
        marginTop: 4,
        marginBottom: 8,
        width: '80%',
    },
    input:{  
        paddingVertical: 8,
        paddingHorizontal: 10, 
        borderRadius: 20,
        fontSize: 16,
        borderColor: GlobalStyles.colors.primary1,
        borderWidth: 2,
        color: GlobalStyles.colors.primary1
    },
    button: {
        marginTop: 10, 
        paddingVertical: 10,
        width: '100%', 
        paddingHorizontal: 12,
        backgroundColor: GlobalStyles.colors.primary3,
        elevation: 2,
        shadowColor: 'black',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      pressed: {
        opacity: 0.7,
      },
      buttonText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
      },
  });

export default Profile;

