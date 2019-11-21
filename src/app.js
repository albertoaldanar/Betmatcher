import React from "react";
import {AsyncStorage} from "react-native";
import Wating from "./reusable/wating";
import {createRootNavigator} from "./nav/navigator";
import OneSignal from 'react-native-onesignal';

class App extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			currentUser: null,
		}
		OneSignal.init("59f7fce2-a8c6-49ef-846e-bd95e45bf8b7", {kOSSettingsKeyAutoPrompt : true})
		OneSignal.addEventListener('ids', this.onIds);

		OneSignal.inFocusDisplaying(2);
	}

	onIds(device) {
   	 	console.log('Device info: ', device);
  	}


	async componentWillMount(){
		const userGet = await AsyncStorage.getItem('username');
		if(userGet){
			this.setState({ currentUser: 0});
		} else {
			this.setState({ currentUser: 1});
		}
	}

	renderWating(){
		const {currentUser} = this.state;
			return(
				<View style = {{backgroundColor: "#161616", flex: 1}}>
					<View style = {{marginTop: 40}}>
						<ActivityIndicator color= "white" size = "large"/>
					</View>
				</View>
			)
	}

 	render() {
 		const initialScreen = this.state.currentUser == 0 ? "MainScreen" : this.state.currentUser == 1 ?  "Login" : "Main"
 		const MyNav = createRootNavigator(initialScreen);
 		
 		return <MyNav/> 
  	}
}

export default App;