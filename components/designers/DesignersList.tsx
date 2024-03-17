import { user } from "@/types";
import { router } from "expo-router";
import { FlatList, ListRenderItemInfo, Pressable } from "react-native";
import { ViewProps } from "../Themed";
import DesignerCard from "./DesignerCard";

type DesignersListPorpTypes = { data: user[] } & ViewProps;

export default function DesignersList({ data }: DesignersListPorpTypes) {
  const renderItem = ({ item }: ListRenderItemInfo<user>) => {
    return (
      <Pressable
        style={{ flex: 1 }}
        onPress={() => {
          router.navigate(`/users/${item.id}`);
        }}
      >
        <DesignerCard description={item.description} picture={item.picture} username={item.username} />
      </Pressable>
    );
  };

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      contentContainerStyle={{ gap: 10 }}
      showsVerticalScrollIndicator={false}
    />
  );
}
