import { StyleSheet } from 'react-native';
import { SafeAreaView, View } from '@/components/Themed';
import { Button, Text } from 'react-native-paper';
import { useSession } from '@/authentication/ctx';
import { StatusBar } from 'expo-status-bar';

export default function Profile() {
    const { Logout } = useSession()

    return (
        <SafeAreaView style={styles.container}>
            <Button mode='contained' onPress={() => Logout()} >logout</Button>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})