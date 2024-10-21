import { View, FlatList,  } from "react-native";
import React from "react";
import CardIamges from "./Cardiamges";

export default function ImageList({ photos }) {
  const renderItem = ({ item }) => <CardIamges item={item}/> ;

  return (
    <View>
      <FlatList
        data={photos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
      />
    </View>
  );
}

