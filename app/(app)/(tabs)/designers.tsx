import { useState } from "react";
import { StyleSheet, useWindowDimensions } from "react-native";
import { useTheme } from "react-native-paper";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import {
  AllUsersView,
  FollowersView,
  FollowingsView,
} from "@/components/designers";
import { MD3Theme } from "react-native-paper/lib/typescript/types";
import { margins } from "@/components/Styles";
import { StatusBar } from "expo-status-bar";

const renderScene = SceneMap({
  first: AllUsersView,
  second: FollowersView,
  third: FollowingsView,
});

const renderTabBar = (props, theme: MD3Theme) => {
  return (
    <TabBar
      {...props}
      style={{ backgroundColor: theme.colors.primaryContainer }}
      activeColor={theme.colors.onPrimaryContainer}
      inactiveColor={theme.colors.onPrimaryContainer}
    />
  );
};

export default function Designers() {
  const layout = useWindowDimensions();
  const theme = useTheme();

  // index of the layout
  const [index, setIndex] = useState(0);

  const [routes] = useState([
    { key: "first", title: "all desginers" },
    { key: "second", title: "followers" },
    { key: "third", title: "followings" },
  ]);

  return (
    <>
      <TabView
        renderTabBar={(props) => renderTabBar(props, theme)}
        style={margins.statusBarMargins}
        renderScene={renderScene}
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />
      <StatusBar backgroundColor={theme.colors.primaryContainer} />
    </>
  );
}

// export default function Designers() {
//   const { api, user } = useSession();
//   const [value, setValue] = useState("all");

//   // I should change the query based on the `value`
//   const { data, isFetching, isError, refetch } = useQuery({
//     queryKey: ["search", "designers"],
//     queryFn: async () => {
//       switch (value) {
//         case "all":
//           return await fetchAllDesigners(api);

//         case "followings":
//           return await fetchFollowings(api, user?.following);

//         case "followers":
//           return await fetchFollowers(api, user?.followers);
//       }
//     },
//   });

//   const renderItem = ({ item }: ListRenderItemInfo<user>) => {
//     return (
//       <Pressable
//         style={{ flex: 1 }}
//         onPress={() => {
//           router.navigate(`/users/${item.id}`);
//         }}
//       >
//         <DesignerCard picture={item.picture} username={item.username} />
//       </Pressable>
//     );
//   };

//   let view;

//   if (isFetching) {
//     view = <ActivityIndicator />;
//   } else if (isError) {
//     view = <Text>Check your internet and try agai.</Text>;
//   } else if (data) {
//     // data is here and no error accured
//     if (data.length > 0) {
//       // remove the current user from the result data
//       const dataList = data.filter((item) => item.id !== user?.id);

//       view = (
//         <FlatList
//           data={dataList}
//           renderItem={renderItem}
//           numColumns={3}
//           columnWrapperStyle={{ gap: 10 }}
//           contentContainerStyle={{ gap: 10 }}
//           showsVerticalScrollIndicator={false}
//         />
//       );
//     } else {
//       view = <Text style={{ textAlign: "center" }}>No resultes found :(</Text>;
//     }
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={{ alignItems: "center" }}>
//         {/* <Button onPress={() => {
//           setValue("all")
//           refetch()
//           }}>all</Button>
//         <Button onPress={() => {
//           setValue("followings")
//           refetch()
//           }}>following</Button>
//         <Button onPress={() => {
//           setValue("followers")
//           refetch()
//           }}>followers</Button> */}
//         <SegmentedButtons
//           style={{ marginBottom: 10 }}
//           value={value}
//           onValueChange={setValue}
//           buttons={[
//             {
//               value: "all",
//               label: "all",
//             },
//             {
//               value: "following",
//               label: "follwing",
//             },
//             {
//               value: "followers",
//               label: "followers",
//             },
//           ]}
//         />
//       </View>
//       {view}
//     </SafeAreaView>
//   );
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
