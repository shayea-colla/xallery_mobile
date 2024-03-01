import { StyleSheet } from 'react-native'
import { Button, Card, Surface, Text } from 'react-native-paper';
import { View, ViewProps } from '../Themed';
import { shortRoomType } from '@/types'
import { RoomCard } from '../core';

type RoomsListProps = { rooms: shortRoomType[] } & ViewProps

export default function RoomsList(props: RoomsListProps) {
    const { rooms } = props

    return (
        <View style={{flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap'}} >
            <RoomCard image={rooms[0].background}  title={rooms[0].name} description={rooms[0].description} />
            <RoomCard image={rooms[0].background}  title={rooms[0].name} description={rooms[0].description} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
    },
})