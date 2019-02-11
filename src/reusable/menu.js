import React, {Component} from "react";
import {View, Text, FlatList, ScrollView, Image} from "react-native";
import FontAwesome, {Icons} from "react-native-fontawesome";

const Menu = () => {
  return(
    <View style = {styles.container}>
      <ScrollView>
      <View style = {{margin: 15, marginTop: 19}}>
        <Text style  ={styles.categorie}> Sports </Text>
        <View>
          <Text style = {styles.sport}> <Image source= {{uri: "https://icons-for-free.com/free-icons/png/512/315754.png",}} style = {{width: 35, height: 35}}/> Soccer </Text>
          <Text style = {styles.sport}> <Image source= {{uri: "https://cdn1.iconfinder.com/data/icons/hawcons/32/698307-icon-3-tennis-ball-512.png"}} style = {{width: 35, height: 35}}/> Tennis</Text>
          <Text style = {styles.sport}> <Image source= {{uri: "https://cdn2.iconfinder.com/data/icons/university-set-4/512/10-512.png"}} style = {{width: 35, height: 35}}/> Football </Text>
          <Text style = {styles.sport}> <Image source= {{uri: "https://cdn1.iconfinder.com/data/icons/hawcons/32/700378-icon-1-basketball-512.png"}} style = {{width: 35, height: 35}}/> Basketball</Text>
          <Text style = {styles.sport}> <Image source= {{uri: "https://cdn2.iconfinder.com/data/icons/boxing/500/Boxing_14-512.png"}} style = {{width: 35, height: 35}}/> Fight</Text>
          <Text style = {styles.sport}> <Image source= {{uri: "https://cdn1.iconfinder.com/data/icons/hawcons/32/700389-icon-2-baseball-512.png"}} style = {{width: 35, height: 35}}/> Baseball</Text>
        </View>

        <Text style  ={styles.categorie}> Options </Text>
        <Text style  ={styles.categorie}> Account </Text>
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
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 5
  },
  sport: {
    color: "black",
    marginBottom: 8,
    marginLeft: 15,
    fontSize: 25
  }
}

export default Menu;



