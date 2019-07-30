import React from "react";
import {AsyncStorage} from "react-native";
import Wating from "./reusable/wating";
import {AppNavigatorMain, AppNavigatorLogin} from "./nav/navigator";
class App extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			currentUser: "NOT"
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
 		const MyNav = this.state.currentUser == "NOT" ? Wating : this.state.currentUser == false ? AppNavigatorLogin : AppNavigatorMain
 		
 		return <MyNav/> 
  	}
}

export default App;