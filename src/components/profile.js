import React, {Component} from "react";
import {View, Text, Image, TextInput, TouchableOpacity, Dimensions, StatusBar, ScrollView, AsyncStorage, ActivityIndicator} from "react-native";
import { addNavigationHelpers, StackNavigator, NavigationActions } from 'react-navigation';
import Header from "../reusable/header";
import User from "../constants/user";
import FontAwesome, {Icons} from "react-native-fontawesome";
import LinearGradient from "react-native-linear-gradient";
import ProfileCharts from "../reusable/profileCharts";
import {
  BarChart,
  LineChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from 'react-native-chart-kit'
import {Pages} from "react-native-pages";
import Url from "../constants/url";
import MaterialTabs from "react-native-material-tabs";


class Profile extends Component{

  _isMounted = false;
  _data =  [0];


  constructor(props){
    super(props);
    this.state = {
      username:"", won: "", lost:"", draw:"", country: "", 
      currentUser: "", currentToken: "", coins: 0, index: 0, tradesList:[],
      loading: true, chartData: []
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleLogout(){
    try {
      AsyncStorage.removeItem("username");
      AsyncStorage.removeItem('token');
      AsyncStorage.removeItem('coins');
    } catch (error) {
    console.log(error.message);
    }

    const navigateAction = NavigationActions.navigate({
      routeName: "Login"
    })
    this.props.navigation.dispatch(navigateAction);
  }


  async componentDidMount(){
    return this.getData();
  }

  async getData(){
    this._isMounted = true;

      const usernameGet = await AsyncStorage.getItem('username');
        if (usernameGet) {
          this.setState({ currentUser: usernameGet});
        } else {
          this.setState({ currentUser: false });
      }

      const tokenGet = await AsyncStorage.getItem('token');
        if (tokenGet) {
          this.setState({ currentToken: tokenGet });
        } else {
          this.setState({ currentToken: false });
      }

      return fetch(`http://${Url}:8000/user_records?current_user=${this.state.currentUser}`, {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Content-type": "application/json",
          // "Authorization": `Token ${this.state.currentToken}`
        }
      })
      .then(res => res.json())
      .then(jsonRes => {
        if(this._isMounted){
          this.setState({
                username: jsonRes.user.username,
                won: jsonRes.user.profile.won,
                lost: jsonRes.user.profile.lost,
                draw: jsonRes.user.profile.draw,
                country: jsonRes.user.profile.country,
                coins: jsonRes.user.profile.coins,
                tradesList: jsonRes.finished_trades

          })
        }
      }).then(() => this.analysis())
      .catch(error => console.log(error));
  }

  changeIndex(index){
    this.setState({ index });
    // this.getData();
  }


  renderFriends(){
    const navigateAction = NavigationActions.navigate({
      routeName: "Friends",
      params: {
        currentUser: this.state.currentUser
      }
    })
    this.props.navigation.dispatch(navigateAction);
  }

  profitAnalysis(amount){
      this._data = this._data.concat(amount);
      this.setState({chartData: this.state.chartData.concat(amount)});
  }


  tradeCard(event, result, amount){
     
    return(
        <View style = {{flexDirection: "row", justifyContent: "space-between", marginTop: 20, borderBottomWidth: 0.3, borderBottomColor: "gray", paddingBottom: 15, marginLeft: 20, marginRight: 20}}>
                    <View style = {{marginLeft: 25}}>
                      <Text style = {{color:"white", fontSize: 13}}>{event.local.name}</Text>
                      <Text style = {{color:"white", fontSize: 13}}>vs</Text>
                      <Text style = {{color:"white", fontSize: 13}}>{event.visit.name}</Text>
                    </View>

                    <View style = {{ marginRight: 25, marginTop: 9,}}>
                      <Text style = {result =="LOSS" ? styles.sortDown : styles.sortUp}> {result} {result == "LOSS" ? <FontAwesome>{Icons.sortDown}</FontAwesome>: <FontAwesome>{Icons.sortUp}</FontAwesome> }</Text>
                      <Text style = {{color:"gray", alignSelf:"center"}}> {amount} <FontAwesome>{Icons.database}</FontAwesome></Text>
                    </View>
        </View>
    );
  }

  profitsList(){
    const {tradesList, currentUser} = this.state;
    if(tradesList!= "No trades yet"){
      return tradesList.map( trade => {

            if(trade.back_user.username == currentUser && trade.looser == currentUser){
              const amount = trade.request.amount  * -1;
              return this.tradeCard(trade.event, "LOSS", amount)

            } else if(trade.back_user.username == currentUser && trade.winner == currentUser){
                const amount = trade.amount - trade.request.amount;
                return this.tradeCard(trade.event, "PROFIT", amount)

            } else if(trade.lay_user.username == currentUser && trade.looser == currentUser){
                const amount = trade.amount - trade.request.amount * -1
                return this.tradeCard(trade.event, "LOSS", amount)
            
            } else if(trade.lay_user.username == currentUser && trade.winner == currentUser){
                const amount = trade.request.amount 
                return this.tradeCard(trade.event, "PROFIT", amount);
              }
      })
    } else {return null}
  }

 analysis(){
    const {tradesList, currentUser} = this.state;
    if(tradesList!= "No trades yet"){
      return tradesList.map( trade => {

            if(trade.back_user.username == currentUser && trade.looser == currentUser){
              const amount = trade.request.amount  * -1;
              return this.profitAnalysis(amount);

              // return this.tradeCard(trade.event, "LOSS", amount)

            } else if(trade.back_user.username == currentUser && trade.winner == currentUser){
                const amount = trade.amount - trade.request.amount;
                return this.profitAnalysis(amount);

                // return this.tradeCard(trade.event, "PROFIT", amount)

            } else if(trade.lay_user.username == currentUser && trade.looser == currentUser){
                const amount = trade.amount - trade.request.amount * -1
                return this.profitAnalysis(amount);

                // return this.tradeCard(trade.event, "LOSS", amount)
            
            } else if(trade.lay_user.username == currentUser && trade.winner == currentUser){
                const amount = trade.request.amount 
                return this.profitAnalysis(amount);

                // return this.tradeCard(trade.event, "PROFIT", amount);
              }
      })
    } else {return null}
  }


  choseView(){
    const {index} = this.state;

    const chart_wh = 200
    const series = [123, 321, 123,]
    const sliceColor = ['#00B073','#2196F3','red']
    const fill = 'rgb(134, 65, 244)'
    const data = [ 50, 10, 40, 95, 35, 53, ];


    switch(index){
      case 0:
        return(     
          <View pointerEvents="none" style= {{marginTop: 15}}>   

              <View style = {{justifyContent:"space-between", flexDirection:"row", marginBottom: 25}}>
                  <View style = {{marginLeft: 16}}>
                    <Text style = {[styles.username, {fontSize: 11, fontWeight:"300", color: "gray", marginBottom: 5}]}>
                      Coins
                    </Text>
                    <Text style = {[styles.username, {fontSize: 13, fontWeight:"300", color: "#DAA520", marginBottom: 7, marginTop: 3}]}>
                      {this.state.coins}  <FontAwesome style = {{color: "#DAA520"}}>{Icons.database}</FontAwesome>
                    </Text>
                  </View>

                  <View style = {{marginRight: 16}}>
                    <Text style = {[styles.username, {fontSize: 11, fontWeight:"300", color: "gray", marginBottom: 5}]}>
                      World ranking
                    </Text>
                    <Text style = {[styles.username, {fontSize: 13, fontWeight:"300", color: "#DAA520", marginBottom: 7, marginTop: 3}]}>
                      12892 º
                    </Text>
                  </View>


                  <View style = {{marginRight: 16}}>
                    <Text style = {[styles.username, {fontSize: 11, fontWeight:"300", color: "gray", marginBottom: 5}]}>
                      Efficiency
                    </Text>
                    <Text style = {[styles.username, {fontSize: 13, fontWeight:"300", color: "#DAA520", marginBottom: 7, marginTop: 3}]}>
                      67.7 %
                    </Text>
                  </View>
              </View>     
  
            <LineChart
                data={{
                  labels: [

                  ],
                  datasets: [
                    {
                      data: this.state.chartData,
                      strokeWidth: 4,
                    },
                  ],
                }}
                width={Dimensions.get('window').width -16}
                height={200}
                bezier
                withDots = {false}
                withOuterLines = {false}
                withDots ={true}
                chartConfig={{
                  backgroundColor: 'transparent',
                  decimalPlaces: 0,
                  color: (opacity = 1) => `gray`,
                  style: {
                    borderRadius: 16,
                  },
                }}
                style={{
                  borderRadius: 16,
                }}
            />  


        </View>     
      );  
        break;

      case 1:
          const {tradesList, loading} = this.state;

        if(tradesList != "No trades yet"){
          return( 
              <ScrollView style = {{marginTop: 10}}>
                  {this.profitsList()}
              </ScrollView>
          );
        } else if(tradesList == "No trades yet"){
            return(
              <Text style = {{color: "white", marginTop: 60, alignSelf:"center", fontWeight: "300", fontSize: 17}}> No finished trades yet </Text> 
            ) 
          } else{
            return(
              <View style = {{marginTop: 60}}>
                  <ActivityIndicator color = "white" size ="large"/>
              </View>
            );
        }
        break;
    }
  }

  render(){
    const {won, lost, draw, country, username, coins} = this.state;
    console.log(this.state.currentUser);
    console.log(lost, draw, won);

    console.log(this._data);

    console.log(this.state.chartData.reverse());
 

    const data2 = [0.4, 0.6, 0.8]
    const chart_wh = 250
    const series = [9,2,1]
    const sliceColor = ['#00B073','#1FBED5','black']

    const data3 ={
      labels: ['Test1', 'Test2'],
      legend: ['L1', 'L2', 'L3'],
      data: [
        [60, 60, 60],
        [30,30,60],
      ],
      barColors: ['#dfe4ea', '#ced6e0', '#a4b0be'],
    }

    return(
      <View style = {{flex: 1, backgroundColor: "black"}}>

        <StatusBar hidden = {true}/>
          <View style = {{backgroundColor: "#00B073"}}>
            <LinearGradient start={{x: 0, y: 0}} end={{x: 4 , y: 0}} colors = {[ "#161616", "gray"]}>
              <View style = {styles.bar}>
                  <TouchableOpacity>
                    <FontAwesome style = {{color: "#ffff", fontSize: 22, marginLeft: 20}}>{Icons.fff}</FontAwesome>
                  </TouchableOpacity>

                  <TouchableOpacity onPress = {this.renderFriends.bind(this)}>
                    <FontAwesome style = {{color: "#ffff", fontSize: 20,  marginRight: 20}}>{Icons.users}</FontAwesome>
                  </TouchableOpacity>
              </View>

              <View style = {{paddingBottom: 10}}>
                  <View style = {{flexDirection:"row", margin: 20, marginBottom: 15, marginTop: 12}}>
                    <Image style={styles.imageStyle} source={{uri: User.image}}/>

                    <View>
                      <Text style = {[styles.username, {alignSelf:"flex-start", fontWeight:"300"}]}> {this.state.username} </Text>
                      <Text style = {[styles.username, {fontSize: 14, fontWeight:"300", marginBottom: 10, marginTop: 7, color: "gray", alignSelf:"flex-start", marginLeft:5}]}>
                        <FontAwesome>{Icons.mapMarker}</FontAwesome> {country}
                      </Text>
                    </View>
                  </View>

                <View style = {styles.stats}>
                  <View>
                    <Text style = {styles.count}>{won}</Text>
                    <Text style = {styles.text}> Won </Text>
                  </View>

                  <View>
                    <Text style = {styles.count}>{draw}</Text>
                    <Text style = {styles.text}> Draw </Text>
                  </View>

                  <View>
                    <Text style = {styles.count}>{lost}</Text>
                    <Text style = {styles.text}> Lost </Text>
                  </View>

                </View>
              </View>
          </LinearGradient>
        </View>

          <View style = {{marginTop: 10}}>
            <MaterialTabs
                items={["Stats", "Profits & Losts"]}
                indicatorColor ="gray"
                activeTextColor ="white"
                textStyle= {{fontSize: 12.5}}
                inactiveTextColor ="gray"
                barColor ="transparent"
                selectedIndex={this.state.index}
                onChange={this.changeIndex.bind(this)}
            />
          </View>

          {this.choseView()}
      </View>
    );
  }
}

const styles = {
  imageStyle:{
    width: Dimensions.get('window').width * 0.2,
    height: Dimensions.get('window').width * 0.2,
    marginRight: 10
  },
  stats: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
    paddingBottom: 10,
    marginBottom: 8
  },
  text: {
    fontSize: 13,
    color: "gray",
    fontWeight: "500",
    alignSelf: "center"
  },
  icon: {
    paddingBottom: 10,
    fontSize: 30,
    marginLeft: 5
  },
  count: {
    color: "#00B073",
    fontWeight: "400",
    fontSize: 17,
    marginBottom: 8,
    marginLeft: 15,
    fontStyle: "oblique"
  },
  username: {
    color: "white",
    fontSize: 19,
    fontWeight: "500",
    alignSelf: "center",
    marginTop: 8,
  },
  bar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  total: {
    color: "black",
    fontWeight: "400",
    fontSize: 20,
    alignSelf: "center",
    fontStyle: "oblique",
    backgroundColor: "#DCDCDC",
    padding: 5,
  },
  percent: {
    marginTop: -175,
    alignSelf: "center"
  },
  number: {
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
    alignSelf: "center",
    paddingBottom: 12
  },
  sortUp: {
    color:"#00B073" , alignSelf: "center", marginBottom: 3
  },
  sortDown: {
    color:"red" , alignSelf: "center", marginBottom: 3
  },
  efficiency: {
    justifyContent: 'center',
    marginLeft: 27,
    position: 'absolute',
    top: 0,left: 0,
    right: 0, bottom: 0,
  }
}

export default Profile;
