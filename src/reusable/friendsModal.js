import React, {Component} from "react";
import {View, Text, TouchableOpacity} from "react-native";
import UserList1 from "../constants/userList1";

class FriendsModal extends Component{

  renderFriendList(){
    return userList1.map((u, index) => {
      return(
        <View>
          <TouchableOpacity  key = {index}>
          <View style = {styles.tableStyle}>
            <View style = {{flexDirection: "row", justifyContent:"space-between"}}>
              <View style= {{flexDirection:"row"}}>
                <Image
                  source = {{uri: u.image}}
                  style = {styles.image}
                />
                <Text style = {{ marginTop: 10, color: "#ffff", fontSize: 13, fontWeight: "300"}}>{u.user}</Text>
              </View>
              <FontAwesome style = {{color:"gray", marginTop: 32, marginRight: 5}}>{Icons.chevronRight}</FontAwesome>
            </View>
          </View>

        </TouchableOpacity>
        </View>
      );
    })
  }

  render(){
    return(
      <View style = {styles.container}>
          <TouchableOpacity onPress= {this.props.hideShow}>
            <Text style= {{color: "#00B073", margin: 5, fontWeight: "300"}}>Close</Text>
          </TouchableOpacity>
          {this.renderFriendList()}
      </View>
    );
  }
}


const styles = {
  container: {
    flex: 1,
    backgroundColor: "#161616"
  },
  tableStyle: {
    marginBottom: 5,
    padding: 15,
    borderBottomWidth: 0.3,
    borderBottomColor: "gray",
  },
  image: {
    width: 45,
    height: 45,
    marginRight: 15,
    marginLeft: 6,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
  },
}

export default FriendsModal;
