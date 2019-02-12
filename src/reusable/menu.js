import React, {Component} from "react";
import {View, Text, FlatList, ScrollView, Image, TouchableOpacity} from "react-native";
import FontAwesome, {Icons} from "react-native-fontawesome";
import LinearGradient from "react-native-linear-gradient";

const Menu = (props) => {
  return(
    <View style = {styles.container}>

        <LinearGradient start={{x: 0, y: 0}} end={{x: 4 , y: 0}} colors = {[ "#1A1919", "gray",]}>
          <View style = {{padding: 20}}>
            <Image
              source = {{uri: "https://yena.co.uk/wp-content/uploads/2018/01/profile-circle.png"}}
              style = {{width: 80, height: 80, marginBottom: 10, alignSelf: "center"}}
            />
            <Text style= {{color:"#00B073", marginBottom: 10, fontSize: 20, fontWeight: "600"}}>albertoaldanr</Text>
            <Text style= {{color:"gray", marginBottom: 10, fontSize: 12, fontWeight: "400", fontStyle: "oblique"}}>Mexico <FontAwesome>{Icons.flag}</FontAwesome></Text>
            <Text style= {{color:"#DAA520", marginBottom: 10}}>14,567 <FontAwesome>{Icons.bitcoin}</FontAwesome></Text>
            </View>
        </LinearGradient>

    <ScrollView>
      <View style = {{margin: 15, marginTop:10}}>
        <Text style  ={styles.categorie}> Sports </Text>
        <View>
          <TouchableOpacity onPress = {props.open}>
            <Text style = {styles.sport}>    <Image source= {{uri: "https://icons-for-free.com/free-icons/png/512/315754.png"}} style = {{width: 21, height: 21}}/> Soccer </Text>
          </TouchableOpacity>

          <Text style = {styles.sport}>    <Image source= {{uri: "https://www.shareicon.net/download/2015/09/08/97748_ball_512x512.png"}} style = {{width: 21, height: 21}}/> Tennis</Text>
          <Text style = {styles.sport}>    <Image source= {{uri: "https://images.vexels.com/media/users/3/156514/isolated/preview/6a0a8a3bcef64493bb99d68e628992f4-american-football-helmet-flat-icon-by-vexels.png"}} style = {{width: 21, height: 21}}/> Football </Text>
          <Text style = {styles.sport}>    <Image source= {{uri: "https://cdn1.iconfinder.com/data/icons/hawcons/32/700378-icon-1-basketball-512.png"}} style = {{width: 21, height: 21}}/> Basketball</Text>
          <Text style = {styles.sport}>    <Image source= {{uri: "https://cdn2.iconfinder.com/data/icons/boxing/500/Boxing_17-512.png"}} style = {{width: 21, height: 21}}/> Fight</Text>
          <Text style = {styles.sport}>    <Image source= {{uri: "https://cdn1.iconfinder.com/data/icons/hawcons/32/700389-icon-2-baseball-512.png"}} style = {{width: 21, height: 21}}/> Baseball</Text>
        </View>

        <Text style  ={styles.categorie}> Options </Text>
          <View style ={{marginLeft: 25}}>
            <Text style = {styles.sport}>How to bet?</Text>
            <Text style = {styles.sport}>Change coins</Text>
            <Text style = {styles.sport}>Prices list</Text>
          </View>

        <Text style  ={styles.categorie}> Account </Text>
          <View style ={{marginLeft: 25}}>
            <Text style = {styles.sport}>Logout</Text>
            <Text style = {styles.sport}>Change coins</Text>
            <Text style = {styles.sport}>Prices list</Text>
          </View>
      </View>
      </ScrollView>
    </View>
  );
}

const styles = {
  container: {
    backgroundColor: "white",
    flex: 1
  },
  categorie: {
    color: "#00B073",
    fontSize: 19,
    fontWeight: "500",
    marginBottom: 5
  },
  sport: {
    color: "black",
    marginBottom: 12,
    marginLeft: 12,
    fontSize: 16
  }
}

export default Menu;



