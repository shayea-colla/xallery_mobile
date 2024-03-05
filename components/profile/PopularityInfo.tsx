import { StyleSheet } from 'react-native'
import { View, ViewProps } from '../Themed'
import { Text } from 'react-native-paper'

type PopularityInfoType = { followers?: number, following?: number } & ViewProps

export default function PopularityInfo (props: PopularityInfoType) {
    const { followers, following , style } = props
    return (
        <View style={[styles.container, style]}>
            <View style={styles.info}>
                <Text style={{fontWeight: 'bold'}} variant='bodySmall'>followers: </Text>
                <Text>{followers}</Text>
            </View>
            <View style={styles.info}>
                <Text style={{fontWeight: 'bold'}} variant='bodySmall'>following: </Text>
                <Text>{following}</Text>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '50%',
        alignSelf: 'center',
        justifyContent: 'space-evenly',
    },
    info: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    }
})
