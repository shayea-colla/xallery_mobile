import { USER_TYPE, user } from '@/authentication/AuthContext'
import { View } from '@components/Themed'
import { Divider } from 'react-native-paper'
import ProfileInfo from './ProfileInfo'
import DesignerView from './DesignerView'
import NormalView from './NormalView'
import { Button } from 'react-native-paper';
import { useSession } from '@/authentication/ctx';
import {  useQueryClient } from '@tanstack/react-query';

type profileProps = {
    user: user
}

export default function ProfilePage({ user }: profileProps) {
    const { Logout } = useSession()
    const queryClient = useQueryClient()

    return (
        <View>
            <ProfileInfo style={{marginBottom: 10}} user={user} />
            <Divider bold style={{marginBottom: 19}} />
            { user.type === USER_TYPE.DESIGNER 
                ? <DesignerView userId={user.id} />
                : <NormalView />
            }

            <Button style={{alignSelf: 'center', marginTop: 500}} onPress={() => {
                    queryClient.removeQueries({queryKey: ["profile"]})
                    Logout()
                }} >logout</Button>
        </View>
    )
}