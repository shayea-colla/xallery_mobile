import { StyleSheet } from "react-native";
import { SafeAreaView } from "@/components/Themed";
import { Text } from 'react-native-paper';

export default function Index() {

  return (
    <SafeAreaView style={styles.container}>
      <Text variant='displayLarge'>solo</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
