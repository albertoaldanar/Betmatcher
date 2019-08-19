import firebase from "firebase";

class ChatSystem{
	uid = "";
	messagesRef = null;

	messages = null;

	constructor(){
		firebase.initializeApp({
	        apiKey: "AIzaSyBe5fNyauR-EL3LrjXwDVjNbvDf9tggc4U",
	        databaseURL: 'https://betmatcherchat.firebaseio.com',
	        authDomain: "betmatcherchat.firebaseapp.com",
	        storageBucket: "betmatcherchat.appspot.com",
	    });
	}

	setUid(value){
		this.uid = value;
	}

	getUid(){
		return this.uid;
	}

	myMessages(){
		return this.messages;
	}

	// loadMessages(callback){

	// 	this.messagesRef = firebase.database().ref("messages");
	// 	this.messagesRef.off();
	// 	console.log(this.messagesRef);

	// 	const onReceive = (data) => {
	// 		const messages = data.val();
	// 		callback({
	// 			_id: data.key, 
	// 			text: messages.text, 
	// 			createdAt: new Data(message.createdAt),
	// 			user: {
	// 				_id: message.user._id,
	// 				name: message.user.name
	// 			},
	// 		})
	// 	};
	// 	// this.messageRef.limitToLast(20).on("child_added", onReceive);
	// }

	loadMessages(){	
		this.messagesRef = firebase.database().ref("messages");
		this.messagesRef.off();

		let callBackObject = [];

		const res = firebase.database().ref("messages").on('value', function (message) {
        	const messages = message.val();

        	const msg = Object.values(messages);
        	const keys = Object.keys(messages);

        	const callBack = msg.map(x => {
        		return {
        				_id: 1,
        				text: x.text,
        				createdAt: new Date(x.createdAt),
        				user: {
        					_id: x.user._id,
        					name: x.user.name
        				} 
        		}
        	});

        	callBackObject.push(callBack);   	
   		});

   		return callBackObject;
	}

	sendMessage(message){
		for(let i = 0; i < message.length; i ++){
			this.messagesRef.push({
				text: message[i].text,
				user: message[i].user, 
				createdAt: firebase.database.ServerValue.TIMESTAMP
			});
		}
	}

	closeChat(){
		if(this.messageRef){
			this.messagesRef.off();
		}
	}
}


export default new ChatSystem();