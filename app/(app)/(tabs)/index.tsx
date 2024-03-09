import { StyleSheet } from 'react-native';
import { SafeAreaView } from '@/components/Themed';
import { Button, Text } from 'react-native-paper';
import { useSession } from '@/authentication/ctx';
import { router } from 'expo-router';

export default function TabOneScreen() {
  const {user, Logout}  = useSession()
  return (
    <SafeAreaView style={styles.container}>
      <Text variant='headlineLarge'>{user?.username}</Text>
      <Button onPress={() => Logout()} >logout</Button>
      <Button onPress={() => router.navigate("/createRoom")} >create room</Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
