import React from "react";
import { createNativeStackNavigator   } from '@react-navigation/native-stack';
import { Home_page } from "../screen/Home_page";
import { EditAlarm } from "../screen/EditAlarm";




const stackRoutes = createNativeStackNavigator  ();

const AppRoutes: React.FC =()=>(
    <stackRoutes.Navigator
        screenOptions={{
            headerShown:false,
        }}
    >

        <stackRoutes.Screen
            name="Welcome"
            component={Home_page} 
        />

        <stackRoutes.Screen
            name="editAlarm"
            component={EditAlarm}
            
        />

    </stackRoutes.Navigator>
)

export default AppRoutes;