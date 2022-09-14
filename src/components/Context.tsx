import {createContext, ReactNode, useEffect, useState} from 'react';
import * as Notifications from 'expo-notifications';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import * as Device from 'expo-device';
import { Platform } from 'react-native';


interface AlarmContextData {
    saveAlarm:(date:Date)=>void
    alarmDate:any
    deleteAlarm:(id:number)=>void
    changeAlarmDate:(id:number, date:Date)=>void
}

interface dataAlarm{
   date:Date
   notificationId:string 
}

interface AlarmProviderProps{
    children:ReactNode;
}


export const AlarmContext =createContext({} as AlarmContextData);

export function AlarmProvider({children}:AlarmProviderProps){
    

	const [alarmDate,setAlarmeDate]=useState<Array<dataAlarm>>([])
    
    const deleteAlarm=(id:number)=>{
      alarmDate.splice(id,1);
      Notifications.cancelScheduledNotificationAsync(alarmDate[id].notificationId)
      setAlarmeDate([...alarmDate])
    }

    //trabalho com notificacao
    
    //obtendo a permissao
    async function registerForPushNotificationsAsync() {
        let token;
        if (Device.isDevice) {
          const { status: existingStatus } = await Notifications.getPermissionsAsync();
          let finalStatus = existingStatus;
          if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
          }
          if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
          }
          token = (await Notifications.getExpoPushTokenAsync()).data;
          console.log(token);
        } else {
          alert('Must use physical device for Push Notifications');
        }
      
        if (Platform.OS === 'android') {
          await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
          });
        }
      
        return token;
      }


    //para receber notificacao em primeiro plano

    Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: false,
        }),
      });

      //Quando a notificação é recebida, uma tarefa é executada

      useEffect(()=>{
        registerForPushNotificationsAsync()
        //quando esta no segundo plano
        const backgroundPlan=Notifications.addNotificationResponseReceivedListener(
            response=>{
                console.log(response)
            }
        )

        //quando esta no primeiro plano
        const foregroundPlan = Notifications.addNotificationReceivedListener(
            notification=>{
                console.log(notification)
            }
        )
        return ()=>{
            backgroundPlan.remove();
            foregroundPlan.remove();
        }
      },[])


    //*********************** */

    
    //trocar a data do alarme
    const changeAlarmDate= async (id:number, selectedDate:Date)=>{
      Notifications.cancelScheduledNotificationAsync(alarmDate[id].notificationId)
      const notificationId= await handleConfirm(selectedDate)
      
      alarmDate[id].notificationId=notificationId
      alarmDate[id].date=selectedDate
      
      setAlarmeDate([...alarmDate])

    }

	const handleConfirm = async (date:Date) => {  
        const dateNow=format(new Date(date), "EEE' - 'd' de 'MMMM'", {locale: ptBR,});
        const hours=format(new Date(date),"HH");
        const  minutes=format((date),'mm');

        const nextAlarm=new Date(date)
        const now=new Date()

        const seconds = Math.abs(
            Math.ceil((now.getTime()-nextAlarm.getTime())/1000)
        )
        //agendamento da notificacao
        return await Notifications.scheduleNotificationAsync({
            content:{
                title:"Alarme",
                body:dateNow+" "+hours+":"+minutes,
                sound:true,
                priority:Notifications.AndroidNotificationPriority.MAX
            },
            trigger: {
                seconds: seconds,
                repeats:false
              },
        })// agendamento da notificacao
    }
    const saveAlarm = async(date:Date)=>{

      const notificationId=await handleConfirm(date)
      setAlarmeDate([...alarmDate,{date,notificationId}])

    }
    return(
        <AlarmContext.Provider value={{
            saveAlarm,
            alarmDate,
            deleteAlarm,
            changeAlarmDate
        }}>
            {children}      
        </AlarmContext.Provider>
    )
}

