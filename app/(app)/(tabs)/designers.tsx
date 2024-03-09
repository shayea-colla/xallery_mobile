import { useState } from "react";
import {
  FlatList,
  ListRenderItemInfo,
  Pressable,
  StyleSheet,
} from "react-native";
import { SafeAreaView, View } from "@components/Themed";
import {
  ActivityIndicator,
  Button,
  SegmentedButtons,
  Text,
} from "react-native-paper";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "@/authentication/ctx";
import { fetchAllDesigners, fetchFollowers, fetchFollowings } from "@/network";
import DesignerCard from "@/components/designers/DesignerCard";
import { user } from "@/types";
import { router } from "expo-router";

export default function Designers() {
  const { api, user } = useSession();
  const [value, setValue] = useState("all");

  // I should change the query based on the `value`
  const { data, isFetching, isError, refetch } = useQuery({
    queryKey: ["search", "designers"],
    queryFn: async () => {
      switch (value) {
        case "all":
          return await fetchAllDesigners(api);

        case "followings":
          return await fetchFollowings(api, user?.following);

        case "followers":
          return await fetchFollowers(api, user?.followers);
      }
    },
  });


  const renderItem = ({ item }: ListRenderItemInfo<user>) => {
    return (
      <Pressable
        style={{ flex: 1 }}
        onPress={() => {
          router.navigate(`/users/${item.id}`);
        }}
      >
        <DesignerCard picture={item.picture} username={item.username} />
      </Pressable>
    );
  };

  let view;

  if (isFetching) {
    view = <ActivityIndicator />;
  } else if (isError) {
    view = (
      <Text>Check your internet and try agai.</Text>
    );
  } else if (data) {
    // data is here and no error accured
    if (data.length > 0) {
      // remove the current user from the result data
      const dataList = data.filter((item) => item.id !== user?.id);

      view = (
        <FlatList
          data={dataList}
          renderItem={renderItem}
          numColumns={3}
          columnWrapperStyle={{ gap: 10 }}
          contentContainerStyle={{ gap: 10 }}
          showsVerticalScrollIndicator={false}
        />
      );
    } else {
      view = <Text style={{ textAlign: "center" }}>No resultes found :(</Text>;
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ alignItems: "center" }}>
        {/* <Button onPress={() => {
          setValue("all")
          refetch()
          }}>all</Button>
        <Button onPress={() => {
          setValue("followings")
          refetch()
          }}>following</Button>
        <Button onPress={() => {
          setValue("followers")
          refetch()
          }}>followers</Button> */}
        <SegmentedButtons
          style={{ marginBottom: 10 }}
          value={value}
          onValueChange={setValue}          
          buttons={[
            {
              value: "all",
              label: "all",
            },
            {
              value: "following",
              label: "follwing",
            },
            {
              value: "followers",
              label: "followers",
            },
          ]}
        />
      </View>
      {view}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 10,
    padding: 20,
    justifyContent: "flex-start",
  },
});
