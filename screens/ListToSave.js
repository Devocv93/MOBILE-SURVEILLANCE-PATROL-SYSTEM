import { useState, useEffect } from 'react';
import { 
    Text, 
    Pressable,
    SafeAreaView,  
    StyleSheet,
    View, 
    Alert,
    FlatList
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'react-native-paper';

import { useSelector,useDispatch } from 'react-redux';

import itemRondinSubir from '../components/Rondines/ItemSubir';
import Loading from '../components/loadin';

import  { changeLoading } from '../redux/placesVerifications';
import { postRondinDone } from '../services';

export default function ListToSave() {
    const[allRondinesPendientes, setAllRondinesPendientes] = useState([]);
    const[rondinesByUser, setRondinesByUser] = useState([])

    const dispatch = useDispatch();
    const { 
        currentRuta,
        loading
    }  = useSelector((state)=> state.places); 
    const { usuario: { idBase, id } } = useSelector((state) => state.auth.userData );

    const getListRondines = async()=>{
        try {
            let listRondinesPendientes;

            listRondinesPendientes = await AsyncStorage.getItem('listRondines');
            if(listRondinesPendientes != null ){
                const listRondines = JSON.parse(listRondinesPendientes);

                setAllRondinesPendientes(listRondines);
                const myList = listRondines.filter(rondin => rondin.idUser === id)
                setRondinesByUser(myList);               
            }
        } catch (error) {
           alert(error) 
        }
    }

    const cleanList =async()=>{
        await AsyncStorage.removeItem('listRondines')
    }

    const deleteCurrentRondinInStorage = async(idStorage) => {
        const filterAllRondinPendientes = allRondinesPendientes.filter(rondin => rondin.idStorage !== idStorage);
        const filterRondinByUser = rondinesByUser.filter(rondin => rondin.idStorage !== idStorage);

        setRondinesByUser(filterRondinByUser);
        const jsonValue = JSON.stringify(filterAllRondinPendientes);
        await AsyncStorage.setItem('listRondines', jsonValue); 
    }

    const submitRondin = async({placesCopy, idUser, currentRuta, id_Base, idStorage })=> {
        try { 
            dispatch(changeLoading(true)); 
            const response = await postRondinDone({data: placesCopy, idUser: idUser, idRuta: currentRuta, id_Base: id_Base  });
            if(!response.error){
                await deleteCurrentRondinInStorage(idStorage);
                alert("Se subio correctamente");
                
            }else alert(response.error);
            dispatch(changeLoading(false)); 
        } catch (error) {
            dispatch(changeLoading(false)); 
            alert(error);
        }
    }

    const uploadRondin = async(rondin) =>{
        Alert.alert(
            "Estas a punto de subir este rondin!",
            " ",
            [
                { 
                    text: "Cerrar",
                    style: 'destructive'
                },
                { 
                    text: "Si, Subir!", 
                    onPress: () => {submitRondin(rondin)},
                }
            ]
        );  
    }

    useEffect(()=>{
        getListRondines();
    },[currentRuta])

    return (
        <View style={{flex:1}}> 
            <View style={{flex: 1, margin: 5}}>
                {
                    rondinesByUser.length > 0 ? ( 
                        <FlatList
                            data={rondinesByUser}
                            keyExtractor={(item,index)=> item.idStorage }
                            renderItem={({item})=>(
                                itemRondinSubir({
                                    item,
                                    uploadRondin
                                })
                            )}
                        />
                    ): <View style={{flex:1, justifyContent: 'center', alignContent: 'center', alignItems: 'center'}}><Text>NO HAY RONDINES PENDIENTES POR SUBIR</Text></View>
                }
            </View>
            { loading ? <Loading /> : null }
        </View>
    );
}