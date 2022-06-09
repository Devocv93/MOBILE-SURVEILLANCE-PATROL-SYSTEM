import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";

const Loading = () => (
  <View style={[styles.container, styles.horizontal]}> 
    <ActivityIndicator animating={true} size="large" color={GlobalStyles.colors.primary5} />
  </View>
);

const styles = StyleSheet.create({
    container: {
      position: 'absolute', 
      top: 0, 
      left: 0, 
      right: 0, 
      bottom: 0, 
      justifyContent: 'center', 
      alignItems: 'center',
      opacity: 0.6,
      backgroundColor: GlobalStyles.colors.primary1
    }, 
});

export default Loading;