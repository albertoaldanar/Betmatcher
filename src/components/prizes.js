import React, {Component} from "react";
import {View, Text, Image, TouchableOpacity, Dimensions, ScrollView} from "react-native";
import FontAwesome, {Icons} from "react-native-fontawesome";

class Prizes extends Component{

	constructor(props){
		super(props);

		this.state = {
			prizes: []
		}
	}

	componentWillMount(){
		return fetch(`http://${Url}:8000/get_all_prizes`)
	        .then(res => res.json())
	          .then(response => {
	          	this.setState({prizes: response.prizes})
	          })
	}

	renderPrizes(){

		const {prizes} = this.state;

	    return prizes.map((item) => {
	       return(
	            <TouchableOpacity>
	              <Image
	                style={styles.image}
	                source ={{uri: item.img}}
	              />
	              <Text style= {styles.title}>{item.name} </Text>
	              <Text style= {styles.price}>{item.price} <FontAwesome>{Icons.database}</FontAwesome></Text>
	            </TouchableOpacity>
	        );
	    })
 	}


	render(){
		return(
			<View style = {{flex: 1, backgroundColor: "#161616"}}>
	      		<ScrollView style = {{flex: 1, backgroundColor: "#161616", marginTop: 10}}>
	        		{this.renderPrizes()}
	      		</ScrollView>
      		</View>
		);
	}
}

const styles = {
  image: {
    width: Dimensions.get("window").width,
    height: 150,
    marginBottom: 25,
    opacity: 0.4, borderRadius: 10,
  },
  price: {
    color: "#DAA520",
    position: "absolute", right: 10,
    bottom: 19, height: 20, borderRadius: 5, marginBottom: 10
  },
  title: {
    color: "white",
    position: "absolute", right: 0, left: 10, top: 11,
    height: 20, borderRadius: 5, fontSize: 19
  }
}

export default Prizes;