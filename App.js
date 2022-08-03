import * as React from "react";
import { useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  ImageBackground,
  Image,
  Dimensions,
  Animated,
  Easing,
} from "react-native";
import Speenwheel from "./Speenwheel";
import * as ScreenOrientation from "expo-screen-orientation";
import { StatusBar } from "react-native";

function App() {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  React.useEffect(() => {
    StatusBar.setHidden(true);
  }, []);

  return <Speenwheel />;
}

export default App;
