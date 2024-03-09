import { StyleSheet } from "react-native";
import { useSession } from "@/authentication/ctx";
import { SafeAreaView } from "@/components";
import { PageLoading } from "@/components/core";
import { UserProfile } from "@/components/profile";
import { fetchUserInfo, fetchUserRoomsShort } from "@/network";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { Text } from "react-native-paper";

export default function UserProfilePage() {
  const { userId } = useLocalSearchParams();
  const { api } = useSession();

  const user = useQuery({
    queryKey: ["user", { userId: userId }],
    queryFn: async () => fetchUserInfo(api, userId),
  });

  const rooms = useQuery({
    queryKey: ["rooms", { userId: userId }],
    queryFn: async () => fetchUserRoomsShort(api, userId),
  });


  return (
    <SafeAreaView margins style={styles.container}>
      {(rooms.isLoading && user.isLoading) && <PageLoading />}
      {(rooms.isError || user.isError) && <Text>{/* Fixme replace with error page*/}no way home so some error has accured alone</Text>}
      {(rooms.data && user.data) && <UserProfile rooms={rooms.data} user={user.data}/>}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
