import React, {Component} from "react";
import {View, Text, TouchableOpacity, ScrollView} from "react-native";
import FontAwesome, {Icons} from "react-native-fontawesome";
import SegmentedControlTab from 'react-native-segmented-control-tab';

class BetModal extends Component{

  userList(list){
    return list.map(u => {
      return(
        <TouchableOpacity>
          <View style = {styles.tableStyle}>
            <Text style = {styles.userTab}>{u.user}</Text>
            <Text style = {styles.userTab}>{u.bet} <FontAwesome>{Icons.bitcoin}</FontAwesome></Text>
            <FontAwesome style = {styles.userTab}>{Icons.chevronRight}</FontAwesome>
          </View>
        </TouchableOpacity>
      );
    })
  }

  betChoice(){
    if(this.props.choice == 1){
      if(this.props.index == 0){
        return(
            <View>
              <Text style = {[styles.title, {marginBottom: 10}]}>{this.props.teamsNotSelected[0]}</Text>
              {this.userList(this.props.list1)}
            </View>
        );
      } else {
          return(
            <View>
              <Text style = {styles.title}>{this.props.teamsNotSelected[1]}</Text>
              {this.userList(this.props.list2)}
            </View>

          );
        }
    } else if(this.props.choice == 2) {
          return(
            <View style = {{ felx: 1, backgroundColor: "#ffff" }}>
              <Text> How much you want to bet to {this.props.team}</Text>
              <TouchableOpacity style = {{alignSelf: "center", marginTop: 20}} onPress = {this.props.visible}>
                <Text >
                  X
                </Text>
              </TouchableOpacity>
            </View>
          );
    }
  }

  render(){
    return(
      <View style = {{flex: 1, backgroundColor: "white"}}>

          <TouchableOpacity style = {styles.closeModal} onPress  = {this.props.visible}>
            <Text style = {{color: "#00B073", fontSize: 17}}>
              X
            </Text>
          </TouchableOpacity>
          <Text style = {styles.choose}>Choose an oponent</Text>

        <SegmentedControlTab
            values={this.props.teamsNotSelected}
            tabTextStyle = {{color: "#00B073", fontWeight: "400", fontSize: 15}}
            tabStyle = {{borderColor: "#00B073", backgroundColor: "white"}}
            selectedIndex={this.props.index}
            activeTabStyle = {{backgroundColor: "#00B073"}}
            onTabPress={this.props.segmentedController}
        />
        <ScrollView>
          {this.betChoice()}
        </ScrollView>
      </View>
    );
  }
}

const styles ={
  title: {
    fontSize: 18,
    fontWeight: "500",
    alignSelf: "center",
    marginTop: 5
  },
  choose: {
    fontSize: 18,
    fontWeight: "500",
    alignSelf: "center",
    marginBottom: 10,
    color: "#00B073"
  },
  closeModal: {
    marginTop: 10,
    marginLeft: 5,
    fontWeight: "bold",
    fontSize: 13
  },
  tables: {
    flexDirection: "row",
    padding: 10,
    justifyContent:"space-between",
    margin: 15
  },
  userTab: {
    padding: 20,
  },
  tableStyle: {
    flexDirection: "row",
    backgroundColor: "#F5F5F5",
    borderBottomWidth: 1,
    borderBottomColor: "white",
    justifyContent: "space-between",
    marginBottom: 10
  }
};

export default BetModal;
