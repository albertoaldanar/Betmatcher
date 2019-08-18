import React, {Component} from "react";
import {View, Text, TouchableOpacity} from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import LinearGradient from "react-native-linear-gradient";

class Chat extends Component{
	render(){
		return(
			<View style= {{flex: 1, backgroundColor: "#161616"}}>
				<TouchableOpacity style = {{position: "absolute", top: 5, left: 5, padding: 10}} onPress = {this.props.closeChat}>
					<Text style = {{color: "white", fontSize: 16}} >X</Text>
				</TouchableOpacity>
				<GiftedChat/>
			</View>
		);
	}
}

export default Chat;

