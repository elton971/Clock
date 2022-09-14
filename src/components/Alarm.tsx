import  React, { useContext, useEffect, useState } from "react"
import { View,Text, TouchableOpacity,StyleSheet, Alert } from "react-native"
import { Portal, Provider, Switch,Modal } from 'react-native-paper';
import { ptBR } from "date-fns/locale";
import { format } from "date-fns";
import { useNavigation } from "@react-navigation/native";
import { LogBox } from 'react-native';
import { AlarmContext } from "./Context";
import * as Notifications from 'expo-notifications';



LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);


export const Alarm= ({data,index})=>{

    
    const [isSwitchOn, setIsSwitchOn] = useState(true);
    const navegation=useNavigation<any>();
	const {changeAlarmDate,alarmDate} =useContext(AlarmContext)

    
    const dateNow=format(new Date(data), "EEE' - 'd' de 'MMMM'", {locale: ptBR,});
    const hours=format(new Date(data),"HH");
    const  minutes=format((data),'mm');


    const onToggleSwitch = () =>{
        setIsSwitchOn(!isSwitchOn);
        
        if (isSwitchOn) {
            if(new Date().getTime() > new Date(data).getTime())
            {
                setIsSwitchOn(false);
                Notifications.cancelScheduledNotificationAsync(alarmDate[index].notificationId)
                Alert.alert("Alarme ja expirado, edite ou coloque na proxima hora")
            }
            else{
                changeAlarmDate(index,data)
            }
        }
        else{
            Notifications.cancelScheduledNotificationAsync(alarmDate[index].notificationId)
        }

    } 



    return(
        <View style={styles.container}>
            <TouchableOpacity
            activeOpacity={0.9}
            onPress={()=>{
                navegation.navigate("editAlarm",{
                    paramKey:data,
                    id:index
                })
            
            }}
            >
                <View style={styles.content}>
                    <View style={styles.time}>
                        <View style={styles.time_couter}>
                            <Text style={styles.time_View}>{hours}</Text>
                            <Text style={styles.time_View}>:</Text>
                            <Text style={styles.time_View}>{minutes}</Text>
                        </View>
                        <View>
                            <Text style={styles.time_day}>{dateNow}</Text>
                        </View>
                    </View>
                    <View>
                        <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
                    </View>         
                </View>    
            </TouchableOpacity> 
   
        </View>
    )
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        borderBottomWidth:2,
        borderBottomColor:"#DAE9F5",
        marginRight:5,
        marginTop:5
        
    },
    content:{
        justifyContent:"space-between",
        alignItems:"center",
        flexDirection:"row",
        //padding:10

    },
    time:{
        flexDirection:"column",
    },
    time_couter:{
        flexDirection:"row"
    },
    time_View:{
        fontSize:50,
        fontWeight:"100",
    },
    time_day:{
        color:"gray",
        marginBottom:10
    }

})