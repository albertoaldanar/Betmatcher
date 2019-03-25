import React, {Component} from "react";
import {ScrollView, Text, View, Image, TouchableOpacity} from "react-native";

class Scroll extends Component {

  renderScroll(list){
    return list.map((u, index) => {
      return(
        <TouchableOpacity>
          <View style = {{flexDirection:"column", alignSelf:"center", marginLeft:10}}>
            <View style = {{marginRight: 50}}>
              <Image
                  source = {{uri: u.image}}
                  style = {styles.image}
              />
              <Text style = {{color: "white", alignSelf:"center"}}>{u.user}</Text>
              <Text style = {{color: "#DAA520", marginTop: 15, alignSelf: "center"}}>{u.bet}</Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    })
  }

  render(){
    return(
        <View style = {{flex: 1, backgroundColor: "#161616"}}>
          <ScrollView horizontal height = {280}>
            {this.renderScroll(this.props.list)}
          </ScrollView>
        </View>
    );
  }
}

const styles = {
    image: {
      width: 45,
      height: 45,
      marginRight: 15,
      marginLeft: 6,
      marginBottom:10,
      alignSelf:"center",
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

export default Scroll;
