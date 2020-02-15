import React, { Component } from "react";
import Accordion from "react-native-collapsible/Accordion";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
  Animated
} from "react-native";
import LineChart from "react-native-responsive-linechart";

import up from "./Images/ic_up.png";
import down from "./Images/ic_down.png";
import xdc from "./Images/ic_xdc.png";
import xdce from "./Images/ic_xdce.png";

const SECTIONS = [
  {
    icon: xdc,
    title: "XDC",
    arrow: up,
    bottomTitle: "(MainNet)",
    price: "0.0001030",
    profitincrease: "0.00"
  },
  {
    icon: xdc,
    arrow: up,
    title: "XDC",
    bottomTitle: "(MainNet)",
    price: "0.0001030",
    profitincrease: "0.00"
  },
  {
    icon: xdce,
    arrow: up,
    title: "XDCe",
    bottomTitle: null,
    price: "0.000486",
    profitincrease: "3.24"
  }
];

export default class ExpandableView extends Component {
  state = {
    activeSections: [],
    elseActiveSections: [],
    isSelected: "Day",
    expanded: true
  };

  onPressHour = () => {
    this.setState({ isSelected: "Hour" });
  };

  onPressDay = () => {
    this.setState({ isSelected: "Day" });
  };

  onPressWeek = () => {
    this.setState({ isSelected: "Week" });
  };

  onPressMonth = () => {
    this.setState({ isSelected: "Month" });
  };

  onPressYear = () => {
    this.setState({ isSelected: "Year" });
  };

  onPressAll = () => {
    this.setState({ isSelected: "All" });
  };

  _renderHeader = sections => {
    return (
      <View style={styles.container}>
        <View
          style={{
            alignContent: "center",
            alignItems: "center",
            flexDirection: "row",
            margin: 10,
            justifyContent: "space-between"
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <View style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <Image source={sections.icon} style={{ height: 25, width: 25 }} />
            </View>
            
              {sections.bottomTitle ?
                <View style={{ flexDirection: "column", marginLeft: 10 }}>
                  <Text style={{ color: "#565e66", fontSize: 18 }}>
                    {sections.title}
                  </Text>
                  <Text style={{ color: "#71869a", fontSize: 12 }}>
                    {sections.bottomTitle}
                  </Text>
                </View>
              : <View style={{ flexDirection: "column", marginLeft: 10 }}>
                  <Text style={{ color: "#565e66", fontSize: 18 }}>
                    {sections.title}
                  </Text>
                </View>}
          </View>

          <View
            style={{
              flexDirection: "row",
              alignContent: "center",
              alignItems: "center"
            }}
          >
            <View style={{ flexDirection: "column", marginRight: 10 }}>
              <Text style={{ color: "#565e66", fontSize: 18  }}>
                {"$ " + sections.price}
              </Text>
              <Text style={{ color: "#15d291", fontSize: 12 }}>
                {"(+ " + sections.profitincrease + "%)"}
              </Text>
            </View>

            <View>
              <TouchableOpacity underlayColor="transparent" onPress={this.onPress} style={{paddingRight: 10}}>
                <Image
                  source={sections.arrow}
                  style={{ height: 10, width: 10 }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };

  _renderContent = section => {
    return (
      <View
        style={{
          backgroundColor: "#ffffff",
          flexDirection: "column",
          borderBottomLeftRadius: 5,
          borderBottomRightRadius: 5,
          marginBottom: 5,
          height: "100%"
        }}
      >
        <View
          style={{ marginTop: 10, marginBottom: 5, flexDirection: "column" }}
        >
          <Text style={{ color: "#565e66", fontSize: 20, textAlign: "center" }}>
            $ 0.0001030
          </Text>
          <Text style={{ color: "#15d291", fontSize: 18, textAlign: "center" }}>
            (+ 0.00%)
          </Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <LineChart
            style={{ flex: 1, height: 100, width: 100 }}
            config={config}
            data={data}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignContent: "center",
            alignItems: "center",
            marginRight: 5,
            marginLeft: 5,
            marginTop: 10,
            marginBottom: 10,
            borderBottomLeftRadius: 5,
            borderBottomRightRadius: 5
          }}
        >
          <TouchableOpacity underlayColor="transparent" onPress={this.onPressHour}>
            <Text
              style={
                this.state.isSelected === "Hour"
                  ? styles.selectedText
                  : styles.unSelectedText
              }
            >
              HOUR
            </Text>
          </TouchableOpacity>
          <TouchableOpacity underlayColor="transparent" onPress={this.onPressDay}>
            <Text
              style={
                this.state.isSelected === "Day"
                  ? styles.selectedText
                  : styles.unSelectedText
              }
            >
              DAY
            </Text>
          </TouchableOpacity>

          <TouchableOpacity underlayColor="transparent" onPress={this.onPressWeek}>
            <Text
              style={
                this.state.isSelected === "Week"
                  ? styles.selectedText
                  : styles.unSelectedText
              }
            >
              WEEK
            </Text>
          </TouchableOpacity>

          <TouchableOpacity underlayColor="transparent" onPress={this.onPressMonth}>
            <Text
              style={
                this.state.isSelected === "Month"
                  ? styles.selectedText
                  : styles.unSelectedText
              }
            >
              MONTH
            </Text>
          </TouchableOpacity>

          <TouchableOpacity underlayColor="transparent" onPress={this.onPressYear}>
            <Text
              style={
                this.state.isSelected === "Year"
                  ? styles.selectedText
                  : styles.unSelectedText
              }
            >
              YEAR
            </Text>
          </TouchableOpacity>

          <TouchableOpacity underlayColor="transparent" onPress={this.onPressAll}>
            <Text
              style={
                this.state.isSelected === "All"
                  ? styles.selectedText
                  : styles.unSelectedText
              }
            >
              ALL
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  isEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  }
  _updateSections = activeSections => {
    if (!this.isEmpty(activeSections)) {
      if (activeSections == 0 || activeSections == 1 || activeSections == 2) {
        if (!this.isEmpty(this.state.elseActiveSections)) {
          if (
            this.state.elseActiveSections == 0 ||
            this.state.elseActiveSections == 1 ||
            this.state.elseActiveSections == 2
          ) {
            SECTIONS[this.state.elseActiveSections].arrow = up;
          } else {
          }
        }
        this.setState({ elseActiveSections: activeSections });
        SECTIONS[activeSections].arrow = down;
      }
    } else {
      SECTIONS[this.state.elseActiveSections].arrow = up;
    }
    this.setState({ activeSections });
  };

  render() {
    return (
      <Accordion
        sections={SECTIONS}
        activeSections={this.state.activeSections}
        renderHeader={this._renderHeader}
        renderContent={this._renderContent}
        onChange={this._updateSections}
      />
    );
  }
}
var styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flexDirection: "column",
    borderRadius: 5,
    marginBottom: 5,
    marginTop: 5,
    width: '90%',
    marginLeft: '5%',
    elevation: 2,
  },

  unSelectedText: {
    color: "#708599",
    fontSize: 20
  },
  selectedText: {
    color: "#1450f0",
    fontSize: 20
  }
});
const data = [
  -10,
  -15,
  40,
  19,
  32,
  15,
  52,
  55,
  20,
  60,
  78,
  42,
  56,
  -10,
  -15,
  40,
  19,
  32,
  15,
  52,
  55,
  20,
  60,
  78,
  42,
  56,
  -10,
  -15,
  40,
  19,
  32,
  15,
  52,
  55,
  20,
  60,
  78,
  42,
  56
];
const config = {
  grid: {
    visible: false,
    backgroundColor: "#fff",
    strokeWidth: 1,
    strokeColor: "#ededed",
    stepSize: 15
  },
  line: {
    visible: true,
    strokeWidth: 1,
    strokeColor: "#177cf7"
  },
  area: {
    visible: true,
    gradientFrom: "#d2e5fd",
    gradientFromOpacity: 1,
    gradientTo: "#d2e5fd",
    gradientToOpacity: 0.4
  },
  yAxis: {
    visible: false,
    labelFontSize: 12,
    labelColor: "#777",
    labelFormatter: v => String(v)
  },
  xAxis: {
    visible: false,
    labelFontSize: 12,
    labelColor: "#777"
  },
  tooltip: {
    visible: false,
    labelFormatter: v => v.toFixed(2),
    lineColor: "#777",
    lineWidth: 1,
    circleColor: "#fff",
    circleBorderColor: "#fff",
    circleBorderWidth: 1,
    boxColor: "#fff",
    boxBorderWidth: 1,
    boxBorderColor: "#777",
    boxBorderRadius: 5,
    boxPaddingY: 0,
    boxPaddingX: 0,
    labelColor: "black",
    labelFontSize: 10
  },
  dataPoint: {
    visible: false,
    color: "#777",
    radius: 5,
    label: {
      visible: false,
      labelFontSize: 12,
      labelColor: "#777",
      labelFormatter: v => String(v),
      marginBottom: 25
    }
  },
  insetY: 0,
  insetX: 0,
  interpolation: "none",
  backgroundColor: "#fff"
};
