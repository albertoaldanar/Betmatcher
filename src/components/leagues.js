import React, {Component} from "react";
import {View, Text, Image, TouchableOpacity, Picker, Dimensions} from "react-native";
import FontAwesome, {Icons} from "react-native-fontawesome";

const WIDTH = Dimensions.get("window").width;

class Leagues extends Component{
  constructor(props){
    super(props);
    this.state = {league: ""}
  }

  render(){
    return(
      <View style = {styles.container}>
        <Picker
          itemStyle ={styles.pickerStyle}
          selectedValue={this.state.league}
          onValueChange={(itemValue, itemIndex) => this.setState({league: itemValue})}
        >
          <Picker.Item label="Premier League" value="premier" />
          <Picker.Item label="La liga" value="laliga" />
          <Picker.Item label="Bundesliga" value="bundesliga" />
          <Picker.Item label="UEFA Champions League" value="champions" />
          <Picker.Item label="Liga MX" value="ligamx" />
        </Picker>


          <TouchableOpacity
             onPress = {this.props.closeModal}
             style= {styles.button}
          >
           <Text style = {styles.buttonText}>
              Search <FontAwesome style = {{fontSize: 20, color: "white"}}>{Icons.search}</FontAwesome>
           </Text>
          </TouchableOpacity>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#1A1919",
    justifyContent: "center"
  },
  button: {
    position: "absolute",
    backgroundColor: "#7DDECC",
    padding: 15,
    width: WIDTH,
    bottom: 5
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  pickerStyle: {
    height: 400,
    color: "white"
  }
}

export default Leagues;
