import React from "react";
import {AsyncStorage} from "react-native";
import Wating from "./reusable/wating";
import {createRootNavigator} from "./nav/navigator";
import OneSignal from 'react-native-onesignal';

class App extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			currentUser: "",
		}
		OneSignal.init("59f7fce2-a8c6-49ef-846e-bd95e45bf8b7", {kOSSettingsKeyAutoPrompt : true})
		OneSignal.inFocusDisplaying(2)
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
 		const initialScreen = this.state.currentUser ? "MainScreen" : "Login"
 		const MyNav = createRootNavigator(initialScreen);
 		
 		return <MyNav/> 
  	}
}

export default App;