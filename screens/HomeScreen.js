import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { GetImages } from "../api/pexels";
import ImageList from "../components/ImageList";
import { Button, Input } from "react-native-elements";

export default function HomeScreen({ openSearch }) {
  const [photos, setPhotos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const loadImages = async (searchTem) => {
    const res = await GetImages(searchTem);
    setPhotos(res.data.photos);
  };

  useEffect(() => {
    loadImages();
  }, []);

  const handleSearch = async () => {
    await loadImages(searchTerm);
  };

  return (
    <>
      {openSearch && (
        <View style={styles.SearchSection}>
          <Input
            leftIcon={{ type: "feather", name: "search", color: "white" }}
            placeholder="Search a Term"
            leftIconContainerStyle={styles.searLefticon}
            style={styles.input}
            inputContainerStyle={styles.SearchInput}
            onChangeText={(value) => setSearchTerm(value)}
          />
          <Button
            buttonStyle={styles.SearchBotton}
            title={"Search"}
            onPress={() => handleSearch()}
          />
        </View>
      )}
      <View style={styles.container}>
        <Text style={styles.totalResultText}>1000 Results</Text>
        <ImageList photos={photos} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D0D0D",
    alignItems: "center",
    justifyContent: "center",
  },
  totalResultText: {
    color: "#d0d0d0",
    textAlign: "right",
    width: "100%",
    paddingTop: 35,
    paddingRight: 12,
  },
  SearchInput: {
    backgroundColor: "#2c292c",
    borderBottomWidth: 0,
    paddingHorizontal: 4,
    color: "white",
  },
  SearchSection: {
    backgroundColor: "#0D0D0D",
    width: "100%",
    paddingLeft: 10,
    paddingRight: 80,
    flex: 1 / 5,
    flexDirection: "row",
    alignItems: "center",
  },
  searLefticon: {
    paddingStart: 10,
    marginRight: 7,
  },
  input: {
    color: "white",
  },
  SearchBotton: {
    backgroundColor: "orange",
    marginBottom: 27,
  },
});
