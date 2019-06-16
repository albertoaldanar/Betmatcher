import React, {Component} from "react";
import {View, Text, Image, Dimensions, TouchableOpacity, Alert} from "react-native";
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import Images from "../constants/images";
import { NavigationActions } from 'react-navigation';

const sliderWidth = Dimensions.get('window').width;
const itemHeight = Dimensions.get('window').height;

class Carousell extends Component{

    constructor(props){
      super(props);
    }

    renderItem ({item, index}, parallaxProps) {
        return (
            <View style={styles.item}>
              <TouchableOpacity>
                <ParallaxImage
                    source={{ uri: item.img }}
                    containerStyle={styles.imageContainer}
                    style={styles.image}
                    index = {2}
                    parallaxFactor={0.6}
                    showSpinner = {true}
                    spinnerColor = {"#00B073"}
                    {...parallaxProps}
                />
                <Text style={styles.title} numberOfLines={2}>
                    { item.name }
                </Text>
              </TouchableOpacity>
            </View>
        );
    }

    render (){
      console.log(this.props.selectedGames);
        return (
          <Carousel
            data={this.props.leagues.leagues}
            renderItem={this.renderItem}
            hasParallaxImages={true}
            style={{opacity: 0.4}}
            sliderWidth={sliderWidth}
            itemWidth={sliderWidth* 0.36}
            itemHeight={itemHeight}
          />
        );
    }
  }

  const styles = {
    imageContainer: {
      borderRadius: 5,
      width: sliderWidth * 0.35,
      height: itemHeight * 0.2,
      opacity: 0.55
    },
    title: {
      color: "#ffff",
      fontSize: 15,
      fontWeight: "600",
      position: "absolute",
      top: 5,
      left: 2
    },
    item:{
      margin: 20,
      marginLeft: 0,
      marginBottom: 20,
      marginTop: 10
    }

  }

export default Carousell;
