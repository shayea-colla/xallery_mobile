import { StyleSheet } from 'react-native'
import { Surface, Text } from "react-native-paper";
import { View, ViewProps } from "../Themed";
import { Image } from 'expo-image';

type RoomCardImagePorps = {image: string} & ViewProps

const RoomCardImage = ({image, style}: RoomCardImagePorps) => {

    return (
        <View style={[style, styles.imageContainer]}>
            <Image
                style={styles.image}
                source={image}
                contentFit='cover'
                transition={100}
            />
        </View>
    )
}


type RoomCardTitleProps = {title: string} & ViewProps

const RoomCardTitle = (props: RoomCardTitleProps) => {
    const { title, style, ...otherProps} = props
    return (
        <View style={style} {...otherProps} >
            <Text variant='titleMedium'>{title}</Text>
        </View>
    )
}


type RoomCardContentProps = {title: string, description: string} & ViewProps

const RoomCardContent = (props: RoomCardContentProps) => {
    const { title, description ,style, ...otherProps} = props

    // custom margin 
    const margins = 6
    return (
        <View style={[style, {marginStart: margins, marginEnd: margins}]} {...otherProps}>
            <RoomCardTitle title={title} />
            <Text numberOfLines={1} variant='bodySmall'>
                {description}
            </Text>
        </View>
    )
}


type RoomCardProps = {title: string, description: string, image: string} & ViewProps

export default function RoomCard (props: RoomCardProps) {
    const { title, description, image, style, ...otherProps} = props

    return (
        <Surface style={[style, styles.container]} {...otherProps}>
            <RoomCardImage image={image} />
            <RoomCardContent title={title} description={description} />
        </Surface>
    )
}


const styles = StyleSheet.create({
    container: {
        width: '48%',
        borderRadius: 13,
        paddingBottom: 9,
        backgroundColor: 'white',
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