import React, {Component} from "react";
import {View, Text, TouchableOpacity, ScrollView, Dimensions} from "react-native";

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

  scrolling() {
        var position = this.state.position + 5;
        this.ticker.scrollTo({ x: position, y:0, animated: true });

        let maxOffset = Dimensions.get("window").width + 80;


        if (this.state.position > maxOffset) {
             this.ticker.scrollTo({ x: -200, y:0, animated: true })
             this.setState({position: -50})

        }
        else {
            this.setState({ position: position });
        }
  }

  renderInfo(){
    const {data} = this.props;
    return(
      <View style = {{flexDirection: "row", padding: 10, paddingBottom: 0}}>
        <View style = {styles.card}>
            <Text style ={styles.desc}>
                Traded
            </Text>

            <Text style ={styles.number}>
                {data.traded} $
            </Text>
        </View>


        <View style = {styles.card}>
            <Text style ={[styles.desc]}>
                Matches
            </Text>

            <Text style ={[styles.number, {color: "#D3D3D3"}]}>
                {data.matches}
            </Text>
        </View>


        <View style = {styles.card}>
            <Text style ={styles.desc}>
                Unmatched
            </Text>

            <Text style ={[styles.number, {color: "#D3D3D3"}]}>
                {data.unmatched}
            </Text>
        </View>

        <View style = {styles.card}>
            <Text style ={styles.desc}>
                Heighest bet
            </Text>

            <Text style ={styles.number}>
                {data.topBet}
            </Text>
        </View>

        <View style = {styles.card}>
            <Text style ={styles.desc}>
                {data.local}
            </Text>

            <Text style ={[styles.number, {color: "#00B073"}]}>
                71%
            </Text>
        </View>


        <View style = {styles.card}>
            <Text style ={styles.desc}>
                {data.visit}
            </Text>

            <Text style ={[styles.number, {color: "#B22222"}]}>
                29%
            </Text>
        </View>
      </View>
    );
  }

  render(){
    console.log(this.props.data);

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
    borderBottomWidth: 0.4,
    borderBottomColor: "gray",
    borderTopWidth: 0.4,
    borderTopColor: "gray",
    shadowOffset: {width: 1, height:2},
    shadowColor: "white",
    backgroundColor: "black"
  },
  card: {
    padding: 10,
    paddingBottom: 5,
    borderRadius: 5,
    margin: 15,
    marginRight: 30,
    marginTop: 0,
    marginBottom: 5,
    elevation: 5,
    shdowColor: "gray",
  },
  desc: {
    color: "white",
    fontSize: 15,
    fontWeight: "400",
    marginBottom: 12,
    alignSelf: "center",
    fontStyle: "oblique",
  },
  number: {
    color:"#DAA520",
    fontSize: 15,
    fontWeight: "700",
    alignSelf:"center",
    fontFamily: "Courier New"
  }
}


export default GameInfo;
