import { useContext, useEffect, useState } from "react";
import { View, Platform, ScrollView,SafeAreaView,StyleSheet,StatusBar, Alert} from "react-native";
import { Appbar,Button } from "react-native-paper";
import Icon from 'react-native-vector-icons/FontAwesome';//importo todos os icons do fontAwesome
import { Alarm } from "../components/Alarm";
import DateTimePickerModal from "react-native-modal-datetime-picker"
import { AlarmContext } from "../components/Context";




const statusBarHeight=StatusBar.currentHeight


export const Home_page = () => {

	const {saveAlarm,alarmDate} =useContext(AlarmContext)

	const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

	const showDatePicker = () => {
	  setDatePickerVisibility(true);
	};
  
	const hideDatePicker = () => {
	  setDatePickerVisibility(false);
	};

  return(

	<SafeAreaView style={styles.container} >
    	<View  style={styles.content}>
        	<Appbar.Header mode="small" >
            	<Appbar.Content title="Alarme" />
            	<Appbar.Action icon="dots-vertical" onPress={()=>{"hello"}} color="#fff" />
        	</Appbar.Header>
			<View style={styles.content_View_alarm}>
				<ScrollView  style={styles.content_scrollView}>
					{
						
						alarmDate.map((item,index)=>{

							return(
								<Alarm key={index} index={index} data={item.date} />	
							)
						})
					}
					
				</ScrollView>
				<View style={styles.bottom_View}>
					<Button style={styles.content_add_Bottom__} 
					 mode="contained"
					 onPress={showDatePicker}
				 	>
						<Icon name="plus" size={20} color="#fff" />
					</Button>
				</View>
				<DateTimePickerModal
                    minimumDate={new Date()} 
        			isVisible={isDatePickerVisible}
       				mode="datetime"
        			onConfirm={(e)=>{
						saveAlarm(e)
						hideDatePicker();

					}}
        			onCancel={hideDatePicker} 
      			/>
				
	
			</View>
    	</View>
	</SafeAreaView>
  )
  };


const styles=StyleSheet.create({
	container:{
		flex:1,
		paddingBottom:Platform.OS==="android" ? statusBarHeight :10,
		backgroundColor:"white"
	},
	content:{

	},

	content_View_alarm:{
		height:"90%"
	},
	content_scrollView:{
		paddingHorizontal:17,	
	},
	bottom_View:{
		position: 'absolute',
		width: "100%",
		bottom: 40,
		justifyContent: 'center',
		alignItems: 'center',


	},
	content_add_Bottom__:{
		width:70,
		height:70,
		borderRadius: 50,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor:"#8215E0",	
	
	},
	

	

})


