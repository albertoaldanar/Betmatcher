import React, {Component} from "react";
import {View, Text, TouchableOpacity, ScrollView, Dimensions} from "react-native";
import FontAwesome, {Icons} from "react-native-fontawesome";

class GameInfo extends Component{

  constructor(props){
    super(props);
    this.state ={
      position: 0
    }
    this.scrolling = this.scrolling.bind(this);
  }

  componentWillUnmount(){
    clearInterval(this.activeInterval);
  }

  componentDidMount(){
     this.activeInterval = setInterval(this.scrolling, 200);
  }

  renderDrawStat(pct){
    const {data} = this.props;

    if(data.data.sport.name == "Soccer"){
      return(
        <View style = {styles.card}>
            <Text style ={styles.desc}>
                Draw
            </Text>

            <Text style ={[styles.number, {color: "gray"}]}>
                {pct || 0}%
            </Text>
        </View>
      );
    }else return null;
  }

  scrolling() {
        var position = this.state.position + 5;
        this.ticker.scrollTo({ x: position, y:0, animated: true });

        let maxOffset = Dimensions.get("window").width + 35;

        if (this.state.position > maxOffset) {
             this.ticker.scrollTo({ x: -200, y:0, animated: true })
             this.setState({position: -50})

        } else {
            this.setState({ position: position });
        }
  }



  renderInfo(){
    const {data, local, visit, draw, highestBet} = this.props;

    console.log(local, visit, draw);

    var totalTrades = local + visit + draw;

    var localPCT = (local / totalTrades) * 100;
    var drawPCT = (draw / totalTrades) * 100;
    var visitPCT = (visit / totalTrades) * 100;

    var loc = localPCT.toFixed(1) || 0;
    

    return(
      <View style = {{flexDirection: "row", padding: 10, paddingBottom: 0}}>
        <View style = {styles.card}>
            <Text style ={styles.desc}>
                Traded
            </Text>

            <Text style ={styles.number}>
                {data.data.traded} <FontAwesome> {Icons.database} </FontAwesome>
            </Text>
        </View>


        <View style = {styles.card}>
            <Text style ={[styles.desc]}>
                Matches
            </Text>

            <Text style ={[styles.number, {color: "#00B073"}]}>
                {data.data.matched_bets}
            </Text>
        </View>


        <View style = {styles.card}>
            <Text style ={styles.desc}>
                Unmatched
            </Text>

            <Text style ={[styles.number, {color: "#B22222"}]}>
                {data.data.unmatched_bets}
            </Text>
        </View>

        <View style = {styles.card}>
            <Text style ={styles.desc}>
                {data.local.name}
            </Text>

            <Text style ={[styles.number, {color: "#00B073"}]}>
                {loc}% <FontAwesome>{Icons.sortUp}</FontAwesome>
            </Text>
        </View>

        {this.renderDrawStat(Number.parseFloat(drawPCT).toFixed(1))}

        <View style = {styles.card}>
            <Text style ={styles.desc}>
                {data.visit.name}
            </Text>

            <Text style ={[styles.number, {color: "#B22222"}]}>
                {Number.parseFloat(visitPCT).toFixed(1) || 0}% <FontAwesome>{Icons.sortDown}</FontAwesome>
            </Text>
        </View>

        <View style = {styles.card}>
            <Text style ={styles.desc}>
                Highest bet
            </Text>

            <Text style ={styles.number}>
                {isFinite(highestBet) ? highestBet: 0} <FontAwesome>  {Icons.database} </FontAwesome>
            </Text>
        </View>
      </View>
    );
  }

  render(){

    return(
      <View style = {styles.container}>
        <ScrollView
          horizontal
          ref={(ref) => this.ticker = ref}
        >
          {this.renderInfo()}
        </ScrollView>
      </View>
    );
  }
}

const styles = {

  container: {
    borderBottomWidth: 0.3,
    borderBottomColor: "gray",
    borderTopWidth: 0.3,
    borderTopColor: "gray",

  },
  card: {
    padding: 3,
    borderRadius: 5,
    margin: 15,
    marginRight: 30,
    marginTop: 0,
    marginBottom: 5,
    elevation: 5,
    shdowColor: "gray",
  },
  desc: {
    marginBottom: 12,
    alignSelf: "center",
    fontStyle: "oblique",
    color:"#ffff",
    fontSize: 12,
    fontWeight: "400",
  },
  number: {
    color:"#DAA520",
    fontSize: 13,
    fontWeight: "700",
    alignSelf:"center",
  }
}


export default GameInfo;
