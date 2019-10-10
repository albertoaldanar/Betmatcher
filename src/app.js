import React from "react";
import {AsyncStorage} from "react-native";
import Wating from "./reusable/wating";
import {createRootNavigator} from "./nav/navigator";

class App extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			currentUser: ""
		}
	}

	async componentWillMount(){
		const userGet = await AsyncStorage.getItem('username');
		if(userGet){
			this.setState({ currentUser: userGet});
		} else {
			this.setState({ currentUser: false });
		}
	}

 	render() {
 		const initialScreen = this.state.currentUser ? "MainScreen" : "CountryPicker"
 		const MyNav = createRootNavigator(initialScreen);
 		
 		return <MyNav/> 
  	}
}

export default App;