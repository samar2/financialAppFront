import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  ScrollView,
  Image,
  Dimensions
} from "react-native";
import ListNew from "./ListNew";
import AddIncome from "./AddIncome";
import InfoView from "./InfoView";

const { width } = Dimensions.get("window");

export default class MenuTab extends React.Component {
  state = {
    active: 0,
    xTabOne: 0,
    xTabTwo: 0,
    xTabThree: 0,
    translateX: new Animated.Value(0),
    translateXTabOne: new Animated.Value(0),
    translateXTabTwo: new Animated.Value(width),
    translateXTabThree: new Animated.Value(width),
    translateY: -1000
  };

  handleSlide = type => {
    let {
      active,
      xTabOne,
      xTabTwo,
      translateX,
      translateXTabOne,
      translateXTabTwo,
      translateXTabThree
    } = this.state;
    Animated.spring(translateX, {
      toValue: type,
      duration: 100
    }).start();
    if (active === 0) {
      Animated.parallel([
        Animated.spring(translateXTabOne, {
          toValue: 0,
          duration: 100
        }).start(),
        Animated.spring(translateXTabTwo, {
          toValue: width,
          duration: 100
        }).start(),
        Animated.spring(translateXTabThree, {
          toValue: width * 2,
          duration: 100
        }).start()
      ]);
    } else if (active === 1) {
      Animated.parallel([
        Animated.spring(translateXTabOne, {
          toValue: -width,
          duration: 100
        }).start(),
        Animated.spring(translateXTabTwo, {
          toValue: 0,
          duration: 100
        }).start(),
        Animated.spring(translateXTabThree, {
          toValue: width,
          duration: 100
        }).start()
      ]);
    } else {
      Animated.parallel([
        Animated.spring(translateXTabOne, {
          toValue: -width * 2,
          duration: 100
        }).start(),
        Animated.spring(translateXTabTwo, {
          toValue: -width,
          duration: 100
        }).start(),
        Animated.spring(translateXTabThree, {
          toValue: 0,
          duration: 100
        }).start()
      ]);
    }
  };

  render() {
    let {
      xTabOne,
      xTabTwo,
      xTabThree,
      translateX,
      active,
      translateXTabOne,
      translateXTabTwo,
      translateXTabThree,
      translateY
    } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            width: "100%",
            marginLeft: "auto",
            marginRight: "auto"
          }}
        >
          <View
            style={{
              flexDirection: "row",
              marginTop: 40,
              marginBottom: 20,
              height: 36,
              position: "relative"
            }}
          >
            <Animated.View
              style={{
                position: "absolute",
                width: "33%",
                height: "100%",
                top: 0,
                left: 0,
                backgroundColor: "#007aff",
                borderRadius: 4,
                transform: [
                  {
                    translateX
                  }
                ]
              }}
            />
            <TouchableOpacity
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                borderWidth: 1,
                borderColor: "#007aff",
                borderRadius: 4,
                borderRightWidth: 0,
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0
              }}
              onLayout={event =>
                this.setState({
                  xTabOne: event.nativeEvent.layout.x
                })
              }
              onPress={() =>
                this.setState({ active: 0 }, () => this.handleSlide(xTabOne))
              }
            >
              <Text
                style={{
                  color: active === 0 ? "#fff" : "#007aff"
                }}
              >
                Expenses
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                borderWidth: 1,
                borderColor: "#007aff",
                borderRadius: 4,
                borderLeftWidth: 0,
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0
              }}
              onLayout={event =>
                this.setState({
                  xTabTwo: event.nativeEvent.layout.x
                })
              }
              onPress={() =>
                this.setState({ active: 1 }, () => this.handleSlide(xTabTwo))
              }
            >
              <Text
                style={{
                  color: active === 1 ? "#fff" : "#007aff"
                }}
              >
                Incomes
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                borderWidth: 1,
                borderColor: "#007aff",
                borderRadius: 4,
                borderRightWidth: 0,
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0
              }}
              onLayout={event =>
                this.setState({
                  xTabThree: event.nativeEvent.layout.x
                })
              }
              onPress={() =>
                this.setState({ active: 2 }, () => this.handleSlide(xTabThree))
              }
            >
              <Text
                style={{
                  color: active === 2 ? "#fff" : "#007aff"
                }}
              >
                OverView
              </Text>
            </TouchableOpacity>
          </View>

          <ScrollView>
            <Animated.View
              style={{
                justifyContent: "center",
                alignItems: "center",
                transform: [
                  {
                    translateX: translateXTabOne
                  }
                ]
              }}
              onLayout={event =>
                this.setState({
                  translateY: event.nativeEvent.layout.height
                })
              }
            >
              <Text>Hi, I am a cute cat</Text>
              <View style={{ marginTop: 20 }}>
                <Image
                  source={require("../../assets/cat.jpg")}
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 15
                  }}
                />
              </View>
            </Animated.View>

            <Animated.View
              style={{
                justifyContent: "center",
                alignItems: "center",
                transform: [
                  {
                    translateX: translateXTabTwo
                  },
                  {
                    translateY: -translateY
                  }
                ]
              }}
            >
              <AddIncome addItem={this.props.addItem} />
              <ListNew
                data={this.props.data.filter(item => {
                  return item.type === "income";
                })}
                deleteItem={this.props.deleteItem}
                editItem={this.props.editItem}
              />
            </Animated.View>
            <Animated.View
              style={{
                justifyContent: "center",
                alignItems: "center",
                transform: [
                  {
                    translateX: translateXTabThree
                  },
                  {
                    translateY: -1000 - translateY * 3
                  }
                ]
              }}
            >
              {/* <Text>Hi, I am a cute dog</Text>
              <View style={{ marginTop: 20 }}>
                <Image
                  source={require("../../assets/dog.jpg")}
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 15
                  }}
                />
              </View> */}
              <InfoView />
            </Animated.View>
          </ScrollView>
        </View>
      </View>
    );
  }
}
