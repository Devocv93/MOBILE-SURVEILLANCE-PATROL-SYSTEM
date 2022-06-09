import { useState, useEffect } from 'react';
import { 
    Text,   
    StyleSheet,
    View,
    Image,
    TextInput
} from "react-native"; 
import {Picker} from '@react-native-picker/picker';
import { GlobalStyles } from '../../constants/styles';
 
import ButtonQr from './ButtonQr'; 

function ScreenCheck({ 
    item, 
    selectIncident, 
    selectedIncident, 
    incidencias, 
    observation, 
    changeText,
    seeObservation,
    places,
    currentIndex, 
 }) { 
    return ( 
        <View style={styles.mainContainerItem}> 
            <View style={styles.imageContainer}>
                <Image style={styles.image} resizeMode='contain' source={item.item.img} />
                <Text style={{ textAlign: 'center', }}>{`${currentIndex + 1} / ${places.length} `}</Text>
                <Text style={styles.textStyle}>{item.item.nombre}</Text>
            </View>
            <View style={styles.formContainer}>  
                <ButtonQr title={"ESCANEAR"}/> 
                <View style={styles.borderPicker}>
                    <Picker
                        style={styles.picker}
                        selectedValue={selectedIncident}
                        onValueChange={selectIncident} 
                    >   
                        <Picker.Item enabled={false} label="SELECCIONE INCIDENCIA" value={0} />
                        {
                            incidencias.map(item=> <Picker.Item label={item.nombre} key={item.id} value={item.id} />)
                        }  
                    </Picker>     
                </View>
                {
                    seeObservation === true  &&
                    <View style={styles.borderPicker}>
                        <TextInput
                            style={styles.textInputStyle}
                            multiline
                            numberOfLines={8}
                            value={observation}
                            onChangeText={text => changeText(text)} 
                            placeholder="ESCRIBE UNA OBSERVACION" 
                            autoCapitalize='characters'
                            
                        />
                    </View>
                } 
            </View> 
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainerItem:{   
        flex: 1,  
    },
    imageContainer:{
        flex: 0.4,
        height: '100%',
        marginBottom: 1
    },
    image:{
        height: '90%',
        width:'100%', 
    },
    textStyle:{
        textAlign: 'center', 
        color: GlobalStyles.colors.primary1,
        fontSize: 20
    },
    formContainer:{
        marginTop: 20,
        flex: 0.6,
        justifyContent: 'flex-start',
        alignContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    borderPicker:{ 
        width: '80%',
        marginTop: 8,
        borderColor: GlobalStyles.colors.primary2,
        borderWidth: 1,
        borderRadius: 15
    }, 
    picker:{  
        fontSize: 16,
        color: GlobalStyles.colors.primary2,
    },
    textInputStyle:{
        padding: 4,
        color: GlobalStyles.colors.primary2
    }
})

export default ScreenCheck;