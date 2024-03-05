import { StyleSheet } from 'react-native'
import { View } from '@/components/'
import { user } from '@/types';
import ProfileImage from '../ProfileImage';
import PopularityInfo from '../PopularityInfo';
import ProfileDescription from '../ProfileDescription';
import { ViewProps } from '../../Themed';

type myProfileInfoProps = { user: user } & ViewProps

export default function MyProfileInfo ({ user, style }: myProfileInfoProps) {

  return (
    <View style={[style, styles.container]}>
        <ProfileImage style={{marginTop: 40}} picture={user.picture} username={user.username} />
        <PopularityInfo style={{marginTop: 10}} followers={user.followers?.length} following={user.following?.length} />
        <ProfileDescription style={{marginTop: 15, marginBottom: 12}} description={user.description} />
    </View>
  )
}



const styles = StyleSheet.create({
    container: {
    },
})
