import { Dimensions } from "react-native";

export function calculateImageHeightLevel(imageHeight: number) {
  const phoneHeight = Dimensions.get("window").height;
  return Math.round((imageHeight / phoneHeight) * 10);
}
