import { View } from "@/components";
import { ViewProps } from "@/components/Themed";
import { Image } from "expo-image";

export default function RoomBackground({
  background,
}: { background: string } & ViewProps) {
  return (
    <View style={{ height: 200, justifyContent: "flex-start" }}>
      <Image
        style={{ height: "100%" }}
        source={background}
        contentFit="cover"
        transition={200}
      />
    </View>
  );
}
