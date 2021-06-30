import { StatusBar } from "expo-status-bar";
import React, { useEffect, useContext } from "react";
import Meteor, { Mongo, useTracker } from "@meteorrn/core";
import { StyleSheet, FlatList, Text, Button, View } from "react-native";
import AppContext from "./AppContext";
import "./ServerUrls.js";

export const ServerItem = ({ server, url, navigation }) => {
  const myContext = useContext(AppContext);
  return (
    <View>
      <Button
        onPress={() => {
          myContext.setUrl(url);
          navigation.navigate("News");
        }}
        title={server}
      />
    </View>
  );
};

export const Servers = ({ navigation }) => {
  return (
    <View>
      <FlatList
        data={servers}
        renderItem={({ item }) => (
          <ServerItem
            navigation={navigation}
            server={item.server}
            url={item.url}
          />
        )}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
};
