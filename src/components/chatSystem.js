import firebase from "firebase";

class ChatSystem{
	uid = "";
	messagesRef = null;

	messages = null;

	constructor(){

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

	



	closeChat(){
		if(this.messageRef){
			this.messagesRef.off();
		}
	}
}


export default new ChatSystem();