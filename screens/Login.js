import { useState, useEffect } from 'react';
import { 
    Text, 
    View,
    StyleSheet,
    TextInput,
    Pressable,
    Alert 
} from "react-native";
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { GlobalStyles } from '../constants/styles';
import { setUserData } from '../redux/auth'; 
import { loginService } from '../services/index'

function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();  

    const handleLogin = async()=>{  
        if(email.length < 1){
            Alert.alert(
                "Aviso!",
                "Ingrese un usuario valido",
                [
                  { 
                  },
                  { text: "OK", onPress: () => {}}
                ]
              );
            return;
        }
        if(password.length < 1){
            Alert.alert(
                "Aviso!",
                "Ingrese la contraseña",
                [
                  { 
                  },
                  { text: "OK", onPress: () => {}}
                ]
              );
            return;
        }

        try { 
            const response =  await loginService(email, password);
            if(!response.error){ 
                const data = JSON.stringify(response.data)
                await AsyncStorage.setItem('userData', data); 
                dispatch(setUserData(response.data));
            }else{ 
                if(response.error.response.status === 404){
                    Alert.alert(
                        "Aviso!",
                        response.error.response.data.error,
                        [
                          { 
                          },
                          { text: "OK", onPress: () => {}}
                        ]
                    );
                }else{
                    alert(response.error)
                } 
            }
        } catch (error) {
            alert(error) 
        }
    }

    return (
        <View style={styles.mainContainer}>
            <View style={styles.inputContainer}>
                <Text style={styles.text}>Usuario:</Text>
                <TextInput
                    style={styles.input}  
                    keyboardType="email-address" 
                    onChangeText={newText => setEmail(newText)}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.text}>Contraseña:</Text>
                <TextInput
                    secureTextEntry={true}
                    style={styles.input}
                    passwordRules={true}  
                    keyboardType="default" 
                    onChangeText={newText => setPassword(newText)}
                />
            </View>
            <View style={styles.inputContainer}>
                <Pressable
                    style={({ pressed }) => [styles.button, pressed && styles.pressed]}
                    onPress={handleLogin}
                    >
                    <View>
                        <Text style={styles.buttonText}>Iniciar Sesion</Text>
                    </View>
                </Pressable>
            </View>
        </View>
    )

}

export default Login;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center', 
    },
    text:{ 
        color: GlobalStyles.colors.primary1,
        fontSize:17,
        fontWeight: '700',
        marginBottom: 4
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
        fontSize: 18,
        borderColor: GlobalStyles.colors.primary1,
        borderWidth: 2,
        color: GlobalStyles.colors.primary1
    },
    button: {
        marginTop: 10,
        borderRadius: 15,
        height: 45,
        paddingTop: 10,
        paddingHorizontal: 12,
        backgroundColor: GlobalStyles.colors.primary1,
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