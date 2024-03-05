import { useState } from "react";
import { fullRoomType, pictureType } from "@/types";
import { SafeAreaView, ViewProps } from "@/components/Themed";
import {
  Dimensions,
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  RefreshControl,
} from "react-native";
import { Snackbar } from "react-native-paper";

import Picture from "./Picture";
import RoomHeader from "./RoomHeader";
import { useQueryClient } from "@tanstack/react-query";

type roomDetailProps = {
  room: fullRoomType;
  pictures: pictureType[];
} & ViewProps;

export default function RoomDetail({ pictures, room, style }: roomDetailProps) {
  const queryClient = useQueryClient();
  const [snackVisible, setSnackVisible] = useState(false)

  const margin = 8;
  const phoneWidth = Dimensions.get("window").width - margin * 2;

  const renderItem = ({ item }: ListRenderItemInfo<pictureType>) => {
    return (
      <Picture
        style={{ margin: margin, borderRadius: 10, overflow: "hidden" }}
        width={phoneWidth}
        picture={item}
      />
    );
  };

  const handleRefresh = () => {
    // Refetch room detail
    setSnackVisible(!snackVisible)
    queryClient.invalidateQueries({
      queryKey: ["room", { roomId: room.id }],
    });

    // Refetch all pictures
    queryClient.invalidateQueries({
      queryKey: ["pictures", { roomId: room.id }],
    });
  };

  return (
    <SafeAreaView margins={false} style={[style, styels.container]}>
      <FlatList
        style={{ flex: 1 }}
        data={pictures}
        renderItem={renderItem}
        ListHeaderComponent={<RoomHeader showSnack={() => setSnackVisible(true)} room={room} />}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={handleRefresh} />
        }
      />
      <Snackbar duration={2000} onDismiss={() => setSnackVisible(false)} visible={snackVisible}>you just wanna snackbar</Snackbar>
    </SafeAreaView>
  );
}

const styels = StyleSheet.create({
  container: {
    flex: 1,
  },
});
