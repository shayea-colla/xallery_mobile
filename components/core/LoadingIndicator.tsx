import { StyleSheet } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { View, ViewProps } from "../Themed";



export default function LoadingIndicator(props: ViewProps) {

  return (
    <View style={[props.style, styles.container]} >
        <ActivityIndicator />
    </View>
  )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }

})