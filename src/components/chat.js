import React, {Component} from "react";
import {View, Text, TouchableOpacity, TextInput, ScrollView} from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import * as firebase from 'firebase';
import 'firebase/firestore';
import LinearGradient from "react-native-linear-gradient";
import FontAwesome, {Icons} from "react-native-fontawesome";

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
		const db = firebase.firestore().collection('messages').where('chat_id', '==', this.props.navigation.state.params.chatID);

		this.unsubscribe = db.onSnapshot(this.onCollectionUpdate) 
	}


	onChangeInput = (state) => (event,value) => {
	    this.setState({
	      [state]:event
	    });
  	}	


	addMessage(message) {
		const { currentUser, chatID, userID } = this.props.navigation.state.params;

		const db = firebase.firestore().collection('messages');

		for(let i = 0; i < message.length; i ++){
			db.add({
				_id: userID,
				chat_id: chatID,
				text: message[i].text,
				user: message[i].user, 
				createdAt: Date.now()
	    	});
		}

	  	// db.add({
	   //  	_id: randomID, 
	   //  	chat_id: chatID,
	   //  	text: this.state.text,
	   //  	createdAt: Date.now(),
	   //  	user: {
	   //  		_id: 10, 
	   //  		name: currentUser
	   // 	firebase.firestore.FieldValue.serverTimestamp()
	   //  	}
  		// });	
	}


	postMessage(message) {
		const count = 0;
		const { currentUser, chatID, userID } = this.props.navigation.state.params;

		const db = firebase.firestore().collection('messages');


		db.add({
				_id: userID,
				chat_id: chatID,
				text: message, 
				user: currentUser,
				createdAt: new Date()
	    });

	  	// db.add({
	   //  	_id: randomID, 
	   //  	chat_id: chatID,
	   //  	text: this.state.text,
	   //  	createdAt: Date.now(),
	   //  	user: {
	   //  		_id: 10, 
	   //  		name: currentUser
	   // 	firebase.firestore.FieldValue.serverTimestamp()
	   //  	}
  		// });	
	}


	onCollectionUpdate = (querySnapshot) => {
  			const messages = [];
		  	querySnapshot.forEach((doc) => {

			    const { _id, text, user, createdAt, id } = doc.data();
			    
			    messages.push({
			      id: id,
			      key: doc.id,
			      _id: _id,
			      createdAt: createdAt,
			      user: user,
			      text: text,
	    		});
  			});

  			const sortedMessages = messages.sort((a, b) => (a.createdAt > b.createdAt) ? 1 : -1)

	  		this.setState({ messages: sortedMessages });
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




    renderMessages(){
    	const {chatID, currentUser, userID} = this.props.navigation.state.params;

    	return this.state.messages.map(x => {
    		return(
    			<Text style = {x._id == userID? styles.myMessage : styles.otherMessage}>{x.text}</Text>
    		);
    	});
    }

	render(){	
		console.log(this.state.messages);
		const { currentUser, chatID, userID } = this.props.navigation.state.params;
		console.log(this.state.text);

		return(
				<View style = {{flex: 1, backgroundColor:"#161616"}}>
					<GiftedChat
			               messages={this.state.messages}
			               onSend={(message) => {
			                  this.addMessage(message);
			               }}
			               user ={{
			                 _id: userID,
			                name: currentUser
			              }}
			              inverted = {false}
			               isAnimated = {true}
			               onInputTextChanged = {text => this.setState({text: text})}
			        />
			     </View>
		);
	}

}

const styles = {
	myMessage: {
		color: "green", 
		alignSelf:"flex-end"
	}, 
	otherMessage: {
		color: "red", 
		alignSelf:"flex-start"
	}
}

export default Chat;

