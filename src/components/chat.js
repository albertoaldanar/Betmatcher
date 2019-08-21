import React, {Component} from "react";
import {View, Text, TouchableOpacity} from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import * as firebase from 'firebase';
import 'firebase/firestore';
import LinearGradient from "react-native-linear-gradient";

class Chat extends Component{
	constructor(props){
		
		if(!firebase.apps.length){
			firebase.initializeApp({
	          	apiKey: "AIzaSyBe5fNyauR-EL3LrjXwDVjNbvDf9tggc4U",
	          	databaseURL: 'https://betmatcherchat.firebaseio.com',
	          	authDomain: "betmatcherchat.firebaseapp.com",
	          	storageBucket: "betmatcherchat.appspot.com",
	          	projectId: "betmatcherchat",
   			});
		}

		super(props);
		this.state = {
			messages: [],
			text: ""
		}
	}

	componentWillMount(){
		const db = firebase.firestore().collection('messages');
		let queryRef = db.where('chat_id', '==', this.props.navigation.state.params.chatID);

		this.unsubscribe = queryRef.onSnapshot(this.onCollectionUpdate) 
	}


	addMessage() {
		const { currentUser, chatID, userID } = this.props.navigation.state.params;
		const randomID= Math.floor((Math.random() * 100000) + 1);

		const db = firebase.firestore().collection('messages');
	  	db.add({
	    	_id: randomID, 
	    	chat_id: chatID,
	    	text: this.state.text,
	    	createdAt: Date.now(),
	    	user: {
	    		_id: 10, 
	    		name: currentUser
	    	}
  		});	
	}


	onCollectionUpdate = (querySnapshot) => {
  			const messages = [];
		  	querySnapshot.forEach((doc) => {

			    const { _id, text, user, createdAt } = doc.data();
			    
			    messages.push({
			      key: doc.id,
			      doc,
			      _id: _id,
			      createdAt: createdAt,
			      user: user,
			      text: text,
	    		});
  			});

	  		this.setState({ messages });
	}

	// loadMessages(){ 

	//     const callBackObject = [];

	//     const res = firebase.database().ref("messages").on('value', function (message) {
	//             const messages = message.val();

	//             const msg = Object.values(messages);
	//             const keys = Object.keys(messages);

	//             const callBack = msg.map(x => {
	//                 return {
	//                     _id: x._id,
	//                     text: x.text,
	//                     createdAt: new Date(x.createdAt),
	//                     user: {
	//                       _id: x.user._id,
	//                       name: x.user.name
	//                     } 
	//                 }
	//             });

	//             callBack.map(x => {
	//               callBackObject.push(x);   
 //        		})
 //    	});

 //    	this.setState({ messages: callBackObject })

 //    	this.messagesRef = firebase.database().ref("messages");
	//     this.messagesRef.off();
 //  	}


	// sendMessage(message){
	// 	const {chatID} = this.props.navigation.state.params;

	//     for(let i = 0; i < message.length; i ++){
	//       this.messagesRef.push({
	//         _id: chatID,
	//         text: message[i].text,
	//         user: message[i].user, 
	//         createdAt: firebase.database.ServerValue.TIMESTAMP
	//     });
 //    }
 //  }

	render(){	
		console.log(this.state.messages);
		const { currentUser, chatID } = this.props.navigation.state.params;
		console.log(this.state.text);

		return(
				<LinearGradient style = {{flex: 1}} start={{x: 1, y: 1}} end={{x: 4 , y: 0}} colors = {["#161616", "gray"]}>
					<GiftedChat
			              messages={this.state.messages}
			              onSend={(message) => {
			                  this.addMessage();
			              }}
			              user ={{
			                _id: 10,
			                name: currentUser
			              }}
			              isAnimated = {true}
			              onInputTextChanged = {text => this.setState({text: text})}
			        />
			     </LinearGradient>
		);
	}
}

export default Chat;

