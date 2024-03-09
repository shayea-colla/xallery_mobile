import { StyleSheet } from "react-native";
import { View } from "@/components";
import { Image } from "expo-image";
import {  Surface, Text, useTheme } from "react-native-paper";
import { ViewProps } from "../Themed";

type designerCardProps = { picture: string | undefined; username: string } & ViewProps;
export default function DesignerCard({
  picture,
  username,
  style,
}: designerCardProps) {
  const theme = useTheme();

    let placeholder:string;
    try {
        // Try get the original picture
        placeholder = require("@/assets/images/full_logo.png")
    } catch {
        // Default hash if error accured
        placeholder = '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';
    }

  return (
    <Surface style={[style, styles.container]} elevation={0}>
      <View style={{ backgroundColor: "transparent" }}>
        <Image
          style={[styles.image, { borderColor: theme.colors.secondary }]}
          source={picture}
          contentFit="cover"
          placeholder={placeholder}
        />
      </View>
      <Text style={{ marginTop: 2 }} variant="titleMedium">
        {username}
      </Text>
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    //        backgroundColor: 'transparent',
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "transparent",
    borderRadius: 12,
    padding: 10,
  },
  image: {
    height: 80,
    width: 80,
    borderRadius: 100,
    borderWidth: 1,
    alignSelf: "center",
  },
});
