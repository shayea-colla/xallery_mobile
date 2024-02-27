import { StyleSheet } from 'react-native';
import { View, SafeAreaView } from '@components/Themed';
import { Text, useTheme } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';

export default function Designers() {
    const theme = useTheme()
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