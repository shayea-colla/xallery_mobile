import { StyleSheet } from 'react-native'
import { View } from '@/components/'
import { user } from '@/types';
import ProfileImage from '../ProfileImage';
import PopularityInfo from '../PopularityInfo';
import ProfileDescription from '../ProfileDescription';
import { ViewProps } from '../../Themed';

type profileInfoProps = { user: user } & ViewProps

export default function ProfileInfo ({ user, style }: profileInfoProps) {

  console.log(user.picture)

  return (
    <View style={[style, styles.container]}>
        <ProfileImage style={{marginTop: 40}} picture={user.picture} username={user.username} />
        <PopularityInfo style={{marginTop: 10}} followers={user.followers?.length} following={user.following?.length} />
        <ProfileDescription style={{marginTop: 15}} description={user.description} />
    </View>
  )
}



const styles = StyleSheet.create({
    container: {
    },
})
