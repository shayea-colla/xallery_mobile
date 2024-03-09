import { FlatList, StyleSheet } from "react-native";
import { View } from "@/components/";
import { Divider, Text } from "react-native-paper";
import { ViewProps } from "../Themed";

import ProfileInfo from "./user/ProfileInfo";
import { user } from "@/authentication";
import { renderRoomList } from "./renderRoomList";
import { shortRoomType } from "@/types";

type RoomsInfoProps = { user: user; rooms: shortRoomType[] } & ViewProps;

export default function DesignerView({ user, rooms, style }: RoomsInfoProps) {
  const headerComponent = (
    <>
      <ProfileInfo user={user} style={{ marginBottom: 10 }} />
      <Divider bold style={{ marginBottom: 10 }} />
    </>
  );

  if (rooms && rooms.length == 0) {
    return (
      <View style={[style, styles.container]}>
        {headerComponent}
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text style={{ textAlign: "center" }} variant="bodyLarge">
            no rooms found for this user.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={[style, styles.container]}>
      <View style={{ flex: 1 }}>
        <FlatList
          data={rooms}
          renderItem={renderRoomList}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={headerComponent}
          ListFooterComponent={<View style={{ marginBottom: 20 }} />}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={{ gap: 18 }}
          contentContainerStyle={{ gap: 20 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
