import { StyleSheet } from 'react-native';
import { USER_TYPE } from "@/authentication/AuthContext";
import { shortRoomType, user } from '@/types';
import { View, ViewProps } from "@components/Themed";
import DesignerView from "../DesignerView";
import NormalView from "../NormalView";

type profileProps = { user: user, rooms: shortRoomType[] } & ViewProps ;

export default function ProfilePage({ user, rooms, style }: profileProps) {

  return (
    <View style={[style, styles.container]}>
      {user.type === USER_TYPE.DESIGNER ? (
        <DesignerView rooms={rooms} user={user}/>
      ) : (
        <NormalView />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})
