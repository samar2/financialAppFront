import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";
import ListNew from "./ListNew";
import AddIncome from "./AddIncome";
import InfoView from "./InfoView";
import AddGoal from "./AddGoal";
import AddExpense from "./AddExpense";

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
    translateY: -1000,
    translateSS: -1000,
    translateBB: -1000,
  };

  handleSlide = (type) => {
    let {
      active,
      xTabOne,
      xTabTwo,
      translateX,
      translateXTabOne,
      translateXTabTwo,
      translateXTabThree,
    } = this.state;
    Animated.spring(translateX, {
      toValue: type,
      duration: 100,
    }).start();
    if (active === 0) {
      Animated.parallel([
        Animated.spring(translateXTabOne, {
          toValue: 0,
          duration: 100,
        }).start(),
        Animated.spring(translateXTabTwo, {
          toValue: width,
          duration: 100,
        }).start(),
        Animated.spring(translateXTabThree, {
          toValue: width * 2,
          duration: 100,
        }).start(),
      ]);
    } else if (active === 1) {
      Animated.parallel([
        Animated.spring(translateXTabOne, {
          toValue: -width,
          duration: 100,
        }).start(),
        Animated.spring(translateXTabTwo, {
          toValue: 0,
          duration: 100,
        }).start(),
        Animated.spring(translateXTabThree, {
          toValue: width,
          duration: 100,
        }).start(),
      ]);
    } else {
      Animated.parallel([
        Animated.spring(translateXTabOne, {
          toValue: -width * 2,
          duration: 100,
        }).start(),
        Animated.spring(translateXTabTwo, {
          toValue: -width,
          duration: 100,
        }).start(),
        Animated.spring(translateXTabThree, {
          toValue: 0,
          duration: 100,
        }).start(),
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
      translateY,
      translateSS,
      translateBB,
    } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            width: "100%",
            marginLeft: "auto",
            marginRight: "auto",
            backgroundColor: "white",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              marginTop: 0,
              marginBottom: 20,
              height: 36,
              position: "relative",
              backgroundColor: "#8173f0",
            }}
          >
            <Animated.View
              style={{
                position: "absolute",
                width: "33%",
                height: "100%",
                top: 0,
                left: 0,
                backgroundColor: "#a4e8aa",
                borderRadius: 4,
                transform: [
                  {
                    translateX,
                  },
                ],
              }}
            />
            <TouchableOpacity
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                borderWidth: 1,
                borderColor: "#8173f0",
                borderRadius: 4,
                borderRightWidth: 0,
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
              }}
              onLayout={(event) =>
                this.setState({
                  xTabOne: event.nativeEvent.layout.x,
                })
              }
              onPress={() =>
                this.setState({ active: 0 }, () => this.handleSlide(xTabOne))
              }
            >
              <Text
                style={{
                  color: active === 0 ? "white" : "white",
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
                borderColor: "#8173f0",
                borderRadius: 4,
                borderLeftWidth: 0,
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
              }}
              onLayout={(event) =>
                this.setState({
                  xTabTwo: event.nativeEvent.layout.x,
                })
              }
              onPress={() =>
                this.setState({ active: 1 }, () => this.handleSlide(xTabTwo))
              }
            >
              <Text
                style={{
                  color: active === 1 ? "white" : "white",
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
                borderColor: "#8173f0",
                borderRadius: 4,
                borderRightWidth: 0,
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
              }}
              onLayout={(event) =>
                this.setState({
                  xTabThree: event.nativeEvent.layout.x,
                })
              }
              onPress={() =>
                this.setState({ active: 2 }, () => this.handleSlide(xTabThree))
              }
            >
              <Text
                style={{
                  color: active === 2 ? "white" : "white",
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
                    translateX: translateXTabOne,
                  },
                ],
              }}
              onLayout={(event) =>
                this.setState({
                  translateY: event.nativeEvent.layout.height,
                })
              }
            >
              {/* add expense view here */}
              <AddExpense addItem={this.props.addItem} currencies={this.props.currencies} categories={this.props.categories} />
              
              <ListNew
                /* data={this.props.data.filter((item) => {
                  return item.type === "expense";
                })} */
                data={this.props.transactions.filter((item) => {
                  return item.type === "expense"&& ((item.start_date.split("-")[1]==((new Date()).getUTCMonth() + 1) &&item.start_date.split("-")[0]===""+(new Date()).getUTCFullYear())||(item.kind==='recurring' &&item.end_date.split("-")[0]>""+(new Date()).getUTCFullYear() )||(item.kind==='recurring' &&item.end_date.split("-")[0]==""+(new Date()).getUTCFullYear() && item.end_date.split("-")[1]>=((new Date()).getUTCMonth() + 1) ));
               })}
                deleteItem={this.props.deleteItem}
                editItem={this.props.editItem}
                currencies={this.props.currencies}
                categories={this.props.categories}
              />
            </Animated.View>

            <Animated.View
              style={{
                justifyContent: "center",
                alignItems: "center",
                transform: [
                  {
                    translateX: translateXTabTwo,
                  },
                  {
                    translateY: -translateY,
                  },
                ],
              }}
              onLayout={(event) =>
                this.setState({
                  translateBB: event.nativeEvent.layout.height,
                })
              }
            >
              <AddIncome addItem={this.props.addItem} currencies={this.props.currencies} categories={this.props.categories} />
              <ListNew
                data={this.props.transactions.filter((item) => {
                  return item.type === "income"&& ((item.start_date.split("-")[1]==((new Date()).getUTCMonth() + 1) &&item.start_date.split("-")[0]===""+(new Date()).getUTCFullYear())||(item.kind==='recurring' &&item.end_date.split("-")[0]>""+(new Date()).getUTCFullYear() )||(item.kind==='recurring' &&item.end_date.split("-")[0]==""+(new Date()).getUTCFullYear() && item.end_date.split("-")[1]>=((new Date()).getUTCMonth() + 1) ));
                })}
                deleteItem={this.props.deleteItem}
                editItem={this.props.editItem}
                currencies={this.props.currencies}
                categories={this.props.categories}
              />
            </Animated.View>
            <Animated.View
              style={{
                justifyContent: "center",
                alignItems: "center",
                transform: [
                  {
                    translateX: translateXTabThree,
                  },
                  {
                    translateY: -translateY - translateBB,
                  },
                ],
              }}
              onLayout={(event) =>
                this.setState({
                  translateSS: event.nativeEvent.layout.height,
                })
              }
            >
             { <InfoView data={this.props.transactions} />}
            </Animated.View>
          </ScrollView>
        </View>
      </View>
    );
  }
}
