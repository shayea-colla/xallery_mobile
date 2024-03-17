import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";
import { Button, Surface, Text, useTheme } from "react-native-paper";
import { ViewProps } from "../Themed";

type designerCardProps = {
  picture: string | undefined;
  username: string;
  description: string;
} & ViewProps;
export default function DesignerCard({
  picture,
  username,
  description,
  style,
}: designerCardProps) {
  const theme = useTheme();

  let placeholder: string;
  try {
    // Try get the original picture
    placeholder = require("@/assets/images/full_logo.png");
  } catch {
    // Default hash if error accured
    placeholder =
      "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";
  }

  return (
    <Surface style={[style, styles.container]} elevation={0}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
        <View>
          <Image
            style={[styles.image, { borderColor: theme.colors.secondary }]}
            source={picture}
            contentFit="cover"
            placeholder={placeholder}
          />
        </View>
        <View>
          <Text style={{ marginTop: 2 }} variant="titleMedium">
            {username}
          </Text>
          <Text style={{ marginTop: 2 }} variant="bodySmall">
            {description}
          </Text>
        </View>
      </View>
      <View>
        <Button  mode="contained" onPress={() => alert("follow")}>follow</Button>
      </View>
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 6,
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 12,
    padding: 10,
  },
  image: {
    height: 65,
    width: 65,
    borderRadius: 100,
    borderWidth: 1,
  },
});
