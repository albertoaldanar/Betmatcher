import React, {Component} from "react";
import {View, Text, TouchableOpacity, Dimensions, ScrollView} from "react-native";
import * as shape from "d3-shape";
import PureChart from 'react-native-pure-chart';
import LinearGradient from "react-native-linear-gradient";
import { LineChart, YAxis, Grid } from 'react-native-svg-charts'

class DescChart extends Component {

  drawChart(data, content, conc){
    if(this.props.game.data.sport.name =="Soccer"){
      return(
        <View style= {{height: 200, width: 200, flexDirection:"row"}}>
          <YAxis
            data= { data.length > 0 ? conc : data }
            contentInset= { content }
            svg={{
                fill: 'grey',
                fontSize: 10,
                marginLeft: 5
            }}
            numberOfTicks={ 10 }
            formatLabel={ value => `${value} $` }
          />
          <Text style = {styles.title}>{this.props.game.draw.name}</Text>

          { data.length > 0 ? 
            <LineChart
              style={{ flex: 1, marginLeft: 16, marginRight: 16 }}
              data={  data.length > 0 ? conc : data }
              svg={{ stroke: 'gray' }}
              contentInset={ content }
            >
              <Grid/>
            </LineChart> : 
            <View style={{ flex: 1, marginTop: 40 }}>
              <Text style = {{color:"gray", fontSize: 12, marginLeft: -15}}> No trades </Text>
            </View>
          }

        </View>
      );
    } else return null;
  }


  shuffle(arr) {
    var i,
        j,
        temp;
    for (i = arr.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    return arr;    
  };


  render(){
    const {layVisit, layLocal, layDraw, backDraw, backLocal, backVisit} = this.props;

    const lLocal = layLocal.map(x => {return x.amount})
    const lDraw = layDraw.map(x => {return x.amount})
    const lVisit = layVisit.map(x => {return x.amount})

    const bLocal = backLocal.map(x => {
      return(
          x.amount / 2
        ) 
    })
    const bDraw = backDraw.map(x => {return (x.amount / 2)})
    const bVisit = backVisit.map(x => {return( x.amount / 2 )})

    // console.log( lLocal, lDraw, lVisit, bDraw, bLocal, bVisit);
    // console.log(lVisit.concat(bVisit));

    // const data = [ 50, 10, 40, 95 ];
    // const data2 = [ 40, 80, 91, 86, 99, 35, 53, 804, 610, 230 ];
    // const data3 = [ 10, 90, 112, 91, 55, 99, 35, 53, 11, 153 ];
    var localTrades = lLocal.concat(bLocal);
    var drawTrades = lDraw.concat(bDraw);
    var visitTrades = bVisit.concat(lVisit);

    var base = [0];


    const contentInset = { top: 20, bottom: 20, left: 10 }

    // localTrades.length > 0 ? base.concat(this.shuffle(localTrades)) : localTrades

    return(
      <ScrollView horizontal>
        <View style={styles.container}>
                  <YAxis
                      data={ [10, 400, 200, 50, 10, 50, 150, 134, 50, 150, 134, 800, 2500, 80, 30, 290] }
                      contentInset={ contentInset }
                      svg={{
                          fill: 'grey',
                          fontSize: 10,
                      }}
                      numberOfTicks={ 10 }
                      formatLabel={ value => `${value}$` }
                  />

                  <Text style = {styles.title}>{this.props.game.local.name}</Text>

                  { localTrades.length > 0 ? 
                    <LineChart
                        style={{ flex: 1, marginLeft: 16, marginRight: 20}}
                        data={[10, 400, 200, 50, 10, 50, 150, 134, 50, 150, 134, 800, 2500, 80, 30, 290] }
                        svg={{ stroke: '#00B073' }}
                        contentInset={ contentInset }
                    >
                        <Grid/>
                    </LineChart> : 

                    <View style={{ flex: 1, marginTop: 40 }}>
                      <Text style = {{color:"gray", fontSize: 12, marginLeft: -15}}> No trades </Text>
                    </View>
                  }

                  {this.drawChart(drawTrades, contentInset, base.concat(this.shuffle(drawTrades)))}
        
                    <YAxis
                      data={ visitTrades.length > 0 ? base.concat(this.shuffle(visitTrades)) : visitTrades }
                      contentInset={ contentInset }
                      svg={{
                          fill: 'grey',
                          fontSize: 10,
                          marginLeft: 5
                      }}
                      numberOfTicks={ 10 }
                      formatLabel={ value => `${value} $` }
                    />

                    <Text style = {styles.title}>{this.props.game.visit.name}</Text>

                    { visitTrades.length > 0 ? 
                      <LineChart
                          style={{ flex: 1, marginLeft: 16 }}
                          data={ visitTrades.length > 0 ? base.concat(this.shuffle(visitTrades)) : visitTrades }
                          svg={{ stroke: '#4169E1' }}
                          contentInset={ contentInset }
                      >
                        <Grid/> 

                      </LineChart> : 
                      <View style={{ flex: 1, marginTop: 40 }}>
                        <Text style = {{color:"gray", fontSize: 12, marginLeft: -15}}> No trades </Text>
                      </View>
                    }
        
            </View>
        </ScrollView>
    );
  }
}
const styles ={
  container: {
    height: 200,
    width: Dimensions.get("window").width +230,
    flexDirection: "row",
    marginLeft: 20
  },
  title: {
    color:"#ffff",
    fontSize: 14,
    fontWeight: "400",
    marginBottom: 10,
    marginRight: -35
  }
}
export default DescChart
