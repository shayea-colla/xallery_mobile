import { StyleSheet } from 'react-native';
import { SafeAreaView  } from '@/components';
import { useSession } from '@/authentication/ctx';
import { MyProfile } from '@components/profile';

import { Text } from 'react-native-paper';

export default function Profile() {
    const { user } = useSession()

    return (
        <SafeAreaView style={styles.container} >
            {user ? <MyProfile user={user} /> : <Text>Connect to the internet</Text>}
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start'
    }
})
