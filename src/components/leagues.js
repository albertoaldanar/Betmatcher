import React, {Component} from "react";
import {View, Text, Image, TouchableOpacity, Picker, Dimensions} from "react-native";
import FontAwesome, {Icons} from "react-native-fontawesome";
import { NavigationActions } from 'react-navigation';

const WIDTH = Dimensions.get("window").width;

class Leagues extends Component{
  constructor(props){
    super(props);
    this.state = {league: ""}
  }

  render(){
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

    let renderLeagues = this.props.league.leagues.map((l, i) => {
      return <Picker.Item key = {i} label = {l} value ={l}/>

    })

    return(
      <View style = {styles.container}>
        <View>
          <Image source = {require('../images/flechasd.png')} style = {{width: 120, height: 110, alignSelf: "center", marginBottom: -10, marginTop: 15}}/>
          <Text style = {styles.title}>{this.props.league.name} leagues</Text>
        </View>
        <View style = {styles.pickerContainer}>
          <Picker
              itemStyle ={styles.pickerStyle}
              selectedValue={this.state.league}
              onValueChange={(itemValue, itemIndex) => this.setState({league: itemValue})}
            >
              {renderLeagues}
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
    backgroundColor: "#34D1B6",
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
    underline: { borderWidth: 0, borderColor: "white" },
  },
  pickerContainer: {
    justifyContent: 'center',
    marginLeft: 27,
    position: 'absolute',
    top: 0,left: 0,
    right: 0, bottom: 0,
  },
  title: {
    color: "#34D1B6",
    fontSize: 29,
    fontStyle: "oblique",
    alignSelf: "center"
  }
}

export default Leagues;
