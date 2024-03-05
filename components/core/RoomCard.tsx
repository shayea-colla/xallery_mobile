import { StyleSheet } from 'react-native'
import { Surface, Text, useTheme } from "react-native-paper";
import { View, ViewProps } from "../Themed";
import { Image } from 'expo-image';


type RoomCardProps = {name: string, description: string, background: string} & ViewProps

export default function RoomCard (props: RoomCardProps) {
    const { name, description, background, style, ...otherProps} = props

    return (
        <Surface mode='flat' style={[style, styles.container]} {...otherProps}>
            <RoomCardImage background={background} />
            <RoomCardContent style={{marginStart: 5, marginEnd: 5}} name={name} description={description} />
        </Surface>
    )
}

type RoomCardImagePorps = {background: string} & ViewProps

const RoomCardImage = ({background, style}: RoomCardImagePorps) => {
    const theme = useTheme()

    return (
        <View style={[style, styles.imageContainer, {backgroundColor: theme.colors.onPrimary }]}>
            <Image
                style={styles.image}
                source={background}
                contentFit='cover'
                transition={100}
            />
        </View>
    )
}


type RoomCardContentProps = {name: string, description: string } & ViewProps

const RoomCardContent = (props: RoomCardContentProps) => {
    const { name, description, style, ...otherProps} = props

    // custom margin 
    return (
        <View style={[style, {backgroundColor: 'transparent'}]} {...otherProps}>
            <Text style={style} variant='titleMedium'>{name}</Text>
            <Text style={style} numberOfLines={1} variant='bodySmall'>
                {description}
            </Text>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        paddingBottom: 9,
        overflow: 'hidden'
    },
    imageContainer: {
        height: 120,
    },
    image: {
        flex: 1,
        height: undefined,
        width: undefined
    }
})