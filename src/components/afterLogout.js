import React, {Component} from "react";
import {View, Text, AsyncStorage, ActivityIndicator} from "react-native";
import Login from "./login";
import {NavigationActions} from "react-navigation";

class AfterLogout extends Component{

	constructor(props){
		super(props);
		this.state ={
			logedIN: null
		}
	}


	sendToLogin(){
		const navigateAction = NavigationActions.navigate({
	      routeName: "Login",
	    });

	    this.props.navigation.dispatch(navigateAction);
		}

	async componentWillMount(){
		setTimeout(() => {this.sendToLogin()}, 2500);
	}


	renderWating(){
		const {logedIN} = this.state;
			return(
				<View style = {{backgroundColor: "#161616", flex: 1}}>
					<View style = {{marginTop: 200}}>
						<ActivityIndicator color= "white" size = "large"/>
					</View>
				</View>
			)
	}


	render(){
		// const Result = this.state.logedIN == null ? this.renderWating() : this.state.logedIN == 0 ? <Home/> : </Login>;

		return this.renderWating()
	}
}


export default AfterLogout;