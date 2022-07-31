import * as React from "react";
import { useRef } from "react";
import { StyleSheet, Text, View, Button,ImageBackground, Image,Dimensions,Animated,Easing } from "react-native";
import bg from "./assets/bg.png";
import cokeStudio from "./assets/cokeStudio.png";
import cokeStudioMixer from "./assets/cokeStudioMixer.png";
import Speenwheel from "./Speenwheel";
import * as ScreenOrientation from 'expo-screen-orientation';
import { Audio } from 'expo-av';

function App() {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const audioClip = new Audio.Sound();

  return (
    <ImageBackground 
    source={bg}
    style={{flex:1,
       resizeMode: 'cover'}}
    imageStyle={{opacity:1}}
    >
      <View style={{ 
        alignItems:'center',
        height: '100%',
      }}>
        <Speenwheel />
        <Image
        source={cokeStudioMixer}
        style={{
          alignContent:'center',
          alignItems:'center',
            position:"absolute",
            width: windowWidth * 0.15,
            height: windowHeight * 0.28 ,
            overflow: 'visible'
          }}
        >
        </Image>
      </View>
    </ImageBackground>
  );
}

export default App;
