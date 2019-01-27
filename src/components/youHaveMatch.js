import React, {Component} from "react";
import {View, Text, TouchableOpacity, Image} from "react-native";
import FontAwesome, {Icons} from "react-native-fontawesome";

class YouHaveMatch extends Component{
  render(){
    return(
        <View style = {styles.container}>
            <View>
              <Text style = {styles.matchTitle}>You have a match!</Text>
            </View>

            <View style = {styles.users}>
              <View>
                <Image
                  source = {{uri: "https://png.pngtree.com/svg/20170104/__user_login_icon_307830.png"}}
                  style= {styles.image}
                />
                <Text style = {styles.text}>You</Text>
                <Text style = {styles.text}>{this.props.teamSelected}</Text>
              </View>

              <Text style = {{fontWeight:"300", fontStyle: "oblique", marginTop: 15, color: "#ffff"}}>VS.</Text>

              <View>
                <Image
                  source = {{uri: "https://png.pngtree.com/svg/20170104/__user_login_icon_307830.png"}}
                  style= {styles.image}
                />
                <Text style = {styles.text}>{this.props.user.user}</Text>
                <Text style = {styles.text}>{this.props.teamsNotSelected}</Text>
              </View>
            </View>

            <Text style = {[styles.text, {color: "#DAA520"}]}>{this.props.user.bet} <FontAwesome>{Icons.bitcoin}</FontAwesome> </Text>

            <TouchableOpacity style = {styles.buttonCointainer} onPress = {this.props.sendToMatches}>
              <Text style = {styles.buttonText}>CONTINUE</Text>
            </TouchableOpacity>
        </View>

    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#161616"
  },
  matchTitle: {
    color:"#00B073",
    fontWeight: "300",
    fontStyle: "oblique",
    fontSize: 30,
    alignSelf: "center",
    marginTop: 35,
  },
  buttonCointainer: {
    backgroundColor: "#00B073",
    padding: 20,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0
  },
  buttonText: {
    color: "white",
    alignSelf: "center",
    fontSize: 17
  },
  users: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 30
  },
  image: {
    width: 50,
    height: 50
  },
  text: {
    color: "white",
    fontSize: 15,
    alignSelf: "center",
    marginTop: 7
  }
}

export default YouHaveMatch;
