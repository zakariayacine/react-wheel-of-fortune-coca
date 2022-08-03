import React, { Component, useState } from "react";
import wincocke from "./assets/wincocke.png";
import winHeadPhones from "./assets/winHeadPhones.png";
import winRingPhone from "./assets/winRingPhone.png";
import winSelfyPerch from "./assets/winSelfyPerch.png";
import winTawel from "./assets/winTawel.png";
import winTeniss from "./assets/winTeniss.png";
import bg from "./assets/bg.png";
import cokeStudio from "./assets/cokeStudio.png";
import cokeStudioMixer from "./assets/cokeStudioMixer.png";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Button,
  Image,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  DevSettings,
  Alert,
} from "react-native";

import WheelOfFortune from "./WheelOfFortune";
import storage from "./storage";
import { error } from "webpack-dev-server/lib/utils/colors";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const participants = [""];

const generateItems = (products) => {
  const itemsId = [];
  products.forEach((item) => {
    for (let i = 0; i < item.quantity; i++) {
      itemsId.push(item._id);
    }
  });

  return itemsId;
};

const productsList = [
  {
    _id: "1",
    itemName: "bouteille coca cola",
    itemPic: wincocke,
    quantity: 200,
  },
  {
    _id: "2",
    itemName: "porte clef",
    itemPic: winRingPhone,
    quantity: 53,
  },
  {
    _id: "3",
    itemName: "perche selfy",
    itemPic: winSelfyPerch,
    quantity: 23,
  },
  {
    _id: "4",
    itemName: "serviette",
    itemPic: winTawel,
    quantity: 13,
  },
  {
    _id: "5",
    itemName: "ecouteurs",
    itemPic: winHeadPhones,
    quantity: 11,
  },
  {
    _id: "6",
    itemName: "beach",
    itemPic: winTeniss,
    quantity: 6,
  },
];

const getRandomIndex = (max) => Math.floor(Math.random() * max);
class Speenwheel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      prize: {
        winnerValue: null,
        winnerIndex: null,
        started: false,
        price: null,
        winner: 1,
      },
      productsList,
      itemsLenght: generateItems(productsList).length,
      drawerOpen: true,
    };
    this.child = null;
  }

  buttonPress = () => {
    const itemsIds = generateItems(this.state.productsList);

    if (itemsIds.length) {
      const randomIndex = getRandomIndex(itemsIds.length);

      const selectedId = itemsIds[randomIndex];

      this.setState(
        (prev) => ({
          productsList: [
            ...prev.productsList.map((item) =>
              item._id === selectedId
                ? {
                    ...item,
                    quantity: item.quantity - 1,
                  }
                : item
            ),
          ],
          prize: {
            ...prev.prize,
            started: true,
            price: productsList.find(
              (item) => item._id === selectedId.toString()
            ).itemPic,
          },
          itemsLenght: itemsIds.length,
        }),
        () => {
          storage.save({
            key: "products",
            data: this.state.productsList,
          });
        }
      );
      this.child._onPress();
    } else {
      this.setState((prev) => ({
        ...prev,
        itemsLenght: 0,
      }));
    }
  };

  componentDidMount() {
    storage
      .load({ key: "products", autoSync: true, syncInBackground: true })
      .then((result) => {
        this.setState({
          productsList: result,
        });
      })
      .catch((error) => console.error(error));
  }

  render() {
    const wheelOptions = {
      rewards: participants,
      knobSize: 0,
      borderWidth: 5,
      borderColor: "#fff",
      innerRadius: 30,
      duration: 6000,
      backgroundColor: "black",
      textAngle: "horizontal",
      onRef: (ref) => (this.child = ref),
    };
    return (
      <ImageBackground source={bg} style={{ flex: 1, resizeMode: "cover" }}>
        <View
          style={{
            alignItems: "center",
            height: "100%",
          }}
        >
          <View style={styles.container}>
            <StatusBar barStyle={"light-content"} />
            <View>
              <WheelOfFortune
                options={wheelOptions}
                getWinner={(value, index) => {
                  this.setState((prev) => ({
                    ...prev.productsList,
                    prize: {
                      ...prev.prize,
                      winnerValue: value,
                      winnerIndex: index,
                    },
                  }));
                }}
              />
            </View>
            {!this.state.prize.started && this.state.itemsLenght !== 0 && (
              <View style={styles.startButtonView}>
                <TouchableOpacity
                  onPress={() => {
                    this.buttonPress();
                  }}
                  style={styles.startButton}
                >
                  <Text style={styles.startButtonText}>Faites tourner !</Text>
                </TouchableOpacity>
              </View>
            )}
            {!this.state?.itemsLenght && (
              <View style={styles.startButtonView}>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({
                      prize: {
                        winnerValue: null,
                        winnerIndex: null,
                        started: false,
                        price: null,
                        winner: 1,
                      },
                      productsList,
                      itemsLenght: generateItems(productsList)?.length,
                    });
                  }}
                  style={styles.startButton}
                >
                  <Text style={styles.startButtonText}>Reset Game!</Text>
                </TouchableOpacity>
              </View>
            )}
            {this.state.prize.winnerIndex != null && (
              <View style={styles.winnerView}>
                <Image
                  source={this.state.prize.price}
                  style={{
                    alignContent: "center",
                    alignItems: "center",
                    position: "absolute",
                    width: windowWidth,
                    height: windowHeight,
                    overflow: "visible",
                    flexWrap: "wrap",
                  }}
                ></Image>
                <Text style={styles.winnerText}>
                  {participants[this.state.prize.winnerIndex]}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({
                      prize: {
                        winnerValue: null,
                        winnerIndex: null,
                        started: false,
                        price: null,
                        winner: 1,
                      },
                    });
                    this.child?._tryAgain();
                  }}
                  style={styles.tryAgainButton}
                >
                  <Text style={styles.tryAgainText}>RÉESSAYER</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
          <Image
            source={cokeStudioMixer}
            style={{
              alignContent: "center",
              alignItems: "center",
              position: "absolute",
              width: windowWidth * 0.1,
              height: windowHeight * 0.23,
              overflow: "visible",
            }}
          ></Image>
        </View>
        <TouchableOpacity
          onPress={() => {
            this.setState({
              prize: {
                winnerValue: null,
                winnerIndex: null,
                started: false,
                price: null,
                winner: 1,
              },
              productsList,
              itemsLenght: generateItems(productsList)?.length,
            });
          }}
          style={{
            position: "absolute",
            marginLeft: 20,
            marginTop: 10,
            padding: 40,
          }}
        >
          <Text style={{ fontSize: 20, color: "white", position: "absolute" }}>
            {this.state.itemsLenght}
          </Text>
        </TouchableOpacity>
      </ImageBackground>
    );
  }
}
export default Speenwheel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E74C3C",
  },
  startButtonView: {
    position: "absolute",
  },
  startButton: {
    backgroundColor: "rgba(0,0,0,0.5)",
    marginTop: windowWidth * 0.3,
    borderRadius: 15,
    padding: 15,
  },
  startButtonText: {
    fontSize: 50,
    width: 360,
    color: "#fff",
    fontWeight: "bold",
  },
  winnerView: {
    opacity: 1,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  winnerText: {
    marginTop: windowWidth * 0.3,
    fontSize: 30,
  },
  tryAgainButton: {
    padding: 20,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 15,
  },
  tryAgainText: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#fff",
  },
});
