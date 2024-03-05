import { FlatList, StyleSheet } from "react-native";
import { USER_TYPE} from "@/authentication/AuthContext";
import { View, ViewProps } from "@components/Themed";
import MyProfileInfo from "./MyProfileInfo";
import { ActivityIndicator, Divider, Text, FAB } from "react-native-paper";
import { fetchUserRoomsShort } from "@/network";
import { useSession } from "@/authentication/ctx";
import { useQuery } from "@tanstack/react-query";
import { shortRoomType, user } from "@/types";
import { router } from "expo-router";
import { renderRoomList } from "../renderRoomList";

type myProfileProps = {
  user: user;
};

export default function MyProfile({ user }: myProfileProps) {
  return (
    <View style={styles.container}>
      <View style={styles.MyProfileInfo}>
        <MyProfileInfo user={user} />
        <Divider bold />
      </View>

      {user.type === USER_TYPE.DESIGNER ? (
        <MyDesignerProfile user={user} />
      ) : (
        <MyNormalProfile user={user} />
      )}
    </View>
  );
}

function MyDesignerProfile({ user }: myProfileProps) {
  const { api } = useSession();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["rooms", { userId: user.id }],
    queryFn: async () => fetchUserRoomsShort(api, user.id),
  });

  return (
    <View style={{ flex: 1 }}>
      {isLoading && <ActivityIndicator />}
      {isError && <Text>could not load rooms</Text>}
      {data && <MyProfileRoomsList rooms={data} />}
      <FAB
        style={{ position: "absolute", bottom: 12, right: 12 }}
        icon="plus"
        onPress={() => router.navigate("/designers")}
      />
    </View>
  );
}

function MyProfileRoomsList({ rooms }: { rooms: shortRoomType[] } & ViewProps) {
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={rooms}
        renderItem={renderRoomList}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        overScrollMode="never"
        columnWrapperStyle={{ gap: 9 }}
        contentContainerStyle={{ gap: 9 }}
        ListFooterComponent={<View style={{ marginBottom: 69 }}></View>}
      />
    </View>
  );
}


function MyNormalProfile({ user }: myProfileProps) {
  return (
    <View>
      <Text>{user.username}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  MyProfileInfo: {
    marginBottom: 10,
  },
  container: {
    flex: 1,
  },
});
