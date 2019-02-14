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
    let renderLeagues = this.props.league.leagues.map((l, i) => {
      return <Picker.Item key = {i} label = {l} value ={l}/>
    })

    return(
      <View style = {styles.container}>

        <TouchableOpacity onPress = {this.props.close}>
          <Text style = {{marginTop: 10, color: "#DCDCDC", fontSize: 18, marginLeft: 16, fontWeight:"400"}}> X </Text>
        </TouchableOpacity>
        <View>
          <Text style = {styles.title}>Soccer Leagues</Text>
        </View>

        <Picker
            itemStyle ={styles.pickerStyle}
            selectedValue={this.state.league}
            onValueChange={(itemValue, itemIndex) => this.setState({league: itemValue})}
          >
            {renderLeagues}
        </Picker>

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
    color: "#DCDCDC",
    textAlign: "left",
    height: 300
  },
  pickerContainer: {
    justifyContent: 'center',
    marginLeft: 27,
    position: 'absolute',
    top: 0, left: 0,
    right: 0, bottom: 0,
  },
  title: {
    marginTop: 20,
    color: "#00B073",
    fontSize: 29,
    fontStyle: "oblique",
    alignSelf: "center"
  }
}

export default Leagues;
