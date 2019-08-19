import firebase from "firebase";

class ChatSystem{
	uid = "";
	messagesRef = null;

	constructor(){
		firebase.initializeApp({
	        apiKey: "AIzaSyBe5fNyauR-EL3LrjXwDVjNbvDf9tggc4U",
	        databaseURL: 'https://betmatcherchat.firebaseio.com',
	    });
	}

	setUid(value){
		this.uid = value;
	}

	getUid(){
		return this.uid;
	}

	loadMessages(callback){

		this.messagesRef = firebase.database().ref("messages");
		this.messagesRef.off();
		console.log(this.messagesRef);
		
		const onReceive = (data) => {
			const messages = data.val();
			callback({
				_id: data.key, 
				text: messages.text, 
				createdAt: new Data(message.createdAt),
				user: {
					_id: message.user._id,
					name: message.user.name
				},
			})
		};
		this.messageRef.limitToLast(20).on("child_added", onReceive);
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