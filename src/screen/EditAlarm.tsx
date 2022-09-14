import  React, { useContext, useState } from "react"
import { Text, View,StyleSheet,Platform} from "react-native"
import {useNavigation, useRoute} from '@react-navigation/native';
import { SafeAreaView } from "react-native-safe-area-context";
import { Appbar, Button, Switch } from "react-native-paper";
import DateTimePicker from '@react-native-community/datetimepicker';
import { AlarmContext } from "../components/Context";


export const EditAlarm= ()=>{

    const {changeAlarmDate}=useContext(AlarmContext)
    
    const [show,setShow]=useState(Platform.OS=="ios")
    const route = useRoute<any>();
    const audit = route.params.paramKey
    const id=route.params.id

    const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
    const [isSwitchOn, setIsSwitchOn] = useState(false);

	const {deleteAlarm} =useContext(AlarmContext)

    const navegation=useNavigation<any>();



    const handleConfirm=()=>{
        handleView()
    }
    const handleView=()=>{
        setShow(!show)
    }

    const [dates, setDate] = useState(new Date(audit));

    return(

        <SafeAreaView style={styles.container} >
            <View>
                <Appbar.Header mode={Platform.OS === 'ios' ? 'center-aligned' : 'small'} style={styles.appBar} elevated >
                    <Appbar.Content title="Editar" subtitle={'Edit alarm'} />
                </Appbar.Header>
                {
                    show && (
                        <DateTimePicker
                        value={dates} 
                        mode="time"
                        display="spinner"
                        onChange={(event, date)=>{
                            changeAlarmDate(id,date)
                            setDate(date)
                        }}
                        themeVariant={"light"}
                        style={styles.timePicker}
                        
                        />
                    )
                }
                {
                        Platform.OS==="android" && (
                            <Button  mode="outlined" onPress={handleView}>
                                Change time
                            </Button>
                        )
                }
                <View style={styles.contentOption}>

                    <View style={styles.option}>
                        <Text 
                            style={styles.text}

                        >
                            Reptir todos dias
                        </Text>
                        <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
                        
                    </View>

                    <View style={styles.option}>
                        <Text 
                            style={styles.text}


                        >Vibrar</Text>
                        <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
                        
                    </View>
                    <View style={styles.option}>
                        <Text
                            style={styles.text}

                        >Som</Text>
                        <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
                        

                    </View>
                    <View style={styles.option}>
                        <Text
                            style={styles.text}

                        >
                            Adiar
                        </Text>
                        <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />

                    </View>

                </View>
                    <View style={styles.botton_view}>
                        <Button  mode="elevated" onPress={()=>{
                            navegation.navigate("Welcome")
                            deleteAlarm(id)
                            }}

                            style={styles.botton_Cancel}
                            textColor="white">
                            Delete
                        </Button>
                        <Button mode="elevated" onPress={()=>{}} style={styles.botton_Save}   textColor="white">Save </Button>
                    </View>


            </View>
        </SafeAreaView>
    )
}

const styles=StyleSheet.create({
	container:{
		flex:1,
		backgroundColor:"white"
	},
    appBar:{
        marginTop: Platform.OS=="android" && (-40),
        backgroundColor:"white",
    },
    timePicker:{
        justifyContent:"center",
        alignItems:"center"
        
    },
    contentOption:{
        margin:20,
        backgroundColor:"gray-light",
        padding:20,
        borderRadius:20,
        
    },
    option:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        marginVertical:6,
    },
    text:{
        fontSize:20,
        fontWeight:"400"
    },
    botton_view:{
        paddingHorizontal:20,
        flexDirection:"row",
        justifyContent:"space-around"
    },
    botton_Cancel:{
        marginRight:20,
        width:160,
        height:70,
        justifyContent:"center",
        backgroundColor:"red",
        
    },
    botton_Save:{
        height:70,
        justifyContent:"center",
        backgroundColor:"blue",
        width:160,

        
    }
})