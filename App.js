/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Animated, PanResponder, Dimensions } from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
const colors = [
  {
    id: 1,
    color: 'red',
  },
  {
    id: 2,
    color: 'green'
  },
  {
    id: 3,
    color: 'blue',
  }
]

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

export default class App extends Component<Props> {

  constructor(props){
    super(props)


    this.position = new Animated.ValueXY()
    this.state = {
      currentIndex:0,
    }
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder:(event,gestureState)=>true,

      onPanResponderMove:(event,gestureState)=>{
        this.position.setValue({
          x:gestureState.dx,
          y:gestureState.dy
        })
      },

      onPanResponderRelease:(event,gestureState)=>{

      }
    })
  }

  renderView() {
    return colors.map((x, y) => {
      if(y<this.state.currentIndex){
        return null
      }
      else if (y == this.state.currentIndex) {
        return (
          <Animated.View {...this.panResponder.panHandlers} key={x.id} style={[{ transform: this.position.getTranslateTransform() }, { position: 'absolute', height: SCREEN_HEIGHT - 120, width: SCREEN_WIDTH, padding: 16 }]}>
            <View style={{ flex: 1, backgroundColor: x.color, borderRadius: 24, width: null, height: null, }}>

            </View>
          </Animated.View>
        )
      }
      else{
        return (
          <Animated.View key={x.id} style={[{ position:'absolute',height: SCREEN_HEIGHT - 120, width: SCREEN_WIDTH, padding: 16 }]}>
            <View style={{ flex: 1, backgroundColor: x.color, borderRadius: 24, width: null, height: null, }}>
  
            </View>
          </Animated.View>
        )
      }
      
    }).reverse()
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ height: 60 }}>

        </View>
        <View style={{ flex: 1 }}>
          {this.renderView()}
        </View>
        <View style={{ height: 60 }}>

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
