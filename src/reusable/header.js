import React, {Component} from "react";
import {View, Text, ScrollView, TouchableOpacity} from "react-native";
import FontAwesome, {Icons} from "react-native-fontawesome";

class Header extends Component {

  constructor(props){
    super(props);
    this.state = {
      isOpen: false
    }
  }

  onPressButton(){
    this.setState({isOpen: !this.state.isOpen});
  }

  render(){
    return(
      <View style = {styles.container}>
        <TouchableOpacity onPress={this.onPressButton.bind(this)}>
          <FontAwesome style ={styles.listIcon}>{Icons.list}</FontAwesome>
        </TouchableOpacity>
        <Text style = {styles.title}>Betmatcher</Text>
      </View>
    );
  }
}

const styles = {
  container: {
    backgroundColor: "black",
    flexDirection: "row",
    padding: 20,
  },
  title: {
    color: "#7DDECC",
    paddingTop: 10,
    fontSize: 15
  },
  listIcon: {
    color: "#7DDECC",
    fontSize: 16,
    paddingRight: 20,
    paddingTop: 10
  }
}

export default Header;
