import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import Meteor from "@meteorrn/core";
import { StyleSheet, Text, View } from "react-native";
import AppContext from "./AppContext";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import "./ServerUrls";
import { Servers } from "./Servers";
import { News } from "./News";

export default function App() {
  const [url, setUrlValue] = React.useState();

  const Stack = createStackNavigator();

  const setUrl = (value) => {
    if (url != value){
      console.log("Disconnect from Meteor server " + url)
      Meteor.disconnect()
      console.log("Changed Meteor server URL to" + value);
      setUrlValue(value);
      Meteor.connect(value);
    }
  };

  const userSettings = {
    url,
    setUrl,
  };

  useEffect(() => {
    if (url) {
      Meteor.ddp.on("connected", () => {
        console.log("Connected to " + url);
      });
      Meteor.ddp.on("disconnected", () => {
        console.log("Disconneted from " + url);
      });
    }
  }, [url]);

  return (
    <AppContext.Provider value={userSettings}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Servers">
          <Stack.Screen name="Servers" component={Servers} />
          <Stack.Screen name="News" component={News} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
