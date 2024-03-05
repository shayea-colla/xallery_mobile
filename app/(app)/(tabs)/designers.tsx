import { StyleSheet } from 'react-native';
import { SafeAreaView } from '@components/Themed';
import { Text } from 'react-native-paper';

export default function Designers() {
  return (
    <SafeAreaView style={styles.container}>
      <Text variant='headlineLarge'>Designers</Text>
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