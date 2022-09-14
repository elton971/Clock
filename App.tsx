import React from "react";
import { StatusBar } from "expo-status-bar";
import {View,StyleSheet } from "react-native";
import Routes from "./src/routes";
import { AlarmProvider } from "./src/components/Context";

export default function App() {
  
  

  return (
    <AlarmProvider>
      <View style={styles.container} >
        <Routes/>
      <StatusBar style="dark" />
    </View>
    </AlarmProvider>
  );
}



const styles=StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"white",
    
  }
})