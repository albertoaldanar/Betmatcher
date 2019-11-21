import React, {Component} from "react";
import {View, Text, AsyncStorage, ActivityIndicator} from "react-native";
import Home from "./home";
import Login from "./login";

class Main extends Component{

	constructor(props){
		super(props);
		this.state ={
			logedIN: null
		}
	}

	async componentWillMount(){
		const userGet = await AsyncStorage.getItem('username');
		if(userGet){
			this.setState({ logedIN: 0});
		} else {
			this.setState({ logedIN: 1 });
		}
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


export default Main;