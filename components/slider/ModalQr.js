import { useState, useEffect } from 'react';
import { 
    Text,  
    StyleSheet,
    View, 
    Alert
} from "react-native";
import { BarCodeScanner } from 'expo-barcode-scanner'; 
import { Modal, Portal, Button  } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';

import { 
    closeModalQr, 
    setPlaceScaned, 
} from '../../redux/placesVerifications'

import { GlobalStyles } from '../../constants/styles';


function ModalQr ({ title }) { 
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    let placesInspection  = useSelector((state)=> state.places.places);
    let currentIndex  = useSelector((state)=> state.places.currentIndex);
    const modal = useSelector((state) => state.places.modalQr ); 

    const dispatch = useDispatch();

    const hideModal =()=>{
        setScanned(false);
        dispatch(closeModalQr(false));
    } 

    useEffect(()=>{
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            if(status === 'granted') setHasPermission(true);
            else setHasPermission(false) 
        })();
    },[])    
    
    const handleBarCodeScanned = async({ type, data }) => {
        try {
            setScanned(true);
            let distancia = 0;
            const dataScaned = JSON.parse(data);
            const CurrentPlaceId = placesInspection[currentIndex].id;
    
            if(parseInt(dataScaned.idLugar) === parseInt(CurrentPlaceId)){ 
                alert(`Lugar escaneado correctamente!`);
                dispatch(setPlaceScaned({index: currentIndex, value: true}));               
            }else{
                alert(`Está en el lugar equivocado, dirijase al correcto por favor y escanee de nuevo!`);
            } 

            hideModal();
        } catch (error) {
            alert("QR invalido, por favor escanee uno valido!")
            hideModal();
        }
    };
      
    return ( 
        <View  style={{flex: 1}}>
            <Portal>
                <Modal  
                    visible={modal}  
                    contentContainerStyle={styles.containerModal}
                    dismissable={false}    
                >
                    {
                        hasPermission === true  ?  
                            <BarCodeScanner 
                                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                                style={[StyleSheet.absoluteFillObject, styles.containerBarCode]}
                            />  
                            : <Text>Necesitas aceptar el permiso para acceder a la camara!</Text>  
                    }
                    <View  style={{flex: 1 , justifyContent: 'flex-end'}}> 
                        <Button onPress={hideModal} mode="contained" color={GlobalStyles.colors.primary3} dark={true}>
                            Cancelar
                        </Button>
                    </View> 
                </Modal>
            </Portal> 
        </View>
    );
}

const styles = StyleSheet.create({
    containerModal:{
        backgroundColor: 'black',
        padding: 20, 
        width: '100%',
        height: '100%'
    },
    containerBarCode: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center', 
    }
})

export default ModalQr;