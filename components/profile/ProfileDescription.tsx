import { StyleSheet } from 'react-native'
import { ViewProps } from  '../Themed'
import { View } from '../Themed';
import { Text} from 'react-native-paper';


type ProfileDescriptionType = { description: string | undefined} & ViewProps

export default function ProfileDescription ({ description, style }: ProfileDescriptionType) {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.text} variant='bodyMedium'>{description}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    text: {
        color: 'gray'
    }
})