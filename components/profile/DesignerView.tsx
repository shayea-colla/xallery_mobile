import { StyleSheet } from 'react-native'
import { View } from '@/components/'
import { ActivityIndicator, Text } from 'react-native-paper';
import { ViewProps } from '../Themed';
import { useEffect, useState } from 'react';
import { useSession } from '@/authentication/ctx';
import { shortRoomType } from '@/types'
import { transformShortRooms } from '@/utils';
import RoomsList from './RoomsListProps';


type RoomsInfoProps = { userId: number } & ViewProps

export default function DesignerView({ userId, style }: RoomsInfoProps) {

    const { rooms , isLoading, error } = useRoomsShortDetailAsync(userId)


    return (
        <View style={[style, styles.container]}>
            {isLoading 
                ? ( error == "" ? <ActivityIndicator style={{marginTop: 8}} />: <Text>Coud not load rooms</Text> )
                : (rooms !== null ? <RoomsList rooms={rooms} />: <Text>you do not have any rooms yet</Text>)
            }
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        borderColor: 'white',
        borderWidth: 1,
        flex: 1,
    },
})



function useRoomsShortDetailAsync(userId: number) {
    const { api } = useSession()
    const [rooms, setRooms] = useState<shortRoomType[] | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>("")

    useEffect(() => {
        // Set the loading indicator
        setIsLoading(true)

        // get all rooms from server
        api.get(`rooms/?owner=${userId}`)
        .then(res => res.data)
        .then((rooms) => {
            // transform the rooms
            setRooms(transformShortRooms(rooms))
            setError("")
        })
        .catch(error => {
            setError(String(error))
        })
        .finally(() => setIsLoading(false))

    }, [])


    return {rooms, isLoading, error}

}