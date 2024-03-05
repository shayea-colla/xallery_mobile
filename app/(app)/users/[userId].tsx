import { StyleSheet } from "react-native";
import { useSession } from "@/authentication/ctx";
import { SafeAreaView } from "@/components";
import { PageLoading } from "@/components/core";
import { UserProfile } from "@/components/profile";
import { fetchUserInfo } from "@/network";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { Text } from "react-native-paper";

export default function UserProfilePage() {
  const { userId } = useLocalSearchParams();
  const { api } = useSession();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["user", { userId: userId }],
    queryFn: async () => fetchUserInfo(api, userId),
  });

  console.log("No way home");

  return (
    <SafeAreaView margins style={styles.container}>
      {isLoading && <PageLoading />}
      {isError && <Text>no way home so some error has accured alone</Text>}
      {data && <UserProfile user={data}/>}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
