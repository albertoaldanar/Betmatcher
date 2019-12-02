import React, {Component} from "react";
import {View, Text, Dimensions, Picker, TouchableOpacity} from "react-native";
import LinearGradient from "react-native-linear-gradient";

const WIDTH = Dimensions.get("window").width;

class CountryPicker extends Component{

	constructor(props){
		super(props);
		this.state= {
			country: ""
		}
	}

	render(){
		const countries = [
			"Afghanistan", "Albania", "Algeria", "Andorra", "Angola" ,"Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan",
			"The Bahamas", "Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bhutan","Bolivia","Bosnia and Herzegovina","Botswana","Brazil","Brunei","Bulgaria","Burkina Faso","Burundi", "Cabo Verde", "Cambodia", 
			"Cameroon", "Canada", "Central African Republic (CAR)", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Cote d'Ivoire", "Croatia","Cuba","Cyprus", "Czechia", "Denmark", "Djibouti", "Dominica", "Dominican Republic", 
			"Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia","Fiji", "Finland","France","French Guiana","Gabon","Gambia","Georgia","Germany","Ghana","Great Britain","Greece",
			"Grenada", "Guadeloupe", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia",
			"Iran",	"Iraq", "Israel and the Occupied Territories", "Italy", "Ivory Coast (Cote d'Ivoire)", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Korea, Republic of (South Korea)", "Kosovo", "Kuwait",
			"Kyrgyz Republic (Kyrgyzstan)", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Martinique", "Mauritania", "Mauritius",
			"Mayotte", "Mexico","Moldova",  "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Myanmar/Burma", "Namibia", "Nepal", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Norway",
			"Oman", "Pacific Islands", "Pakistan", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russian Federation", "Rwanda", "Saint Kitts and Nevis",  "Saint Lucia",
			"Saint Vincent and the Grenadines", "Samoa", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovak Republic (Slovakia)", "Slovenia", "Solomon Islands", "Somalia", "South Africa","South Sudan", "Spain",
			"Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Tajikistan", "Tanzania", "Thailand", "Netherlands", "Timor Leste", "Togo", "Trinidad & Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks & Caicos Islands", "Uganda", "Ukraine", "United Arab Emirates",
			"United States of America (USA)", "Uruguay", "Uzbekistan", "Venezuela", "Vietnam", "Virgin Islands (UK)", "Virgin Islands (US)", "Yemen", "Zambia", "Zimbabwe",
		];

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
		        borderTopColor: 'white',
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
		      <View style = {{flex: 1, position: "relative", backgroundColor: "#161616"}}>
		          <TouchableOpacity 
		          	   onPress = {this.props.closeModal}	
		               style= {{margin: 10}}
		            >
		             <Text style = {{color: "#00B073", fontSize: 21}}>
		                X
		             </Text>
		          </TouchableOpacity>
		         <View style = {styles.pickerContainer}>
		          <Picker
		          	itemStyle ={styles.pickerStyle}
              		selectedValue={this.state.country}
             		onValueChange={(itemValue, itemIndex) => this.setState({country: itemValue})}
		            >
		              {renderConuntries}
		          </Picker>
		        </View>

		          <TouchableOpacity
					onPress = {this.props.onChangeCountry.bind(this, this.state.country)}
		            style= {styles.button}
		          >
		           <Text style = {styles.buttonText}>
		              Select
		           </Text>
		          </TouchableOpacity>
		      </View>
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