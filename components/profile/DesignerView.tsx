import { FlatList, StyleSheet } from "react-native";
import { View } from "@/components/";
import { Divider, ActivityIndicator, Text } from "react-native-paper";
import { ViewProps } from "../Themed";
import { useSession } from "@/authentication/ctx";
import { useQuery } from "@tanstack/react-query";
import { fetchUserRoomsShort } from "@/network";

import ProfileInfo from "./user/ProfileInfo";
import { user } from "@/authentication";
import { renderRoomList } from './renderRoomList';

type RoomsInfoProps = { user: user } & ViewProps;

export default function DesignerView({ user, style }: RoomsInfoProps) {
  const { api } = useSession();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["rooms", { userId: user.id }],
    queryFn: async () => fetchUserRoomsShort(api, user.id),
  });

  const headerComponent = (
    <>
      <ProfileInfo user={user} style={{ marginBottom: 10 }} />
      <Divider bold style={{ marginBottom: 10 }} />
    </>
  );

  return (
    <View style={[style, styles.container]}>
      {isLoading && <ActivityIndicator style={{ marginTop: 8 }} />}
      {isError && <Text>Some Error accured</Text>}
      {(data || data !== undefined) && (
        <View style={{flex: 1}}>
          <FlatList
            data={data}
            renderItem={renderRoomList}
            keyExtractor={(item) => item.id}
            ListHeaderComponent={headerComponent}
            ListFooterComponent={<View style={{marginBottom: 20}} />}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            columnWrapperStyle={{gap: 9}}
            contentContainerStyle={{ gap: 10 }}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
