import React, {Component} from "react";
import {View, Text, TouchableOpacity, ScrollView, Slider, Image, TextInput, Dimensions} from "react-native";
import FontAwesome, {Icons} from "react-native-fontawesome";
import SegmentedControlTab from 'react-native-segmented-control-tab';
import SwipeCards from 'react-native-swipe-cards';
import Carousel from "react-native-snap-carousel";
import LinearGradient from "react-native-linear-gradient";
import MultiSlider from "@ptomasroos/react-native-multi-slider";

const sliderWidth = Dimensions.get('window').width;
const itemHeight = Dimensions.get('window').height;


class BetModal extends Component{

  constructor(props){
    super(props);
    this.state = {
      bet: 50,
      cUserCoins: 3460,
      values: [50, 3460],
      finalValue: [],
      infoBox: false
    }
  }

  setCoins(value){
    this.setState({bet: value})
  }

  // componentWillMount(){
  //     var position = this.props.team.position;
  //     let quote = this.props.teamsNotSelected[1].quotes[position];

  //     var bet = this.props.list2.map(u => {
  //       quote > 0 ? Math.round(u.bet - ((quote / 100) * u.bet)) : u.bet;
  //     })
  //     this.setState({ finalValue: [{user: this.props.list2, bet: quote}] })
  // }

    multiSliderValuesChange = (values) => {
        this.setState({
            values
        });
    }

  userList(list, quote){

    return list.map((u, index) => {
      var bet = quote > 0 ? Math.round(u.bet - ((quote / 100) * u.bet)) : u.bet;
      return(
        <TouchableOpacity  key = {index} onPress = {this.props.confirm.bind(this, "ConfirmBet", u, quote, bet)}>
          <View style = {styles.tableStyle}>
            <View style = {{flexDirection: "row", justifyContent:"space-between"}}>
              <View style= {{flexDirection:"row"}}>
                <Image
                  source = {{uri: u.image}}
                  style = {styles.image}
                />
                <Text style = {{ marginTop: 10, color: "#ffff", fontSize: 13, fontWeight: "300"}}>{u.user}</Text>
              </View>
              <FontAwesome style = {{color:"gray", marginTop: 32, marginRight: 5}}>{Icons.chevronRight}</FontAwesome>
            </View>

            <View style = {{alignSelf:"center", flexDirection:"row"}}>
              <Text style = {{color: "#DAA520", alignSelf:"center", fontSize: 16, marginRight: 10}}> {bet} <FontAwesome>{Icons.bitcoin}</FontAwesome></Text>
              <Text style = {{color: "gray", fontSize: 16}}> {quote} % {quote > 0 ? <FontAwesome style = {{color: "#00B073"}}>{Icons.sortUp}</FontAwesome> : <FontAwesome style = {{color: "red"}}>{Icons.sortDown}</FontAwesome>}</Text>
            </View>
          </View>

        </TouchableOpacity>
      );
    })
  }

    userCard2({item}, index){
      return(
        <View style = {styles.card}>
          <View style = {{flexDirection:"row", justifyContent:"space-between"}}>
            <View style = {{flexDirection:"row"}}>
              <Image
                source = {{uri: item.image}}
                style = {styles.image}
              />
              <View style = {{marginLeft: 15, marginBottom: 10}}>
                <Text style = {{ marginTop: 10, color: "#00B073", fontSize: 17}}>{item.user}</Text>
                <Text style = {{color: "gray", fontSize: 13, marginTop: 4}}> <FontAwesome>{Icons.mapMarker}</FontAwesome> {item.country} </Text>
              </View>
            </View>

            <Text style = {{color: "white", fontSize: 14, marginTop: 10, marginLeft: 15}}> +19 % <FontAwesome style = {{color: "#00B073"}}>{Icons.sortUp}</FontAwesome> </Text>
          </View>


            <Text style = {{color: "#DAA520", fontSize: 19, marginTop: 15, alignSelf:"center"}}> {item.bet}  <FontAwesome>{Icons.bitcoin}</FontAwesome> </Text>

          <TouchableOpacity style = {{backgroundColor: "#00B073", padding: 10, marginTop: 30, borderRadius: 5}} key = {index}>
            <Text style = {{color: "white", fontSize: 14, alignSelf:"center"}}> VIEW BET </Text>
          </TouchableOpacity>
        </View>
      );
  }

  gameType(game, position){
    let {bet} = this.state;
    const {teamsNotSelected} = this.props;

   if(game.sport == "Soccer"){
      return(
          <View style = {{marginTop: 45}}>
            <View style = {{flexDirection:"row", justifyContent:"space-between", padding: 10, borderBottomColor: "gray", borderBottomWidth:0.5, borderTopColor: "gray", borderTopWidth:0.5}}>
              <View>
                <Text style = {{color: "gray", fontWeight: "400", marginLeft: 5, borderBottomWidth: 1, borderBottomColor: "gray"}}> IF MATCH</Text>
                <Text style = {{color: "#ffff", fontWeight: "400", marginLeft: 5, marginTop: 22, fontSize: 15, padding: 8 }}>{teamsNotSelected[0].name} </Text>
                <Text style = {{color: "#ffff", fontWeight: "400", marginLeft: 5, marginTop: 22, fontSize: 15, padding: 8 }}>{teamsNotSelected[1].name} </Text>
              </View>

              <View>
                <Text style = {{color: "gray", fontWeight: "400"}}>QUOTES</Text>
                <Text style = {{color: "#ffff", fontWeight: "400", marginLeft: 5, alignSelf:"center", marginTop: 22, fontSize: 15, padding: 8 }}>
                  {teamsNotSelected[0].quotes[position] } %  {teamsNotSelected[0].quotes[position] > 0 ? <FontAwesome style = {{color: "#00B073"}}>{Icons.sortUp}</FontAwesome>: <FontAwesome style = {{color: "red"}}>{Icons.sortDown}</FontAwesome>}
                </Text>

                <Text style = {{color: "#ffff", fontWeight: "400", marginLeft: 5, alignSelf:"center", marginTop: 22, fontSize: 15, padding: 8}}>
                  {teamsNotSelected[1].quotes[position]} %  {teamsNotSelected[1].quotes[position] > 0 ? <FontAwesome style = {{color: "#00B073"}}>{Icons.sortUp}</FontAwesome>: <FontAwesome style = {{color: "red"}}>{Icons.sortDown}</FontAwesome>}
                </Text>
              </View>

              <View>
                <Text style = {{color: "gray", fontWeight: "400", marginRight: 5}}>YOU CAN WIN</Text>
                <Text style = {{color: "#DAA520", fontWeight: "400", marginLeft: 5, alignSelf:"center", marginTop: 22, fontSize: 15, padding: 8 }}>{ Math.round((teamsNotSelected[0].quotes[position] / 100) * bet + (bet * 2) )} <FontAwesome> {Icons.bitcoin} </FontAwesome> </Text>
                <Text style = {{color: "#DAA520", fontWeight: "400", marginLeft: 5, alignSelf:"center", marginTop: 22, fontSize: 15, padding: 8 }}>{ Math.round((teamsNotSelected[1].quotes[position] / 100) * bet + (bet * 2) )} <FontAwesome> {Icons.bitcoin} </FontAwesome> </Text>
              </View>

            </View>
          </View>
      );
    } else {
      return(
        <View style = {{marginTop: 45}}>
            <View style = {{flexDirection:"row", justifyContent:"space-between", padding: 10, borderBottomColor: "gray", borderBottomWidth:0.5, borderTopColor: "gray", borderTopWidth:0.5}}>
              <View>
                <Text style = {{color: "gray", fontWeight: "400", marginRight: 5, alignSelf:"center"}}>OPPONENT</Text>
                <Text style = {{color: "#ffff", fontWeight: "400", marginLeft: 5, marginTop: 22, fontSize: 15, padding: 8 }}>{teamsNotSelected[0].name} </Text>
              </View>

              <View>
                <Text style = {{color: "gray", fontWeight: "400", marginRight: 5}}>QUOTE</Text>
                <Text style = {{color: "#ffff", fontWeight: "400", marginLeft: 5, alignSelf:"center", marginTop: 22, fontSize: 15, padding: 8 }}>
                  {teamsNotSelected[0].quotes } %  {teamsNotSelected[0].quotes > 0 ? <FontAwesome style = {{color: "#00B073"}}>{Icons.sortUp}</FontAwesome>: <FontAwesome style = {{color: "red"}}>{Icons.sortDown}</FontAwesome>}
                </Text>
              </View>

              <View>
                <Text style = {{color: "gray", fontWeight: "400", marginRight: 5}}>YOU CAN WIN</Text>
                <Text style = {{color: "#DAA520", fontWeight: "400", marginLeft: 5, alignSelf:"center", marginTop: 22, fontSize: 15, padding: 8 }}>{ Math.round((teamsNotSelected[0].quotes / 100) * bet + (bet * 2) )} <FontAwesome> {Icons.bitcoin} </FontAwesome> </Text>
              </View>

            </View>
        </View>
      );
    }
  }

  renderSegmentedController(){
    const { choice, game, teamsNotSelected } = this.props;
    var values = [teamsNotSelected[0].name, teamsNotSelected[1].name];

    if(choice == 1 && game.sport == "Soccer"){
      return(
        <SegmentedControlTab
          values={values}
          tabTextStyle = {{color: "#00B073", fontWeight: "400", fontSize: 15}}
          tabStyle = {{borderColor: "#00B073", backgroundColor: "transparent"}}
          selectedIndex={this.props.index}
          activeTabStyle = {{backgroundColor: "#00B073"}}
          onTabPress= {this.props.segmentedController}
        />
      );
    } else if(choice == 1 && game.sport != "Soccer"){ return null };
  }

  betChoice(){
    const {choice, game, teamsNotSelected, team} = this.props;
    var position = this.props.team.position;
                //  -- MODAL FOR USER MATCH -- //

    if(this.props.choice == 1){
      if(this.props.index == 0){
          return(
              <ScrollView style = {{marginTop: 5 }}>
                <TouchableOpacity onPress = {() => this.setState({infoBox: true})}>
                  <FontAwesome style = {{color: "white", fontSize: 27, alignSelf:"flex-end", margin: 10, marginBottom: 0}}>{Icons.questionCircle}</FontAwesome>
                </TouchableOpacity>
                <Text style = {{color: "gray", fontWeight: "400", alignSelf:"center", margin: 5, marginTop: 0}}>Users that bet for {teamsNotSelected[0].name}</Text>
                {this.userList(this.props.list1, teamsNotSelected[0].quotes[position] || teamsNotSelected[0].quotes)}
              </ScrollView>
          );
      } else {
          return(
                <View style = {{ marginTop: 5 }}>

                  <View style = {{alignSelf:"center", marginTop: 20}}>
                    <Text style={{color: "#DAA520", fontSize: 20, alignSelf:"center"}}>
                      {this.state.values[0]} <FontAwesome>{Icons.bitcoin}</FontAwesome>    -    {this.state.values[1]} <FontAwesome>{Icons.bitcoin}</FontAwesome>
                    </Text>
                    <MultiSlider
                      values={[this.state.values[0], this.state.values[1]]}
                      sliderLength={280}
                      onValuesChange={this.multiSliderValuesChange}
                      min={50}
                      max={this.state.cUserCoins}
                      step={10}
                      Style = {{color:"green"}}
                    />
                  </View>

                  <Carousel
                    data={this.props.list2}
                    renderItem={this.userCard2}
                    layout={'stack'}
                    layoutCardOffset={`19`}
                    style={{opacity: 0.4}}
                    sliderWidth={sliderWidth}
                    itemWidth={sliderWidth * 0.95}
                    itemHeight={itemHeight}
                  />
                </View>
          );
        }

                //  -- MODAL FOR LAY BET -- //

    } else if(this.props.choice == 2) {
          return(
            <View>
              <View style = {{padding: 20, paddingTop: 10}}>
                <View style = {{flexDirection:"row", alignSelf: "center", marginTop: 5, marginBottom:20}}>
                  <Text style = {styles.layBet}>Set your bet for: </Text>
                  <Text style = {[styles.layBet, {marginLeft: 5, color: "#00B073", fontSize: 17}]}>{this.props.team.name}</Text>
                </View>

                <Text style = {{alignSelf: "center", color: "#DAA520", fontSize: 25, marginTop: 5, fontWeight: "300"}}>{this.state.bet} <FontAwesome>{Icons.bitcoin}</FontAwesome></Text>

                <Slider
                  step= {10}
                  style ={{marginLeft: 15, marginRight: 15, marginTop: 15}}
                  maximumValue={this.state.cUserCoins}
                  minimumValue = {50}
                  thumbTintColor = "#00B073"
                  minimumTrackTintColor = "#00B073"
                  onValueChange={this.setCoins.bind(this)}
                  value={this.state.bet}
                  thumbStyle ={{color: "#00B073"}}
                />
                <View style = {{flexDirection:"row", justifyContent:"space-between", marginTop: 15}}>
                  <TouchableOpacity style = {{backgroundColor: "#00B073", padding: 5, borderRadius: 5, marginLeft: 5}} onPress = {this.setCoins.bind(this, 50)}>
                    <Text style = {{color: "white"}}> Min bet </Text>
                  </TouchableOpacity>

                  <TouchableOpacity style = {{backgroundColor: "#DAA520", padding: 5, borderRadius: 5, marginRight: 5}}  onPress = {this.setCoins.bind(this, this.state.cUserCoins)}>
                    <Text style = {{color: "white"}}> All in </Text>
                  </TouchableOpacity>
                </View>
              </View>

              {this.gameType(game, position)}

            </View>
          );
    }
  }

  render(){
      let button;

    console.log(this.state.finalValue.bet)

      if(this.props.choice == 2){
        button =  <TouchableOpacity style = {styles.buttonContainer}>
                    <Text style = {[styles.layBet, {fontSize: 19}]}> Place bet</Text>
                  </TouchableOpacity>
      }

    return(
         <LinearGradient  style = {{flex: 1}} start={{x: 0, y: 0}} end={{x: 4 , y: 1}} colors = {[ "black", "gray"]}>
          <View style ={{marginBottom: 7}}>
            <View style = {styles.info}>
              <TouchableOpacity style = {styles.closeModal} onPress  = {this.props.visible}>
                <Text style = {{color: "#00B073", fontSize: 17}}>
                  Close
                </Text>
              </TouchableOpacity>
              <Text style = {{color: "#DAA520", marginTop: 12, marginRight: 19}}> {this.state.cUserCoins} <FontAwesome>{Icons.bitcoin}</FontAwesome></Text>
            </View>
          </View>

          <View>
            {this.renderSegmentedController()}
          </View>

          <View>
            {this.betChoice()}
          </View>

          {button}
          </LinearGradient>
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
    fontSize: 12,
    fontWeight: "500",
    alignSelf: "center",
    marginBottom: 5,
    color: "#00B073"
  },
  closeModal: {
    marginTop: 12,
    marginLeft: 16,
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
    padding: 50,
  },
  tableStyle: {
    marginBottom: 5,
    padding: 15,
    borderBottomWidth: 0.3,
    borderBottomColor: "gray",
  },
  info: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  teamsDescription: {
    alignSelf: "center",
    marginTop: 15
  },
  teamsText: {
    color: "#00B073",
    fontSize: 18,
    fontWeight: "300",
    marginBottom: 13,
  },
  country: {
    color: "#ffff",
    fontWeight: "300",
    fontSize: 13,
    fontStyle: "oblique",
    paddingBottom: 9
  },
  image: {
    width: 45,
    height: 45,
    marginRight: 15,
    marginLeft: 6,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
  },
  layBet: {
    alignSelf: "center",
    color: "white",
    fontWeight:"400",
    fontSize: 15
  },
  buttonContainer: {
    backgroundColor: "#00B073",
    padding: 12,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0
  },
  card: {
    selfAlign: "center",
    marginTop: 100,
    padding: 15,
    paddingBottom: 15,
    paddingTop: 15,
    backgroundColor: "#161616",
    margin: 15,
    borderRadius: 7,
    borderColor:"gray",
    borderWidth:0.3
  },
};

export default BetModal;
