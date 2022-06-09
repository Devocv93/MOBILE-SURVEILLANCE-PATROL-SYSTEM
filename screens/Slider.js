import { useEffect, useState } from 'react';
import { 
    Text,  
    StyleSheet,
    View,
    Alert, 
} from "react-native";
import AppIntroSlider from 'react-native-app-intro-slider';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { 
    useSelector,
    useDispatch
} from 'react-redux';
import  { 
    changeCurrentIndex,
    setIdIncidencia, 
    setObservacion, 
    changeLoading,
    setCurrentRuta,
    setFechaLugarInpeccionado,
    setNameCurrentRuta, 
    setStepCount,
 } from '../redux/placesVerifications';

import Loading from '../components/loadin';
import RenderItem from '../components/slider/RenderItem';
import ModalQr from '../components/slider/ModalQr';
import { RenderDoneButton, RenderNextButton } from '../components/slider/ButtonSlider'

import { GlobalStyles } from '../constants/styles';
  
function SliderScreen(){
    const {
        places,
        modalQr,
        incidencias,
        currentIndex,
        currentRuta,
        nameCurrentRuta,
        loading,
        stepCount
    }  = useSelector((state)=> state.places); 

    const autenticated = useSelector((state) => state.auth.userData );
    const { usuario: { idBase, id } } = autenticated;

    const selectedIncident = places[currentIndex].idIncidencia
    const observation = places[currentIndex].observacion
 
    const [slider, setSlider]= useState(AppIntroSlider | undefined); 
    const [seeObservation, setSeeObservation]= useState(false); 

    const navigation = useNavigation();
    const dispatch = useDispatch();

    function SlideChange (index, lastIndex){
        const isScaned = places[lastIndex].isScaned; 
        const name = places[lastIndex].nombre;
        const idIncidencia = places[lastIndex].idIncidencia;
        const observacion = places[lastIndex].observacion;
        const fecha = moment(new Date()).format();  
        if(!isScaned){
            Alert.alert(
                "Aviso!",
                `No puede continuar por que no ha inspeccionado ${name}`,
                [
                    {},
                    { 
                        text: "OK", onPress: () => {slider.goToSlide(lastIndex);}
                    }
                ]
            );  
        }else if(idIncidencia === 0){
            Alert.alert(
                "Aviso!",
                `Necesitas seleccionar una incidencia de ${name}`,
                [
                    {},
                    { 
                        text: "OK", onPress: () => {slider.goToSlide(lastIndex);}
                    }
                ]
            ); 
        }else{ 
            const incidenciaItem = incidencias.find(inc => inc.id === idIncidencia);
            
            if(incidenciaItem.nombre === "NA" || incidenciaItem.nombre === "N/A"){
                dispatch(setFechaLugarInpeccionado({index: lastIndex, value: fecha}));
                dispatch(changeCurrentIndex(index));
            }else if(observacion.length < 2){
                Alert.alert(
                    "Aviso!",
                    `Necesitas escribir una observacion para la incidencia de ${name}`,
                    [
                        {},
                        { 
                            text: "OK", onPress: () => {slider.goToSlide(lastIndex);}
                        }
                    ]
                );  
            }else{ 
                dispatch(setFechaLugarInpeccionado({index: lastIndex, value: fecha}));
                dispatch(changeCurrentIndex(index));
            }
        } 
    }
    
    const saveInLocalStorage = async (placesCopy)=>{
        let listRondinesPendientes;
        dispatch(changeLoading(true)); 

        listRondinesPendientes = await AsyncStorage.getItem('listRondines');
        if(listRondinesPendientes != null ){
            listRondinesPendientes = JSON.parse(listRondinesPendientes);
            listRondinesPendientes.push({ 
                placesCopy, 
                currentRuta, 
                name: nameCurrentRuta, 
                idStorage: listRondinesPendientes.length + 1, 
                idUser: id, 
                id_Base: idBase 
            });

            const jsonValue = JSON.stringify(listRondinesPendientes);
            await AsyncStorage.setItem('listRondines', jsonValue);                          
        }else{
            const firstRondin = [{ 
                placesCopy, 
                currentRuta, 
                name: nameCurrentRuta, 
                idStorage: 1, 
                idUser: id, 
                id_Base: idBase
            }]

            const jsonValue = JSON.stringify(firstRondin);
            await AsyncStorage.setItem('listRondines', jsonValue)
        } 

        dispatch(setNameCurrentRuta(""));
        dispatch(setCurrentRuta(0));
        dispatch(changeCurrentIndex(0));
        alert("Se guardo correctamente"); 
        navigation.goBack();

        dispatch(changeLoading(false));
    }
  
    const onSlideDone =async()=>{
        try {
            const isScaned = places[currentIndex].isScaned; 
            const name = places[currentIndex].nombre;
            const idIncidencia = places[currentIndex].idIncidencia;
            const observacion = places[currentIndex].observacion;

            const placesCopy = JSON.parse(JSON.stringify(places));
            placesCopy[currentIndex].fh_creacion =  moment(new Date()).format();    
  
            if(!isScaned){
                alert(`No puede continuar por que no ha inspeccionado ${name}`);
                return
            }else if(idIncidencia === 0){
                alert(`Necesitas seleccionar una incidencia de ${name}`); 
                return
            }else{
               
                const incidenciaItem = incidencias.find(inc => inc.id === idIncidencia);
                if(incidenciaItem.nombre === "NA" || incidenciaItem.nombre === "N/A"){
                    await saveInLocalStorage(placesCopy);
                }else if(observacion.length < 2){
                    alert(`Necesitas escribir una observacion para la incidencia de ${name}`);  
                }else{
                    await saveInLocalStorage(placesCopy);
                }
            }
        } catch (error) {
            alert(error)
        }
        
    }

    const selectIncident =(value)=>{
        dispatch(setIdIncidencia({index: currentIndex, value}));

        const incidenciaItem = incidencias.find(inc => inc.id === value);
         
        if(incidenciaItem.nombre === "NA" || incidenciaItem.nombre === "N/A"){
            setSeeObservation(false);
            dispatch(setObservacion({index: currentIndex, value: ""}));
        }else{
            setSeeObservation(true);
        }
    }

    const changeText =(value)=>{
        let text = value.toUpperCase();
        dispatch(setObservacion({index: currentIndex, value: text})); 
    }

    useEffect(()=>{ 
 
        return ()=>{
        }
    },[]) 
  
    return (
        <View style={styles.mainContainer}> 
            <LinearGradient
                colors={[ 'white', GlobalStyles.colors.primary5, GlobalStyles.colors.primary2]}
                style={styles.linearGradient}
            />  
            {
                places.length > 0 ?
                <AppIntroSlider 
                    data={places} 
                    renderItem={(item) => (
                        RenderItem({
                            item, 
                            selectIncident, 
                            selectedIncident, 
                            incidencias,
                            observation,
                            changeText,
                            seeObservation,
                            places,
                            currentIndex,
                            stepCount
                        })
                    )}
                    onDone={onSlideDone} 
                    showNextButton={true}
                    renderNextButton={RenderNextButton} 
                    renderDoneButton={RenderDoneButton}
                    onSlideChange={SlideChange}
                    ref={(ref) => (setSlider(ref))}
                />
                :
                <View style={styles.informatonTextContainer}>
                    <Text style={styles.textInformation}>
                        Este rondin aun no tiene lugares asignados para inspeccionar
                    </Text>
                </View> 
            }
            { modalQr ? <ModalQr/> : null }
            { loading ? <Loading /> : null }
        </View>
    )
}

const styles = StyleSheet.create({ 
    mainContainer:{
        flex: 1,   
    },
    informatonTextContainer:{
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    },
    textInformation:{
        color: GlobalStyles.colors.primary3
    },
    linearGradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '100%',  
    },
});

export default SliderScreen;