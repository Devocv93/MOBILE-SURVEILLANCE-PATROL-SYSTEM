import { useState, useEffect } from 'react';
import { 
    Text, 
    Pressable,
    SafeAreaView, 
    Dimensions, 
    StyleSheet,
    View,
    Image
} from "react-native";
import { Ionicons } from '@expo/vector-icons'; 

function RenderPrevButton(){
    return (
        <View style={styles.buttonCircle}>
            <Ionicons name="arrow-back-sharp" size={24} color="rgba(255, 255, 255, .9)" /> 
        </View>
    );
};

function RenderNextButton(){
    return (
        <View style={styles.buttonCircle}>
            <Ionicons name="arrow-forward" size={24} color="rgba(255, 255, 255, .9)" />
        </View>
    );
};

function RenderDoneButton(){
    return (
        <View style={styles.buttonCircle}>
            <Ionicons name="checkmark" size={24} color="rgba(255, 255, 255, .9)" />
        </View>
    );
};

const styles = StyleSheet.create({
    buttonCircle: {
      width: 40,
      height: 40,
      backgroundColor: 'rgba(0, 0, 0, .2)',
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
    }, 
});

export {
    RenderNextButton,
    RenderDoneButton,
    RenderPrevButton
}