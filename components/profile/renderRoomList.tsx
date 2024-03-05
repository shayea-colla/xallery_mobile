import { router } from "expo-router";
import { Pressable, ListRenderItemInfo} from "react-native";
import { RoomCard } from "../core";
import { shortRoomType } from '@/types'

export function renderRoomList ({ item }: ListRenderItemInfo<shortRoomType>) {
    return (
        <Pressable
        style={{ flex: 1 }}
        onPress={() => {
            router.navigate({
            pathname: "/[roomId]",
            params: { roomId: item.id },
            });
        }}
        >
        <RoomCard
            name={item.name}
            description={item.description}
            background={item.background}
        />
        </Pressable>
    );
}