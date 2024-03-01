import { ScrollView,  StyleSheet } from 'react-native';
import { SafeAreaView } from '@/components';
import { Text } from 'react-native-paper';
import { useSession } from '@/authentication/ctx';
import { transformUser } from '@/utils';
import { ProfilePage } from '@components/profile';
import { useQuery} from '@tanstack/react-query';
import { Axios } from 'axios';
import { LoadingIndicator } from '@/components/core';

async function fetchUserProfile(api: Axios) {
    const res = await api.get('accounts/profile/')
    const data = await res.data
    return transformUser(data)
}

export default function Profile() {
    const {api } = useSession()

    const { data, isError, isLoading } = useQuery({
        queryKey: ["profile"],
        queryFn: async () => fetchUserProfile(api)
    })


    return (
        <ScrollView contentContainerStyle={{flexGrow: 1}} >
            <SafeAreaView style={styles.container} >
                {isLoading && <LoadingIndicator /> }
                {isError && <Text>Error</Text>}
                {data && <ProfilePage user={data} />}
            </SafeAreaView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start'
        
    }
})