import React, {Component} from "react";
import {View, Text, Dimensions, Picker, TouchableOpacity} from "react-native";
import LinearGradient from "react-native-linear-gradient";

const WIDTH = Dimensions.get("window").width;

class CountryPicker extends Component{

	render(){
		const countries = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola" ,"Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan"];
		
		const pick = {
		      inputIOS: {
		        color: 'white',
		        paddingTop: 13,
		        paddingHorizontal: 10,
		        paddingBottom: 12,
		      },
		      inputAndroid: {
		        color: 'white',
		      },
		      placeholderColor: 'white',
		      underline: { borderTopWidth: 0 },
		      icon: {
		        position: 'absolute',
		        backgroundColor: 'transparent',
		        borderTopWidth: 5,
		        borderTopColor: '#00000099',
		        borderRightWidth: 5,
		        borderRightColor: 'transparent',
		        borderLeftWidth: 5,
		        borderLeftColor: 'transparent',
		        width: 0,
		        height: 0,
		        top: 20,
		        right: 15,
		      },
    	};

		let renderConuntries = countries.map((l, i) => {
      			return <Picker.Item key = {i} label = {l} value ={l}/>

   	 	});

		return(
		      <LinearGradient  style = {{flex: 1, position: "relative"}} start={{x: 0, y: 0}} end={{x: 4 , y: 1}} colors = {[ "black", "gray"]}>
		          <TouchableOpacity
		               style= {{margin: 10}}
		            >
		             <Text style = {{color: "#00B073", fontSize: 21}}>
		                X
		             </Text>
		          </TouchableOpacity>
		         <View style = {styles.pickerContainer}>
		          <Picker
		            >
		              {renderConuntries}
		          </Picker>
		        </View>

		          <TouchableOpacity
		             style= {styles.button}
		          >
		           <Text style = {styles.buttonText}>
		              Search
		           </Text>
		          </TouchableOpacity>
		      </LinearGradient>
		);
	}
}

const styles = {
  button: {
    position: "absolute",
    backgroundColor: "#00B073",
    padding: 12,
    width: WIDTH,
    bottom: 0
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "300",
  },
  pickerStyle: {
    color: "#DCDCDC",
    textAlign: "left",
    height: 300,
    fontSize: 20,
    borderBottomColor: "white",
    borderBottomWidth:1,
    underline: { borderWidth: 0, borderColor: "white" },
  },
  pickerContainer: {
    justifyContent: 'center',
    marginLeft: 27,
    position: 'absolute',
    top: 0,left: 0,
    right: 0, bottom: 0,
  },
  title: {
    color: "#00B073",
    fontSize: 29,
    fontStyle: "oblique",
    alignSelf: "center",
    marginTop: 55
  }
}

export default CountryPicker;