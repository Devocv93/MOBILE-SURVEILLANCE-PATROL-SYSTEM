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
import { Ionicons } from '@expo/vector-icons'; 
import { GlobalStyles } from '../../constants/styles';

export default function itemRondinSubir({
    item,
    uploadRondin,

}) {
    return (
        <View style={{flex:1}}> 
            <View style={{
                flex: 1, 
                height: 60,
                borderRadius: 10,
                justifyContent: "space-between", 
                alignContent: 'center',
                alignItems: 'center',
                flexDirection: "row", 
                marginHorizontal: 15, 
                marginVertical: 4,
                backgroundColor: GlobalStyles.colors.primary3,
                padding: 4, 
            }}>
                <View style={{
                    paddingLeft: 5
                }}>
                    <Text>{item.name}</Text> 
                </View>
                <View style={{
                    paddingRight: 5
                }} >
                    <Ionicons onPress={()=>{uploadRondin(item)}}  name="cloud-upload" size={24} color={GlobalStyles.colors.primary1} />
                </View>
            </View>
        </View>
    );
}