import { StyleSheet } from 'react-native';
import { SafeAreaView, View } from '@/components/Themed';
import { Text } from 'react-native-paper';

export default function TabOneScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text variant='headlineLarge' >Home</Text>
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
