import React, {Component} from "react";
import {View, Text, TouchableOpacity, TextInput, ScrollView} from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import * as firebase from 'firebase';
import 'firebase/firestore';
import LinearGradient from "react-native-linear-gradient";
import FontAwesome, {Icons} from "react-native-fontawesome";
import OneSignal from 'react-native-onesignal';

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

		// OneSignal.addEventListener('ids', this.onIds);
		
		super(props);
		this.state = {
			messages: [],
			text: ""
		}
	}

	sendMessageNotification(message){

		const { currentUser, chatID, userID, back_user, lay_user, match} = this.props.navigation.state.params;

        const notificationTitle = currentUser + " for: " + match.local.name + " vs " + match.visit.name;

		return fetch(`https://onesignal.com/api/v1/notifications/`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json"
            },
            body: JSON.stringify({
              "app_id": "59f7fce2-a8c6-49ef-846e-bd95e45bf8b7",
              "include_player_ids": ["7eb78884-104d-43c4-9ec3-5d78a3e6e425"],
              "headings": {"en": notificationTitle},
              "contents": {"en": this.state.text}

            })
        });
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

		this.sendMessageNotification(this.state.text);
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


    renderMessages(){
    	const {chatID, currentUser, userID} = this.props.navigation.state.params;

    	return this.state.messages.map(x => {
    		return(
    			<Text style = {x._id == userID? styles.myMessage : styles.otherMessage}>{x.text}</Text>
    		);
    	});
    }

	render(){	
	
		const { currentUser, chatID, userID, back_user, lay_user } = this.props.navigation.state.params;

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

