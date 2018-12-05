import React, {Component} from "react";
import {View, Text, Image, Dimensions, TouchableOpacity} from "react-native";
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import Images from "../constants/images";

const sliderWidth = Dimensions.get('window').width;
const itemHeight = Dimensions.get('window').height;

class Carousell extends Component{

    constructor(props){
      super(props);
    }

    renderItem ({item, index}, parallaxProps) {
        return (
            <View style={styles.item}>
              <TouchableOpacity onPress = {() => {alert(item.text)}}>
                <ParallaxImage
                    source={{ uri: item.image }}
                    containerStyle={styles.imageContainer}
                    style={styles.image}
                    index = {2}
                    parallaxFactor={0.6}
                    showSpinner = {true}
                    spinnerColor = {"#00B073"}
                    {...parallaxProps}
                />
                <Text style={styles.title} numberOfLines={2}>
                    { item.text }
                </Text>
              </TouchableOpacity>
            </View>
        );
    }

    render (){
        return (
          <Carousel
            data={Images}
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
      height: itemHeight * 0.2
    },
    title: {
      color: "#ffff",
      fontSize: 15,
      fontWeight: "400",
      position: "absolute",
      top: 5,
      left: 2
    },
    image: {
      backgroundColor:'#000',
      opacity: 0.1
    },
    item:{
      margin: 25,
      marginLeft: 0
    }

  }

export default Carousell;
