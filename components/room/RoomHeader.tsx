import { View } from "@/components";
import { fullRoomType } from "@/types";
import { ViewProps } from "@/components/Themed";
import { Divider } from 'react-native-paper'

import RoomBackground from "./RoomBackground";
import RoomInfo from "./RoomInfo";
import { StyleSheet } from "react-native";

export default function RoomHeader({
  room,
  style,
  showSnack,
}: { room: fullRoomType , showSnack: () => void} & ViewProps) {

  return (
    <View style={[style, styles.container]}>
      <RoomBackground background={room.background} />
      <View style={{ flex: 1, marginStart: 16, marginEnd: 16, marginBottom: 10 }}>
        <RoomInfo
          showSnack={showSnack}
          style={{ marginTop: 10}}
          room={room}
        />
      </View>
      <Divider bold style={{marginBottom: 10}} />
    </View>
  );
}





const styles = StyleSheet.create({
  container: {
    flex: 1
  }, 
})