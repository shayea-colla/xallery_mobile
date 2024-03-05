import { StyleSheet } from 'react-native';
import { USER_TYPE } from "@/authentication/AuthContext";
import { user } from '@/types';
import { View, ViewProps } from "@components/Themed";
import DesignerView from "../DesignerView";
import NormalView from "../NormalView";

type profileProps = { user: user } & ViewProps ;

export default function ProfilePage({ user, style }: profileProps) {

  return (
    <View style={[style, styles.container]}>
      {user.type === USER_TYPE.DESIGNER ? (
        <DesignerView user={user}/>
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
