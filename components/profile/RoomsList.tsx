import { StyleSheet } from "react-native";
import { View, ViewProps } from "../Themed";
import { shortRoomType } from "@/types";
import { RoomCard } from "../core";
import { FlatList } from "react-native";
import { Divider } from "react-native-paper";

type RoomsListProps = { rooms: shortRoomType[], header:React.ElementType } & ViewProps;

//<FlatList 
//    style={{borderColor: 'magenta', borderWidth: 3}}
//    data={rooms}
//    renderItem={({ item }) => <Text>{item.title}</Text>}
//    keyExtractor={item => item.id}
//    showsVerticalScrollIndicator={false}
//    ListHeaderComponent={<Text>no way home</Text>}
//    numColumns={2}
///>


export default function RoomsList(props: RoomsListProps) {
  const { rooms, header } = props;

  const headerComponent = (
    <>
    {header}
    <Divider bold style={{marginBottom: 10}} />
    </>
  )

  return (
    <View style={styles.container}>
      <FlatList 
        data={rooms}
        renderItem={({item}) => <RoomCard key={item.id} image={item.background} description={item.description} title={item.name} />}
        keyExtractor={item => item.id}
        ListHeaderComponent={headerComponent}
        numColumns={2}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
});
