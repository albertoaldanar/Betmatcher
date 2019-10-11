import React, {Component} from "react";
import {View, Text, Image, TouchableOpacity, Dimensions} from "react-native";
import { Pages } from 'react-native-pages';

class Intro extends Component{
	render(){
		return(
			<View style = {{backgroundColor:"#161616", flex:1}}>
				<Pages>
					<View style = {{flex: 1}}>
						<Image 
							source={{uri: "https://g.foolcdn.com/image/?url=https%3A%2F%2Fg.foolcdn.com%2Feditorial%2Fimages%2F488987%2Ftwo-young-men-shaking-hands-and-smiling-deal-shake-friends.jpg&w=700&op=resize"}} 
							style={styles.backgroundImage} 
							opacity = {0.4}
						/>
						<Text style = {styles.title}> Welcome to Betmatcher</Text>

						<Text style = {styles.second}> Bet against other people around the world and change your coins for prices</Text>
					</View>

					<View style = {{flex: 1}}>
						<Image 
							source={{uri: "https://img.icons8.com/plasticine/2x/tap.png"}} 
							style={styles.imageSteps} 
						/>
						<Text style = {styles.titleSteps}>Select a team</Text>

						<Text style = {styles.secondSteps}> Select a team in one of the best events of the best leagues.</Text>
					</View>


					<View style = {{flex: 1}}>
						<Image 
							source={{uri: "https://img.icons8.com/color/452/handshake.png"}} 
							style={styles.imageSteps} 
						/>
						<Text style = {styles.titleSteps}>Back or Lay</Text>

						<Text style = {styles.secondSteps}> Make a bet and wait fore someone to match it or pick existen bet and match aginst it.</Text>
					</View>

					<View style = {{flex: 1}}>
						<Image 
							source={{uri: "https://images.vexels.com/media/users/3/153564/isolated/preview/9259581173cea1b28957a98643183d5a-icono-de-trazo-de-color-de-soporte-de-chat-by-vexels.png"}} 
							style={styles.imageSteps} 
						/>
						<Text style = {styles.titleSteps}>Chat with your match</Text>

						<Text style = {styles.secondSteps}> You can chat with your match and add him as betfriend</Text>
					</View>

					<View style = {{flex: 1}}>
						<Image 
							source={{uri: "https://cdn.airserver.com/img2/bullet9-streamnow.png"}} 
							style={styles.imageSteps} 
						/>
						<Text style = {styles.titleSteps}>Highlights and live score</Text>

						<Text style = {styles.secondSteps}> You can see the highlights and live score of the events you have match.</Text>
					</View>

				</Pages>

	            <TouchableOpacity style = {{backgroundColor: "#00B073", paddingTop: 17, paddingBottom: 17, borderRadius: 5, position: "absolute", bottom: 45, left: 15, right: 15}} onPress= {this.props.closeModal}>
	              <Text style= {{fontWeight: "600", color: "white", alignSelf:"center", fontSize: 17}}> Skip intro </Text>
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
	imageSteps: {
		width: 150, 
		height: 150, 
		alignSelf:"center", 
		position: "absolute", 
		top: 20,
	}, 
	title: {
		color: "#00B073",
	    fontSize: 30,
	    fontWeight: "700",
	    fontStyle: "oblique",
	    position: "absolute", 
	    top: 50, 
	    alignSelf:"center" 
	},
	second: {
		color: "white",
	    fontSize: 20,
	    fontWeight: "300",
	    position: "absolute", 
	    top: 180, 
	    alignSelf:"center", 
	    marginRight: 10, 
	    marginLeft: 10,
	    textAlign: "center"
	},
	titleSteps: {
		color: "#00B073",
	    fontSize: 30,
	    fontWeight: "300",
	    fontStyle: "oblique",
	    position: "absolute", 
	    top: 200, 
	    alignSelf:"center" 
	}, 
	secondSteps: {
		color: "white",
	    fontSize: 18,
	    fontWeight: "300",
	    position: "absolute", 
	    top: 270, 
	    alignSelf:"center", 
	    marginRight: 10, 
	    marginLeft: 10,
	    textAlign: "center"
	}
}

export default Intro;