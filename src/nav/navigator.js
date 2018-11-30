import React, {Component} from "react";
import {TouchableOpacity,} from "react-native";
import { addNavigationHelpers, StackNavigator, createBottomTabNavigator, NavigationActions, TabBarBottom  } from 'react-navigation';
import Home from "../components/home";
import Top from "../components/top";
import Description from "../components/description";
import Match from "../components/match";
import Profile from "../components/profile";
import FontAwesome, { Icons } from 'react-native-fontawesome';


export const MainScreen = createBottomTabNavigator({

  Home: {
    screen: Home,
    navigationOptions: {
      title: "Home",
      tabBarLabel: "HOME",
      tabBarIcon: ({focused, tintColor}) => <FontAwesome style = {{color: tintColor, fontSize: 25}}>{Icons.home}</FontAwesome>
    },
  },
  Top: {
    screen: Top,
    navigationOptions: {
      tabBarLabel: "TOP",
      tabBarIcon: ({focused, tintColor}) => <FontAwesome style = {{color: tintColor, fontSize: 25}}>{Icons.star}</FontAwesome>
    }
  },
  Match: {
    screen: Match,
    navigationOptions: {
      tabBarLabel: "MATCH",
      tabBarIcon: ({focused, tintColor}) => <FontAwesome style = {{color: tintColor, fontSize: 25}}>{Icons.retweet}</FontAwesome>
    }
  },
  Profile: {
    screen: Profile,
    navigationOptions: {
      tabBarLabel: "PROFILE",
      tabBarIcon: ({focused, tintColor}) => <FontAwesome style = {{color: tintColor, fontSize: 25}}>{Icons.user}</FontAwesome>
    }
  }
},
  //Diseño custom del tabBar
    {
      tabBarOptions: {
          showLabel: true,
          activeTintColor: '#00B073',
          inactiveTintColor: 'white',
          showIcon : true,
          style: {
              backgroundColor: "black",
              height: 55,
              borderTopColor: 'transparent',
              borderTopWidth: 1,
              paddingRight: 10,
              paddingLeft: 10,
              borderTopColor: "grayPlaceHolder",
          },
      }
    }
);

const AppNavigator = StackNavigator({

  MainScreen: {
    screen: MainScreen,
      navigationOptions:{
      // title: "",
      // headerStyle: {
      //   backgroundColor: "black",
      //   borderBottomColor: "black",
      //   elevation: 3
      // },
      // headerTintColor: "#7DDECC",
      header: null
    }
  },
  Description: {
    screen: Description,
    navigationOptions: {
      title: "Info",
      headerTintColor: "#7DDECC",
      headerStyle: {
        backgroundColor: "black",
        borderBottomColor: "black"
      }
    }
  },
});

class Nav extends Component{
  render(){
    return(
      <AppNavigator/>
    );
  }
}

export default Nav;
