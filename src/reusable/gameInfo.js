import React, {Component} from "react";
import {View, Text, TouchableOpacity, ScrollView, Dimensions} from "react-native";
import FontAwesome, {Icons} from "react-native-fontawesome";
import NumberFormat from 'react-number-format';

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

            {pct}
        </View>
      );
    } else return null;
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


  compareTradesPCT(current, second, third){

      if(current > second && current > third){
        return (
          <Text style ={[styles.number, {color: "#00B073"}]}> {current}% <FontAwesome>{Icons.sortUp}</FontAwesome> </Text>
        );

      } else if(current > second && current < third || current < second && current > third){
        return(
          <Text style ={[styles.number, {color: "gray"}]}> {current}% <FontAwesome>{Icons.sort}</FontAwesome> </Text>
        ) 
      
      } else if(current < second && current < third){
        return (
          <Text style ={[styles.number, {color: "#B22222"}]}> {current}% <FontAwesome>{Icons.sortDown}</FontAwesome> </Text>
        )
    
      } else if(current == second && current == third){
          return(
            <Text style ={[styles.number, {color: "gray"}]}>{current}% </Text>
          ) 
      } else {
          return(
            <Text style ={[styles.number, {color: "gray"}]}>{current}% </Text>
          ) 
      }
  }


  renderInfo(){
    const {data, local, visit, draw, highestBet} = this.props;

    var totalTrades = local + visit + draw;

    var localPCT = (local / totalTrades) * 100;
    var drawPCT = (draw / totalTrades) * 100;
    var visitPCT = (visit / totalTrades) * 100;

    const tradeValues = [localPCT.toFixed(1), drawPCT.toFixed(1), visitPCT.toFixed(1)];

    const sorted = tradeValues.sort((a, b) => b - a);
    const finalResult = [{position: 0, value: sorted[0]}, {position: 1, value: sorted[1]}, {position: 2, value: sorted[2]}];

    return(
      <View style = {{flexDirection: "row", padding: 10, paddingBottom: 0}}>
        <View style = {styles.card}>
            <Text style ={styles.desc}>
                Traded
            </Text>

            <NumberFormat
                value={data.data.traded}
                displayType={'text'}
                thousandSeparator={true}
                renderText= {value => <Text style ={styles.number}> {value}  <FontAwesome>{Icons.database}</FontAwesome></Text>}
            /> 
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

            {localPCT.toFixed(1) >= 0 ? this.compareTradesPCT(localPCT.toFixed(1), drawPCT.toFixed(1), visitPCT.toFixed(1)) : <Text style ={[styles.number, {color: "gray"}]}> 0%</Text>}
        </View>

        {this.renderDrawStat(drawPCT.toFixed(1) >= 0 ? this.compareTradesPCT(drawPCT.toFixed(1), localPCT.toFixed(1), visitPCT.toFixed(1)) : <Text style ={[styles.number, {color: "gray"}]}> 0%</Text>)}

        <View style = {styles.card}>
            <Text style ={styles.desc}>
                {data.visit.name}
            </Text>

            {visitPCT.toFixed(1) >= 0 ? this.compareTradesPCT(visitPCT.toFixed(1), drawPCT.toFixed(1), localPCT.toFixed(1)) : <Text style ={[styles.number, {color: "gray"}]}> 0%</Text>}
        </View>

        <View style = {styles.card}>
            <Text style ={styles.desc}>
                Highest bet
            </Text>
            
            <NumberFormat
                value={isFinite(highestBet) ? highestBet: 0}
                displayType={'text'}
                thousandSeparator={true}
                renderText= {value => <Text style ={styles.number}> {value}  <FontAwesome>{Icons.database}</FontAwesome></Text>}
            /> 
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
