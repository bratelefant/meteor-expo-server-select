import { StatusBar } from "expo-status-bar";
import React, { useContext } from "react";
import AppContext from "./AppContext";
import Meteor, { Mongo, useTracker } from "@meteorrn/core";
import { StyleSheet, FlatList, Text, View } from "react-native";

const NewsCollection = new Mongo.Collection("news");

export const NewsItem = ({text}) => {
  return <View>
    <Text>{text}</Text>
  </View>
}

export const News = (props) => {
  const myContext = useContext(AppContext);
  const { news, loading } = useTracker(() => {
    const noData = { news: [] };
    const handler = Meteor.subscribe("news");
    if (!handler.ready()) return { ...noData, loading : true }
    const news = NewsCollection.find().fetch()
    return { news, loading : false }
  });

  return (
    <View>
      <FlatList
        data={news}
        renderItem={({item}) => <NewsItem text={item.text} />}
        keyExtractor={item => item._id}
        />
    </View>
  );
}