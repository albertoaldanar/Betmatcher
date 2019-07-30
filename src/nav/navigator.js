import React, {Component} from "react";
import {TouchableOpacity, Image, AsyncStorage} from "react-native";
import { addNavigationHelpers, StackNavigator, createBottomTabNavigator, NavigationActions, TabBarBottom  } from 'react-navigation';
import Home from "../components/home";
import Top from "../components/top";
import Friends from "../components/friends"
import Description from "../components/description";
import Match from "../components/match";
import FilteredEvents from "../components/filteredEvents";
import ConfirmBet from "../components/confirmBet";
import Profile from "../components/profile";
import Login from "../components/login";
import YouHaveMatch from "../components/youHaveMatch";
import TopRequests from "../components/topRequests";
import AllLeagues from "../components/allLeagues";
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
      tabBarLabel: "MY BETS",
      tabBarIcon: ({focused, tintColor}) => <FontAwesome style = {{color: tintColor, fontSize: 25}}>{Icons.comments}</FontAwesome>
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

export const AppNavigatorMain = StackNavigator({
    MainScreen: {
    screen: MainScreen,
      navigationOptions:{
        gesturesEnabled: false,
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
  Login: {
      screen: Login,
      navigationOptions: {
        header: null,
        gesturesEnabled: false
      }
  },
  Friends: {
    screen: Friends,
    navigationOptions: {
      title: "Betfriends",
      headerTintColor: "#00B073",
      headerStyle: {
        backgroundColor: "black",
        borderBottomColor: "black"
      }
    }
  },
  Description: {
    screen: Description,
    navigationOptions: {
      title: "Info",
      headerTintColor: "#00B073",
      headerStyle: {
        backgroundColor: "black",
        borderBottomColor: "black"
      }
    }
  },
  ConfirmBet: {
    screen: ConfirmBet,
    navigationOptions: {
      title: "Confirm Bet",
      headerTintColor: "#00B073",
      headerStyle: {
        backgroundColor: "black",
        borderBottomColor: "black"
      }
    }
  },
  YouHaveMatch: {
    screen: YouHaveMatch,
    navigationOptions: {
      header: null
    }
  },
  TopRequests: {
    screen: TopRequests,
    navigationOptions: {
      title: "Live Unmatched bets",
      headerTintColor: "#00B073",
      headerStyle: {
        backgroundColor: "black",
        borderBottomColor: "black"
      }
    }
  },
  FilteredEvents: {
    screen: FilteredEvents,
    navigationOptions: {
      title: "Events",
      headerTintColor: "#00B073",
      headerStyle: {
        backgroundColor: "black",
        borderBottomColor: "black"
      }
    }
  },
  AllLeagues: {
    screen: AllLeagues,
    navigationOptions: {
      title: "All Leagues",
      headerTintColor: "#00B073",
      headerStyle: {
        backgroundColor: "black",
        borderBottomColor: "black"
      }
    }
  },

});


export const AppNavigatorLogin = StackNavigator({
    Login: {
      screen: Login,
      navigationOptions: {
        header: null,
        gesturesEnabled: false
      }
    },
    MainScreen: {
    screen: MainScreen,
      navigationOptions:{
        gesturesEnabled: false,
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
  Friends: {
    screen: Friends,
    navigationOptions: {
      title: "Betfriends",
      headerTintColor: "#00B073",
      headerStyle: {
        backgroundColor: "black",
        borderBottomColor: "black"
      }
    }
  },
  Description: {
    screen: Description,
    navigationOptions: {
      title: "Info",
      headerTintColor: "#00B073",
      headerStyle: {
        backgroundColor: "black",
        borderBottomColor: "black"
      }
    }
  },
  ConfirmBet: {
    screen: ConfirmBet,
    navigationOptions: {
      title: "Confirm Bet",
      headerTintColor: "#00B073",
      headerStyle: {
        backgroundColor: "black",
        borderBottomColor: "black"
      }
    }
  },
  YouHaveMatch: {
    screen: YouHaveMatch,
    navigationOptions: {
      header: null
    }
  },
  TopRequests: {
    screen: TopRequests,
    navigationOptions: {
      title: "Live Unmatched bets",
      headerTintColor: "#00B073",
      headerStyle: {
        backgroundColor: "black",
        borderBottomColor: "black"
      }
    }
  },
  FilteredEvents: {
    screen: FilteredEvents,
    navigationOptions: {
      title: "Events",
      headerTintColor: "#00B073",
      headerStyle: {
        backgroundColor: "black",
        borderBottomColor: "black"
      }
    }
  },
  AllLeagues: {
    screen: AllLeagues,
    navigationOptions: {
      title: "All Leagues",
      headerTintColor: "#00B073",
      headerStyle: {
        backgroundColor: "black",
        borderBottomColor: "black"
      }
    }
  },

});
// class Nav extends Component{
//   render(){
//     return(
//       <AppNavigator/>
//     );
//   }
// }

// export default Nav;
