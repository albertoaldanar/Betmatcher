import React, {Component} from "react";
import {View, Text, TouchableOpacity} from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import LinearGradient from "react-native-linear-gradient";

class Chat extends Component{
	render(){
		return(
			<View style= {{flex: 1, backgroundColor: "#161616"}}>

				<GiftedChat/>
			</View>
		);
	}
}

export default Chat;

