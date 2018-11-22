
import React, {Component} from "react";
import { addNavigationHelpers, StackNavigator, createBottomTabNavigator, NavigationActions, TabBarBottom  } from 'react-navigation';
import Sports from "../components/sports";
import Top from "../components/top";
import Description from "../components/description";
import Profile from "../components/profile";
import FontAwesome, { Icons } from 'react-native-fontawesome';

export const MainScreen = createBottomTabNavigator({

  Sports: {
    screen: Sports,
    navigationOptions: {
      title: "Hello",
      tabBarLabel: "BUSCAR",
      tabBarIcon: ({focused, tintColor}) => <FontAwesome style = {{color: tintColor, fontSize: 25}}>{Icons.home}</FontAwesome>
    },
  },
  Top: {
    screen: Top,
    navigationOptions: {
      tabBarLabel: "TICKETS",
      tabBarIcon: ({focused, tintColor}) => <FontAwesome style = {{color: tintColor, fontSize: 25}}>{Icons.star}</FontAwesome>
    }
  },
  Description: {
    screen: Description,
    navigationOptions: {
      tabBarLabel: "GROUP UP",
      tabBarIcon: ({focused, tintColor}) => <FontAwesome style = {{color: tintColor, fontSize: 25}}>{Icons.connectdevelop}</FontAwesome>
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
          showLabel: false,
          activeTintColor: '#7DDECC',
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
    navigationOptions: {
      title: "Betmatcher",
      headerStyle: {
        backgroundColor: "black",
      },
      headerTintColor: "#7DDECC",
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
