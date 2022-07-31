import React, {Component, useState} from 'react';
import wincocke from "./assets/wincocke.png";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Button,
  Image,
  TouchableOpacity,
  Dimensions,
  DevSettings,
} from 'react-native';

import WheelOfFortune from './WheelOfFortune';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const participants = [
  '',
];

class Speenwheel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      winnerValue: null,
      winnerIndex: null,
      started: false,
      price : wincocke,
      winner : 1,
    };
    this.child = null;
  }

  buttonPress = () => {

    this.setState({
      started: true,
    });
    this.child._onPress();
  };

  render() {
    const wheelOptions = {
      rewards: participants,
      knobSize: 0,
      borderWidth: 5,
      borderColor: '#fff',
      innerRadius: 30,
      duration: 6000,
      backgroundColor: 'black',
      textAngle: 'horizontal',
      onRef: ref => (this.child = ref),
    };
    return (
      <View style={styles.container}>
        <StatusBar barStyle={'light-content'} />
        <WheelOfFortune
          options={wheelOptions}
          getWinner={(value, index) => {
            this.setState({winnerValue: value, winnerIndex: index});
          }}
        />
        {!this.state.started && (
          <View style={styles.startButtonView}>
            <TouchableOpacity
              onPress={() => this.buttonPress()}
              style={styles.startButton}>
              <Text style={styles.startButtonText}>Faites tourner pour gagner!</Text>
            </TouchableOpacity>
          </View>
        )}
        {this.state.winnerIndex != null && (
          <View style={styles.winnerView}>
            <Image
              source={this.state.price}
              style={{
                alignContent:'center',
                alignItems:'center',
                  position:"absolute",
                  width: windowWidth,
                  height: windowHeight,
                  overflow: 'visible'
                }}
              >
              </Image>
            <Text style={styles.winnerText}>
              {participants[this.state.winnerIndex]}
            </Text>
            <TouchableOpacity
              onPress={() => {
                DevSettings.reload()
              }}
              style={styles.tryAgainButton}>
              <Text style={styles.tryAgainText}>RÉESSAYER</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
}
export default Speenwheel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E74C3C'
  },
  startButtonView: {
    position: 'absolute',
  },
  startButton: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    marginTop: 600,
    borderRadius:15,
    padding: 15,
  },
  startButtonText: {
    fontSize: 50,
    color: '#fff',
    fontWeight: 'bold',
  },
  winnerView: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  winnerText: {
    marginTop:500,
    fontSize: 30,
  },
  tryAgainButton: {
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius:15,
  },
  tryAgainText: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#fff',
  },
});