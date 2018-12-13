import React, {Component} from "react";
import {View, Text, FlatList, ScrollView} from "react-native";
import FontAwesome, {Icons} from "react-native-fontawesome";

const Menu = () => {
  return(
    <View style = {styles.container}>
      <ScrollView>
      <View style = {{margin: 15}}>
        <Text style  ={styles.categorie}> Sports </Text>
        <View>
          <Text style = {styles.sport}>  <FontAwesome style = {{fontSize: 25, color: "gray"}}> {Icons.circle} </FontAwesome> Soccer</Text>
          <Text style = {styles.sport}> <FontAwesome style = {{fontSize: 25, color: "gray"}}> {Icons.circle} </FontAwesome> Football</Text>
          <Text style = {styles.sport}> <FontAwesome style = {{fontSize: 25, color: "gray"}}> {Icons.circle} </FontAwesome> Baseball</Text>
          <Text style = {styles.sport}> <FontAwesome style = {{fontSize: 25, color: "gray"}}> {Icons.circle} </FontAwesome> Basketball</Text>
          <Text style = {styles.sport} > <FontAwesome style = {{fontSize: 25, color: "gray"}}> {Icons.circle} </FontAwesome> Fight</Text>
          <Text style = {styles.sport}> <FontAwesome style = {{fontSize: 25, color: "gray"}}> {Icons.circle} </FontAwesome> Baseball</Text>
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



