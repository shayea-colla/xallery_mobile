import { useState } from 'react'
import { StyleSheet } from 'react-native';
import { SafeAreaView, View } from '@/components/Themed';
import { Button, Text } from 'react-native-paper';
import { useSession } from '@/authentication/ctx';
import * as Haptic from 'expo-haptics';

export default function TabOneScreen() {
  const {user, Logout}  = useSession()
  const [visible, setVisible] = useState(true)
  return (
    <SafeAreaView style={styles.container}>
      <Text variant='headlineLarge'>{user?.username}</Text>
      <Button onPress={() => Logout()} >user page</Button>
      <Button onPress={() => Haptic.selectionAsync()} >selection</Button>
      <Button onPress={() => {
        Haptic.notificationAsync(
          Haptic.NotificationFeedbackType.Success
        )
        }} >success</Button>
      <Button onPress={() => {
        Haptic.notificationAsync(
          Haptic.NotificationFeedbackType.Warning
        )
        }} >Warning</Button>
      <Button onPress={() => {
        Haptic.notificationAsync(
          Haptic.NotificationFeedbackType.Error
        )
        }} >Error</Button>
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
