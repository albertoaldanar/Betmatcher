import React, {Component} from "react";
import {View, Text, Image, ScrollView, Dimensions, TouchableOpacity, AsyncStorage} from "react-native";
import FontAwesome, {Icons} from "react-native-fontawesome";

class PrizeDescription extends Component{


	constructor(props){
		super(props);
		this.state = {
			coins: 0, currentUser: ""
		}
	}

	// buyPrize(){
	//     let {currentUser, game, team, coins, teamsNotSelected} = this.props;
	//     const {opponent, fq, sq, bet, publicBet} = this.state;

	//     if(this.state.bet > coins){
	//       return Alert.alert("You cant ", `You don´t have ${this.state.bet} coins, sorry :( `, [{text: 'Continue', onPress: () => console.log("Request not possible")}])
	//     } else {
	//         return fetch(`http://${Url}:8000/post_request/`, {
	//           method: "POST",
	//           headers: {
	//               "Accept": "application/json",
	//               "Content-type": "application/json"
	//           },
	//           body: JSON.stringify({
	//             back_user: currentUser, event: game.data.name,
	//             back_team: team.name, amount: bet,
	//             is_public: publicBet, opponent: opponent, fq: fq, sq: sq,
	//             fq_position: teamsNotSelected[0].position, sq_position: teamsNotSelected[1].position || null
	//           })
	//         })
	//         .then(res => res.json())
	//         .then(jsonRes => {
	//            return this.alerts()
	//         })
	//         .catch(error => console.log(error));
	//     }
	// }

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

	render(){	
		const {par} = this.props.navigation.state.params;

		console.log(this.state.coins);

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