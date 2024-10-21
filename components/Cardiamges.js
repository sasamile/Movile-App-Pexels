import { StyleSheet, Image, Dimensions, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

export default function CardIamges({ item }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={sty.cardImages}
      onPress={() => navigation.navigate("ImagenScreen", { item })}
    >
      <Image
        source={{
          uri: item.src.medium
            ? item.src.medium
            : `https://www.shutterstock.com/image-vector/silhouette-character-dragonball-z-anime-600nw-2363148467.jpg`,
        }}
        style={{
          width: "100%",
          height: 180,
        }}
      />
    </TouchableOpacity>
  );
}

const sty = StyleSheet.create({
  cardImages: {
    width: width * 0.47,
    margin: 4,
    backgroundColor: "#2c292c",
    borderRadius: 5,
    borderWidth: 0,
  },
});
