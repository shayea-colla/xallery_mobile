import { StyleSheet } from 'react-native'
import { Image } from 'expo-image';
import { ViewProps } from  '../Themed'
import { View } from '../Themed';
import { Text, useTheme } from 'react-native-paper';


type ProfileImageType = { picture: string | undefined, username: string} & ViewProps

export default function ProfileImage (props: ProfileImageType) {
    const { picture, username, style } = props
    const theme = useTheme()

    let placeholder:string;
    try {
        // Try get the original picture
        placeholder = require("@/assets/images/full_logo.png")
    } catch {
        // Default hash if error accured
        placeholder = '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';
    }

    return (
        <View style={[style, styles.container]}>
            <Image 
                style={[styles.image, {borderColor: theme.colors.secondary}]}
                source={picture} 
                contentFit='contain'
                placeholder={placeholder}
                transition={300}
            />
            <Text style={{fontWeight: '700' }} variant='titleLarge'>{username}</Text>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    image: {
        height: 100,
        width: 100,
        borderRadius: 100,
        borderWidth: 4,
        alignSelf: 'center',
    }
})