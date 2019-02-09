import React, {Component} from "react";
import {View, Text, TouchableOpacity, FlatList, Dimensions} from "react-native";

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
        this.ticker.scrollToOffset({ offset: position, animated: true });

        let maxOffset = Dimensions.get("window").width - 80;


        if (this.state.position > maxOffset) {
             this.ticker.scrollToOffset({ offset: -200, animated: true })
             this.setState({position: -50})

        }
        else {
            this.setState({ position: position });
        }
  }

  render(){
    const data2  = [{desc: "Traded", number: "1500 $"}, {desc: "Matches", number: 7.0}, {desc: "Unmatched", number: 13.0}, {desc: "Ny Yankees", number: "67 %"}, {desc: "Red Sox", number: "27 %"}];

    return(
      <View style = {styles.container}>
        <FlatList
              data={data2}
              horizontal = {true}
              ref={(ref) => this.ticker = ref}
              renderItem={({ item }) => {
                return (
                  <View style = {styles.card}>
                    <Text style ={styles.desc}>
                      {item.desc}
                    </Text>

                    <Text style ={styles.number}>
                      {item.number}
                    </Text>
                  </View>
                );
              }}
              keyExtractor={(item, index) => index}
        />
      </View>
    );
  }
}

const styles = {

  container: {
    borderBottomWidth: 0.4,
    borderBottomColor: "gray",
    shadowOffset: {width: 1, height:2},
    shadowColor: "white",
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
    color: "#DCDCDC",
    fontSize: 15,
    fontWeight: "400",
    marginBottom: 10,
    alignSelf: "center",
    fontStyle: "oblique"
  },
  number: {
    color:"#DAA520",
    fontSize: 13,
    fontWeight: "400",
    alignSelf:"center"
  }
}


export default GameInfo;
