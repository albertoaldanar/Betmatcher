import React, {Component} from "react";
import {View, Text, Image, ScrollView, Dimensions, TouchableOpacity, AsyncStorage, Alert, ActivityIndicator, TextInput} from "react-native";
import FontAwesome, {Icons} from "react-native-fontawesome";
import LinearGradient from "react-native-linear-gradient";
import Modal from "react-native-modal";
import {NavigationActions} from "react-navigation";
import NumberFormat from 'react-number-format';

class PrizeDescription extends Component{


	constructor(props){
		super(props);
		this.state = {
			coins: 0, currentUser: "", showModal: false, showLoading: false, phone: "",
			email: "", adress: "", cp: "", country:"", city: "", state: "", fullName: "", exchange: {}
		}
	}

	onChangeInput = (state) => (event,value) => {
	    this.setState({
	      [state]:event
	    });
  }

	buyPrize(){
	    const {par} = this.props.navigation.state.params;
	    const {coins, currentUser} = this.state;

	    var today = new Date();
   		var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    	var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    	var dateTime = date+' '+time;

      let finalValue = this.state.coins > 50 ? console.log("Not able to bet") : console.log("Bet defined");

	    if(par.price > coins){
	      return Alert.alert("You need more coins ", `You don´t have ${par.price} coins, sorry :( `, [{text: 'Continue', onPress: () => console.log("Request not possible")}])
	    } else {
	        return fetch(`http://${Url}:8000/pay_prize/`, {
	          method: "POST",
	          headers: {
	              "Accept": "application/json",
	              "Content-type": "application/json"
	          },
	          body: JSON.stringify({
	            current_user: currentUser, prize: par.name, coins: coins, date: dateTime
	          })
	        })
	        .then(res => res.json())
	        .then(jsonRes => {
	          	return this.showShipmentModal(jsonRes.Exchange);
	        })
	        .catch(error => alert(error));
	    }
	}

	async componentWillMount(){
	    this._isMounted = true;

	      const usernameGet = await AsyncStorage.getItem('username');
	        if (usernameGet) {
	          this.setState({ currentUser: usernameGet});
	        } else {
	          this.setState({ currentUser: false });
	      }

	      return fetch(`http://${Url}:8000/user_records?current_user=${this.state.currentUser}`, {
	        method: "GET",
	        headers: {
	          "Accept": "application/json",
	          "Content-type": "application/json",
	          // "Authorization": `Token ${this.state.currentToken}`
	        }
	      })
	      .then(res => res.json())
	      .then(jsonRes => {
	        if(this._isMounted){
	          this.setState({
	                coins: jsonRes.user.profile.coins,
	          })
	        }
	      }).catch(error => alert(error));
  	}


  	showShipmentModal(exchange){
  		this.setState({showLoading: true, exchange: exchange.id})

  		setTimeout(() => {this.setState({showModal: true, showLoading: false})}, 2500);
  	}


  	shipmentExchange(){
  		const {par} = this.props.navigation.state.params;
  		const {phone, email, adress, cp, country, city, state, fullName, exchange} = this.state;

  		if(phone && email && adress && cp && country && city && state){
	        return fetch(`http://${Url}:8000/shipment_exchange/`, {
	          method: "POST",
	          headers: {
	              "Accept": "application/json",
	              "Content-type": "application/json"
	          },
	          body: JSON.stringify({
	           	exchange, phone: phone.toString(), email, adress, cp: cp.toString(), country, city, state, full_name: fullName
	          })
	        })
	        .then(res => res.json())
	        .then(jsonRes => {
	          	return this.done();
	        })
	        .catch(error => alert(error));

	    } else {
	    	  return Alert.alert(
		          "Incomplete info!",
		          `We need ALL your information for shipment to succeed`,
		        [
		          {text: 'OK', onPress: console.log("Not complete info")},
		        ],
		        {cancelable: false},
		      );
	    }
  	}

  	backHome(){
		const navigateAction = NavigationActions.navigate({
	      routeName: "Home"
	    });
	    this.props.navigation.dispatch(navigateAction);
	}

  	done(){
  		const {phone, email, adress, cp, country, city, state, fullName} = this.state;
  		const {par} = this.props.navigation.state.params;

		    Alert.alert(
		          `${par.name} on its way!`,
		          `We will send you an email with all shipment details :)`,
		        [
		          {text: 'OK', onPress: this.backHome.bind(this)},
		        ],
		        {cancelable: false},
		    );
  	}

	render(){
		const {par} = this.props.navigation.state.params;
		const {phone, email, adress, cp, country, city, state} = this.state;

		console.log(this.state.exchange);

		return(
			<View style = {{flex: 1, backgroundColor: "#161616"}}>
				<Image source = {{uri: par.img}} style = {styles.image}/>
				<Text style = {{color: "white", marginLeft: 10, fontSize: 20, fontWeight: "400"}}>{par.name}</Text>

				<NumberFormat
                    value={par.price}
                    displayType={'text'}
                    thousandSeparator={true}
                    renderText= {value => <Text style = {{color: "#DAA520", marginLeft: 10, fontSize: 14, fontWeight: "400", marginTop: 5}}> {value}  <FontAwesome>{Icons.database}</FontAwesome></Text>}
                />
				<Text style = {{color: "gray", marginLeft: 10, marginTop: 35, fontSize: 14, fontWeight: "400", textAlign: "center"}}>{par.description}</Text>

	            <TouchableOpacity style = {{backgroundColor: "#00B073", paddingTop: 17, paddingBottom: 17, borderRadius: 5, position: "absolute", bottom: 30, left: 15, right: 15}} onPress ={this.buyPrize.bind(this)}>
	              <Text style= {{fontWeight: "600", color: "white", alignSelf:"center", fontSize: 17}}> Buy prize </Text>
	            </TouchableOpacity>

	           	<View style= {{alignSelf:"center", position: "absolute", top: 100, left: 100, bottom: 100, right: 100, justifyContent: "center"}}>
					<ActivityIndicator size="large" color="white" animating={this.state.showLoading}/>
				</View>

	            <Modal isVisible={this.state.showModal} style = {{flex: 1, margin: 0}}>
	              <LinearGradient style = {{ borderRadius: 5, flex: 1}} start={{x: 0, y: 0}} end={{x: 4 , y: 0}} colors = {[ "#161616", "gray"]}>

	                    <Text style = {{color:"white", alignSelf:"center", fontSize: 19, marginBottom: 10, marginTop: 10}}> Congratulations ! </Text>
	                    <Text style = {{color:"gray", alignSelf:"center", fontSize: 16, marginBottom: 15, textAlign: "center"}}> Betmatcher will send your {par.name} directly to you! </Text>
	                    <Text style = {{color:"gray", alignSelf:"center", fontSize: 13, marginBottom: 15, textAlign: "center", marginTop: 25}}> Please fill all the shipment information of your prize. </Text>

	                    <View style = {styles.inputs}>
				          <TextInput
				            style={{height: 40, borderBottomColor: 'white', borderBottomWidth: 0.5, marginBottom: 15, color: "white"}}
				            placeholder = "Username"
				            placeholderTextColor = "gray"
				            autoCapitalize = 'none'
				            onChangeText ={this.onChangeInput('adress')}
				            value = {adress}
				          />

				          <TextInput
				            style={{height: 40, borderBottomColor: 'white', borderBottomWidth: 0.5, color:"white", color: "white", marginBottom: 15,}}
				            placeholder = "Email"
				            placeholderTextColor = "gray"
				            autoCapitalize = 'none'
				            onChangeText ={this.onChangeInput('email')}
				            value = {email}
				          />
				          <TextInput
				            style={{height: 40, borderBottomColor: 'white', borderBottomWidth: 0.5, color:"white", color: "white", marginBottom: 15 }}
				            placeholder = "Phone"
				            placeholderTextColor = "gray"
				            autoCapitalize = 'none'
				            keyboardType='numeric'
				            onChangeText ={this.onChangeInput('phone')}
				            value = {phone}
				          />

				        <TextInput
				            style={{height: 40, borderBottomColor: 'white', borderBottomWidth: 0.5, color:"white", color: "white", marginBottom: 15 }}
				            placeholder = "Country"
				            placeholderTextColor = "gray"
				            autoCapitalize = 'none'
				            onChangeText ={this.onChangeInput('country')}
				            value = {country}
				        />

				        <TextInput
				            style={{height: 40, borderBottomColor: 'white', borderBottomWidth: 0.5, color:"white", color: "white", marginBottom: 15 }}
				            placeholder = "State"
				            placeholderTextColor = "gray"
				            autoCapitalize = 'none'
				            onChangeText ={this.onChangeInput('state')}
				            value = {state}
				        />

				        <TextInput
				            style={{height: 40, borderBottomColor: 'white', borderBottomWidth: 0.5, color:"white", color: "white", marginBottom: 15 }}
				            placeholder = "City"
				            placeholderTextColor = "gray"
				            autoCapitalize = 'none'
				            keyboardType='numeric'
				            onChangeText ={this.onChangeInput('city')}
				            value = {city}
				        />
				         <TextInput
				            style={{height: 40, borderBottomColor: 'white', borderBottomWidth: 0.5, color:"white", color: "white"}}
				            placeholder = "Postal code"
				            placeholderTextColor = "gray"
				            autoCapitalize = 'none'
				            onChangeText ={this.onChangeInput('cp')}
				            value = {cp}
				       	  />
				        </View>

				        <TouchableOpacity style = {{backgroundColor: "#00B073", position: "absolute", bottom: 0, left: 0, right: 0, padding: 12}} onPress = {this.shipmentExchange.bind(this)}>
              				<Text style = {{textAlign: "center", color: "white", fontWeight: "300", fontSize: 16}}> Continue</Text>
            			</TouchableOpacity>

         		 	</LinearGradient>
	            </Modal>
			</View>
		);
	}
}


const styles= {
	image: {
		height: 250,
		width: Dimensions.get("window").width,
		marginBottom: 15
	},
	inputs: {
	    justifyContent: 'center',
	    margin: 15,
	    marginLeft: 30,
	    marginRight: 30,
	    position: 'absolute',
	    top: 0,left: 0,
	    right: 0, bottom: 0,
  	}
}

export default PrizeDescription;
