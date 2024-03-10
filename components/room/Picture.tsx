import { StyleSheet } from "react-native";
import { View } from "@/components";
//import { Icon, Text } from "react-native-paper";
import { pictureType } from "@/types";
import { ViewProps } from "@/components/Themed";
import AutoHeightImage from "react-native-auto-height-image";

export default function Picture({
  uri,
  style,
  width,
}: { uri: string; width: number } & ViewProps) {
  /**
   * picture compoenent that takes a pictureType object and display the image of that picture ( picture.image )
   */
  return (
    <View style={[style, styels.container]}>
      <AutoHeightImage width={width} source={{ uri: uri }} />
    </View>
  );
}

//function Like({ picture }: { picture: pictureType }) {
//  return (
//    <View style={styels.likesContainer}>
//      <Icon size={22} source={"thumb-up"} />
//      <Text style={{ color: "white" }}>{picture.likes.length}</Text>
//    </View>
//  );
//}

const styels = StyleSheet.create({
  container: {
    flex: 1,
  },

  likesContainer: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-around",
    gap: 4,
    alignItems: "center",
    bottom: 9,
    left: 9,
    borderRadius: 4,
    backgroundColor: "#555",
    padding: 4,
  },
});
