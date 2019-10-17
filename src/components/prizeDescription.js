import React, {Component} from "react";
import {View, Text, Image, ScrollView, Dimensions, TouchableOpacity} from "react-native";
import FontAwesome, {Icons} from "react-native-fontawesome";

class PrizeDescription extends Component{

	render(){	
		const {par} = this.props.navigation.state.params;
		return(
			<View style = {{flex: 1, backgroundColor: "#161616"}}>
				<Image source = {{uri: par.img}} style = {styles.image}/>
				<Text style = {{color: "white", marginLeft: 10, fontSize: 20, fontWeight: "400"}}>{par.name}</Text>
				<Text style = {{color: "#DAA520", marginLeft: 10, fontSize: 14, fontWeight: "400", marginTop: 5}}>{par.price} <FontAwesome>{Icons.database}</FontAwesome> </Text>
				<Text style = {{color: "gray", marginLeft: 10, marginTop: 35, fontSize: 14, fontWeight: "400", textAlign: "center"}}>{par.description}</Text>

	            <TouchableOpacity style = {{backgroundColor: "#00B073", paddingTop: 17, paddingBottom: 17, borderRadius: 5, position: "absolute", bottom: 30, left: 15, right: 15}}>
	              <Text style= {{fontWeight: "600", color: "white", alignSelf:"center", fontSize: 17}}> Buy prize </Text>
	            </TouchableOpacity>
			</View>
		);
	}
}


const styles= {
	image: {	
		height: 250, 
		width: Dimensions.get("window").width,
		marginBottom: 15
	}
}

export default PrizeDescription;