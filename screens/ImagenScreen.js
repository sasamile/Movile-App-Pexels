import { View, Image, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Avatar, Button } from "react-native-elements";
import React, { useEffect, useState } from "react";
import * as WebBrowser from "expo-web-browser";
import ImageList from "../components/ImageList";
import { GetImages } from "../api/pexels";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";

export default function ImagenScreen({ route }) {
  const [photos, setPhotos] = useState([]);

  const { item } = route.params;

  const loadImages = async () => {
    const res = await GetImages();
    setPhotos(res.data.photos);
  };

  const handlePress = async () => {
    await WebBrowser.openBrowserAsync(item.photographer_url);
  };

  useEffect(() => {
    loadImages();
  }, []);

  const downloadFile = async() => {
    try {
      let fileUri =  FileSystem.documentDirectory + item.id + ".jpeg";
      const { uri } = await FileSystem.downloadAsync(item.src.large2x, fileUri);

      saveFile(uri);
    } catch (error) {
      console.log(error);
    }
  };

  const saveFile = async (fileUri) => {
    const { status } = await MediaLibrary.requestPermissionsAsync();

    if (status === "granted") {
      const assets = await MediaLibrary.createAssetAsync(fileUri);
      await MediaLibrary.createAlbumAsync("Download", assets, false);
    }
  };

  const handleDownload = () => {
    downloadFile();
  };

  return (
    <View style={styles.headerPhografi}>
      <Image source={{ uri: item.src.large2x, height: 350 }} />
      <View
        style={{
          display: "flex",
          paddingVertical: 18,
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
          }}
        >
          <Avatar
            title={item.photographer
              .split(" ")
              .map((string) => string[0])
              .join("")
              .toUpperCase()}
            containerStyle={{ backgroundColor: "red" }}
            rounded
          />
          <TouchableOpacity onPress={handlePress}>
            <Text style={styles.textfotografi}>{item.photographer}</Text>
          </TouchableOpacity>
        </View>
        <Button
          title="Download"
          buttonStyle={{ backgroundColor: "orange" }}
          onPress={() => handleDownload()}
        />
      </View>
      <View>
        <ImageList photos={photos} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerPhografi: {
    backgroundColor: "#0d0d0d",
    flex: 1,
    flexDirection: "column",
    padding: 10,
  },
  textfotografi: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
});
