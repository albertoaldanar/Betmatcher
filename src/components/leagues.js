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

        <Text style = {{marginTop: 10, color: "#DCDCDC", fontSize: 18, marginLeft: 16}}> X </Text>

        <View>
          <Text style = {{marginTop: 20, color: "#00B073", fontSize: 22, fontStyle: "oblique", alignSelf: "center"}}>Soccer Leagues</Text>
        </View>

        <View style = {styles.pickerContainer}>
          <Picker
            itemStyle ={styles.pickerStyle}
            selectedValue={this.state.league}
            onValueChange={(itemValue, itemIndex) => this.setState({league: itemValue})}
          >
            <Picker.Item label="UEFA Champions League (EU)" value="champions" />
            <Picker.Item label= "Premier League (ENG)"value="premier" />
            <Picker.Item label="La liga (ES)"  value="laliga" />
            <Picker.Item label="Bundesliga" value="bundesliga" />
            <Picker.Item label="Ligue Une (FR)"  value="ligueune" />
            <Picker.Item label="Serie A (IT)" value="seriea" />
            <Picker.Item label="Liga MX (MX)" value="ligamx" />
          </Picker>
        </View>

          <TouchableOpacity
             onPress = {this.props.close}
             style= {styles.button}
          >
           <Text style = {styles.buttonText}>
              Search
           </Text>
          </TouchableOpacity>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#161616",
    position: "relative"
  },
  button: {
    position: "absolute",
    backgroundColor: "#00B073",
    padding: 12,
    width: WIDTH,
    bottom: 0
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "300",
  },
  pickerStyle: {
    color: "white",
    textAlign: "left",
    height: 250
  },
  pickerContainer: {
    justifyContent: 'center',
    marginLeft: 10,
    position: 'absolute',
    top: 0, left: 0,
    right: 0, bottom: 0,
  }
}

export default Leagues;
