import React, {Component} from "react";
import {View, Text, Image, TouchableOpacity} from "react-native";
import { Pages } from 'react-native-pages';

class Intro extends Component{
	render(){
		return(
			<View style = {{backgroundColor:"black", flex:1}}>
				<Pages>
					<View style = {{flex: 1}}>
						<Image 
							source={{uri: "https://g.foolcdn.com/image/?url=https%3A%2F%2Fg.foolcdn.com%2Feditorial%2Fimages%2F488987%2Ftwo-young-men-shaking-hands-and-smiling-deal-shake-friends.jpg&w=700&op=resize"}} 
							style={styles.backgroundImage} 
							opacity = {0.4}
						/>
						<Text style = {styles.title}> BET  .  MATCH  .  WIN </Text>
					</View>

					<View style = {{flex: 1}}>
						<Text style = {{color:"white", position: "absolute", top: 50, textAlign: "center", fontSize: 19, alignSelf:"center"}}>Bet match win</Text>
					</View>
				</Pages>

	            <TouchableOpacity style = {{backgroundColor: "#00B073", paddingTop: 17, paddingBottom: 17, borderRadius: 5, position: "absolute", bottom: 45, left: 15, right: 15}}>
	              <Text style= {{fontWeight: "600", color: "white", alignSelf:"center", fontSize: 17}}> Sign up or Login </Text>
	            </TouchableOpacity>
			</View>
		);
	}
}

const styles = {
	backgroundImage: {
		flex: 1,
    	resizeMode: 'cover',
	}, 
	title: {
		color: "#F5F5F5",
	    fontSize: 25,
	    fontWeight: "600",
	    fontStyle: "oblique",
	    position: "absolute", 
	    top: 50, 
	    alignSelf:"center" 
	}
}

export default Intro;