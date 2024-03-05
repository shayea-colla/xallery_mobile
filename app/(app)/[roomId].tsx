import { View } from "@/components";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { Text } from "react-native-paper";
import { fetchRoomDetail, fetchRoomPictures } from "@/network/requests";
import { useSession } from "@/authentication/ctx";
import { PageLoading } from "@/components/core";
import { RoomDetail } from "@/components/room";

function RoomDetailPage() {
  const { roomId } = useLocalSearchParams<{roomId: string}>();

  const {roomQuery, picturesQuery} = useQueryRoomDetails(roomId)

  return (
    <View style={{ flex: 1 }}>
      {(roomQuery.isLoading || picturesQuery.isLoading )&& <PageLoading />}
      {(roomQuery.isError || picturesQuery.isError) && <Text>An error accured</Text>}
      {(roomQuery.data && picturesQuery.data) && <RoomDetail pictures={picturesQuery.data} room={roomQuery.data} />}
    </View>
  );
}

export default RoomDetailPage;




function useQueryRoomDetails (roomId: string) {
  const { api } = useSession()


  const roomQuery = useQuery({
    queryKey: ["room", { roomId: roomId }],
    queryFn: async () => fetchRoomDetail(api, roomId)
  });

  const picturesQuery = useQuery({
    queryKey: ["pictures", {roomId: roomId }],
    queryFn: () => fetchRoomPictures(api, roomId),
  })

  return {roomQuery, picturesQuery}

}