import { StyleSheet } from 'react-native';
import { SafeAreaView, View } from '@/components/Themed';
import { Text } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';

export default function TabTwoScreen() {

  return (
    <SafeAreaView style={styles.container}>
      <Text variant='headlineLarge'>Search</Text>
      <StatusBar />
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
