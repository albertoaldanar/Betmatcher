import React, {Component} from "react";
import {View, Text, Dimensions, TouchableOpacity} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import CheckBox from 'react-native-check-box'
import Details from "../constants/eventsDetails";
import Card from "../reusable/card";
import FontAwesome, {Icons} from "react-native-fontawesome";
import AwesomeAlert from 'react-native-awesome-alerts';

class Friends extends Component{
  constructor(props){
    super(props);
    this.state = {
      showLightBox: true,
      users: 14
    }
  }

  changeState(){
    this.setState({showLightBox: !this.state.showLightBox})
  }

  render(){
    const {showLightBox} = this.state;
    return(
      <View style = {styles.container}>
        <AwesomeAlert
          show={showLightBox}
          showProgress={false}
          progressColor= "#00B073"
          title="14 users to match"
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={true}
          cancelText="Match a user"
          confirmText="Make new bet"
          confirmButtonColor="red"
          onCancelPressed={() => {
            this.changeState();
          }}
          onConfirmPressed={() => {
            this.changeState();
          }}
          titleStyle = {{color: "#00B073"}}
          cancelButtonColor =  "#00B073"
          cancelButtonStyle = {{padding: 20}}
          confirmButtonStyle = {{padding: 20}}
          alertContainerStyle = {{padding: 40}}
        />
      </View>
    );
  }
}

const styles = {
  container: {
    backgroundColor: "black",
    flex: 1
  }

}


export default Friends;
