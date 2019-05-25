/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Animated, PanResponder, Dimensions } from 'react-native';

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

  constructor(props) {
    super(props)

    this.position = new Animated.ValueXY()

    this.rotate = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: ['-10deg', '0deg', '10deg'],
      extrapolate: 'clamp '
    })

    this.nextCardOpacity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [1, 0, 1],
      extrapolate: 'clamp'
    })
    this.nextCardScale = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [1, 0.8, 1],
      extrapolate: 'clamp'
    })


    this.rotateAndTranslate = {
      transform: [
        {
          rotate: this.rotate
        }
        ,
        ...this.position.getTranslateTransform()
      ]
    }

    this.state = {
      currentIndex: 0,
    }

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (event, gestureState) => true,

      onPanResponderMove: (event, gestureState) => {
        this.position.setValue({
          x: gestureState.dx,
          y: gestureState.dy
        })
      },

      onPanResponderRelease: (event, gestureState) => {
        if (gestureState.dx > 120) {
          Animated.timing(this.position, {
            toValue: { x: SCREEN_WIDTH + 1000, y: gestureState.dy },
            duration: 500
          }).start(() => {
            this.setState({
              currentIndex: this.state.currentIndex + 1
            }, () => {
              this.position.setValue({ x: 0, y: 0 })
            })
          })
        } else if (gestureState.dx < -120) {
          Animated.timing(this.position, {
            toValue: { x: -SCREEN_WIDTH - 1000, y: gestureState.dy },
            duration: 500
          }).start(() => {
            this.setState({
              currentIndex: this.state.currentIndex + 1
            }, () => {
              this.position.setValue({ x: 0, y: 0 })
            })
          })
        }
        else{
          Animated.timing(this.position,{
            toValue:{x:0,y:0},
            duration:500,
          }).start()
        }
      }
    })
  }

  renderView() {
    return colors.map((x, y) => {
      if (y < this.state.currentIndex) {
        return null
      }
      else if (y == this.state.currentIndex) {
        return (
          <Animated.View {...this.panResponder.panHandlers} key={x.id} style={[this.rotateAndTranslate, { position: 'absolute', height: SCREEN_HEIGHT - 120, width: SCREEN_WIDTH, padding: 16 }]}>
            <View style={{ flex: 1, backgroundColor: x.color, borderRadius: 24, width: null, height: null, }}>

            </View>
          </Animated.View>
        )
      }
      else {
        return (
          <Animated.View key={x.id} style={[{ opacity: this.nextCardOpacity, transform: [{ scale: this.nextCardScale }] }, { position: 'absolute', height: SCREEN_HEIGHT - 120, width: SCREEN_WIDTH, padding: 16 }]}>
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