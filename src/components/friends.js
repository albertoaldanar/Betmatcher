import React, {Component} from "react";
import {View, Text, Dimensions} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import CheckBox from 'react-native-check-box'


class Friends extends Component{
  constructor(props){
    super(props);
    this.state = {
      isChecked: false
    }
  }

  render(){
    return(
        <View style = {{flex: 1, backgroundColor:"#1A1919"}}>
          <CheckBox
            style={{ padding: 10, color: "white", backgroundColor: "white"}}
            onClick={()=>{
              this.setState({
                  isChecked: !this.state.isChecked
              })
            }}
            isChecked={this.state.isChecked}
            leftText={"CheckBox"}
            leftTextStyle = {{color: "white"}}
          />
        </View>
    );
  }
}


export default Friends;
