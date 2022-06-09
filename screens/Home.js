import { useState, useEffect } from 'react';
import { 
    Text, 
    Pressable,
    SafeAreaView,  
    StyleSheet,
    View, 
    Alert,
    Button
} from "react-native";
import {Picker} from '@react-native-picker/picker';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; 

import { GlobalStyles } from "../constants/styles";
import { 
    setPlacesVerification, 
    setIncidencias, 
    setCurrentRuta,
    setNameCurrentRuta
} from '../redux/placesVerifications';

import { 
    getRodinesByBase,
    getAllRutasRondinByRondin,
    getIncidenciasByBase 
} from '../services' 
   
function Home(){  
    const [rutas, setRutas]=useState([]); 

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const currentRuta = useSelector((state) => state.places.currentRuta );

    const autenticated = useSelector((state) => state.auth.userData );
    const { usuario: { idBase } } = autenticated;

    const getRondinByBase = async()=>{
        try { 
            const response = await getRodinesByBase(idBase); 
            if(!response.error){ 
                setRutas(response.data);
            }else{
                alert(response.error)
            }
        } catch (error) {
            alert(error);
        }
    } 
    
    const changeRuta =(value)=>{
        const rutaName = rutas.find(ruta => ruta.id === value);
        dispatch(setNameCurrentRuta(rutaName.nombre.toString().trim()))
        dispatch(setCurrentRuta(value));
    }
     
    const inciarRecorrido = async()=>{
        try {
            if(currentRuta === 0){
                Alert.alert(
                    "Aviso!",
                    "Debe seleccionar una ruta!",
                    [
                      { 
                      },
                      { text: "OK", onPress: () => {}}
                    ]
                );
                return
            }
            const respRutasRondin = await getAllRutasRondinByRondin(currentRuta);
            if(!respRutasRondin.error){ 

                respRutasRondin.data.sort((a, b) => {
                    if (a.orden > b.orden) return 1;
                    if (a.orden < b.orden) return -1;
                    return 0;
                })
                  
                const respIncidencias = await getIncidenciasByBase(idBase);
                if(!respIncidencias.error){ 
 
                    dispatch(setIncidencias(respIncidencias.data))
                    dispatch(setPlacesVerification(respRutasRondin.data)); 
                    navigation.navigate("Slider");
                }else{
                    alert(respIncidencias.error)
                }
            }else{
                alert(respRutasRondin.error);
            }
        } catch (error) {
            alert(error);
        }
    } 
 
    useEffect(()=>{
        getRondinByBase();
    },[]);

    return (
        <SafeAreaView style={styles.mainArea}> 
            <Text style={styles.labels}>Ruta:</Text>
            <View style={styles.borderPicker}> 
                <Picker
                    style={styles.picker}
                    selectedValue={currentRuta}
                    onValueChange={(itemValue, itemIndex) => changeRuta(itemValue)}  
                >   
                    <Picker.Item  enabled={false}  label="Seleccione una ruta" value={0} />
                        {
                            rutas.map(item=> <Picker.Item  label={item.nombre} key={item.id} value={item.id} />)
                        } 
                    </Picker> 
            </View> 
            <View style={styles.startContainer}>
                <Pressable
                    style={({ pressed }) => [styles.button, pressed && styles.pressed]}
                    onPress={inciarRecorrido}
                >
                    <View style={styles.iconContainer}>
                        <Ionicons name="caret-forward" size={45} color="white" />   
                    </View>
                </Pressable>
                <Text style={styles.buttonText}>Iniciar Recorrido</Text>
            </View> 
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    mainArea: {
        flex: 1,
        paddingHorizontal: 25,
        paddingVertical: 25 
    },
    labels:{
        fontSize: 20,
        color: GlobalStyles.colors.primary2
    },
    borderPicker:{ 
        borderColor: GlobalStyles.colors.primary3,
        borderWidth: 1,
        borderRadius: 20
    }, 
    startContainer:{
        flex: 1, 
        justifyContent: "center", 
        alignContent: 'center', 
        alignItems: 'center'
    },
    picker:{ 
        color: GlobalStyles.colors.primary3,
    },
    button: { 
        borderRadius: 50,
        height: 100,
        width: 100,  
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
        marginTop: 10,
        textAlign: 'center',
        color: GlobalStyles.colors.primary2,
        fontSize: 18 
    },
    iconContainer:{
        flex:1, 
        justifyContent: 'center', 
        alignContent: 'center', 
        alignItems: 'center'
    }
});


export default Home;