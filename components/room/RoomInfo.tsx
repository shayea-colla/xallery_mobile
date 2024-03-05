import { View } from "@/components";
import { Avatar, Text, useTheme } from "react-native-paper";
import { ViewProps } from "@/components/Themed";
import { Icon } from "react-native-paper";
import { fullRoomType, user } from "@/types";
import { Pressable, StyleSheet } from "react-native";
import { router } from "expo-router";
import { useFetchUserInfo } from "@/hooks/fetching";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "@/authentication/ctx";

export default function RoomInfo({
  room,
  style,
  showSnack
}: { room: fullRoomType, showSnack: () => void } & ViewProps) {
  return (
    <View style={[style]}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 2,
        }}
      >
        <Text style={{}} variant="headlineSmall">
          {room.name}
        </Text>

        <LikeButton showSnack={showSnack} room={room} />
      </View>
      <OwnerInfo style={{ marginBottom: 10 }} userId={room.owner} />

      <Text style={{ color: "gray" }} variant="bodySmall">
        {room.discription}
      </Text>
    </View>
  );
}

function OwnerInfo({ userId, style }: { userId: number } & ViewProps) {
  const userQuery = useFetchUserInfo(userId);
  const theme = useTheme();

  const handleNavigation = () => {
      router.push(`/(app)/users/${userId}`);
  //  if (user.id == userId) {
  //    router.navigate("/profile")
  //  } else {
  //    router.push(`/(app)/users/${userId}`);
  //  }
  };

  return (
    <Pressable
      onPress={handleNavigation}
      style={[style, styles.ownerInfoContainer]}
    >
      <Avatar.Image
        style={{ backgroundColor: theme.colors.onTertiaryContainer }}
        source={{ uri: userQuery.data?.picture }}
        size={20}
      />
      <Text variant="bodySmall"> designer </Text>
    </Pressable>
  );
}

function likedRoom(user: user, room: fullRoomType) {
    return user.likedRooms.includes(room.id)
}

function LikeButton({ room, style, showSnack }: { room: fullRoomType, showSnack: () => void } & ViewProps) {
  // Know I want a way to know whether the current user is liked the room or not , how to do it ,
  const theme = useTheme();
  const { api, user } = useSession();
  const [liked, setLiked] = useState(likedRoom(user, room));
  const queryClient = useQueryClient();

  const handleLikeSuccess = () => {
      // Fixme ( snack bar shows when user remove room from favorates and seems broken )
      // show a success snackbar 
      // showSnack()
      queryClient.invalidateQueries({
        queryKey: ["profile"],
      });

  }

  const removeLike = useMutation({
    mutationFn: async (roomId: string) => {
      try {
        const res = await api.patch(`rooms/${roomId}/unlike/`);
        const data = await res.data;
        return data;
      } catch (error) {
        console.log(error);
        throw new Error();
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["profile"],
      });
    },
  });

  const addLike = useMutation({
    mutationFn: async (roomId: string) => {
      try {
        const res = await api.patch(`rooms/${roomId}/like/`);
        const data = await res.data;
        return data;
      } catch (error) {
        console.log(error);
        throw new Error();
      }
    },
    onSuccess: handleLikeSuccess
  });


  const handleRoomLike = () => {
    if (liked) {
      removeLike.mutate(room.id);
      setLiked(false);
    } else {
      addLike.mutate(room.id);
      setLiked(true);
    }
  };

  return (
    <Pressable style={style} onPress={handleRoomLike}>
      <Icon
        color={theme.colors.primary}
        source={liked ? "heart" : "heart-outline"}
        size={28}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  ownerInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
});
