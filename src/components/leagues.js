import React, {Component} from "react";
import {View, Text, Image, TouchableOpacity, Picker, Dimensions} from "react-native";
import FontAwesome, {Icons} from "react-native-fontawesome";
import { NavigationActions } from 'react-navigation';
import LinearGradient from "react-native-linear-gradient";

const WIDTH = Dimensions.get("window").width;

class Leagues extends Component{
  constructor(props){
    super(props);
    this.state = {league: ""}
  }


  render(){
    console.log(this.state.league);
    const pick = {
      inputIOS: {
        color: 'white',
        paddingTop: 13,
        paddingHorizontal: 10,
        paddingBottom: 12,
      },
      inputAndroid: {
        color: 'white',
      },
      androidPicker: {
            color: 'red',
            backgroundColor: 'red',
            marginBottom: 20,
            height: 40,
            alignSelf: 'center', 
            justifyContent:'center',
      },
      placeholderColor: 'white',
      underline: { borderTopWidth: 0 },
      icon: {
        position: 'absolute',
        backgroundColor: 'transparent',
        borderTopWidth: 5,
        borderTopColor: '#00000099',
        borderRightWidth: 5,
        borderRightColor: 'transparent',
        borderLeftWidth: 5,
        borderLeftColor: 'transparent',
        width: 0,
        height: 0,
        top: 20,
        right: 15,
      },
    };

    let renderLeagues = this.props.leagues.map((l, i) => {
      return <Picker.Item key = {i} label = {l.name} value ={l.name}/>

    })

    return(
      <LinearGradient  style = {{flex: 1, position: "relative"}} start={{x: 0, y: 0}} end={{x: 4 , y: 1}} colors = {[ "black", "gray"]}>
          <TouchableOpacity
               onPress = {this.props.close}
               style= {{margin: 10}}
            >
             <Text style = {{color: "#00B073", fontSize: 21}}>
                X
             </Text>
          </TouchableOpacity>
         <View style = {styles.pickerContainer}>
          <Picker
              itemStyle ={pick}
              selectedValue={this.state.league}
              onValueChange={(itemValue, itemIndex) => this.setState({league: itemValue})}
            >
              {renderLeagues}
          </Picker>
        </View>

          <TouchableOpacity
             onPress = {() => {this.props.filter("FilteredEvents", this.state.league); this.props.close(); } }
             style= {styles.button}
          >
           <Text style = {styles.buttonText}>
              Search
           </Text>
          </TouchableOpacity>
      </LinearGradient>
    );
  }
}

const styles = {
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
    color: "#DCDCDC",
    textAlign: "left",
    height: 300,
    fontSize: 20,
    borderBottomColor: "white",
    borderBottomWidth:1,
    underline: { borderWidth: 0, borderColor: "white" }
  },
  pickerContainer: {
    justifyContent: 'center',
    marginLeft: 27,
    position: 'absolute',
    top: 0,left: 0,
    right: 0, bottom: 0,
  },
  title: {
    color: "#00B073",
    fontSize: 29,
    fontStyle: "oblique",
    alignSelf: "center",
    marginTop: 55
  }
}

export default Leagues;
